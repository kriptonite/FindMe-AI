import React from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Send, 
  Clock, 
  MapPin, 
  Home, 
  CheckCircle2, 
  Lock,
  ChevronRight,
  Radio
} from 'lucide-react';

interface AuthorityNotifiedScreenProps {
  reportId: string;
  onViewTimeline: () => void;
  onBackToHome: () => void;
}

export const AuthorityNotifiedScreen: React.FC<AuthorityNotifiedScreenProps> = ({
  reportId = 'FM-10427',
  onViewTimeline,
  onBackToHome
}) => {
  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-slate-900 select-none">
      <div>
        {/* Top Header */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Action in Progress</span>
          </span>
        </div>

        {/* Hero Alert */}
        <div className="mt-8 text-center">
          <div className="relative mx-auto w-20 h-20 mb-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-blue-100/60 animate-pulse" />
            <div className="relative w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Send className="w-8 h-8 stroke-[2.2]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Authorities Have Been Notified
          </h1>
          
          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-[290px] mx-auto">
            Your sighting has been reviewed and forwarded to the appropriate local response team.
          </p>
        </div>

        {/* Dispatch Details Card */}
        <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3.5 shadow-xs">
          {/* Status Row */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Status</div>
              <div className="text-sm font-bold text-blue-900 mt-0.5">
                Action in Progress
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Report Case ID</div>
              <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                {reportId}
              </div>
            </div>
          </div>

          {/* Assigned Response Region */}
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Response Region</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">
                Metro Emergency Dispatch — Precinct 4 (Central District)
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Units deployed to 4th & Grand Ave perimeter corridor
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200">
            <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Forwarded Timestamp</div>
              <div className="text-xs font-semibold text-slate-800 mt-0.5">
                Today, Just now (10:42 AM EST)
              </div>
            </div>
          </div>

          {/* Officer Privacy Safeguard */}
          <div className="pt-2 border-t border-slate-200 flex items-start gap-2 text-slate-500">
            <Lock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <p className="text-[10px] leading-relaxed">
              <strong className="text-slate-700">Privacy Notice:</strong> For tactical integrity and security, specific officer names and unit telemetry are masked in citizen views.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 pb-2 space-y-2.5">
        <button
          onClick={onViewTimeline}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>View Updated Timeline</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={onBackToHome}
          className="w-full py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
