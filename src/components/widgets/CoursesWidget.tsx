'use client';

import { useCourses } from '@/hooks/useCourses';
import { BaseWidget } from './BaseWidget';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Course, FilterParams } from '@/lib/api/types';
import { isMockMode } from '@/lib/utils/env';
import { BookOpen, MapPin, User, Users } from 'lucide-react';

interface CoursesWidgetProps {
  filters: FilterParams;
}

export function CoursesWidget({ filters }: CoursesWidgetProps) {
  const { data, isLoading, error, dataUpdatedAt, refetch } = useCourses(filters);
  const mockMode = isMockMode();

  const columns = [
    {
      key: 'code',
      header: 'Course',
      width: '20%',
      render: (course: Course) => (
        <div>
          <div className="font-medium text-gray-900">{course.code}</div>
          <div className="text-xs text-gray-500 mt-0.5">{course.credits} credits</div>
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Title',
      width: '25%',
      render: (course: Course) => (
        <div className="font-medium text-gray-900 line-clamp-1">{course.title}</div>
      ),
    },
    {
      key: 'instructor',
      header: 'Instructor',
      width: '15%',
      render: (course: Course) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <User className="w-3.5 h-3.5" />
          <span className="text-sm">{course.instructor}</span>
        </div>
      ),
    },
    {
      key: 'schedule',
      header: 'Schedule',
      width: '15%',
      render: (course: Course) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-sm">{course.schedule}</span>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      width: '15%',
      render: (course: Course) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-sm">{course.building || course.roomName || course.roomId}</span>
        </div>
      ),
    },
    {
      key: 'enrollment',
      header: 'Enrollment',
      width: '10%',
      render: (course: Course) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users className="w-3.5 h-3.5" />
          <span className="text-sm">{course.enrollment}/{course.capacity}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (course: Course) => <StatusBadge status={course.status} size="sm" />,
    },
  ];

  if (error) {
    return (
      <BaseWidget
        title="Courses"
        onRefresh={() => refetch()}
        isRefreshing={isLoading}
        lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : undefined}
        isMockData={mockMode}
      >
        <div className="flex items-center justify-center py-12 text-red-600">
          Error loading courses: {error.message}
        </div>
      </BaseWidget>
    );
  }

  return (
    <BaseWidget
      title="Courses"
      onRefresh={() => refetch()}
      isRefreshing={isLoading}
      lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : undefined}
      isMockData={mockMode}
    >
      <DataTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
        emptyMessage="No courses found matching your criteria"
        keyExtractor={(course) => course.id}
      />
    </BaseWidget>
  );
}
