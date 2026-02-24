import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
        <select
          ref={ref}
          className={`block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border bg-white text-slate-900 ${
            error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        >
          <option value="" disabled>Selecciona una opción</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
