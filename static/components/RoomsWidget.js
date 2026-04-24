const { useState, useEffect } = React;

function RoomsWidget({ filters }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(filterRooms(filters));
      setLastUpdated(new Date());
      setLoading(false);
    }, 300);
  }, [filters]);

  const columns = [
    { key: 'name', header: 'Room', width: '25%', render: (room) => (
      <div>
        <div className="font-medium text-gray-900">{room.name}</div>
        {room.features && room.features.length > 0 && (
          <div className="text-xs text-gray-500 mt-0.5">{room.features.slice(0, 3).join(', ')}{room.features.length > 3 && '...'}</div>
        )}
      </div>
    )},
    { key: 'building', header: 'Building', width: '20%', render: (room) => (
      <div className="flex items-center gap-1.5 text-gray-600"><MapPinIcon size={14} /><span>{room.building}</span></div>
    )},
    { key: 'capacity', header: 'Capacity', width: '15%', render: (room) => (
      <div className="flex items-center gap-1.5 text-gray-600"><UsersIcon size={14} /><span>{room.capacity}</span></div>
    )},
    { key: 'status', header: 'Status', width: '15%', render: (room) => <StatusBadge status={room.status} size="sm" /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Rooms</h2>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
            <DatabaseIcon size={12} /> Demo Data
          </span>
        </div>
      </div>
      <DataTable columns={columns} data={data} loading={loading} emptyMessage="No rooms found" keyExtractor={(r) => r.id} />
      {lastUpdated && (
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
