import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          ¿Tu vivienda está en su mejor momento de mercado?
        </h1>
        <p className="text-lg text-slate-600">
          Responde 8 preguntas y recibe un informe orientativo de tu zona en A Coruña.
        </p>
        <div className="pt-4">
          <Link
            href="/wizard"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors w-full sm:w-auto shadow-sm"
          >
            Empezar
          </Link>
        </div>
      </div>
    </main>
  );
}
