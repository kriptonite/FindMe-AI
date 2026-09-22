import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Bell, 
  Sliders, 
  UserCheck, 
  Lock, 
  EyeOff, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { ReviewerProfile } from '../types';

interface SettingsViewProps {
  reviewer: ReviewerProfile;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  reviewer,
  onResetData
}) => {
  const [highConfidenceThreshold, setHighConfidenceThreshold] = useState(80);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [autoBlurBystanders, setAutoBlurBystanders] = useState(true);
  const [auditLoggingLevel, setAuditLoggingLevel] = useState('Detailed (Level 4)');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div id="settings-view-container" className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
          Console Settings & Triage Thresholds
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Configure operational parameters, ethical AI confidence limits, and privacy redaction defaults.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Console configuration saved successfully.</span>
        </div>
      )}

      {/* Reviewer Profile Details */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <span>Certified Reviewer Credentials</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">Reviewer Name:</span>
            <span className="font-bold text-slate-900">{reviewer.name}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">Badge / Identifier:</span>
            <span className="font-bold text-slate-900 font-mono">{reviewer.reviewerId}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">Security Clearance:</span>
            <span className="font-bold text-slate-900">{reviewer.clearanceLevel}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block">Assigned Duty Shift:</span>
            <span className="font-bold text-slate-900">{reviewer.shiftHours}</span>
          </div>
        </div>
      </div>

      {/* Biometric AI Triage Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>AI Decision Support Thresholds</span>
        </h2>

        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-semibold text-slate-800 mb-1.5">
              <span>High-Confidence Match Trigger:</span>
              <span className="font-mono text-blue-600 font-bold">{highConfidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="65"
              max="95"
              value={highConfidenceThreshold}
              onChange={(e) => setHighConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Sightings scoring at or above this score are escalated directly to the Priority Queue with an audio alert.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Automated Bystander Redaction</span>
              <span className="text-[11px] text-slate-500">Automatically blur unassociated bystanders in public CCTV footage</span>
            </div>
            <button
              type="button"
              onClick={() => setAutoBlurBystanders(!autoBlurBystanders)}
              className={`w-11 h-6 rounded-full transition-colors relative ${autoBlurBystanders ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${autoBlurBystanders ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Critical Audio Dispatch Chime</span>
              <span className="text-[11px] text-slate-500">Play tone on verified high-priority alert ingestion</span>
            </div>
            <button
              type="button"
              onClick={() => setSoundAlerts(!soundAlerts)}
              className={`w-11 h-6 rounded-full transition-colors relative ${soundAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${soundAlerts ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Prototype Reset Controls */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Prototype Demo Reset</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Reset all fictional sightings, review decisions, and authority dispatches back to initial seed state.
          </p>
        </div>
        <button
          onClick={onResetData}
          className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
