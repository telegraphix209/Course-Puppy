const { useState, useCallback } = React;

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState(null);

  const updatePreview = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setPreview(null);
      return;
    }
    const result = parseNaturalLanguageQuery(searchQuery.trim());
    const filterCount = Object.values(result.filters).filter(v => v !== undefined && v !== null && v !== '').length;
    setPreview({ filters: result.filters, entity: result.entity, filterCount });
  }, []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim()) {
      setTimeout(() => updatePreview(newQuery), 300);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const result = parseNaturalLanguageQuery(query.trim());
    const entity = result.entity === 'unknown' ? 'rooms' : result.entity;
    onSearch(entity, result.filters, query.trim());
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder='Search rooms, events, or courses... (e.g., "Show me available rooms in the Student Union")'
            className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
            {preview && preview.filterCount > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                <SparklesIcon size={12} />
                {preview.filterCount} filter{preview.filterCount > 1 ? 's' : ''} detected
              </span>
            )}
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded">Enter</kbd>
          </div>
        </div>
      </form>

      {preview && preview.filterCount > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500">Detected:</span>
          {Object.entries(preview.filters).map(([key, value]) => {
            if (value === undefined || value === null || value === '') return null;
            return (
              <span key={key} className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded border border-blue-100">
                {key}: {String(value)}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
