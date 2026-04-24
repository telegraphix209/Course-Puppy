function DataTable({ columns, data, loading = false, emptyMessage = 'No data available', keyExtractor }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-4 py-3 font-semibold" style={{ width: column.width }}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="bg-white border-b hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
