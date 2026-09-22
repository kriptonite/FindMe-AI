import React from 'react';
import { Navigation, MapPin, Compass, Shield, Radio } from 'lucide-react';

interface FieldMapCanvasProps {
  progress?: number; // 0 to 100% of route
  isNavigating?: boolean;
  destinationName?: string;
  distanceKm?: number;
  etaMin?: number;
  className?: string;
  onArrivedTrigger?: () => void;
}

export const FieldMapCanvas: React.FC<FieldMapCanvasProps> = ({
  progress = 0,
  isNavigating = false,
  destinationName = 'Central District (Transit Plaza)',
  distanceKm = 1.8,
  etaMin = 6,
  className = '',
  onArrivedTrigger
}) => {
  // Compute vehicle position along simulated route
  // Route goes from (x: 60, y: 380) to (x: 280, y: 140)
  const currentX = 60 + (280 - 60) * (progress / 100);
  const currentY = 380 + (140 - 380) * (progress / 100);

  return (
    <div className={`relative w-full h-full bg-[#e5e9f0] overflow-hidden select-none ${className}`}>
      {/* Tactical Vector Map SVG */}
      <svg
        className="w-full h-full"
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Street pattern & gradient fills */}
          <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Background Land & City Parcels */}
        <rect width="400" height="600" fill="#f1f5f9" />

        {/* City Blocks / Zoning Parcels */}
        <g fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1">
          {/* Block 1 */}
          <rect x="20" y="30" width="90" height="70" rx="4" />
          <rect x="130" y="30" width="100" height="70" rx="4" />
          <rect x="250" y="30" width="130" height="70" rx="4" />

          {/* Block 2 */}
          <rect x="20" y="120" width="90" height="90" rx="4" />
          <rect x="130" y="120" width="100" height="90" rx="4" />
          {/* Target Zone - Transit Pavilion */}
          <rect x="250" y="120" width="130" height="90" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />

          {/* Block 3 */}
          <rect x="20" y="230" width="90" height="100" rx="4" />
          <rect x="130" y="230" width="100" height="100" rx="4" />
          <rect x="250" y="230" width="130" height="100" rx="4" />

          {/* Block 4 */}
          <rect x="20" y="350" width="90" height="90" rx="4" />
          <rect x="130" y="350" width="100" height="90" rx="4" />
          <rect x="250" y="350" width="130" height="90" rx="4" />

          {/* Block 5 - South Hub */}
          <rect x="20" y="460" width="160" height="110" rx="4" />
          <rect x="200" y="460" width="180" height="110" rx="4" />
        </g>

        {/* Public Park Zone */}
        <path d="M135 235 H225 V325 H135 Z" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
        <text x="180" y="285" fill="#166534" fontSize="9" fontWeight="700" textAnchor="middle">
          Civic Plaza Park
        </text>

        {/* Grid Road Network */}
        {/* Horizontal Avenues */}
        <line x1="0" y1="110" x2="400" y2="110" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
        <line x1="0" y1="110" x2="400" y2="110" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6,6" />

        <line x1="0" y1="220" x2="400" y2="220" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" />
        <line x1="0" y1="220" x2="400" y2="220" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6,6" />

        <line x1="0" y1="340" x2="400" y2="340" stroke="#ffffff" strokeWidth="22" strokeLinecap="round" />
        <line x1="0" y1="340" x2="400" y2="340" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6,6" />

        <line x1="0" y1="450" x2="400" y2="450" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" />

        {/* Vertical Streets */}
        <line x1="120" y1="0" x2="120" y2="600" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
        <line x1="240" y1="0" x2="240" y2="600" stroke="#ffffff" strokeWidth="22" strokeLinecap="round" />

        {/* Street Name Labels */}
        <text x="12" y="106" fill="#64748b" fontSize="8" fontWeight="600">Pine St</text>
        <text x="12" y="216" fill="#64748b" fontSize="8" fontWeight="600">Grand Ave</text>
        <text x="12" y="336" fill="#64748b" fontSize="9" fontWeight="700">Elmwood Ave (Main)</text>
        <text x="12" y="446" fill="#64748b" fontSize="8" fontWeight="600">4th Street</text>

        <text x="125" y="55" fill="#64748b" fontSize="8" fontWeight="600" transform="rotate(90, 125, 55)">2nd Ave</text>
        <text x="245" y="55" fill="#64748b" fontSize="9" fontWeight="700" transform="rotate(90, 245, 55)">Transit Concourse Way</text>

        {/* Recommended Route Polyline (Bold High-Contrast Blue) */}
        <path
          d="M60 380 L60 340 L240 340 L240 140 L280 140"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />
        <path
          d="M60 380 L60 340 L240 340 L240 140 L280 140"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Directional Chevron Arrows on Route */}
        <g fill="#ffffff" opacity="0.9">
          {/* Arrow 1: up */}
          <polygon points="60,358 57,364 63,364" />
          {/* Arrow 2: right */}
          <polygon points="150,340 144,337 144,343" />
          {/* Arrow 3: right */}
          <polygon points="200,340 194,337 194,343" />
          {/* Arrow 4: up */}
          <polygon points="240,240 237,246 243,246" />
          {/* Arrow 5: right to target */}
          <polygon points="265,140 259,137 259,143" />
        </g>

        {/* Reported Sighting Location Destination Pin */}
        <g transform="translate(280, 140)" filter="url(#mapShadow)">
          {/* Radar ripple rings */}
          <circle cx="0" cy="0" r="18" fill="#f59e0b" fillOpacity="0.2" className="animate-ping" />
          <circle cx="0" cy="0" r="12" fill="#f59e0b" fillOpacity="0.3" />
          <circle cx="0" cy="0" r="7" fill="#d97706" />
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" />

          {/* Sighting Pin Flag Marker */}
          <g transform="translate(-16, -38)">
            <rect x="0" y="0" width="76" height="24" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="38" y="15" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle">
              FM-10427 SIGHTING
            </text>
          </g>
        </g>

        {/* Current Team Location: Unit 4 Vehicle/Officer Marker */}
        <g transform={`translate(${currentX}, ${currentY})`} filter="url(#mapShadow)">
          {/* Live GPS pulse wave */}
          <circle cx="0" cy="0" r="16" fill="#2563eb" fillOpacity="0.25" className="animate-pulse" />
          <circle cx="0" cy="0" r="9" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2.5" />
          
          {/* Heading pointer */}
          <polygon points="0,-14 -4,-7 4,-7" fill="#2563eb" />
          
          {/* Officer Call-sign Bubble */}
          <g transform="translate(-36, -34)">
            <rect x="0" y="0" width="72" height="20" rx="5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
            <text x="36" y="13" fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle">
              UNIT 4 (YOU)
            </text>
          </g>
        </g>
      </svg>

      {/* Compass / Orientation Floating Chip */}
      <div className="absolute top-3 right-3 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700">
          <Compass className="w-5 h-5 text-blue-600" />
        </div>
        <div className="px-2 py-1 bg-white/95 backdrop-blur-xs rounded-lg shadow-sm border border-slate-200 text-[10px] font-bold text-slate-700">
          35 MPH
        </div>
      </div>

      {/* GPS Accuracy Watermark */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>GPS Locked (± 3m)</span>
      </div>

      {/* Turn-by-Turn Guidance Banner */}
      <div className="absolute top-12 left-3 right-3 bg-slate-950/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-xs">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase">Next Maneuver</span>
            <p className="text-xs font-bold text-white">In 400m, turn right onto Elmwood Ave</p>
            <p className="text-[10px] text-slate-400">Then proceed 1.2 km towards Transit Plaza</p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-base font-black text-white">{distanceKm} km</span>
          <span className="text-[11px] text-emerald-400 font-bold block">{etaMin} min</span>
        </div>
      </div>
    </div>
  );
};
