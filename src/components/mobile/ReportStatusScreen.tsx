import React from 'react';
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  ChevronRight,
  ExternalLink,
  Shield,
  Radio
} from 'lucide-react';
import { CitizenReportFormState } from './types';

interface ReportStatusScreenProps {
  reportId: string;
  reportData?: CitizenReportFormState;
  isAuthorityNotified?: boolean;
  onBack: () => void;
  onSimulateApproveToAuthority: () => void;
}

export const ReportStatusScreen: React.FC<ReportStatusScreenProps> = ({
  reportId = 'FM-10427',
  reportData,
  isAuthorityNotified = false,
  onBack,
  onSimulateApproveToAuthority
}) => {
  // Visual timeline steps matching user specification:
  // ✓ Submitted
  // ✓ AI Analysis
  // ● Human Verification (or completed if approved)
  // ○ Authorities Notified (completed if approved)
  // ○ Action in Progress (in progress if approved)
  // ○ Resolved
  const timelineSteps = [
    {
      title: 'Submitted',
      status: 'completed',
      detail: 'Encrypted sighting packet uploaded by verified citizen',
      time: '10:35 AM'
    },
    {
      title: 'AI Analysis',
      status: 'completed',
      detail: 'Biometric and landmark correlation executed',
      time: '10:36 AM'
    },
    {
      title: 'Human Verification',
      status: isAuthorityNotified ? 'completed' : 'current',
      detail: isAuthorityNotified 
        ? 'Verified by Senior Reviewer Elena Rostova (REV-8042)' 
        : 'Senior Identity Verification Officer evaluating match',
      time: isAuthorityNotified ? '10:41 AM' : 'In Progress'
    },
    {
      title: 'Authorities Notified',
      status: isAuthorityNotified ? 'completed' : 'pending',
      detail: isAuthorityNotified 
        ? 'Encrypted CAD broadcast sent to Metro Emergency Dispatch' 
        : 'Awaiting reviewer confirmation',
      time: isAuthorityNotified ? '10:42 AM' : 'Pending'
    },
    {
      title: 'Action in Progress',
      status: isAuthorityNotified ? 'current' : 'pending',
      detail: isAuthorityNotified 
        ? 'Response units mobilized to Central District sector' 
        : 'Pending dispatch',
      time: isAuthorityNotified ? 'Active Now' : 'Pending'
    },
    {
      title: 'Resolved',
      status: 'pending',
      detail: 'Safe contact confirmation with subject and family reunification',
      time: 'Future'
    }
  ];

  return (
    <div className="min-h-full bg-slate-50/50 pb-16 text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 shadow-xs sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h1 className="text-sm font-bold font-mono text-slate-900">
              Report {reportId}
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              Live Investigation Tracking
            </p>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
            isAuthorityNotified 
              ? 'bg-blue-100 text-blue-800 border-blue-200' 
              : 'bg-amber-100 text-amber-800 border-amber-200'
          }`}>
            {isAuthorityNotified ? 'Action in Progress' : 'Under Review'}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* AI Confidence Card */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">AI Match Confidence: 87%</div>
                <div className="text-[10px] text-slate-500">Biometric facial & clothing similarity</div>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              High Match
            </span>
          </div>

          {/* Progress Gauge */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full w-[87%]" />
          </div>

          {/* Important Mandatory Disclaimer */}
          <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-slate-600">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong className="text-slate-900 font-semibold">Important Disclaimer:</strong> AI results support authorized human review and do not independently confirm identity.
            </p>
          </div>
        </div>

        {/* Visual Timeline Section */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Investigation Progress Timeline
          </h2>

          <div className="space-y-4">
            {timelineSteps.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isCurrent = step.status === 'current';
              const isPending = step.status === 'pending';

              return (
                <div key={step.title} className="flex items-start gap-3 relative">
                  {/* Vertical connector line */}
                  {idx !== timelineSteps.length - 1 && (
                    <div className={`absolute left-3.5 top-6 bottom-0 w-0.5 -mb-4 ${
                      isDone ? 'bg-blue-600' : 'bg-slate-200'
                    }`} />
                  )}

                  {/* Marker Circle */}
                  <div className="relative z-10 shrink-0">
                    {isDone ? (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-7 h-7 rounded-full bg-blue-50 border-2 border-blue-600 flex items-center justify-center shadow-xs">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 pb-1">
                    <div className="flex items-center justify-between">
                      <div className={`text-xs font-bold ${
                        isDone ? 'text-slate-900' : isCurrent ? 'text-blue-600' : 'text-slate-400'
                      }`}>
                        {step.title}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map / Location Card */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">Sighting Sector</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Sector 4-East</span>
          </div>

          <div className="h-24 rounded-2xl bg-blue-50/50 border border-slate-200 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="relative flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-xl shadow-xs border border-slate-200 text-xs font-semibold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{reportData?.location || 'Central District, 4th & Grand Ave (Transit Plaza)'}</span>
            </div>
          </div>
        </div>

        {/* Interactive Prototype Testing Action: Simulate Human Review Approval */}
        {!isAuthorityNotified && (
          <div className="p-4 rounded-3xl bg-blue-50 border border-blue-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Live Console Dispatch Integration</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              In real operations, an accredited reviewer verifies this report in the CAD console. You can simulate reviewer approval now to preview the citizen authority notification screen:
            </p>
            <button
              onClick={onSimulateApproveToAuthority}
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Simulate Reviewer Approval → Notify Authorities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
