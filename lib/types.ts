export type WizardState = {
  profile: string;
  zone: string;
  propertyType: string;
  purchaseRange: string;
  satisfaction: number | null;
  intent: string;
  analysisCommitment: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

export type AgencyConfig = {
  agency_id: string;
  agency_name: string;
  brand_color: string;
};

export type ZoneInfo = {
  tendencia: string;
  oportunidad: string;
  alerta: string;
};
