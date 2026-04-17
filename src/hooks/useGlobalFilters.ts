'use client';

import { useState, useCallback } from 'react';
import { GlobalFilters, FilterParams, EntityType } from '@/lib/api/types';

const initialFilters: GlobalFilters = {
  events: {},
  courses: {},
  rooms: {},
  searchQuery: '',
  activeEntity: 'rooms',
};

export function useGlobalFilters() {
  const [filters, setFilters] = useState<GlobalFilters>(initialFilters);

  const setActiveEntity = useCallback((entity: 'rooms' | 'events' | 'courses') => {
    setFilters((prev) => ({
      ...prev,
      activeEntity: entity,
    }));
  }, []);

  const applyFilters = useCallback((
    entity: EntityType,
    newFilters: FilterParams,
    searchQuery: string = ''
  ) => {
    if (entity === 'unknown') return;
    
    setFilters((prev) => ({
      ...prev,
      [entity]: newFilters,
      searchQuery,
      activeEntity: entity as 'rooms' | 'events' | 'courses',
    }));
  }, []);

  const clearFilters = useCallback((entity?: EntityType) => {
    if (entity && entity !== 'unknown') {
      setFilters((prev) => ({
        ...prev,
        [entity]: {},
        searchQuery: '',
      }));
    } else {
      setFilters(initialFilters);
    }
  }, []);

  const clearSpecificFilter = useCallback((
    entity: 'rooms' | 'events' | 'courses',
    filterKey: keyof FilterParams
  ) => {
    setFilters((prev) => ({
      ...prev,
      [entity]: {
        ...prev[entity],
        [filterKey]: undefined,
      },
    }));
  }, []);

  const getActiveFilters = useCallback((): FilterParams => {
    return filters[filters.activeEntity];
  }, [filters]);

  return {
    filters,
    activeEntity: filters.activeEntity,
    searchQuery: filters.searchQuery,
    setActiveEntity,
    applyFilters,
    clearFilters,
    clearSpecificFilter,
    getActiveFilters,
  };
}
