'use client';

import { useQuery } from '@tanstack/react-query';
import { Event, FilterParams, ApiResponse } from '@/lib/api/types';

const fetchEvents = async (filters: FilterParams): Promise<ApiResponse<Event>> => {
  const searchParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const response = await fetch(`/api/events?${searchParams.toString()}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch events');
  }
  
  return response.json();
};

export function useEvents(filters: FilterParams = {}) {
  return useQuery<ApiResponse<Event>, Error>({
    queryKey: ['events', filters],
    queryFn: () => fetchEvents(filters),
  });
}
