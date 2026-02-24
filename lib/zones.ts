import { ZoneInfo } from './types';

export const zones: Record<string, ZoneInfo> = {
  'Monte Alto': {
    tendencia: 'Alta demanda de alquiler y compra por su cercanía al centro y playas.',
    oportunidad: 'Viviendas reformadas o con vistas al mar tienen un valor superior.',
    alerta: 'Dificultad de aparcamiento puede ser un freno para algunos compradores.',
  },
  'Los Rosales': {
    tendencia: 'Zona residencial consolidada, muy atractiva para familias.',
    oportunidad: 'Pisos amplios con plaza de garaje son muy buscados.',
    alerta: 'La oferta de obra nueva en zonas cercanas puede competir con la segunda mano.',
  },
  'Matogrande': {
    tendencia: 'Barrio premium con alta demanda de perfil ejecutivo y familiar.',
    oportunidad: 'Servicios de alta calidad y buenas conexiones mantienen los precios estables.',
    alerta: 'Poca oferta disponible, lo que puede alargar los tiempos si el precio no es realista.',
  },
  'Elviña': {
    tendencia: 'Zona universitaria y residencial con demanda constante de alquiler.',
    oportunidad: 'Ideal para inversores que buscan rentabilidad a través del alquiler a estudiantes.',
    alerta: 'El estado de conservación del edificio es clave para mantener el valor.',
  },
  'Centro': {
    tendencia: 'El corazón de la ciudad siempre mantiene un valor refugio.',
    oportunidad: 'Inmuebles singulares o en calles peatonales tienen un público muy específico y dispuesto a invertir.',
    alerta: 'Edificios antiguos sin ascensor o sin reformar requieren ajustes de precio.',
  },
  'Cuatro Caminos': {
    tendencia: 'Zona comercial y de paso con excelente conectividad.',
    oportunidad: 'Pisos bien comunicados son ideales tanto para vivir como para invertir.',
    alerta: 'El ruido en calles principales puede ser un inconveniente.',
  },
  'Riazor': {
    tendencia: 'Ubicación privilegiada frente al mar, siempre en el radar de compradores premium.',
    oportunidad: 'Las vistas al mar y la cercanía a la playa garantizan una alta liquidez.',
    alerta: 'Los gastos de comunidad en edificios en primera línea suelen ser elevados.',
  },
  'Labañou': {
    tendencia: 'Barrio en transformación con potencial de revalorización.',
    oportunidad: 'Precios más accesibles que atraen a primeros compradores.',
    alerta: 'La percepción de la zona varía según la calle específica.',
  },
  'Agra do Orzán': {
    tendencia: 'Zona de alta densidad con mucha rotación de inmuebles.',
    oportunidad: 'Alta rentabilidad para inversores enfocados en alquiler tradicional.',
    alerta: 'Mucha competencia de inmuebles similares en venta.',
  },
  'Mesoiro': {
    tendencia: 'Zona joven y en expansión, ideal para familias que buscan tranquilidad.',
    oportunidad: 'Viviendas modernas con zonas comunes son muy valoradas.',
    alerta: 'La dependencia del coche para desplazamientos al centro puede ser un factor en contra.',
  },
  'Eirís': {
    tendencia: 'Área residencial tranquila con buenas vistas y zonas verdes.',
    oportunidad: 'Chalets y pisos amplios atraen a familias que buscan espacio.',
    alerta: 'Menor densidad de servicios comerciales a pie de calle.',
  },
  'Orillamar': {
    tendencia: 'Zona con encanto, cercana al centro y a Monte Alto.',
    oportunidad: 'Atractivo para perfiles jóvenes y bohemios.',
    alerta: 'Algunas calles requieren rehabilitación urbana.',
  },
};

export const defaultZoneInfo: ZoneInfo = {
  tendencia: 'El mercado inmobiliario en A Coruña mantiene una demanda estable.',
  oportunidad: 'Las viviendas bien conservadas y con buen precio de salida se venden rápido.',
  alerta: 'Es importante ajustar el precio a la realidad del mercado actual para evitar que la vivienda se "queme".',
};
