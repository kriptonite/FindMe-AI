import React from 'react';
import { X, ShieldAlert, PhoneCall, CheckCircle2, Eye, Lock, HeartHandshake } from 'lucide-react';

interface HelpSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpSafetyModal: React.FC<HelpSafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Help & Safety Guide</h3>
              <p className="text-[10px] text-slate-500">FindMe AI Responsible Reporting Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-xs text-slate-600 max-h-[60vh] overflow-y-auto pr-1">
          {/* Rule 1 */}
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>1. Never Put Yourself or Others at Risk</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-amber-900/90">
              Maintain a safe, respectful distance. Do not attempt to restrain, detain, or confront anyone you believe may be missing or vulnerable.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950">
            <div className="font-bold flex items-center gap-1.5 text-blue-900">
              <Eye className="w-4 h-4 text-blue-600 shrink-0" />
              <span>2. Take Clear, Safe Photos Only</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-blue-900/90">
              Capture photos in public spaces without causing alarm or escalating tension. If taking a photo is unsafe, you can submit descriptive text and location only.
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3. Ethical AI & Human Review</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-emerald-900/90">
              AI suggestions are decision-support tools. All sightings are verified by authorized triage coordinators prior to notifying police dispatch.
            </p>
          </div>

          {/* Rule 4 */}
          <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950">
            <div className="font-bold flex items-center gap-1.5 text-rose-900">
              <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
              <span>4. Immediate Emergencies</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-rose-900/90">
              If an individual appears injured, in severe distress, or under immediate physical threat, call 911 emergency services immediately before logging a report.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
