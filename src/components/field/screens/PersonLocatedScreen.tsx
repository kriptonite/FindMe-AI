import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  Radio, 
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { FieldCase } from '../types';

interface PersonLocatedScreenProps {
  caseItem: FieldCase;
  locatedTimestamp?: string;
  onContinueToResolution: () => void;
  onRequestSupport: () => void;
}

export const PersonLocatedScreen: React.FC<PersonLocatedScreenProps> = ({
  caseItem,
  locatedTimestamp = 'Today at 6:04 PM',
  onContinueToResolution,
  onRequestSupport
}) => {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Section */}
      <div className="space-y-6 pt-2 my-auto text-center">
        {/* Large Success Indicator (Exact Requirement) */}
        <div className="relative inline-flex items-center justify-center">
          {/* Animated Wave Rings */}
          <span className="animate-ping absolute inline-flex h-28 w-28 rounded-full bg-emerald-400 opacity-25"></span>
          <span className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500 text-white shadow-xl ring-8 ring-emerald-100">
            <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
          </span>
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Person Located
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold max-w-sm mx-auto leading-relaxed">
            “The reported individual has been located. Complete the authorized verification and safeguarding process.”
          </p>
        </div>

        {/* Case ID, Location, Timestamp Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 text-left space-y-3 max-w-sm mx-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Case ID</span>
            <span className="text-sm font-black font-mono text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              {caseItem.id}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span>
                <span className="font-bold text-slate-900">{caseItem.location}</span>
                <span className="text-slate-500 block">{caseItem.district}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-700 pt-1 border-t border-slate-100">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Timestamp</span>
                <span className="font-bold text-slate-900">{locatedTimestamp}</span>
              </div>
            </div>
          </div>

          {/* Subject Safe Confirmation */}
          <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-bold">
            <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Subject is safe and in officer protective custody</span>
          </div>
        </div>
      </div>

      {/* Buttons (Exact Requirements) */}
      <div className="pt-4 space-y-2.5">
        {/* Primary: “Continue to Resolution” */}
        <button
          onClick={onContinueToResolution}
          className="w-full min-h-[50px] py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Resolution</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary: “Request Additional Support” */}
        <button
          onClick={onRequestSupport}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Users className="w-4 h-4 text-blue-400" />
          <span>Request Additional Support</span>
        </button>
      </div>
    </div>
  );
};
