import React from 'react';
import { 
  LayoutDashboard, 
  Eye, 
  FileCheck2, 
  Building2, 
  Bell, 
  BarChart3, 
  ScrollText, 
  Settings, 
  ShieldCheck, 
  Clock, 
  Smartphone,
  Sparkles,
  Play
} from 'lucide-react';
import { ReviewerProfile } from '../types';
import { FindMeLogo, FindMePinIcon } from './FindMeLogo';

export type ActiveNavTab = 
  | 'dashboard'
  | 'new-sightings'
  | 'under-review'
  | 'approved-cases'
  | 'authorities'
  | 'notifications'
  | 'analytics'
  | 'audit-log'
  | 'settings';

interface SidebarProps {
  currentTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  badgeCounts: {
    newSightings: number;
    underReview: number;
    approvedCases: number;
    authorities: number;
    unreadNotifs: number;
  };
  reviewer: ReviewerProfile;
  onOpenMobilePreview?: () => void;
  onSwitchToMobilePrototype?: () => void;
  onSwitchToFieldApp?: () => void;
  onSwitchToVideoTour?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  badgeCounts,
  reviewer,
  onOpenMobilePreview,
  onSwitchToMobilePrototype,
  onSwitchToFieldApp,
  onSwitchToVideoTour
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveNavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'new-sightings' as ActiveNavTab,
      label: 'New Sightings',
      icon: Eye,
      badge: badgeCounts.newSightings > 0 ? badgeCounts.newSightings : null,
      badgeColor: 'bg-blue-600 text-white'
    },
    {
      id: 'under-review' as ActiveNavTab,
      label: 'Under Review',
      icon: Clock,
      badge: badgeCounts.underReview > 0 ? badgeCounts.underReview : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'approved-cases' as ActiveNavTab,
      label: 'Approved Cases',
      icon: FileCheck2,
      badge: badgeCounts.approvedCases > 0 ? badgeCounts.approvedCases : null,
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'authorities' as ActiveNavTab,
      label: 'Authorities',
      icon: Building2,
      badge: badgeCounts.authorities > 0 ? badgeCounts.authorities : null,
      badgeColor: 'bg-indigo-600 text-white'
    },
    {
      id: 'notifications' as ActiveNavTab,
      label: 'Notifications',
      icon: Bell,
      badge: badgeCounts.unreadNotifs > 0 ? badgeCounts.unreadNotifs : null,
      badgeColor: 'bg-rose-500 text-white animate-pulse'
    },
    {
      id: 'analytics' as ActiveNavTab,
      label: 'Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'audit-log' as ActiveNavTab,
      label: 'Audit Log',
      icon: ScrollText,
      badge: null
    },
    {
      id: 'settings' as ActiveNavTab,
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside 
      id="main-sidebar" 
      className="w-64 bg-slate-900 text-slate-200 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none"
    >
      {/* Brand Header with Official FindMe AI Logo */}
      <div className="p-4 border-b border-slate-800/80">
        <FindMeLogo 
          size="md" 
          variant="dark" 
          showTagline={true} 
          showVersion={true}
        />
      </div>

      {/* Operational Protocol Banner */}
      <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="text-slate-200 font-medium">Clearance: Level 3</span>
            <p className="text-slate-400">Human Review Protocol</p>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Review Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-semibold' 
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && (
                <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded-full ${item.badgeColor || 'bg-slate-700 text-slate-200'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Ecosystem Quick Switch Buttons */}
        <div className="pt-3 space-y-1.5">
          {onSwitchToVideoTour && (
            <button
              onClick={onSwitchToVideoTour}
              id="open-video-tour-nav"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/50 transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Video Tour (72s)</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/30 font-mono">
                Narration
              </span>
            </button>
          )}

          {onSwitchToFieldApp && (
            <button
              onClick={onSwitchToFieldApp}
              id="open-field-response-app-nav"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Field Response App</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400/30">
                Unit 4
              </span>
            </button>
          )}

          {(onSwitchToMobilePrototype || onOpenMobilePreview) && (
            <button
              onClick={onSwitchToMobilePrototype || onOpenMobilePreview}
              id="open-citizen-app-preview-nav"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-sky-300 bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>Citizen Mobile App</span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-400/20">
                Reporter
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* Reviewer Status Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400">Reviewer Online</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{reviewer.reviewerId}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-700 text-sky-300 font-semibold text-xs flex items-center justify-center ring-1 ring-white/10">
              ER
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{reviewer.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{reviewer.role}</p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Shift: {reviewer.shiftHours}</span>
            <span className="text-sky-300 font-medium">{reviewer.casesReviewedToday} verified</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
