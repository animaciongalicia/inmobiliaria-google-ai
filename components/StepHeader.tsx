import React from 'react';

interface StepHeaderProps {
  title: string;
  subtitle?: string;
}

export function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
