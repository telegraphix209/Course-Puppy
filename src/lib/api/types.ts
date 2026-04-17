// Coursedog API Types

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  features: string[];
  status: 'available' | 'occupied' | 'maintenance';
  schedule?: RoomSchedule[];
}

export interface RoomSchedule {
  startTime: string;
  endTime: string;
  eventName?: string;
  status: 'booked' | 'available';
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  roomId: string;
  roomName?: string;
  organizer: string;
  status: 'pending' | 'approved' | 'rejected';
  attendees?: number;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  schedule: string;
  roomId: string;
  roomName?: string;
  building?: string;
  credits: number;
  enrollment: number;
  capacity: number;
  status: 'active' | 'cancelled' | 'pending';
}

// Filter Parameters
export interface FilterParams {
  status?: 'pending' | 'approved' | 'rejected' | 'active' | 'cancelled' | 'available' | 'occupied' | 'maintenance';
  room?: string;
  building?: string;
  startDate?: string;
  endDate?: string;
  organizer?: string;
  instructor?: string;
  limit?: number;
  offset?: number;
  query?: string;
}

// Global Filter State
export interface GlobalFilters {
  events: FilterParams;
  courses: FilterParams;
  rooms: FilterParams;
  searchQuery: string;
  activeEntity: 'rooms' | 'events' | 'courses';
}

// NLP Types
export type EntityType = 'rooms' | 'events' | 'courses' | 'unknown';

export interface NLPParseRequest {
  query: string;
  context?: EntityType;
}

export interface NLPParseResponse {
  filters: FilterParams;
  entity: EntityType;
  confidence: number;
}

// API Response Wrappers
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
