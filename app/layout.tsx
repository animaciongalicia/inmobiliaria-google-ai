import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Radar Propietario - A Coruña',
  description: 'Descubre si tu vivienda está en su mejor momento de mercado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
