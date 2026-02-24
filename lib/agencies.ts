import { AgencyConfig } from './types';

export const DEFAULT_AGENCY: AgencyConfig = {
  agency_id: 'default',
  agency_name: 'Agencia Inmobiliaria',
  brand_color: '#4f46e5', // indigo-600
};

export const agencies: Record<string, AgencyConfig> = {
  coruna01: {
    agency_id: 'coruna01',
    agency_name: 'Inmobiliaria A Coruña Premium',
    brand_color: '#0284c7', // sky-600
  },
};

export function getAgencyConfig(id: string | null): AgencyConfig {
  if (!id) return DEFAULT_AGENCY;
  return agencies[id] || DEFAULT_AGENCY;
}
