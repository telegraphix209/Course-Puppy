const { useState, useEffect } = React;

function EventsWidget({ filters }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(filterEvents(filters));
      setLastUpdated(new Date());
      setLoading(false);
    }, 300);
  }, [filters]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const columns = [
    { key: 'title', header: 'Event', width: '30%', render: (event) => (
      <div>
        <div className="font-medium text-gray-900">{event.title}</div>
        {event.description && <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{event.description}</div>}
      </div>
    )},
    { key: 'date', header: 'Date & Time', width: '25%', render: (event) => (
      <div className="flex items-center gap-1.5 text-gray-600"><CalendarIcon size={14} /><span className="text-sm">{formatDate(event.startDate)}</span></div>
    )},
    { key: 'location', header: 'Location', width: '20%', render: (event) => (
      <div className="flex items-center gap-1.5 text-gray-600"><MapPinIcon size={14} /><span className="text-sm">{event.roomName || event.roomId}</span></div>
    )},
    { key: 'organizer', header: 'Organizer', width: '15%', render: (event) => (
      <div className="flex items-center gap-1.5 text-gray-600"><UserIcon size={14} /><span className="text-sm">{event.organizer}</span></div>
    )},
    { key: 'status', header: 'Status', width: '10%', render: (event) => <StatusBadge status={event.status} size="sm" /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Events</h2>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
            <DatabaseIcon size={12} /> Demo Data
          </span>
        </div>
      </div>
      <DataTable columns={columns} data={data} loading={loading} emptyMessage="No events found" keyExtractor={(e) => e.id} />
      {lastUpdated && (
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
