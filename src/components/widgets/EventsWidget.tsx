'use client';

import { useEvents } from '@/hooks/useEvents';
import { BaseWidget } from './BaseWidget';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Event, FilterParams } from '@/lib/api/types';
import { isMockMode } from '@/lib/utils/env';
import { Calendar, MapPin, User } from 'lucide-react';

interface EventsWidgetProps {
  filters: FilterParams;
}

export function EventsWidget({ filters }: EventsWidgetProps) {
  const { data, isLoading, error, dataUpdatedAt, refetch } = useEvents(filters);
  const mockMode = isMockMode();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const columns = [
    {
      key: 'title',
      header: 'Event',
      width: '30%',
      render: (event: Event) => (
        <div>
          <div className="font-medium text-gray-900">{event.title}</div>
          {event.description && (
            <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
              {event.description}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date & Time',
      width: '25%',
      render: (event: Event) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-sm">{formatDate(event.startDate)}</span>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      width: '20%',
      render: (event: Event) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-sm">{event.roomName || event.roomId}</span>
        </div>
      ),
    },
    {
      key: 'organizer',
      header: 'Organizer',
      width: '15%',
      render: (event: Event) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <User className="w-3.5 h-3.5" />
          <span className="text-sm">{event.organizer}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      render: (event: Event) => <StatusBadge status={event.status} size="sm" />,
    },
  ];

  if (error) {
    return (
      <BaseWidget
        title="Events"
        onRefresh={() => refetch()}
        isRefreshing={isLoading}
        lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : undefined}
        isMockData={mockMode}
      >
        <div className="flex items-center justify-center py-12 text-red-600">
          Error loading events: {error.message}
        </div>
      </BaseWidget>
    );
  }

  return (
    <BaseWidget
      title="Events"
      onRefresh={() => refetch()}
      isRefreshing={isLoading}
      lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : undefined}
      isMockData={mockMode}
    >
      <DataTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
        emptyMessage="No events found matching your criteria"
        keyExtractor={(event) => event.id}
      />
    </BaseWidget>
  );
}
