const { useState, useCallback } = React;

const initialFilters = {
  events: {},
  courses: {},
  rooms: {},
  searchQuery: '',
  activeEntity: 'rooms',
};

function useGlobalFilters() {
  const [filters, setFilters] = useState(initialFilters);

  const setActiveEntity = useCallback((entity) => {
    setFilters((prev) => ({ ...prev, activeEntity: entity }));
  }, []);

  const applyFilters = useCallback((entity, newFilters, searchQuery = '') => {
    if (entity === 'unknown') return;
    setFilters((prev) => ({
      ...prev,
      [entity]: newFilters,
      searchQuery,
      activeEntity: entity,
    }));
  }, []);

  const clearFilters = useCallback((entity) => {
    if (entity && entity !== 'unknown') {
      setFilters((prev) => ({ ...prev, [entity]: {}, searchQuery: '' }));
    } else {
      setFilters(initialFilters);
    }
  }, []);

  const clearSpecificFilter = useCallback((entity, filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [entity]: { ...prev[entity], [filterKey]: undefined },
    }));
  }, []);

  const getActiveFilters = useCallback(() => {
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
