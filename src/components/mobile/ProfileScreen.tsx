import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Bell, 
  Lock, 
  MapPin, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  UserCheck,
  FileText,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { CitizenUser } from './types';

interface ProfileScreenProps {
  user: CitizenUser;
  onSignOut: () => void;
  onBack: () => void;
  onOpenHelp: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onSignOut,
  onBack,
  onOpenHelp
}) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsUrgentEnabled, setSmsUrgentEnabled] = useState(true);
  const [nearbyAlertsEnabled, setNearbyAlertsEnabled] = useState(true);
  const [preciseLocation, setPreciseLocation] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
    setter(!current);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-full bg-slate-50/50 pb-20 text-slate-900 select-none">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 shadow-xs sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-base font-bold text-slate-900">Profile & Settings</h1>

          <div className="w-7" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white font-bold text-xl flex items-center justify-center shadow-md">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-slate-900 line-clamp-1">
                {user.name}
              </h2>
            </div>
            {/* Verified User Status */}
            <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified User (ID Confirmed)</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Preferences saved successfully</span>
          </div>
        )}

        {/* Section 1: Notification Preferences */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-3 pt-1">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-900">Push Notifications</div>
                <div className="text-[11px] text-slate-500">Real-time status updates on submitted sightings</div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(setPushEnabled, pushEnabled)}
                className={`w-10 h-5.5 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                  pushEnabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                  pushEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <div className="text-xs font-semibold text-slate-900">Urgent SMS Alerts</div>
                <div className="text-[11px] text-slate-500">Critical missing-child / vulnerable amber bulletins</div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(setSmsUrgentEnabled, smsUrgentEnabled)}
                className={`w-10 h-5.5 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                  smsUrgentEnabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                  smsUrgentEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <div className="text-xs font-semibold text-slate-900">Nearby Area Broadcasts</div>
                <div className="text-[11px] text-slate-500">Alerts within 5 miles of current location</div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(setNearbyAlertsEnabled, nearbyAlertsEnabled)}
                className={`w-10 h-5.5 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                  nearbyAlertsEnabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                  nearbyAlertsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Privacy & Security */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Privacy & Security
            </h3>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <div className="font-semibold text-slate-900">End-to-End Encryption</div>
                <div className="text-[11px] text-slate-500">Biometrics & photos sealed with TLS 1.3</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <div className="font-semibold text-slate-900">Location Permissions</div>
                <div className="text-[11px] text-slate-500">While using application (High Accuracy)</div>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                Granted
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <div className="font-semibold text-slate-900">Data Retention Protocol</div>
                <div className="text-[11px] text-slate-500">Unmatched imagery purged after 30 days</div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Auto-Purge
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Help & Support */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Help & Support
            </h3>
          </div>

          <button
            onClick={onOpenHelp}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors text-left group"
          >
            <div>
              <div className="text-xs font-semibold text-slate-900">Safety & Sighting Guidelines</div>
              <div className="text-[11px] text-slate-500">How to capture safe evidence without risk</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-rose-900">Life-Threatening Emergency?</div>
              <div className="text-[11px] text-rose-700">Call local 911 immediately.</div>
            </div>
            <span className="px-3 py-1 bg-rose-600 text-white rounded-xl font-bold text-xs shadow-xs">
              Call 911
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2">
          <button
            onClick={onSignOut}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs border border-slate-200 hover:border-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of FindMe AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
