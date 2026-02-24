import React from 'react';

interface QuestionCardProps {
  options: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export function QuestionCard({ options, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <div className="space-y-3 w-full max-w-md mx-auto">
      {options.map((option) => {
        const isSelected = selectedValue === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
              isSelected
                ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-base font-medium">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
