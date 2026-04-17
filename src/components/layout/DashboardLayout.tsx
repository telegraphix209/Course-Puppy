'use client';

import { ReactNode } from 'react';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
  activeEntity: 'rooms' | 'events' | 'courses';
  onEntityChange: (entity: 'rooms' | 'events' | 'courses') => void;
}

export function DashboardLayout({
  children,
  activeEntity,
  onEntityChange,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeEntity={activeEntity} onEntityChange={onEntityChange} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
