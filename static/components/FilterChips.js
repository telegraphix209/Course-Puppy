const { useState } = React;

const filterLabels = {
  status: 'Status', room: 'Room', building: 'Building',
  startDate: 'From', endDate: 'To', organizer: 'Organizer',
  instructor: 'Instructor', query: 'Search',
};

function FilterChips({ filters, onClearFilter, onClearAll }) {
  const [copied, setCopied] = useState(false);

  const activeFilters = Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== '');

  if (activeFilters.length === 0) return null;

  const handleCopy = () => {
    const text = activeFilters.map(([key, value]) => `${filterLabels[key] || key}: ${value}`).join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      <div className="flex items-center gap-1.5 text-sm text-gray-600 mr-2">
        <SlidersHorizontalIcon size={16} />
        <span className="font-medium">{activeFilters.length} Active Filter{activeFilters.length > 1 ? 's' : ''}:</span>
      </div>

      {activeFilters.map(([key, value]) => (
        <span key={key} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 hover:bg-blue-100 transition-colors">
          <span className="font-medium">{filterLabels[key] || key}:</span>
          <span className="capitalize">{String(value)}</span>
          <button onClick={() => onClearFilter(key)} className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors">
            <XIcon size={14} />
          </button>
        </span>
      ))}

      <div className="flex items-center gap-2 ml-2">
        <button onClick={handleCopy} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          {copied ? <><CheckIcon size={14} className="text-green-600" /><span className="text-green-600">Copied!</span></> : <><CopyIcon size={14} /><span>Copy</span></>}
        </button>
        <span className="text-gray-300">|</span>
        <button onClick={onClearAll} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear all</button>
      </div>
    </div>
  );
}
