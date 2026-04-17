'use client';

import { ReactNode } from 'react';
import { RefreshCw, Database } from 'lucide-react';

interface BaseWidgetProps {
  title: string;
  children: ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date;
  action?: ReactNode;
  isMockData?: boolean;
}

export function BaseWidget({
  title,
  children,
  onRefresh,
  isRefreshing = false,
  lastUpdated,
  action,
  isMockData = false,
}: BaseWidgetProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {isMockData && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
              <Database className="w-3 h-3" />
              Demo Data
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {action}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Refresh data"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-0">
        {children}
      </div>

      {/* Footer with last updated */}
      {lastUpdated && (
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
