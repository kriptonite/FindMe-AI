import React from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Camera, 
  FileText, 
  AlertTriangle, 
  HelpCircle, 
  MapPin, 
  ChevronRight, 
  Clock, 
  Bell, 
  Compass, 
  Sparkles,
  Search
} from 'lucide-react';
import { CitizenUser } from './types';
import { ACTIVE_CITIZEN_ALERTS } from './mockData';

interface HomeScreenProps {
  user: CitizenUser;
  myReportsCount: number;
  onStartReport: () => void;
  onNavigateToReports: () => void;
  onNavigateToAlerts: () => void;
  onNavigateToHelp: () => void;
  onOpenReportDetails?: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  myReportsCount,
  onStartReport,
  onNavigateToReports,
  onNavigateToAlerts,
  onNavigateToHelp,
  onOpenReportDetails
}) => {
  return (
    <div className="min-h-full bg-slate-50/50 pb-20 text-slate-900">
      {/* Top App Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-3 pb-4 shadow-xs sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold font-display text-slate-900 tracking-tight">
                Hello, {user.name.split(' ')[0]}
              </h1>
            </div>
            {/* Status badge: “Verified User” */}
            <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified User</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onNavigateToAlerts}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Active Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Main Prominent Card: "Have you seen someone who may be missing?" */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-5 shadow-xl shadow-blue-950/15 border border-slate-800">
          {/* Subtle network glow accent */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold tracking-wider uppercase mb-2.5">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Community Watch Network</span>
            </div>

            <h2 className="text-lg font-bold font-display text-white leading-snug">
              Have you seen someone who may be missing?
            </h2>

            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed max-w-[280px]">
              Every secure report is immediately analyzed by ethical AI and verified by trained responders.
            </p>

            {/* Primary Large Button: "+ Report a Sighting" */}
            <div className="mt-4">
              <button
                onClick={onStartReport}
                className="w-full py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/35 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                <span>+ Report a Sighting</span>
              </button>
            </div>
          </div>
        </div>

        {/* Small Map Preview with Nearby Active Reports (Privacy Protected) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Nearby Active Area Reports</h3>
                <p className="text-[10px] text-slate-500">Generalized 2.5 km approximate radius</p>
              </div>
            </div>
            <button 
              onClick={onNavigateToAlerts}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
          </div>

          {/* Map Graphic Canvas */}
          <div className="relative h-28 w-full rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
            {/* Styled Map Background Representation */}
            <div className="absolute inset-0 bg-blue-50/50">
              {/* Grid Roads */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:28px_28px]" />
              
              {/* River / Park feature */}
              <div className="absolute top-0 right-0 w-32 h-full bg-emerald-100/60 -skew-x-12 transform origin-top" />
            </div>

            {/* Current Citizen Location Pulse */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-blue-600 ring-2 ring-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>

            {/* Approximate Generalized Alert Pins (no personal info exposed) */}
            <div className="absolute top-5 right-12 group cursor-pointer">
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-md border border-slate-200 text-[10px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Alert Zone</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-1/4">
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-md border border-slate-200 text-[10px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Resolved Area</span>
              </div>
            </div>

            {/* Privacy Disclaimer Ribbon */}
            <div className="absolute bottom-1 left-2 bg-slate-900/75 text-white text-[9px] px-2 py-0.5 rounded-md backdrop-blur-xs font-medium">
              Privacy-safe coordinates • Precision fuzzing active
            </div>
          </div>
        </div>

        {/* Secondary Cards: My Reports, Active Alerts, Help & Safety */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Quick Actions & Summaries
          </div>

          {/* Secondary Card 1: My Reports */}
          <button
            onClick={onNavigateToReports}
            className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">My Reports</h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    {myReportsCount} Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latest: FM-10427 • Under Review (87% Match)
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Secondary Card 2: Active Alerts */}
          <button
            onClick={onNavigateToAlerts}
            className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">Active Alerts</h4>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    2 Nearby
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Silver Alert (76) & Vulnerable Adult (34)
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Secondary Card 3: Help & Safety */}
          <button
            onClick={onNavigateToHelp}
            className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Help & Safety Guidelines</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Safe distance reporting & emergency dispatch hotline
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
