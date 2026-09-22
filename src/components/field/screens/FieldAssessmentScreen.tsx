import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  ShieldAlert, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  ChevronLeft, 
  AlertTriangle,
  UserCheck,
  Stethoscope,
  Users,
  Info
} from 'lucide-react';
import { FieldCase, FieldAssessmentState } from '../types';

interface FieldAssessmentScreenProps {
  caseItem: FieldCase;
  onBack: () => void;
  onSubmitAssessment: (assessment: FieldAssessmentState) => void;
}

export const FieldAssessmentScreen: React.FC<FieldAssessmentScreenProps> = ({
  caseItem,
  onBack,
  onSubmitAssessment
}) => {
  const [personLocated, setPersonLocated] = useState(true);
  const [identityVerified, setIdentityVerified] = useState(true);
  const [immediateSafetyConcern, setImmediateSafetyConcern] = useState(false);
  const [medicalRequired, setMedicalRequired] = useState(false);
  const [additionalSupportRequired, setAdditionalSupportRequired] = useState(false);
  const [fieldNotes, setFieldNotes] = useState(
    'Subject located resting inside east transit pavilion. Calm and responsive. Responding officers engaged verbal de-escalation.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitAssessment({
      personLocated,
      identityVerified,
      immediateSafetyConcern,
      medicalRequired,
      additionalSupportRequired,
      fieldNotes,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col p-4 sm:p-5 space-y-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Arrival</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-1 rounded-md">
          CASE {caseItem.id}
        </span>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Field Assessment
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Physical on-scene verification and immediate safeguarding evaluation.
        </p>
      </div>

      {/* Mandatory Human Safeguard Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-3.5 shadow-xs border border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold text-emerald-300 uppercase tracking-wider block">
            Authorized Human Verification Protocol
          </span>
          <p className="text-slate-300 leading-relaxed">
            AI recommendations are strictly advisory. Identity verification and safeguarding determinations must be confirmed independently by authorized field personnel.
          </p>
        </div>
      </div>

      {/* Main Checklist Form (Exact Specification) */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
            On-Scene Checklist
          </span>

          <div className="space-y-2.5">
            {/* Checklist Item 1: Person located */}
            <label 
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                personLocated 
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={personLocated}
                onChange={(e) => setPersonLocated(e.target.checked)}
                className="sr-only"
              />
              <div className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors">
                {personLocated ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span className="text-sm font-bold">Person located</span>
            </label>

            {/* Checklist Item 2: Identity verified through authorized process */}
            <label 
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                identityVerified 
                  ? 'bg-blue-50/80 border-blue-300 text-blue-950 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={identityVerified}
                onChange={(e) => setIdentityVerified(e.target.checked)}
                className="sr-only"
              />
              <div className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors">
                {identityVerified ? (
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span className="text-sm font-bold">Identity verified through authorized process</span>
            </label>

            {/* Checklist Item 3: Immediate safety concern */}
            <label 
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                immediateSafetyConcern 
                  ? 'bg-rose-50/80 border-rose-300 text-rose-950 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={immediateSafetyConcern}
                onChange={(e) => setImmediateSafetyConcern(e.target.checked)}
                className="sr-only"
              />
              <div className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors">
                {immediateSafetyConcern ? (
                  <CheckSquare className="w-5 h-5 text-rose-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span className="text-sm font-bold">Immediate safety concern</span>
            </label>

            {/* Checklist Item 4: Medical assistance required */}
            <label 
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                medicalRequired 
                  ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={medicalRequired}
                onChange={(e) => setMedicalRequired(e.target.checked)}
                className="sr-only"
              />
              <div className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors">
                {medicalRequired ? (
                  <CheckSquare className="w-5 h-5 text-amber-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span className="text-sm font-bold">Medical assistance required</span>
            </label>

            {/* Checklist Item 5: Additional support required */}
            <label 
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                additionalSupportRequired 
                  ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 font-bold' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={additionalSupportRequired}
                onChange={(e) => setAdditionalSupportRequired(e.target.checked)}
                className="sr-only"
              />
              <div className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors">
                {additionalSupportRequired ? (
                  <CheckSquare className="w-5 h-5 text-indigo-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span className="text-sm font-bold">Additional support required</span>
            </label>
          </div>
        </div>

        {/* Optional Notes Field */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            Field Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={fieldNotes}
            onChange={(e) => setFieldNotes(e.target.value)}
            placeholder="Add field notes…"
            className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-xs font-medium text-slate-900 placeholder-slate-400 bg-white outline-none resize-none transition-all"
          />
        </div>

        {/* Button: “Submit Assessment” */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full min-h-[50px] py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Submit Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
