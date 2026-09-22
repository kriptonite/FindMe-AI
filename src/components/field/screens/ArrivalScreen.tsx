import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Radio, 
  ArrowRight, 
  Users, 
  SearchX, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { FieldCase } from '../types';

interface ArrivalScreenProps {
  caseItem: FieldCase;
  arrivalTimestamp?: string;
  onBeginAssessment: () => void;
  onUnableToLocate: () => void;
  onRequestSupport: () => void;
  onContactDispatch: () => void;
}

export const ArrivalScreen: React.FC<ArrivalScreenProps> = ({
  caseItem,
  arrivalTimestamp = 'Today at 5:58 PM',
  onBeginAssessment,
  onUnableToLocate,
  onRequestSupport,
  onContactDispatch
}) => {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col p-4 sm:p-5 space-y-4 select-none">
      {/* Arrival Banner */}
      <div className="bg-emerald-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-xs border border-emerald-400">
            <CheckCircle2 className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-black text-emerald-200 uppercase tracking-wider block">
              Scene Geo-Fence Triggered
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              You have arrived
            </h1>
          </div>
        </div>

        <div className="text-right">
          <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold">
            10-97 On Scene
          </span>
        </div>
      </div>

      {/* Main Location & Confirmation Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="text-center py-2 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Status Confirmation
          </span>
          <p className="text-base font-extrabold text-slate-900">
            “Reported location reached.”
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium mt-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Arrival Timestamp: <strong className="text-slate-900">{arrivalTimestamp}</strong></span>
          </div>
        </div>

        {/* Small Map Snapshot Display */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-16/7 flex items-center justify-center">
          {/* Stylized Tactical Mini Map SVG */}
          <svg className="w-full h-full" viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="130" fill="#f1f5f9" />
            <rect x="10" y="10" width="70" height="45" rx="3" fill="#e2e8f0" />
            <rect x="90" y="10" width="110" height="45" rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
            <rect x="210" y="10" width="80" height="45" rx="3" fill="#e2e8f0" />
            <rect x="10" y="65" width="130" height="55" rx="3" fill="#dcfce7" />
            <rect x="150" y="65" width="140" height="55" rx="3" fill="#e2e8f0" />

            {/* Roads */}
            <line x1="0" y1="60" x2="300" y2="60" stroke="#ffffff" strokeWidth="12" />
            <line x1="145" y1="0" x2="145" y2="130" stroke="#ffffff" strokeWidth="12" />

            {/* Arrived Unit Marker */}
            <circle cx="145" cy="60" r="12" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
            <circle cx="145" cy="60" r="6" fill="#059669" stroke="#ffffff" strokeWidth="2" />

            {/* Target Pin */}
            <circle cx="155" cy="45" r="5" fill="#f59e0b" />
          </svg>

          {/* Location Caption Overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-xs rounded-lg px-2.5 py-1.5 text-white text-xs flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold truncate">{caseItem.location}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold shrink-0 ml-2">ACCURACY 3m</span>
          </div>
        </div>

        {/* Case Reminder Box */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-1">
          <div className="flex justify-between font-bold text-slate-900">
            <span>Case {caseItem.id}</span>
            <span className="text-blue-700">{caseItem.aiConfidence}% AI Potential Match</span>
          </div>
          <p className="text-slate-600 leading-snug">{caseItem.description}</p>
        </div>
      </div>

      {/* Buttons (Exact Requirements) */}
      <div className="pt-2 space-y-2.5">
        {/* Primary Button: “Begin Assessment” */}
        <button
          onClick={onBeginAssessment}
          className="w-full min-h-[50px] py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Begin Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Secondary: “Unable to Locate” */}
          <button
            onClick={onUnableToLocate}
            className="py-3 px-3 rounded-xl bg-white hover:bg-amber-50 active:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <SearchX className="w-3.5 h-3.5 text-amber-600" />
            <span>Unable to Locate</span>
          </button>

          {/* Tertiary: “Request Additional Support” */}
          <button
            onClick={onRequestSupport}
            className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Request Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};
