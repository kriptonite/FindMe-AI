import React from 'react';
import { 
  Shield, 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Radio, 
  Layers,
  Activity,
  Flame,
  User
} from 'lucide-react';
import { FieldOfficerProfile, FieldCase } from '../types';

interface HomeScreenProps {
  officer: FieldOfficerProfile;
  cases: FieldCase[];
  onSelectCase: (caseItem: FieldCase) => void;
  onToggleStatus: () => void;
  onOpenNotifications: () => void;
  unreadNotifsCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  officer,
  cases,
  onSelectCase,
  onToggleStatus,
  onOpenNotifications,
  unreadNotifsCount = 2
}) => {
  // Primary Priority Case (FM-10427 as specified)
  const priorityCase = cases.find(c => c.id === 'FM-10427') || cases[0];
  const otherCases = cases.filter(c => c.id !== priorityCase.id);

  return (
    <div className="flex-1 bg-slate-50 flex flex-col p-4 sm:p-5 space-y-4 select-none">
      {/* Officer Header & Status Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={officer.avatar} 
              alt={officer.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 leading-tight">
              Good afternoon, {officer.name.split(' ')[1] || 'Officer'}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-semibold text-slate-500">{officer.unit}</span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-mono text-slate-400">{officer.badgeNumber}</span>
            </div>
          </div>
        </div>

        {/* Status Toggle / Badge */}
        <button
          onClick={onToggleStatus}
          title="Click to toggle availability status"
          className="flex flex-col items-end gap-1 cursor-pointer group"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold group-hover:bg-emerald-100 transition-colors shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{officer.status}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium group-hover:text-blue-600">Tap to toggle</span>
        </button>
      </div>

      {/* KPI Cards (Exact metrics from specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* KPI 1: New Cases: 2 */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>New Cases</span>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">2</span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              Pending
            </span>
          </div>
        </div>

        {/* KPI 2: Assigned: 1 */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 flex flex-col justify-between ring-1 ring-blue-500/20">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Assigned</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-700">1</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
        </div>

        {/* KPI 3: Action in Progress: 3 */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>In Progress</span>
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">3</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              Units en route
            </span>
          </div>
        </div>

        {/* KPI 4: Resolved Today: 5 */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Resolved Today</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">5</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              100% Safe
            </span>
          </div>
        </div>
      </div>

      {/* Main Section: Priority Cases */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 rounded-full bg-rose-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Priority Cases
            </h3>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            Immediate Response
          </span>
        </div>

        {/* Priority Case Card (Case FM-10427) */}
        {priorityCase && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-blue-600/30 hover:border-blue-600 transition-all relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" />

            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black font-mono text-blue-900">
                    {priorityCase.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200">
                    {priorityCase.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-200">
                    {priorityCase.priority} Priority
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mt-1">
                  {priorityCase.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  {priorityCase.description}
                </p>
              </div>

              {/* AI Match Badge */}
              <div className="shrink-0 text-right">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>{priorityCase.aiConfidence}% AI Match</span>
                </div>
                <span className="block text-[10px] text-slate-400 mt-0.5">Human Verified</span>
              </div>
            </div>

            {/* Middle Details Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate font-semibold text-slate-800">
                  Location: {priorityCase.district}
                </span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-900">
                  Distance: {priorityCase.distanceKm} km
                </span>
                <span className="text-slate-400 text-[11px]">({priorityCase.travelTimeMin} min)</span>
              </div>
            </div>

            {/* Sighting Photo Preview Pill */}
            <div className="mt-3 flex items-center gap-3 bg-slate-50 rounded-xl p-2.5 border border-slate-200/60">
              <img 
                src={priorityCase.sightingImage} 
                alt="Sighting preview" 
                className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-2xs shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Reported Apparel
                </span>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {priorityCase.clothingDetails}
                </p>
              </div>
            </div>

            {/* Primary Action Button: "View Case" */}
            <div className="mt-4">
              <button
                onClick={() => onSelectCase(priorityCase)}
                className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Case</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Secondary Cases List */}
        {otherCases.length > 0 && (
          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
              Other Assigned & Active Cases
            </span>
            {otherCases.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCase(c)}
                className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img 
                    src={c.sightingImage} 
                    alt={c.id} 
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-slate-900">{c.id}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">{c.title}</p>
                    <span className="text-[10px] text-slate-400">{c.location} • {c.distanceKm} km</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span className="text-xs font-bold">Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
