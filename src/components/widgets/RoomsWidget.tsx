'use client';

import { useRooms } from '@/hooks/useRooms';
import { BaseWidget } from './BaseWidget';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Room, FilterParams } from '@/lib/api/types';
import { isMockMode } from '@/lib/utils/env';
import { Users, MapPin } from 'lucide-react';

interface RoomsWidgetProps {
  filters: FilterParams;
  isPrimary?: boolean;
}

export function RoomsWidget({ filters, isPrimary = false }: RoomsWidgetProps) {
  const { data, isLoading, error, dataUpdatedAt, refetch } = useRooms(filters);
  const mockMode = isMockMode();

  const columns = [
    {
      key: 'name',
      header: 'Room',
      width: '25%',
      render: (room: Room) => (
        <div>
          <div className="font-medium text-gray-900">{room.name}</div>
          {room.features && room.features.length > 0 && (
            <div className="text-xs text-gray-500 mt-0.5">
              {room.features.slice(0, 3).join(', ')}
              {room.features.length > 3 && '...'}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'building',
      header: 'Building',
      width: '20%',
      render: (room: Room) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="w-3.5 h-3.5" />
          <span>{room.building}</span>
        </div>
      ),
    },
    {
      key: 'capacity',
      header: 'Capacity',
      width: '15%',
      render: (room: Room) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users className="w-3.5 h-3.5" />
          <span>{room.capacity}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '15%',
      render: (room: Room) => <StatusBadge status={room.status} size="sm" />,
    },
  ];

  if (error) {
    return (
      <BaseWidget
        title="Rooms"
        onRefresh={() => refetch()}
        isRefreshing={isLoading}
        lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : undefined}
        isMockData={mockMode}
      >
        <div className="flex items-center justify-center py-12 text-red-600">
          Error loading rooms: {error.message}
        </div>
      </BaseWidget>
    );
  }

  return (
    <BaseWidget
      title="Rooms"
      onRefresh={() => refetch()}
      isRefreshing={isLoading}
      lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : undefined}
      isMockData={mockMode}
    >
      <DataTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
        emptyMessage="No rooms found matching your criteria"
        keyExtractor={(room) => room.id}
      />
    </BaseWidget>
  );
}
