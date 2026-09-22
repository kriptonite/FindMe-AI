import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Radio, 
  MapPin, 
  UserCheck, 
  AlertCircle,
  Car,
  CheckCheck,
  ChevronRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { SightingCase } from '../types';
import { InteractiveMapCard } from './InteractiveMapCard';

interface CaseTrackingViewProps {
  sightingCase: SightingCase;
  onBack: () => void;
  onAdvanceToResolved: (caseId: string) => void;
  onAdvanceToActionInProgress: (caseId: string) => void;
  onViewAuthoritiesHub: () => void;
}

export const CaseTrackingView: React.FC<CaseTrackingViewProps> = ({
  sightingCase,
  onBack,
  onAdvanceToResolved,
  onAdvanceToActionInProgress,
  onViewAuthoritiesHub
}) => {
  // Determine standard steps according to prompt:
  // ✓ Sighting Submitted
  // ✓ AI Analysis Completed
  // ✓ Human Review Completed
  // ✓ Authorities Notified
  // ● Action in Progress
  // ○ Resolved

  const isHumanReviewDone = sightingCase.status !== 'New';
  const isAuthoritiesNotified = sightingCase.status === 'Approved' || sightingCase.status === 'Action in Progress' || sightingCase.status === 'Resolved';
  const isActionInProgress = sightingCase.status === 'Action in Progress' || sightingCase.status === 'Resolved';
  const isResolved = sightingCase.status === 'Resolved';

  const steps = [
    {
      id: 'step-1',
      title: 'Sighting Submitted',
      completed: true,
      time: sightingCase.sightingTime,
      desc: `Citizen report filed from ${sightingCase.district}. Verified reporter identity.`
    },
    {
      id: 'step-2',
      title: 'AI Analysis Completed',
      completed: true,
      time: '1 min after upload',
      desc: `AI match confidence scored at ${sightingCase.aiConfidence}% against record ${sightingCase.aiAnalysis.matchingRecordId}.`
    },
    {
      id: 'step-3',
      title: 'Human Review Completed',
      completed: isHumanReviewDone,
      inProgress: !isHumanReviewDone,
      time: sightingCase.humanVerification?.reviewedAt || (isHumanReviewDone ? 'Validated' : 'Pending review'),
      desc: sightingCase.humanVerification?.reviewerNotes || 'Certified reviewer evaluated biometric and visual evidence.'
    },
    {
      id: 'step-4',
      title: 'Authorities Notified',
      completed: isAuthoritiesNotified,
      inProgress: isHumanReviewDone && !isAuthoritiesNotified,
      time: sightingCase.forwarding?.forwardedAt || (isAuthoritiesNotified ? 'Dispatched' : 'Pending approval'),
      desc: `Forwarded to ${sightingCase.forwarding?.destinationAuthority || 'Local Emergency Agency'}.`
    },
    {
      id: 'step-5',
      title: 'Action in Progress',
      completed: isResolved,
      inProgress: sightingCase.status === 'Action in Progress',
      time: isActionInProgress ? 'Active Patrol' : 'On standby',
      desc: sightingCase.forwarding?.etaOrLastReport || 'Field response unit en route to coordinate perimeter.'
    },
    {
      id: 'step-6',
      title: 'Resolved',
      completed: isResolved,
      inProgress: false,
      time: isResolved ? 'Case Concluded' : 'Pending resolution',
      desc: isResolved 
        ? 'Subject safely located, identified, and verified by emergency personnel.' 
        : 'Final welfare confirmation and safety report from officers on scene.'
    }
  ];

  return (
    <div id="case-tracking-view-container" className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900">
                Case Tracking: {sightingCase.id}
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                {sightingCase.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject: {sightingCase.aiAnalysis.recordName} • Record ID: {sightingCase.aiAnalysis.matchingRecordId}
            </p>
          </div>
        </div>

        {/* Prototype Action Shortcuts */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {sightingCase.status === 'Approved' && (
            <button
              onClick={() => onAdvanceToActionInProgress(sightingCase.id)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Simulate: Field Unit Dispatched</span>
            </button>
          )}

          {sightingCase.status === 'Action in Progress' && (
            <button
              onClick={() => onAdvanceToResolved(sightingCase.id)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Simulate: Subject Located (Resolve Case)</span>
            </button>
          )}

          <button
            onClick={onViewAuthoritiesHub}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Authorities Queue</span>
          </button>
        </div>
      </div>

      {/* Grid: Case Timeline (Left) + Interactive Map Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Case Timeline (5 Cols on large) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold font-display text-slate-900">
                Operational Case Timeline
              </h2>
              <p className="text-xs text-slate-500">
                Audited progression from report ingestion to field resolution
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              SLA Tracked
            </span>
          </div>

          {/* Timeline Sequence */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {steps.map((step, idx) => {
              const isDone = step.completed;
              const isCurrent = step.inProgress;
              return (
                <div key={step.id} className="relative group">
                  {/* Marker icon */}
                  <div 
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white transition-all ${
                      isDone 
                        ? 'bg-emerald-600 text-white' 
                        : isCurrent 
                        ? 'bg-blue-600 text-white animate-pulse' 
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    ) : (
                      <Circle className="w-2.5 h-2.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${
                        isDone ? 'text-slate-900' : isCurrent ? 'text-blue-600' : 'text-slate-500'
                      }`}>
                        {step.title}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Authority Dispatch Summary Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Forwarding Authority:</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
                {sightingCase.forwarding?.currentAuthorityStatus || 'Notified'}
              </span>
            </div>
            <p className="text-slate-700 font-medium">
              {sightingCase.forwarding?.destinationAuthority || 'Metro Emergency Dispatch — Precinct 4'}
            </p>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-500 text-[11px] font-mono">
              <span>Unit: {sightingCase.forwarding?.assignedUnit || 'Unit 14-B'}</span>
              <span>Precinct: {sightingCase.forwarding?.precinctCode || 'PCT-04-CTR'}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Map Card (7 Cols on large) */}
        <div className="lg:col-span-7 space-y-6">
          <InteractiveMapCard sightingCase={sightingCase} />

          {/* Live Field Telemetry Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900">
                  Live CAD Dispatch Telemetry
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Channel: SEC-FREQ-44</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <Car className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">Unit 14-B Status:</span>
                  <p className="text-slate-600 mt-0.5">
                    {sightingCase.forwarding?.etaOrLastReport || 'Patrol unit approaching 4th & Grand Ave transit terminal for visual verification.'}
                  </p>
                </div>
              </div>

              {sightingCase.forwarding?.authorityNotes && (
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-900">Officer Note:</span>
                    <p className="text-blue-800 mt-0.5">
                      {sightingCase.forwarding.authorityNotes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
