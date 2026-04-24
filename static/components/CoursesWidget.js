const { useState, useEffect } = React;

function CoursesWidget({ filters }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(filterCourses(filters));
      setLastUpdated(new Date());
      setLoading(false);
    }, 300);
  }, [filters]);

  const columns = [
    { key: 'code', header: 'Course', width: '20%', render: (course) => (
      <div>
        <div className="font-medium text-gray-900">{course.code}</div>
        <div className="text-xs text-gray-500 mt-0.5">{course.credits} credits</div>
      </div>
    )},
    { key: 'title', header: 'Title', width: '25%', render: (course) => (
      <div className="font-medium text-gray-900 line-clamp-1">{course.title}</div>
    )},
    { key: 'instructor', header: 'Instructor', width: '15%', render: (course) => (
      <div className="flex items-center gap-1.5 text-gray-600"><UserIcon size={14} /><span className="text-sm">{course.instructor}</span></div>
    )},
    { key: 'schedule', header: 'Schedule', width: '15%', render: (course) => (
      <div className="flex items-center gap-1.5 text-gray-600"><CalendarIcon size={14} /><span className="text-sm">{course.schedule}</span></div>
    )},
    { key: 'location', header: 'Location', width: '15%', render: (course) => (
      <div className="flex items-center gap-1.5 text-gray-600"><MapPinIcon size={14} /><span className="text-sm">{course.building || course.roomName || course.roomId}</span></div>
    )},
    { key: 'enrollment', header: 'Enrollment', width: '10%', render: (course) => (
      <div className="flex items-center gap-1.5 text-gray-600"><UsersIcon size={14} /><span className="text-sm">{course.enrollment}/{course.capacity}</span></div>
    )},
    { key: 'status', header: 'Status', width: '10%', render: (course) => <StatusBadge status={course.status} size="sm" /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Courses</h2>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
            <DatabaseIcon size={12} /> Demo Data
          </span>
        </div>
      </div>
      <DataTable columns={columns} data={data} loading={loading} emptyMessage="No courses found" keyExtractor={(c) => c.id} />
      {lastUpdated && (
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
