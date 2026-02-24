import { WizardState } from './types';

export function validateWizardState(data: Partial<WizardState>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.profile) errors.push('Falta el perfil de situación.');
  if (!data.zone) errors.push('Falta la zona o barrio.');
  if (!data.propertyType) errors.push('Falta el tipo de vivienda.');
  if (!data.purchaseRange) errors.push('Falta la antigüedad de compra.');
  if (data.satisfaction === null || data.satisfaction === undefined) errors.push('Falta el nivel de encaje.');
  if (!data.intent) errors.push('Falta el horizonte de cambio.');
  if (!data.analysisCommitment) errors.push('Falta el compromiso de análisis.');
  if (!data.name) errors.push('Falta el nombre.');
  if (!data.email) errors.push('Falta el email.');
  if (!data.phone) errors.push('Falta el teléfono.');
  if (!data.consent) errors.push('Debe aceptar el consentimiento.');

  return {
    isValid: errors.length === 0,
    errors,
  };
}
