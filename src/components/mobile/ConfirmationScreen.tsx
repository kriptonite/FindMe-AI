import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Home, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText,
  Sparkles
} from 'lucide-react';
import { CitizenReportFormState } from './types';

interface ConfirmationScreenProps {
  reportData: CitizenReportFormState;
  onTrackReport: () => void;
  onBackToHome: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  reportData,
  onTrackReport,
  onBackToHome
}) => {
  const reportId = reportData.generatedCaseId || 'FM-10427';

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-slate-900 select-none">
      <div className="my-auto py-6 text-center">
        {/* Large Success Checkmark with Animated Ripple */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-100/70 animate-ping opacity-35" />
          <div className="absolute -inset-2 rounded-full bg-emerald-50 border border-emerald-200" />
          <div className="relative w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-11 h-11 stroke-[2.2]" />
          </div>
        </div>

        {/* Title & Message */}
        <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
          Sighting Submitted
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-[280px] mx-auto leading-relaxed">
          Your report has been securely received by FindMe AI.
        </p>

        {/* Report Card Details */}
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-3xl p-4.5 text-left space-y-3 shadow-xs">
          {/* Report ID & Status */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Report ID</div>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                {reportId}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</div>
              <span className="inline-flex items-center gap-1 mt-0.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Under Review</span>
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 text-xs">
            <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 font-medium">Reported Location</div>
              <div className="font-semibold text-slate-900 line-clamp-1">{reportData.location}</div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-start gap-2 text-xs">
            <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 font-medium">Submission Timestamp</div>
              <div className="font-semibold text-slate-900">{reportData.dateTime}</div>
            </div>
          </div>

          {/* AI Pipeline Notice */}
          <div className="pt-2 border-t border-slate-200/80 flex items-center gap-2 text-[11px] text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>AI correlation running • Human reviewer on duty</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: "Track Report" & "Back to Home" */}
      <div className="pb-4 space-y-2.5">
        <button
          onClick={onTrackReport}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Track Report</span>
          <ArrowRight className="w-4 h-4" />
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
