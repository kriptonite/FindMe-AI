import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  MapPin, 
  Radio, 
  ArrowRight, 
  ShieldAlert, 
  AlertCircle,
  Navigation,
  CheckCircle2,
  Circle,
  Eye
} from 'lucide-react';
import { FieldCase } from '../types';

interface ActionInProgressScreenProps {
  caseItem: FieldCase;
  onUpdateStatus: () => void;
  onContactDispatch: () => void;
  onOpenMap: () => void;
  onViewEvidence: () => void;
}

export const ActionInProgressScreen: React.FC<ActionInProgressScreenProps> = ({
  caseItem,
  onUpdateStatus,
  onContactDispatch,
  onOpenMap,
  onViewEvidence
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(285); // 4 min 45 sec initial

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatElapsedTime = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col p-4 sm:p-5 space-y-4 select-none">
      {/* Header (Exact requirement: "Response Active") */}
      <div className="bg-blue-900 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center border border-blue-700">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">
              Incident Status
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">
              Response Active
            </h1>
          </div>
        </div>

        <div className="text-right">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            Unit 4 On-Call
          </span>
        </div>
      </div>

      {/* 5-Step Progress Stepper (Exact Requirement) */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
          Response Milestone Pipeline
        </span>

        <div className="space-y-2.5">
          {/* Step 1: ✓ Case Accepted */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-xs font-bold text-slate-800">Case Accepted</span>
            <span className="text-[10px] font-mono text-slate-400 ml-auto">5:52 PM</span>
          </div>

          {/* Line */}
          <div className="w-0.5 h-2 bg-emerald-400 ml-3 -my-1" />

          {/* Step 2: ✓ Navigation Started */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-xs font-bold text-slate-800">Navigation Started</span>
            <span className="text-[10px] font-mono text-slate-400 ml-auto">5:53 PM</span>
          </div>

          {/* Line */}
          <div className="w-0.5 h-2 bg-blue-500 ml-3 -my-1" />

          {/* Step 3: ● Action in Progress (Current Active) */}
          <div className="flex items-center gap-3 bg-blue-50/70 p-2 rounded-xl border border-blue-200">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-black text-blue-900 block">Action in Progress</span>
              <span className="text-[10px] text-blue-700 font-semibold">Unit en route / on perimeter perimeter</span>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200 ml-auto">
              Active
            </span>
          </div>

          {/* Line */}
          <div className="w-0.5 h-2 bg-slate-200 ml-3 -my-1" />

          {/* Step 4: ○ Person Located */}
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border border-slate-300">
              <Circle className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Person Located</span>
            <span className="text-[10px] text-slate-400 ml-auto">Pending arrival</span>
          </div>

          {/* Line */}
          <div className="w-0.5 h-2 bg-slate-200 ml-3 -my-1" />

          {/* Step 5: ○ Case Resolved */}
          <div className="flex items-center gap-3 opacity-40">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border border-slate-300">
              <Circle className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Case Resolved</span>
            <span className="text-[10px] text-slate-400 ml-auto">Final step</span>
          </div>
        </div>
      </div>

      {/* Case Details, Location & Elapsed Time Display */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        {/* Case ID & Location */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Case ID</span>
            <span className="text-sm font-black font-mono text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              {caseItem.id}
            </span>
          </div>

          <div className="flex items-start gap-2 pt-1 text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">{caseItem.location}</span>
              <span className="text-slate-500">{caseItem.district}</span>
            </div>
          </div>
        </div>

        {/* Elapsed Response Time Counter */}
        <div className="bg-slate-900 rounded-xl p-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">Elapsed Response Time</span>
          </div>
          <span className="font-mono text-lg font-black text-emerald-400 tracking-wider">
            {formatElapsedTime(elapsedSeconds)}
          </span>
        </div>

        {/* Quick Sighting Apparel Reminder */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Subject Description</span>
            <span className="font-bold text-slate-800">{caseItem.description}</span>
          </div>
          <button
            onClick={onViewEvidence}
            className="text-xs font-bold text-blue-600 hover:underline shrink-0 pl-2"
          >
            Evidence
          </button>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="pt-2 space-y-2.5">
        {/* Large button: “Update Status” */}
        <button
          onClick={onUpdateStatus}
          className="w-full min-h-[52px] py-4 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Update Status</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Secondary: “Contact Dispatch” & Navigation Shortcut */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onContactDispatch}
            className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>Contact Dispatch</span>
          </button>

          <button
            onClick={onOpenMap}
            className="py-3 px-3 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>Tactical Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
