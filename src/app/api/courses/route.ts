import { NextRequest, NextResponse } from 'next/server';
import { fetchCourses } from '@/lib/api/coursedog';
import { filterCourses } from '@/lib/api/mockData';
import { FilterParams } from '@/lib/api/types';

// Check if API credentials are configured
const hasApiCredentials = 
  process.env.COURSEDOG_API_KEY && 
  process.env.COURSEDOG_API_KEY !== 'your_api_key_here' &&
  process.env.COURSEDOG_INSTITUTION_ID &&
  process.env.COURSEDOG_INSTITUTION_ID !== 'your_institution_id';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build filter params from query string
    const filters: FilterParams = {};
    
    if (searchParams.has('status')) {
      filters.status = searchParams.get('status') as FilterParams['status'];
    }
    if (searchParams.has('room')) {
      filters.room = searchParams.get('room') || undefined;
    }
    if (searchParams.has('building')) {
      filters.building = searchParams.get('building') || undefined;
    }
    if (searchParams.has('instructor')) {
      filters.instructor = searchParams.get('instructor') || undefined;
    }
    if (searchParams.has('limit')) {
      filters.limit = parseInt(searchParams.get('limit') || '50', 10);
    }
    if (searchParams.has('offset')) {
      filters.offset = parseInt(searchParams.get('offset') || '0', 10);
    }
    if (searchParams.has('query')) {
      filters.query = searchParams.get('query') || undefined;
    }
    
    // Use mock data if no API credentials
    if (!hasApiCredentials) {
      const filteredCourses = filterCourses(filters);
      return NextResponse.json({
        data: filteredCourses,
        total: filteredCourses.length,
        page: 1,
        pageSize: filteredCourses.length,
      });
    }
    
    const data = await fetchCourses(filters);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    
    // Fallback to mock data on error
    const { searchParams } = new URL(request.url);
    const filters: FilterParams = {};
    if (searchParams.has('status')) filters.status = searchParams.get('status') as FilterParams['status'];
    if (searchParams.has('room')) filters.room = searchParams.get('room') || undefined;
    if (searchParams.has('building')) filters.building = searchParams.get('building') || undefined;
    if (searchParams.has('query')) filters.query = searchParams.get('query') || undefined;
    
    const filteredCourses = filterCourses(filters);
    return NextResponse.json({
      data: filteredCourses,
      total: filteredCourses.length,
      page: 1,
      pageSize: filteredCourses.length,
    });
  }
}
