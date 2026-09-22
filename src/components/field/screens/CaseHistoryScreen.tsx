import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Radio, 
  MapPin, 
  HeartHandshake, 
  ChevronLeft,
  Share2,
  Download
} from 'lucide-react';
import { FieldCase, FieldTimelineItem } from '../types';

interface CaseHistoryScreenProps {
  caseItem: FieldCase;
  timeline: FieldTimelineItem[];
  onBack: () => void;
  onReturnToHome: () => void;
}

export const CaseHistoryScreen: React.FC<CaseHistoryScreenProps> = ({
  caseItem,
  timeline,
  onBack,
  onReturnToHome
}) => {
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

        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          CASE RESOLVED
        </span>
      </div>

      {/* Screen Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Case History
          </h1>
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
            {caseItem.id}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Comprehensive chronological audit trail for authorized dispatch & response.
        </p>
      </div>

      {/* Case Summary Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Subject
          </span>
          <h3 className="text-sm font-black text-slate-900 leading-tight">
            {caseItem.title} ({caseItem.reportedIndividual}, Age {caseItem.age})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{caseItem.location}</p>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block">
            Safe Handoff
          </span>
          <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">Total: 28 min</span>
        </div>
      </div>

      {/* Chronological Timeline (Exact Timestamps Specified in Prompt) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Official CAD Incident Timeline
          </span>
          <span className="text-[10px] text-slate-400 font-mono">UTC-4 EST</span>
        </div>

        <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {timeline.map((item, idx) => {
            const isLast = idx === timeline.length - 1;
            return (
              <div key={item.id} className="relative group">
                {/* Node Dot */}
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                  isLast
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-blue-600 text-white shadow-2xs'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono font-black text-blue-950">
                      {item.time}
                    </span>
                    <span className="text-slate-400 text-xs">—</span>
                    <h4 className="text-xs font-black text-slate-900">
                      {item.title}
                    </h4>
                  </div>

                  {item.subtitle && (
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {item.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-500">{item.actor}</span>
                    <span>•</span>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action to Return Home */}
      <div className="pt-2">
        <button
          onClick={onReturnToHome}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Return to Active Cases Dashboard</span>
        </button>
      </div>
    </div>
  );
};
