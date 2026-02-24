import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  color?: string;
}

export function ProgressBar({ currentStep, totalSteps, color = '#4f46e5' }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
}
