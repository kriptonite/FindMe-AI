import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle2, 
  Send, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  FileText,
  ChevronRight
} from 'lucide-react';

interface CitizenNotification {
  id: string;
  type: 'new_report' | 'sighting_verified' | 'authorities_notified' | 'action_in_progress' | 'case_resolved';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  caseId: string;
}

const INITIAL_CITIZEN_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: 'c-notif-1',
    type: 'authorities_notified',
    title: 'Authorities Notified',
    message: 'Your report FM-10427 was approved by triage and forwarded to Metro Emergency Dispatch — Precinct 4.',
    timestamp: '10 mins ago',
    read: false,
    caseId: 'FM-10427'
  },
  {
    id: 'c-notif-2',
    type: 'sighting_verified',
    title: 'Sighting Verified',
    message: 'Senior Reviewer verified facial landmarks against active missing bulletin MP-44021 (Marcus Vance).',
    timestamp: '25 mins ago',
    read: false,
    caseId: 'FM-10427'
  },
  {
    id: 'c-notif-3',
    type: 'new_report',
    title: 'New Report Received',
    message: 'Your sighting submission FM-10427 has been securely ingested and queued for evaluation.',
    timestamp: '1 hour ago',
    read: true,
    caseId: 'FM-10427'
  },
  {
    id: 'c-notif-4',
    type: 'action_in_progress',
    title: 'Action in Progress',
    message: 'Field units are conducting active ground sweeps near Grand Ave Transit Pavilion.',
    timestamp: '3 hours ago',
    read: true,
    caseId: 'FM-10424'
  },
  {
    id: 'c-notif-5',
    type: 'case_resolved',
    title: 'Case Resolved',
    message: 'Previous sighting FM-10418 led to safe reunification of minor with family. Case closed with commendation.',
    timestamp: 'Yesterday',
    read: true,
    caseId: 'FM-10418'
  }
];

interface NotificationCenterScreenProps {
  onSelectCase: (caseId: string) => void;
  onBack: () => void;
}

export const NotificationCenterScreen: React.FC<NotificationCenterScreenProps> = ({
  onSelectCase,
  onBack
}) => {
  const [notifications, setNotifications] = useState<CitizenNotification[]>(INITIAL_CITIZEN_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIconForType = (type: CitizenNotification['type']) => {
    switch (type) {
      case 'new_report':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'sighting_verified':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'authorities_notified':
        return <Send className="w-4 h-4 text-blue-600" />;
      case 'action_in_progress':
        return <Radio className="w-4 h-4 text-amber-600 animate-pulse" />;
      case 'case_resolved':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getIconBg = (type: CitizenNotification['type']) => {
    switch (type) {
      case 'new_report':
      case 'authorities_notified':
        return 'bg-blue-50 border-blue-200';
      case 'sighting_verified':
        return 'bg-indigo-50 border-indigo-200';
      case 'action_in_progress':
        return 'bg-amber-50 border-amber-200';
      case 'case_resolved':
        return 'bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="min-h-full bg-slate-50/50 pb-20 text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 shadow-xs sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-base font-bold text-slate-900">Notifications</h1>

          <button
            onClick={markAllAsRead}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-2.5">
        {notifications.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectCase(item.caseId)}
            className={`w-full p-4 rounded-2xl border text-left transition-all shadow-xs flex items-start gap-3.5 group cursor-pointer ${
              item.read 
                ? 'bg-white border-slate-200 hover:border-slate-300' 
                : 'bg-blue-50/40 border-blue-200 hover:border-blue-400 ring-1 ring-blue-100'
            }`}
          >
            {/* Category Icon */}
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${getIconBg(item.type)}`}>
              {getIconForType(item.type)}
            </div>

            {/* Notification Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0">
                  {item.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {item.message}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                  {item.caseId}
                </span>
                <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View report <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
