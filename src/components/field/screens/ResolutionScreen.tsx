import React, { useState } from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Paperclip, 
  Upload, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  Camera,
  Check
} from 'lucide-react';
import { FieldCase, ResolutionOption, FieldResolutionData } from '../types';

interface ResolutionScreenProps {
  caseItem: FieldCase;
  onBack: () => void;
  onSubmitSuccess: (data: FieldResolutionData) => void;
  onViewTimeline: () => void;
}

export const ResolutionScreen: React.FC<ResolutionScreenProps> = ({
  caseItem,
  onBack,
  onSubmitSuccess,
  onViewTimeline
}) => {
  const [selectedOption, setSelectedOption] = useState<ResolutionOption>('Person Located');
  const [notes, setNotes] = useState(
    'Subject confirmed safe. Identity verified with school identification and guardian confirmation. Family safeguarding team notified and taking custody.'
  );
  const [evidenceAttached, setEvidenceAttached] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resolutionOptions: ResolutionOption[] = [
    'Person Located',
    'Referred to Appropriate Authority',
    'Unable to Locate',
    'False / Invalid Report',
    'Additional Investigation Required'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const resData: FieldResolutionData = {
        caseId: caseItem.id,
        resolutionType: selectedOption,
        notes,
        supportingEvidenceAttached: evidenceAttached,
        evidenceFileName: evidenceAttached ? 'scene_safeguard_handoff.jpg' : undefined,
        resolvedAt: '6:10 PM',
        officerId: 'OFF-4028',
        officerName: 'Officer J. Mercer'
      };
      onSubmitSuccess(resData);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 bg-slate-50 flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in zoom-in-95 duration-200">
        <div className="my-auto text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-100">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
              CAD Record Synchronized
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Case updated successfully.
            </h2>
            <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
              Incident {caseItem.id} marked as <strong className="text-slate-800">[{selectedOption}]</strong> and transmitted to central emergency dispatch.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 text-left max-w-sm mx-auto text-xs space-y-2">
            <div className="flex justify-between text-slate-500">
              <span>Resolution Type:</span>
              <span className="font-bold text-emerald-600">{selectedOption}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Closed Timestamp:</span>
              <span className="font-bold text-slate-900">Today, 6:10 PM</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Resolving Officer:</span>
              <span className="font-bold text-slate-900">Officer J. Mercer (#4028)</span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 pt-4">
          <button
            onClick={onViewTimeline}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Full Case History Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

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

        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-1 rounded-md">
          {caseItem.id}
        </span>
      </div>

      {/* Screen Title (Exact Requirement) */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Close Case
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Select official resolution outcome and log mandatory closeout notes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Resolution Options (Exact 5 options) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
            Resolution Outcome
          </span>

          <div className="space-y-2">
            {resolutionOptions.map((opt) => {
              const isSelected = selectedOption === opt;
              return (
                <label
                  key={opt}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="resolutionOption"
                      checked={isSelected}
                      onChange={() => setSelectedOption(opt)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                  </div>

                  {opt === 'Person Located' && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Primary Outcome
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Required Field: Resolution Notes */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
              Resolution Notes <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] text-rose-500 font-bold">REQUIRED FOR CAD AUDIT</span>
          </div>

          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            placeholder="Resolution Notes..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-xs font-medium text-slate-900 placeholder-slate-400 bg-white outline-none resize-none transition-all"
          />
        </div>

        {/* Optional: Attach supporting evidence */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
            Supporting Evidence (Optional)
          </span>

          <div
            onClick={() => setEvidenceAttached(!evidenceAttached)}
            className={`p-3 rounded-xl border-2 border-dashed flex items-center justify-between cursor-pointer transition-colors ${
              evidenceAttached
                ? 'border-emerald-400 bg-emerald-50/50'
                : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Camera className="w-5 h-5 text-slate-500" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {evidenceAttached ? 'scene_safeguard_handoff.jpg' : 'Attach supporting evidence'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {evidenceAttached ? 'Photo attached (2.4 MB) • Tap to remove' : 'Tap to take photo or upload document'}
                </span>
              </div>
            </div>

            {evidenceAttached && (
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                Attached
              </span>
            )}
          </div>
        </div>

        {/* Primary Button: “Submit Resolution” */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !notes.trim()}
            className="w-full min-h-[50px] py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating CAD Registry...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span>Submit Resolution</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
