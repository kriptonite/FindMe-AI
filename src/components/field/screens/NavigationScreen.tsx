import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Radio, 
  PhoneCall, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Compass, 
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import { FieldMapCanvas } from '../FieldMapCanvas';
import { FieldCase } from '../types';

interface NavigationScreenProps {
  caseItem: FieldCase;
  onBack: () => void;
  onArrived: () => void;
  onContactDispatch: () => void;
  onStartActionInProgress: () => void;
}

export const NavigationScreen: React.FC<NavigationScreenProps> = ({
  caseItem,
  onBack,
  onArrived,
  onContactDispatch,
  onStartActionInProgress
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navProgress, setNavProgress] = useState(15);
  const [audioMuted, setAudioMuted] = useState(false);

  // Simulated vehicle movement when active navigation is engaged
  useEffect(() => {
    if (!isNavigating) return;
    const interval = setInterval(() => {
      setNavProgress(prev => {
        if (prev >= 98) {
          clearInterval(interval);
          onArrived();
          return 100;
        }
        return prev + 6;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isNavigating, onArrived]);

  const handleStartNav = () => {
    setIsNavigating(true);
    // Also notify active response
    onStartActionInProgress();
  };

  return (
    <div className="flex-1 bg-slate-900 flex flex-col relative overflow-hidden select-none">
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-slate-800 text-xs font-bold hover:bg-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Case Details</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setAudioMuted(!audioMuted)}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-slate-800 flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            title={audioMuted ? 'Unmute Audio' : 'Mute Voice Navigation'}
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
          </button>
        </div>
      </div>

      {/* Main Full-Screen Map Canvas */}
      <div className="flex-1 relative">
        <FieldMapCanvas
          progress={navProgress}
          isNavigating={isNavigating}
          destinationName={caseItem.district}
          distanceKm={Math.max(0.2, Number((caseItem.distanceKm * (1 - navProgress / 100)).toFixed(1)))}
          etaMin={Math.max(1, Math.ceil(caseItem.travelTimeMin * (1 - navProgress / 100)))}
        />
      </div>

      {/* Bottom Navigation Card (Strict User Specification) */}
      <div className="bg-white rounded-t-3xl p-4 sm:p-5 shadow-2xl border-t border-slate-200 z-30 space-y-3">
        {/* Destination & ETA Info */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Destination
            </span>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              {caseItem.district}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {caseItem.location}
            </p>
          </div>

          <div className="text-right bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
            <span className="text-xs font-black text-blue-900 block">
              {caseItem.distanceKm} km • {caseItem.travelTimeMin} min
            </span>
            <span className="text-[10px] font-bold text-blue-600">Fastest Route</span>
          </div>
        </div>

        {/* Dynamic Navigation Progress Bar (if navigating) */}
        {isNavigating && (
          <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <div className="flex justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live En-Route Tracking
              </span>
              <span>{navProgress}% to scene</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${navProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Buttons (Start Navigation & Call Dispatch) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {/* "Start Navigation" or "Simulate Arrival" */}
          {!isNavigating ? (
            <button
              onClick={handleStartNav}
              className="py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Start Navigation</span>
            </button>
          ) : (
            <button
              onClick={onArrived}
              className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Arrival</span>
            </button>
          )}

          {/* "Call Dispatch" */}
          <button
            onClick={onContactDispatch}
            className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Radio className="w-4 h-4 text-blue-400" />
            <span>Call Dispatch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
