import React from 'react';
import { 
  X, 
  Menu, 
  Bell, 
  Camera, 
  MapPin, 
  Calendar, 
  Home, 
  Eye, 
  User, 
  CheckCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { FindMeLogo, FindMePinIcon } from './FindMeLogo';

export interface CitizenReportData {
  image?: string;
  confidence?: number;
  location?: string;
  description?: string;
}

interface CitizenMobileAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateReport?: (data?: CitizenReportData) => void;
  onSimulateIngest?: () => void;
}

export const CitizenMobileAppModal: React.FC<CitizenMobileAppModalProps> = ({
  isOpen,
  onClose,
  onSimulateReport,
  onSimulateIngest
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Context & Flow Explanation */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 text-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ingestion Source: Citizen Mobile Client</span>
            </div>

            <FindMeLogo size="lg" variant="dark" showTagline={true} />

            <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-4 leading-snug">
              Helping communities and authorities <span className="text-blue-400">find missing people</span> faster.
            </h3>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              FindMe AI enables verified citizens to report sightings with photos and location. Our AI analyzes biometric and contextual information to find potential matches and routes them to this <span className="text-white font-medium">Human Review Console</span> for authorization before notifying local authorities.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Instant Citizen Sighting Capture</h5>
                  <p className="text-[11px] text-slate-400">Photos, timestamp, GPS geotag, and clothing description.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">87% Potential Match Alert</h5>
                  <p className="text-[11px] text-slate-400">Immediate correlation with active missing persons registry.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Synced with CAD dispatch & review queue
            </span>
            {(onSimulateReport || onSimulateIngest) && (
              <button
                onClick={() => {
                  if (onSimulateReport) {
                    onSimulateReport({
                      location: 'Central Plaza, Community Park (2.3 km away)',
                      confidence: 87,
                      description: 'Young boy in blue crewneck shirt seen near community playground.'
                    });
                  } else if (onSimulateIngest) {
                    onSimulateIngest();
                  }
                  onClose();
                }}
                className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-md shadow-blue-900/40"
              >
                Send Sighting to Review Queue
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Realistic Phone Mockup from the Reference Image */}
        <div className="w-full md:w-[360px] p-6 bg-slate-950 flex items-center justify-center shrink-0">
          {/* Phone Shell */}
          <div className="w-[300px] h-[580px] bg-slate-900 rounded-[40px] border-[6px] border-slate-700 p-2 shadow-2xl shadow-black relative flex flex-col overflow-hidden ring-1 ring-slate-600/40">
            {/* Dynamic Island Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto my-1 z-20 shrink-0" />

            {/* App Screen Container */}
            <div className="flex-1 bg-white rounded-[32px] overflow-hidden flex flex-col text-slate-900 font-sans select-none">
              {/* App Top Bar */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 bg-white">
                <Menu className="w-5 h-5 text-slate-700" />
                <div className="flex items-center gap-1 font-bold text-sm">
                  <span className="text-slate-900">FindMe</span>
                  <span className="text-blue-600">AI</span>
                </div>
                <div className="relative">
                  <Bell className="w-5 h-5 text-slate-700" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                </div>
              </div>

              {/* App Body Content */}
              <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-slate-50/50">
                {/* Card 1: Report a Sighting */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-between shadow-md">
                  <div>
                    <h5 className="font-bold text-sm leading-tight text-white">Report a Sighting</h5>
                    <p className="text-[11px] text-slate-300 mt-0.5">Help us find missing people</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/40 hover:scale-105 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>

                {/* Card 2: AI Match Result */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    AI Match Result
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="font-bold text-xs text-emerald-600 leading-tight">
                        Possible Match Found
                      </div>
                      <div className="font-bold text-xs text-emerald-700">
                        Confidence: 87%
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-600 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>2.3 km away</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Today, 10:35 AM</span>
                      </div>
                    </div>

                    {/* Matched child picture thumbnail */}
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" 
                      alt="Matched sighting preview"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
                    />
                  </div>
                </div>

                {/* Card 3: Recent Sightings Map Preview */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">Recent Sightings</span>
                    <span className="text-[10px] font-semibold text-blue-600">View all</span>
                  </div>
                  <div className="h-20 w-full rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center">
                    {/* Simulated Map Graphic */}
                    <div className="absolute inset-0 bg-blue-50/40" />
                    <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-200" />
                    <div className="absolute top-3 right-8 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-200" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 animate-ping absolute" />
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white shadow-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="px-4 py-2 border-t border-slate-200 bg-white flex items-center justify-around text-slate-400">
                <div className="flex flex-col items-center text-blue-600">
                  <Home className="w-4 h-4" />
                  <span className="text-[9px] font-semibold mt-0.5">Home</span>
                </div>
                <div className="flex flex-col items-center hover:text-slate-700">
                  <Eye className="w-4 h-4" />
                  <span className="text-[9px] font-medium mt-0.5">Sightings</span>
                </div>
                <div className="flex flex-col items-center hover:text-slate-700">
                  <Bell className="w-4 h-4" />
                  <span className="text-[9px] font-medium mt-0.5">Alerts</span>
                </div>
                <div className="flex flex-col items-center hover:text-slate-700">
                  <User className="w-4 h-4" />
                  <span className="text-[9px] font-medium mt-0.5">Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
