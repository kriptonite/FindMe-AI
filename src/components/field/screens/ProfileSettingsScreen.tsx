import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Activity, 
  Bell, 
  MapPin, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Radio, 
  Check, 
  PhoneCall,
  Lock
} from 'lucide-react';
import { FieldOfficerProfile, AvailabilityStatus } from '../types';

interface ProfileSettingsScreenProps {
  officer: FieldOfficerProfile;
  onBack: () => void;
  onUpdateStatus: (status: AvailabilityStatus) => void;
  onSignOut: () => void;
  onContactDispatch: () => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  officer,
  onBack,
  onUpdateStatus,
  onSignOut,
  onContactDispatch
}) => {
  const [radioAlerts, setRadioAlerts] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [highAccuracyGps, setHighAccuracyGps] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);

  const statuses: AvailabilityStatus[] = [
    'Available for Dispatch',
    'On Active Response',
    'Busy / Standby',
    'Off-Duty'
  ];

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
          TERMINAL #04
        </span>
      </div>

      {/* Screen Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Field Profile & Settings
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Authorized unit credentials, CAD telemetry settings, and security status.
        </p>
      </div>

      {/* Officer / Team ID Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-3">
          <img 
            src={officer.avatar} 
            alt={officer.name} 
            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
              Authorized Field Personnel
            </span>
            <h2 className="text-base font-black text-slate-900 leading-tight">
              {officer.name}
            </h2>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
              <span className="font-mono font-bold text-slate-700">{officer.badgeNumber}</span>
              <span>•</span>
              <span className="font-semibold">{officer.unit}</span>
            </div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">{officer.organization}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            ACTIVE SHIFT
          </span>
        </div>
      </div>

      {/* Availability Status Section */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Availability Status
          </span>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {officer.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {statuses.map((st) => {
            const isActive = officer.status === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => onUpdateStatus(st)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-semibold'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{st}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Notification Settings</span>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Priority Radio Broadcast Tones</span>
              <span className="text-[11px] text-slate-500">Audible siren tone on emergency missing bulletin</span>
            </div>
            <input 
              type="checkbox" 
              checked={radioAlerts} 
              onChange={(e) => setRadioAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-100">
            <div>
              <span className="font-bold text-slate-900 block">Tactile / Haptic Vibration</span>
              <span className="text-[11px] text-slate-500">Pulse patterns for turns and arrival triggers</span>
            </div>
            <input 
              type="checkbox" 
              checked={hapticFeedback} 
              onChange={(e) => setHapticFeedback(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Location Permissions */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>Location Permissions</span>
        </div>

        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">High Accuracy GPS Telemetry</span>
              <span className="text-[11px] text-emerald-600 font-semibold">● Active (± 3m RTK precision)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Always On
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Required by CAD for automated dispatch geo-fencing and arrival logging.
          </p>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5">
        <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Security & Compliance</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Security Standard:</span>
            <span className="font-bold text-slate-900">CJIS & FIPS-140-2</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Clearance Level:</span>
            <span className="font-bold text-blue-700">{officer.cjisClearance}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Radio Trunk:</span>
            <span className="font-mono text-slate-900">{officer.directRadioFreq}</span>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2.5">
        <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-slate-600" />
          <span>Help & Support</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={onContactDispatch}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>CAD Trunk Help</span>
          </button>

          <button
            onClick={() => alert('Emergency Field SOP manual loaded into memory.')}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Field SOP Guide</span>
          </button>
        </div>
      </div>

      {/* Sign Out Button (Exact Requirement) */}
      <div className="pt-2">
        <button
          onClick={onSignOut}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 font-black text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
