// Simple SVG icons as React components

function Icon({ size, className, children }) {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size || 24,
    height: size || 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: className || ''
  }, children);
}

const SearchIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('circle', { cx: '11', cy: '11', r: '8' }),
  React.createElement('path', { d: 'm21 21-4.3-4.3' })
);

const Loader2Icon = ({ size, className }) => React.createElement(Icon, { size, className: (className || '') + ' animate-spin' },
  React.createElement('path', { d: 'M21 12a9 9 0 1 1-6.219-8.56' })
);

const Building2Icon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'M10 12h4' }),
  React.createElement('path', { d: 'M10 8h4' }),
  React.createElement('path', { d: 'M6 20V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16' }),
  React.createElement('path', { d: 'M2 20h20' })
);

const CalendarIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
  React.createElement('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
  React.createElement('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
  React.createElement('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
);

const BookOpenIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }),
  React.createElement('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })
);

const RefreshCwIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }),
  React.createElement('path', { d: 'M21 3v5h-5' }),
  React.createElement('path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }),
  React.createElement('path', { d: 'M8 16H3v5' })
);

const UsersIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  React.createElement('circle', { cx: '9', cy: '7', r: '4' }),
  React.createElement('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
  React.createElement('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
);

const MapPinIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }),
  React.createElement('circle', { cx: '12', cy: '10', r: '3' })
);

const UserIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }),
  React.createElement('circle', { cx: '12', cy: '7', r: '4' })
);

const XIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'M18 6 6 18' }),
  React.createElement('path', { d: 'm6 6 12 12' })
);

const SparklesIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' }),
  React.createElement('path', { d: 'M5 3v4' }),
  React.createElement('path', { d: 'M19 17v4' }),
  React.createElement('path', { d: 'M3 5h4' }),
  React.createElement('path', { d: 'M17 19h4' })
);

const CopyIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
  React.createElement('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })
);

const CheckIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('polyline', { points: '20 6 9 17 4 12' })
);

const SlidersHorizontalIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('line', { x1: '21', y1: '4', x2: '14', y2: '4' }),
  React.createElement('line', { x1: '10', y1: '4', x2: '3', y2: '4' }),
  React.createElement('line', { x1: '21', y1: '12', x2: '12', y2: '12' }),
  React.createElement('line', { x1: '8', y1: '12', x2: '3', y2: '12' }),
  React.createElement('line', { x1: '21', y1: '20', x2: '16', y2: '20' }),
  React.createElement('line', { x1: '12', y1: '20', x2: '3', y2: '20' }),
  React.createElement('line', { x1: '14', y1: '2', x2: '14', y2: '6' }),
  React.createElement('line', { x1: '8', y1: '10', x2: '8', y2: '14' }),
  React.createElement('line', { x1: '16', y1: '18', x2: '16', y2: '22' })
);

const DatabaseIcon = ({ size, className }) => React.createElement(Icon, { size, className },
  React.createElement('ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }),
  React.createElement('path', { d: 'M3 5V19A9 3 0 0 0 21 19V5' }),
  React.createElement('path', { d: 'M3 12A9 3 0 0 0 21 12' })
);
