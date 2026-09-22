import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  PlusCircle,
  FileSpreadsheet,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { ReviewerProfile, NotificationItem } from '../types';
import { FindMePinIcon } from './FindMeLogo';

interface TopBarProps {
  reviewer: ReviewerProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onSelectNotificationCase: (caseId: string) => void;
  onOpenHelpModal: () => void;
  onSimulateIncomingSighting: () => void;
  onOpenMobilePreview?: () => void;
  onSwitchToMobilePrototype?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  reviewer,
  searchQuery,
  onSearchChange,
  notifications,
  onOpenNotifications,
  onSelectNotificationCase,
  onOpenHelpModal,
  onSimulateIncomingSighting,
  onOpenMobilePreview,
  onSwitchToMobilePrototype
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      id="top-navigation-bar" 
      className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-20 shrink-0 select-none shadow-xs"
    >
      {/* Search Field */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search report ID (e.g. FM-10427), location, or missing record..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 rounded-lg border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Citizen App Ingestion Mockup Launcher */}
        {onOpenMobilePreview && (
          <button
            id="topbar-citizen-app-btn"
            onClick={onOpenMobilePreview}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-100/90 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors"
            title="Inspect citizen mobile app interface"
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Citizen App View</span>
          </button>
        )}

        {/* Prototype simulation tool */}
        <button
          id="simulate-incoming-sighting-btn"
          onClick={onSimulateIncomingSighting}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          title="Simulate incoming real-time citizen sighting"
        >
          <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Simulate Sighting</span>
        </button>

        {/* Operational Status Pill */}
        <div 
          id="status-reviewer-online"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-semibold">{reviewer.status}</span>
        </div>

        {/* Switch to Citizen Mobile App Prototype */}
        {onSwitchToMobilePrototype && (
          <button
            onClick={onSwitchToMobilePrototype}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Open Citizen Mobile App Prototype"
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Citizen Mobile App</span>
          </button>
        )}

        {/* Notifications Icon & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="notifications-bell-btn"
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span 
                id="notifications-badge-counter"
                className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs"
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Dropdown */}
          {showNotifDropdown && (
            <div 
              id="notifications-quick-dropdown"
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                  <p className="text-xs text-slate-500">{unreadCount} unread operational alerts</p>
                </div>
                <button
                  onClick={() => {
                    setShowNotifDropdown(false);
                    onOpenNotifications();
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifDropdown(false);
                      onSelectNotificationCase(n.caseId);
                    }}
                    className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                      !n.read ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900 truncate">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                      <span className="inline-block mt-1 text-[10px] font-mono font-medium text-blue-600">
                        Case: {n.caseId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help / Guidance Modal Trigger */}
        <button
          id="help-guidelines-btn"
          onClick={onOpenHelpModal}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Reviewer Verification Protocol & Disclaimers"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* Reviewer Profile */}
        <div className="relative" ref={profileRef}>
          <button
            id="reviewer-profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-sky-200 font-bold text-xs flex items-center justify-center border border-slate-700">
              ER
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">{reviewer.name}</p>
              <p className="text-[11px] text-slate-500 font-mono">{reviewer.reviewerId}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div 
              id="reviewer-profile-menu"
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-slate-800"
            >
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">{reviewer.name}</p>
                <p className="text-xs text-slate-500">{reviewer.role}</p>
                <div className="mt-2 text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                  <div>ID: {reviewer.reviewerId}</div>
                  <div>Clearance: {reviewer.clearanceLevel}</div>
                  <div>Shift: {reviewer.shiftHours}</div>
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenHelpModal();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-md flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Ethical AI Review Guidelines</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
