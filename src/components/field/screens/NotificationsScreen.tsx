import React, { useState } from 'react';
import { 
  Bell, 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Radio, 
  Users, 
  ArrowRight, 
  Sparkles,
  Check,
  Trash2
} from 'lucide-react';
import { FieldNotification, FieldNotificationType } from '../types';

interface NotificationsScreenProps {
  notifications: FieldNotification[];
  onBack: () => void;
  onSelectNotificationCase: (caseId: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications: initialNotifications,
  onBack,
  onSelectNotificationCase,
  onMarkAllRead
}) => {
  const [notifications, setNotifications] = useState<FieldNotification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'priority'>('all');

  const filteredNotifs = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'priority') return n.priority === 'High';
    return true;
  });

  const getNotificationIcon = (type: FieldNotificationType) => {
    switch (type) {
      case 'new_case_assigned':
        return <Bell className="w-4 h-4 text-blue-600" />;
      case 'priority_case_updated':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'reviewer_approval':
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'dispatch_instructions':
        return <Radio className="w-4 h-4 text-indigo-600" />;
      case 'additional_support_requested':
        return <Users className="w-4 h-4 text-amber-600" />;
      case 'case_status_changed':
        return <CheckCircle2 className="w-4 h-4 text-slate-600" />;
      default:
        return <Bell className="w-4 h-4 text-blue-600" />;
    }
  };

  const markSingleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col p-4 sm:p-5 space-y-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            onMarkAllRead();
          }}
          className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Screen Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Field Notifications
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Priority dispatch alerts, supervisor instructions, and case state changes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl text-xs font-bold">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setActiveFilter('unread')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeFilter === 'unread' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </button>
        <button
          onClick={() => setActiveFilter('priority')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeFilter === 'priority' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Priority
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5 flex-1 overflow-y-auto">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No notifications in this category.
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markSingleRead(item.id);
                if (item.caseId) onSelectNotificationCase(item.caseId);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                item.read 
                  ? 'bg-white border-slate-200/80 text-slate-700' 
                  : 'bg-blue-50/50 border-blue-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  item.read ? 'bg-slate-100' : 'bg-white shadow-2xs'
                }`}>
                  {getNotificationIcon(item.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-xs leading-snug truncate ${item.read ? 'font-bold' : 'font-black text-slate-900'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    {item.message}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                    {item.caseId ? (
                      <span className="text-blue-600 group-hover:underline flex items-center gap-1">
                        <span>Open Case {item.caseId}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-slate-400">Field Notice</span>
                    )}

                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
