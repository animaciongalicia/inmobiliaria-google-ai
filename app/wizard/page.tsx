'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WizardShell } from '@/components/WizardShell';
import { StepHeader } from '@/components/StepHeader';
import { QuestionCard } from '@/components/QuestionCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { WizardState, AgencyConfig } from '@/lib/types';
import { getAgencyConfig } from '@/lib/agencies';

const INITIAL_STATE: WizardState = {
  profile: '',
  zone: '',
  propertyType: '',
  purchaseRange: '',
  satisfaction: null,
  intent: '',
  analysisCommitment: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
};

const TOTAL_STEPS = 9;

function WizardContent() {
  const searchParams = useSearchParams();
  const agencyId = searchParams.get('agency');
  
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [agency, setAgency] = useState<AgencyConfig | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; category: string; resultCopy: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load state from localStorage and fetch agency config
  useEffect(() => {
    const saved = localStorage.getItem('wizard_state');
    const savedStep = localStorage.getItem('wizard_step');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    if (savedStep) {
      const parsedStep = parseInt(savedStep, 10);
      if (parsedStep >= 1 && parsedStep <= TOTAL_STEPS) {
        setStep(parsedStep);
      }
    }

    setAgency(getAgencyConfig(agencyId));
    setMounted(true);
  }, [agencyId]);

  // Save state to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('wizard_state', JSON.stringify(state));
      localStorage.setItem('wizard_step', step.toString());
    }
  }, [state, step, mounted]);

  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const resetWizard = () => {
    setState(INITIAL_STATE);
    setStep(1);
    setResult(null);
    setError(null);
    localStorage.removeItem('wizard_state');
    localStorage.removeItem('wizard_step');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.consent) {
      setError('Debes aceptar el consentimiento para continuar.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...state,
          agency_id: agency?.agency_id,
          agency_name: agency?.agency_name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar los datos');
      }

      setResult({
        score: data.score,
        category: data.category,
        resultCopy: data.resultCopy,
      });
      setStep(TOTAL_STEPS + 1); // Move to result screen
      localStorage.removeItem('wizard_state');
      localStorage.removeItem('wizard_step');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  // Render Result Screen
  if (step > TOTAL_STEPS && result) {
    return (
      <WizardShell currentStep={TOTAL_STEPS} totalSteps={TOTAL_STEPS} onReset={resetWizard} brandColor={agency?.brand_color}>
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">¡Informe Solicitado!</h2>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-slate-600 font-medium">Categoría de tu vivienda:</span>
              <span className={`px-4 py-1 rounded-full font-bold text-white ${
                result.category === 'A' ? 'bg-green-500' : result.category === 'B' ? 'bg-yellow-500' : 'bg-orange-500'
              }`}>
                Clase {result.category}
              </span>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Tendencia en {state.zone}</h4>
              <p className="text-slate-700 text-sm">{result.resultCopy.tendencia}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Oportunidad</h4>
              <p className="text-slate-700 text-sm">{result.resultCopy.oportunidad}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">A tener en cuenta</h4>
              <p className="text-slate-700 text-sm">{result.resultCopy.alerta}</p>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-slate-600 mb-4">Si quieres, te llamamos y lo vemos en 10 minutos.</p>
            <Button onClick={() => window.location.href = '/'} variant="primary" style={{ backgroundColor: agency?.brand_color }}>
              Volver al inicio
            </Button>
          </div>
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell
      currentStep={step}
      totalSteps={TOTAL_STEPS}
      onBack={prevStep}
      onReset={resetWizard}
      brandColor={agency?.brand_color}
    >
      {step === 1 && (
        <div className="text-center space-y-8">
          <StepHeader 
            title="¿Tu vivienda está en su mejor momento de mercado?" 
            subtitle="Responde 8 preguntas y recibe un informe orientativo de tu zona en A Coruña." 
          />
          <Button onClick={nextStep} fullWidth style={{ backgroundColor: agency?.brand_color }}>
            Empezar
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <StepHeader title="¿Cuál describe mejor tu situación?" />
          <QuestionCard
            options={[
              'Vivo en la vivienda',
              'La tengo alquilada',
              'Es una herencia',
              'Está vacía',
              'Estoy pensando en cambiar de casa',
              'No lo había pensado hasta ahora'
            ]}
            selectedValue={state.profile}
            onSelect={(val) => { updateState({ profile: val }); nextStep(); }}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8">
          <StepHeader title="¿En qué zona o barrio está?" />
          <div className="max-w-md mx-auto">
            <Select
              label="Selecciona tu zona"
              options={[
                'Monte Alto', 'Los Rosales', 'Matogrande', 'Elviña', 'Centro', 
                'Cuatro Caminos', 'Riazor', 'Labañou', 'Agra do Orzán', 'Mesoiro', 
                'Eirís', 'Orillamar'
              ]}
              value={state.zone}
              onChange={(e) => updateState({ zone: e.target.value })}
            />
            <div className="mt-8">
              <Button onClick={nextStep} disabled={!state.zone} fullWidth style={{ backgroundColor: agency?.brand_color }}>
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-8">
          <StepHeader title="¿Qué tipo de vivienda es?" />
          <QuestionCard
            options={['Piso', 'Ático', 'Dúplex', 'Casa', 'Chalet/Independiente', 'Otro']}
            selectedValue={state.propertyType}
            onSelect={(val) => { updateState({ propertyType: val }); nextStep(); }}
          />
        </div>
      )}

      {step === 5 && (
        <div className="space-y-8">
          <StepHeader title="¿Hace cuánto la compraste o la tienes?" />
          <QuestionCard
            options={['Menos de 5 años', '5–10 años', '10–20 años', 'Más de 20 años', 'Herencia']}
            selectedValue={state.purchaseRange}
            onSelect={(val) => { updateState({ purchaseRange: val }); nextStep(); }}
          />
        </div>
      )}

      {step === 6 && (
        <div className="space-y-8">
          <StepHeader title="Del 1 al 5: ¿Te encaja esta vivienda para los próximos 3 años?" subtitle="1 = Nada, 5 = Totalmente" />
          <div className="flex justify-center space-x-2 sm:space-x-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => { updateState({ satisfaction: num }); nextStep(); }}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full text-lg font-bold transition-all duration-200 border-2 ${
                  state.satisfaction === num
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
                }`}
                style={state.satisfaction === num && agency?.brand_color ? { backgroundColor: agency.brand_color, borderColor: agency.brand_color } : {}}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 7 && (
        <div className="space-y-8">
          <StepHeader title="Si cambiaras de vivienda, ¿cuándo sería?" />
          <QuestionCard
            options={['0–6 meses', '6–12 meses', '12–24 meses', 'Más adelante', 'No lo sé']}
            selectedValue={state.intent}
            onSelect={(val) => { updateState({ intent: val }); nextStep(); }}
          />
        </div>
      )}

      {step === 8 && (
        <div className="space-y-8">
          <StepHeader title="¿Quieres que revisemos tu caso y te enviemos un informe orientativo?" />
          <QuestionCard
            options={['Sí, análisis personalizado', 'Solo por curiosidad']}
            selectedValue={state.analysisCommitment}
            onSelect={(val) => { updateState({ analysisCommitment: val }); nextStep(); }}
          />
        </div>
      )}

      {step === 9 && (
        <div className="space-y-6">
          <StepHeader title="Último paso" subtitle="Déjanos tus datos para enviarte el informe." />
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
            <Input
              label="Nombre completo"
              type="text"
              required
              value={state.name}
              onChange={(e) => updateState({ name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              required
              value={state.email}
              onChange={(e) => updateState({ email: e.target.value })}
            />
            <Input
              label="Teléfono"
              type="tel"
              required
              value={state.phone}
              onChange={(e) => updateState({ phone: e.target.value })}
            />
            
            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="consent"
                required
                checked={state.consent}
                onChange={(e) => updateState({ consent: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="consent" className="text-sm text-slate-600">
                Acepto ser contactado para recibir el informe. Tus datos se usan únicamente para enviarte el informe solicitado.
              </label>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} fullWidth style={{ backgroundColor: agency?.brand_color }}>
                {isSubmitting ? 'Enviando...' : 'Recibir mi informe'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </WizardShell>
  );
}

export default function WizardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <WizardContent />
    </Suspense>
  );
}

