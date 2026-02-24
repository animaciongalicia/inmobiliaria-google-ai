# Radar Propietario - A Coruña

Un wizard de 9 pasos para captación de leads inmobiliarios (propietarios), construido con Next.js 14+ (App Router), TypeScript y Tailwind CSS.

## Requisitos Previos
- Node.js 18+
- npm o yarn

## Configuración de Entorno
1. Copia el archivo `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Configura las URLs de tus webhooks de Make (Integromat) en el archivo `.env.local`.

## Ejecución Local
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Vercel
Este proyecto está optimizado para desplegarse en Vercel sin errores de runtime.
1. Conecta tu repositorio de GitHub a Vercel.
2. En la configuración del proyecto en Vercel, añade las variables de entorno:
   - `MAKE_WEBHOOK_DEFAULT`
   - `MAKE_WEBHOOK_CORUNA01` (opcional, para la agencia de prueba)
3. Despliega.

## Probar la API localmente con cURL
Puedes simular el envío final del wizard ejecutando:

```bash
curl -X POST http://localhost:3000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "profile": "Es una herencia",
    "zone": "Monte Alto",
    "propertyType": "Piso",
    "purchaseRange": "Más de 20 años",
    "satisfaction": 2,
    "intent": "0–6 meses",
    "analysisCommitment": "Sí, análisis personalizado",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "600123456",
    "consent": true,
    "agency_id": "coruna01",
    "agency_name": "Inmobiliaria A Coruña Premium"
  }'
```
