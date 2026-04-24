const navItems = [
  { id: 'rooms', label: 'Rooms', icon: Building2Icon },
  { id: 'events', label: 'Events', icon: CalendarIcon },
  { id: 'courses', label: 'Courses', icon: BookOpenIcon },
];

function Header({ activeEntity, onEntityChange }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2Icon size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Coursedog</h1>
              <p className="text-xs text-gray-500">Command Center</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeEntity === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onEntityChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
