import { WizardState } from './types';

export function calculateScore(data: WizardState): { score: number; category: 'A' | 'B' | 'C' } {
  let score = 0;

  // A) intent
  switch (data.intent) {
    case '0–6 meses':
      score += 3;
      break;
    case '6–12 meses':
      score += 2;
      break;
    case '12–24 meses':
      score += 1;
      break;
    case 'Más adelante':
      score += 0;
      break;
    case 'No lo sé':
      score += 1;
      break;
  }

  // B) satisfaction
  if (data.satisfaction !== null) {
    if (data.satisfaction === 1 || data.satisfaction === 2) {
      score += 2;
    } else if (data.satisfaction === 3) {
      score += 1;
    } else if (data.satisfaction === 4 || data.satisfaction === 5) {
      score += 0;
    }
  }

  // C) profile
  switch (data.profile) {
    case 'Es una herencia':
    case 'Está vacía':
      score += 2;
      break;
    case 'Estoy pensando en cambiar de casa':
    case 'La tengo alquilada':
      score += 1;
      break;
    case 'Vivo en la vivienda':
    case 'No lo había pensado hasta ahora':
      score += 0;
      break;
  }

  // D) purchaseRange
  switch (data.purchaseRange) {
    case '10–20 años':
    case 'Más de 20 años':
    case 'Herencia':
      score += 1;
      break;
    default:
      score += 0;
      break;
  }

  // E) analysisCommitment
  if (data.analysisCommitment === 'Sí, análisis personalizado') {
    score += 2;
  } else if (data.analysisCommitment === 'Solo por curiosidad') {
    score += 0;
  }

  // Ensure score is between 0 and 10
  score = Math.max(0, Math.min(10, score));

  let category: 'A' | 'B' | 'C' = 'C';
  if (score >= 7) {
    category = 'A';
  } else if (score >= 4) {
    category = 'B';
  } else {
    category = 'C';
  }

  return { score, category };
}
