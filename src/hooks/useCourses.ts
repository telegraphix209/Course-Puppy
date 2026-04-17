'use client';

import { useQuery } from '@tanstack/react-query';
import { Course, FilterParams, ApiResponse } from '@/lib/api/types';

const fetchCourses = async (filters: FilterParams): Promise<ApiResponse<Course>> => {
  const searchParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const response = await fetch(`/api/courses?${searchParams.toString()}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch courses');
  }
  
  return response.json();
};

export function useCourses(filters: FilterParams = {}) {
  return useQuery<ApiResponse<Course>, Error>({
    queryKey: ['courses', filters],
    queryFn: () => fetchCourses(filters),
  });
}
