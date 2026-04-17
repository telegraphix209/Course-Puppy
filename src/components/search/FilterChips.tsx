'use client';

import { X } from 'lucide-react';
import { FilterParams } from '@/lib/api/types';

interface FilterChipsProps {
  filters: FilterParams;
  onClearFilter: (key: keyof FilterParams) => void;
  onClearAll: () => void;
}

const filterLabels: Record<string, string> = {
  status: 'Status',
  room: 'Room',
  building: 'Building',
  startDate: 'From',
  endDate: 'To',
  organizer: 'Organizer',
  instructor: 'Instructor',
  query: 'Search',
};

export function FilterChips({ filters, onClearFilter, onClearAll }: FilterChipsProps) {
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== undefined && value !== null && value !== ''
  );

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {activeFilters.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
        >
          <span className="font-medium">{filterLabels[key] || key}:</span>
          <span className="capitalize">{String(value)}</span>
          <button
            onClick={() => onClearFilter(key as keyof FilterParams)}
            className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
            aria-label={`Remove ${filterLabels[key] || key} filter`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
      
      <button
        onClick={onClearAll}
        className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
}
