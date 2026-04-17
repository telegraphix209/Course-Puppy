'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar';
import { FilterChips } from '@/components/search/FilterChips';
import { RoomsWidget } from '@/components/widgets/RoomsWidget';
import { EventsWidget } from '@/components/widgets/EventsWidget';
import { CoursesWidget } from '@/components/widgets/CoursesWidget';
import { useGlobalFilters } from '@/hooks/useGlobalFilters';
import { EntityType, FilterParams } from '@/lib/api/types';

export default function DashboardPage() {
  const {
    filters,
    activeEntity,
    searchQuery,
    setActiveEntity,
    applyFilters,
    clearFilters,
    clearSpecificFilter,
    getActiveFilters,
  } = useGlobalFilters();

  const handleSearch = (entity: EntityType, newFilters: FilterParams, query: string) => {
    applyFilters(entity, newFilters, query);
  };

  const handleClearFilter = (key: keyof FilterParams) => {
    clearSpecificFilter(activeEntity, key);
  };

  const handleClearAll = () => {
    clearFilters(activeEntity);
  };

  const activeFilters = getActiveFilters();

  return (
    <DashboardLayout
      activeEntity={activeEntity}
      onEntityChange={setActiveEntity}
    >
      {/* Search Section */}
      <div className="mb-6">
        <GlobalSearchBar
          onSearch={handleSearch}
          placeholder="Search rooms, events, or courses... (e.g., &quot;Show me available rooms in the Student Union&quot;)"
        />
        <FilterChips
          filters={activeFilters}
          onClearFilter={handleClearFilter}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Main Widget */}
      <div className="space-y-6">
        {activeEntity === 'rooms' && (
          <RoomsWidget
            filters={filters.rooms}
            isPrimary={true}
          />
        )}

        {activeEntity === 'events' && (
          <EventsWidget
            filters={filters.events}
          />
        )}

        {activeEntity === 'courses' && (
          <CoursesWidget
            filters={filters.courses}
          />
        )}
      </div>

      {/* Quick Stats or Summary - Optional enhancement */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Active Filters</div>
          <div className="text-2xl font-bold text-gray-900">
            {Object.values(activeFilters).filter(v => v !== undefined && v !== '').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Current View</div>
          <div className="text-2xl font-bold text-gray-900 capitalize">
            {activeEntity}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Auto-Refresh</div>
          <div className="text-2xl font-bold text-green-600">5 min</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
