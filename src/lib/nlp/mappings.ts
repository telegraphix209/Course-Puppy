// NLP Keyword Mappings

export const STATUS_KEYWORDS: Record<string, string[]> = {
  pending: ['pending', 'awaiting', 'waiting', 'not approved', 'not yet approved', 'under review'],
  approved: ['approved', 'confirmed', 'accepted', 'booked', 'scheduled', 'active'],
  rejected: ['rejected', 'denied', 'declined', 'cancelled', 'canceled'],
  available: ['available', 'free', 'open', 'unoccupied', 'vacant'],
  occupied: ['occupied', 'busy', 'in use', 'taken', 'booked'],
  maintenance: ['maintenance', 'under repair', 'unavailable', 'closed', 'out of service'],
  cancelled: ['cancelled', 'canceled', 'called off', 'terminated'],
};

export const ENTITY_KEYWORDS: Record<string, string[]> = {
  rooms: ['room', 'rooms', 'space', 'spaces', 'location', 'locations', 'venue', 'venues', 'classroom', 'classrooms', 'lecture hall', 'lecture halls'],
  events: ['event', 'events', 'meeting', 'meetings', 'gathering', 'gatherings', 'appointment', 'appointments', 'reservation', 'reservations'],
  courses: ['course', 'courses', 'class', 'classes', 'lecture', 'lectures', 'section', 'sections', 'subject', 'subjects'],
};

export const BUILDING_KEYWORDS: string[] = [
  'student union',
  'library',
  'science building',
  'engineering hall',
  'arts center',
  'gymnasium',
  'administration',
  'main hall',
];

export const TIME_KEYWORDS: Record<string, string[]> = {
  today: ['today', 'this day'],
  tomorrow: ['tomorrow', 'next day'],
  thisWeek: ['this week', 'current week'],
  nextWeek: ['next week', 'following week'],
  thisMonth: ['this month', 'current month'],
};

// Common room/building name patterns for extraction
export const ROOM_PATTERNS = [
  /room\s+([A-Z]?\d+[A-Z]?)/i,
  /building\s+([A-Z]\d*)/i,
  /hall\s+([A-Z]\d*)/i,
  /(\d{3,4})/, // Room numbers like 101, 2050
];
