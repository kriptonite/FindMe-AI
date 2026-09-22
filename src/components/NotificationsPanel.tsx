import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  CheckCheck, 
  Filter, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsPanelProps {
  notifications: NotificationItem[];
  onSelectCase: (caseId: string) => void;
  onMarkAllAsRead: () => void;
  onMarkAsRead: (notifId: string) => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  notifications,
  onSelectCase,
  onMarkAllAsRead,
  onMarkAsRead
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = notifications.filter((n) => {
    if (filterType === 'unread') return !n.read;
    if (filterType !== 'all') return n.type === filterType;
    return true;
  });

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'high_confidence':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'new_sighting':
        return <Bell className="w-4 h-4 text-blue-600" />;
      case 'ai_completed':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'authority_ack':
        return <Building2 className="w-4 h-4 text-amber-600" />;
      case 'status_changed':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getNotifBadge = (type: NotificationItem['type']) => {
    switch (type) {
      case 'high_confidence':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'new_sighting':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ai_completed':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'authority_ack':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'status_changed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div id="notifications-panel-container" className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            Operational Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time telemetry, AI classification alerts, and authority dispatch acknowledgments
          </p>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 self-start sm:self-auto flex items-center gap-1.5"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
            filterType === 'all' 
              ? 'bg-slate-900 text-white border-slate-900' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilterType('unread')}
          className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
            filterType === 'unread' 
              ? 'bg-slate-900 text-white border-slate-900' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </button>
        <button
          onClick={() => setFilterType('high_confidence')}
          className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
            filterType === 'high_confidence' 
              ? 'bg-slate-900 text-white border-slate-900' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          High-Confidence Matches
        </button>
        <button
          onClick={() => setFilterType('authority_ack')}
          className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
            filterType === 'authority_ack' 
              ? 'bg-slate-900 text-white border-slate-900' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Authority Acknowledged
        </button>
        <button
          onClick={() => setFilterType('resolved')}
          className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
            filterType === 'resolved' 
              ? 'bg-slate-900 text-white border-slate-900' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Case Resolved
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onMarkAsRead(n.id);
                onSelectCase(n.caseId);
              }}
              className={`p-5 hover:bg-slate-50/80 cursor-pointer transition-colors flex items-start gap-4 ${
                !n.read ? 'bg-blue-50/25' : ''
              }`}
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/80">
                {getNotifIcon(n.type)}
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${getNotifBadge(n.type)}`}>
                      {n.type.replace('_', ' ').toUpperCase()}
                    </span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400 shrink-0">
                    {n.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {n.message}
                </p>

                <div className="mt-2.5 flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Case: {n.caseId}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 hover:text-blue-600 font-semibold">
                    <span>Open Case</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
