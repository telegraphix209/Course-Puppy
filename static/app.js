const { useState, useCallback, useEffect } = React;

function App() {
  const { filters, activeEntity, setActiveEntity, applyFilters, clearFilters, clearSpecificFilter, getActiveFilters } = useGlobalFilters();
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const handleSearch = (entity, newFilters, query) => {
    applyFilters(entity, newFilters, query);
  };

  const handleClearFilter = (key) => {
    clearSpecificFilter(activeEntity, key);
  };

  const handleClearAll = () => {
    clearFilters(activeEntity);
  };

  const activeFilters = getActiveFilters();

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeEntity={activeEntity} onEntityChange={setActiveEntity} />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
          <FilterChips filters={activeFilters} onClearFilter={handleClearFilter} onClearAll={handleClearAll} />
        </div>

        <div className="space-y-6">
          {activeEntity === 'rooms' && <RoomsWidget filters={filters.rooms} />}
          {activeEntity === 'events' && <EventsWidget filters={filters.events} />}
          {activeEntity === 'courses' && <CoursesWidget filters={filters.courses} />}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Active Filters</div>
            <div className="text-2xl font-bold text-gray-900">
              {Object.values(activeFilters).filter(v => v !== undefined && v !== '').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Current View</div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{activeEntity}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-1">Auto-Refresh</div>
            <div className="text-2xl font-bold text-green-600">5 min</div>
          </div>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
