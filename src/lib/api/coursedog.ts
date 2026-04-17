// Coursedog API Client

import { ApiResponse, Room, Event, Course, FilterParams } from './types';

const COURSEDOG_BASE_URL = 'https://api.coursedog.com';

function getApiKey(): string {
  const apiKey = process.env.COURSEDOG_API_KEY;
  if (!apiKey) {
    throw new Error('COURSEDOG_API_KEY is not configured');
  }
  return apiKey;
}

function getInstitutionId(): string {
  const institutionId = process.env.COURSEDOG_INSTITUTION_ID;
  if (!institutionId) {
    throw new Error('COURSEDOG_INSTITUTION_ID is not configured');
  }
  return institutionId;
}

function buildQueryString(params: FilterParams): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

async function fetchFromCoursedog<T>(
  endpoint: string,
  params: FilterParams = {}
): Promise<ApiResponse<T>> {
  const apiKey = getApiKey();
  const institutionId = getInstitutionId();
  
  const url = `${COURSEDOG_BASE_URL}/api/v1/${institutionId}/${endpoint}${buildQueryString(params)}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Coursedog API error: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

// Export functions for each resource
export async function fetchRooms(params: FilterParams = {}): Promise<ApiResponse<Room>> {
  return fetchFromCoursedog<Room>('rooms', params);
}

export async function fetchEvents(params: FilterParams = {}): Promise<ApiResponse<Event>> {
  return fetchFromCoursedog<Event>('events', params);
}

export async function fetchCourses(params: FilterParams = {}): Promise<ApiResponse<Course>> {
  return fetchFromCoursedog<Course>('courses', params);
}
