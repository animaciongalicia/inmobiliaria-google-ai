import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
        <input
          ref={ref}
          className={`block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 border bg-white text-slate-900 ${
            error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
