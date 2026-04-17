'use client';

import { useState, FormEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { EntityType, FilterParams } from '@/lib/api/types';

interface GlobalSearchBarProps {
  onSearch: (entity: EntityType, filters: FilterParams, query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function GlobalSearchBar({
  onSearch,
  isLoading = false,
  placeholder = 'Search rooms, events, or courses... (e.g., "Show me available rooms in the Student Union")',
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || isLoading || isParsing) return;

    setIsParsing(true);
    
    try {
      const response = await fetch('/api/nlp/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse query');
      }

      const result = await response.json();
      
      // Default to rooms if entity is unknown
      const entity = result.entity === 'unknown' ? 'rooms' : result.entity;
      
      onSearch(entity, result.filters, query.trim());
    } catch (error) {
      console.error('Error parsing search query:', error);
      // Fallback: treat as general search query
      onSearch('rooms', { query: query.trim() }, query.trim());
    } finally {
      setIsParsing(false);
    }
  };

  const showLoading = isLoading || isParsing;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {showLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={showLoading}
          className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded">
            Enter
          </kbd>
        </div>
      </div>
    </form>
  );
}
