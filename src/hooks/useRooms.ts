'use client';

import { useQuery } from '@tanstack/react-query';
import { Room, FilterParams, ApiResponse } from '@/lib/api/types';

const fetchRooms = async (filters: FilterParams): Promise<ApiResponse<Room>> => {
  const searchParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const response = await fetch(`/api/rooms?${searchParams.toString()}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch rooms');
  }
  
  return response.json();
};

export function useRooms(filters: FilterParams = {}) {
  return useQuery<ApiResponse<Room>, Error>({
    queryKey: ['rooms', filters],
    queryFn: () => fetchRooms(filters),
  });
}
