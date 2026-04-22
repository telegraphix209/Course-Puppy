'use client';

import { useState } from 'react';
import { X, Copy, Check, SlidersHorizontal } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== undefined && value !== null && value !== ''
  );

  if (activeFilters.length === 0) {
    return null;
  }

  const handleCopyFilters = () => {
    const filterText = activeFilters
      .map(([key, value]) => `${filterLabels[key] || key}: ${value}`)
      .join(', ');
    navigator.clipboard.writeText(filterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      <div className="flex items-center gap-1.5 text-sm text-gray-600 mr-2">
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-medium">{activeFilters.length} Active Filter{activeFilters.length > 1 ? 's' : ''}:</span>
      </div>
      
      {activeFilters.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
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
      
      <div className="flex items-center gap-2 ml-2">
        <button
          onClick={handleCopyFilters}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          title="Copy filters to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
        
        <span className="text-gray-300">|</span>
        
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
