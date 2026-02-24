import React from 'react';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';

interface WizardShellProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onReset?: () => void;
  brandColor?: string;
}

export function WizardShell({
  children,
  currentStep,
  totalSteps,
  onBack,
  onReset,
  brandColor = '#4f46e5',
}: WizardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && currentStep > 1 && currentStep <= totalSteps && (
              <button
                onClick={onBack}
                className="text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-100"
                aria-label="Volver atrás"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
            )}
            <span className="font-semibold text-slate-900">Radar Propietario</span>
          </div>
          {onReset && (
            <button
              onClick={onReset}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Empezar de nuevo
            </button>
          )}
        </div>
        {currentStep <= totalSteps && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} color={brandColor} />
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
