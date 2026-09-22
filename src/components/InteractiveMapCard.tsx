import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Building2, 
  Radio, 
  Layers, 
  Compass, 
  Maximize2, 
  Eye, 
  Shield, 
  Car,
  Camera,
  Info
} from 'lucide-react';
import { SightingCase } from '../types';

interface InteractiveMapCardProps {
  sightingCase: SightingCase;
}

export const InteractiveMapCard: React.FC<InteractiveMapCardProps> = ({
  sightingCase
}) => {
  const [showCameras, setShowCameras] = useState(true);
  const [showRadius, setShowRadius] = useState(true);
  const [mapLayer, setMapLayer] = useState<'tactical' | 'satellite' | 'streets'>('tactical');

  const authorityName = sightingCase.forwarding?.destinationAuthority || 'Metro Emergency Dispatch — Precinct 4';
  const assignedUnit = sightingCase.forwarding?.assignedUnit || 'Unit 14-B (Rapid Response)';

  return (
    <div 
      id="interactive-map-card" 
      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
    >
      {/* Map Card Header */}
      <div className="px-5 py-3.5 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Tactical Response Map
          </h3>
          <span className="px-2 py-0.5 text-[10px] font-mono bg-blue-50 text-blue-700 rounded border border-blue-200">
            Sector: {sightingCase.district}
          </span>
        </div>

        {/* Map Layers & Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowCameras(!showCameras)}
            className={`px-2 py-1 rounded-md border flex items-center gap-1 transition-colors ${
              showCameras 
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-medium' 
                : 'bg-white text-slate-500 border-slate-200'
            }`}
            title="Toggle Sector Cameras"
          >
            <Camera className="w-3 h-3" />
            <span className="hidden sm:inline">CCTV Feeds</span>
          </button>

          <button
            onClick={() => setShowRadius(!showRadius)}
            className={`px-2 py-1 rounded-md border flex items-center gap-1 transition-colors ${
              showRadius 
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-medium' 
                : 'bg-white text-slate-500 border-slate-200'
            }`}
            title="Toggle Perimeter Radius"
          >
            <Navigation className="w-3 h-3" />
            <span className="hidden sm:inline">Search Radius</span>
          </button>

          <div className="bg-slate-100 p-0.5 rounded-md border border-slate-200 flex text-[11px]">
            <button
              onClick={() => setMapLayer('tactical')}
              className={`px-2 py-0.5 rounded ${mapLayer === 'tactical' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-500'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setMapLayer('satellite')}
              className={`px-2 py-0.5 rounded ${mapLayer === 'satellite' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-500'}`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Vector Tactical Canvas */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950 select-none">
        {/* Background Grid & Streets */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tactical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={mapLayer === 'tactical' ? 'rgba(51, 65, 85, 0.4)' : 'rgba(30, 41, 59, 0.3)'} strokeWidth="0.8" />
            </pattern>
            <radialGradient id="radar-pulse-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill={mapLayer === 'tactical' ? '#090d16' : '#040711'} />
          <rect width="100%" height="100%" fill="url(#tactical-grid)" />

          {/* Simulated Street / River geometry */}
          <path d="M 0,220 Q 180,190 350,230 T 700,180 T 1000,200" fill="none" stroke="#1e293b" strokeWidth="24" />
          <path d="M 120,0 L 160,400" fill="none" stroke="#1e293b" strokeWidth="12" />
          <path d="M 380,0 L 420,400" fill="none" stroke="#1e293b" strokeWidth="16" />
          <path d="M 640,0 L 610,400" fill="none" stroke="#1e293b" strokeWidth="12" />
          <path d="M 0,110 L 900,110" fill="none" stroke="#1e293b" strokeWidth="14" />
          <path d="M 0,290 L 900,270" fill="none" stroke="#1e293b" strokeWidth="10" />

          {/* Assigned response region polygon */}
          <polygon 
            points="180,60 480,40 540,240 220,260" 
            fill="rgba(37, 99, 235, 0.08)" 
            stroke="#2563eb" 
            strokeWidth="1.5" 
            strokeDasharray="4 4"
          />
          <text x="230" y="80" fill="#60a5fa" fontSize="10" fontFamily="monospace" fontWeight="bold">
            ASSIGNED RESPONSE REGION: SECTOR {sightingCase.district.toUpperCase()}
          </text>

          {/* Search Radius Circle around Sighting */}
          {showRadius && (
            <>
              <circle cx="380" cy="160" r="95" fill="url(#radar-pulse-gradient)" />
              <circle cx="380" cy="160" r="95" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="380" cy="160" r="50" fill="none" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
            </>
          )}

          {/* Line of dispatch between Authority and Sighting */}
          <line 
            x1="180" 
            y1="80" 
            x2="380" 
            y2="160" 
            stroke="#10b981" 
            strokeWidth="1.5" 
            strokeDasharray="5 5" 
            opacity="0.8"
          />

          {/* Sighting Location Pin (380, 160) */}
          <g transform="translate(380, 160)">
            <circle r="18" fill="#ef4444" opacity="0.2">
              <animate attributeName="r" values="12;26;12" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Authority Location Pin (180, 80) */}
          <g transform="translate(180, 80)">
            <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <circle r="4" fill="#3b82f6" />
          </g>

          {/* Dispatched Patrol Unit (280, 120) */}
          <g transform="translate(280, 120)">
            <circle r="12" fill="#10b981" opacity="0.25">
              <animate attributeName="r" values="8;16;8" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* CCTV Camera Icons */}
          {showCameras && (
            <>
              <g transform="translate(320, 130)" opacity="0.85">
                <circle r="4" fill="#38bdf8" />
                <path d="M4,0 L14,-6 L14,6 Z" fill="rgba(56, 189, 248, 0.4)" />
              </g>
              <g transform="translate(440, 190)" opacity="0.85">
                <circle r="4" fill="#38bdf8" />
                <path d="M-4,0 L-14,-6 L-14,6 Z" fill="rgba(56, 189, 248, 0.4)" />
              </g>
              <g transform="translate(400, 90)" opacity="0.85">
                <circle r="4" fill="#38bdf8" />
                <path d="M0,4 L-6,14 L6,14 Z" fill="rgba(56, 189, 248, 0.4)" />
              </g>
            </>
          )}
        </svg>

        {/* Floating Marker Badges on Canvas */}
        {/* Sighting Pin Tag */}
        <div 
          className="absolute text-[11px] font-sans pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="bg-slate-900/90 text-white px-2.5 py-1 rounded-lg border border-red-500/60 shadow-lg backdrop-blur-xs flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-bold">Sighting Location:</span>
            <span className="font-mono text-slate-300">{sightingCase.id}</span>
          </div>
        </div>

        {/* Authority Station Tag */}
        <div 
          className="absolute text-[11px] font-sans pointer-events-none"
          style={{ left: '20%', top: '15%' }}
        >
          <div className="bg-slate-900/90 text-white px-2 py-0.5 rounded border border-blue-500/50 shadow-md backdrop-blur-xs flex items-center gap-1 whitespace-nowrap">
            <Building2 className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] text-slate-200">Precinct 4 HQ</span>
          </div>
        </div>

        {/* Dispatched Patrol Tag */}
        <div 
          className="absolute text-[11px] font-sans pointer-events-none"
          style={{ left: '35%', top: '32%' }}
        >
          <div className="bg-slate-900/90 text-white px-2 py-0.5 rounded border border-emerald-500/60 shadow-md backdrop-blur-xs flex items-center gap-1 whitespace-nowrap">
            <Car className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-300">Unit 14-B (ETA ~4m)</span>
          </div>
        </div>

        {/* Map Telemetry Overlay Info Box */}
        <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-white text-[11px] font-mono space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Coords:</span>
            <span className="text-sky-300">40.7128° N, -74.0060° W</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Disp. Distance:</span>
            <span className="text-emerald-400">0.84 miles (In Transit)</span>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-xs px-2 py-1 rounded text-slate-400 text-[10px] font-mono border border-white/10">
          Scale: 1:5000 • Live CAD Sync
        </div>
      </div>

      {/* Map Card Footer Details */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <span className="text-slate-500 block">Sighting Location:</span>
          <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            {sightingCase.location}
          </span>
        </div>

        <div>
          <span className="text-slate-500 block">Assigned Response Region:</span>
          <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
            <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            Sector {sightingCase.district}
          </span>
        </div>

        <div>
          <span className="text-slate-500 block">Authority Location:</span>
          <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            {authorityName}
          </span>
        </div>
      </div>
    </div>
  );
};
