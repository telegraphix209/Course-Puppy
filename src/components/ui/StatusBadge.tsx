'use client';

import { FilterParams } from '@/lib/api/types';

type StatusType = FilterParams['status'];

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Pending',
  },
  approved: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Approved',
  },
  rejected: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Rejected',
  },
  active: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Active',
  },
  cancelled: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: 'Cancelled',
  },
  available: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Available',
  },
  occupied: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Occupied',
  },
  maintenance: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'Maintenance',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  if (!status) return null;
  
  const config = statusConfig[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${config.bg} ${config.text} ${sizeClasses[size]}`}
    >
      {config.label}
    </span>
  );
}
