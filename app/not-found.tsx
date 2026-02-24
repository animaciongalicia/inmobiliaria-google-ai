import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Página no encontrada</h2>
      <p className="text-slate-600 mb-8">Lo sentimos, no hemos podido encontrar la página que buscas.</p>
      <Link href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
}
