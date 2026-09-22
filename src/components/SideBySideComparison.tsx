import React, { useState } from 'react';
import { 
  Split, 
  ZoomIn, 
  Layers, 
  Eye, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  AlertTriangle,
  HelpCircle,
  Crosshair
} from 'lucide-react';
import { SightingCase } from '../types';

interface SideBySideComparisonProps {
  sightingCase: SightingCase;
  onInspectImage: (imageUrl: string, title: string) => void;
}

export const SideBySideComparison: React.FC<SideBySideComparisonProps> = ({
  sightingCase,
  onInspectImage
}) => {
  const [showBiometricLandmarks, setShowBiometricLandmarks] = useState(true);
  const [splitSliderPos, setSplitSliderPos] = useState(50);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'overlay-slider'>('side-by-side');

  const { aiAnalysis } = sightingCase;

  return (
    <div 
      id="side-by-side-comparison-card" 
      className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Side-by-Side Evidence Comparison
            </h3>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded-md border border-blue-200/80">
              Biometric Alignment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare citizen-submitted capture against reference record dossier
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowBiometricLandmarks(!showBiometricLandmarks)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              showBiometricLandmarks 
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{showBiometricLandmarks ? 'Biometrics: On' : 'Biometrics: Off'}</span>
          </button>

          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'side-by-side' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('overlay-slider')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'overlay-slider' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Split Slider
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Display Area */}
      <div className="p-6 space-y-6">
        {viewMode === 'side-by-side' ? (
          /* Side by side display */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Sighting Image */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Sighting Image
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {sightingCase.id} • {sightingCase.sightingTime}
                </span>
              </div>

              <div className="relative h-72 rounded-xl bg-slate-950 overflow-hidden border border-slate-300 group">
                <img
                  src={sightingCase.reportedImage}
                  alt="Sighting capture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Biometric Landmark Overlay */}
                {showBiometricLandmarks && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Interpupillary line */}
                    <div className="absolute top-[38%] left-[42%] w-[16%] border-t-2 border-dashed border-sky-400 shadow-xs" />
                    {/* Landmark crosshairs */}
                    <div className="absolute top-[36%] left-[42%] w-3 h-3 border border-sky-400 rounded-full animate-pulse" />
                    <div className="absolute top-[36%] left-[58%] w-3 h-3 border border-sky-400 rounded-full animate-pulse" />
                    {/* Jawline contour polygon */}
                    <div className="absolute top-[52%] left-[45%] w-[10%] h-[15%] border-b-2 border-dashed border-emerald-400 rounded-b-xl" />
                    <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-[10px] text-sky-200 px-2 py-1 rounded border border-sky-400/30 font-mono">
                      Target Points: 48 Landmarks Mapped
                    </div>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => onInspectImage(sightingCase.reportedImage, `Sighting Image — ${sightingCase.id}`)}
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Missing Person Record */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  Missing Person Record
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {aiAnalysis.matchingRecordId} • {aiAnalysis.recordName}
                </span>
              </div>

              <div className="relative h-72 rounded-xl bg-slate-950 overflow-hidden border border-slate-300 group">
                <img
                  src={aiAnalysis.recordImage}
                  alt="Reference record"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Biometric Landmark Overlay */}
                {showBiometricLandmarks && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[37%] left-[41%] w-[18%] border-t-2 border-dashed border-sky-400 shadow-xs" />
                    <div className="absolute top-[35%] left-[41%] w-3 h-3 border border-sky-400 rounded-full animate-pulse" />
                    <div className="absolute top-[35%] left-[59%] w-3 h-3 border border-sky-400 rounded-full animate-pulse" />
                    <div className="absolute top-[51%] left-[45%] w-[10%] h-[15%] border-b-2 border-dashed border-emerald-400 rounded-b-xl" />
                    <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-[10px] text-indigo-200 px-2 py-1 rounded border border-indigo-400/30 font-mono">
                      Baseline Record: High Fidelity Archive
                    </div>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => onInspectImage(aiAnalysis.recordImage, `Reference Record Dossier — ${aiAnalysis.matchingRecordId}`)}
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Split slider view */
          <div className="space-y-3">
            <div className="relative h-80 rounded-xl bg-slate-950 overflow-hidden border border-slate-300 select-none">
              {/* Reference image (background) */}
              <img
                src={aiAnalysis.recordImage}
                alt="Reference record"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Sighting image (clipped on top) */}
              <div 
                className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-xl"
                style={{ width: `${splitSliderPos}%` }}
              >
                <img
                  src={sightingCase.reportedImage}
                  alt="Sighting capture"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%' }}
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Sighting Image
                </div>
              </div>

              <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Missing Person Record
              </div>

              {/* Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center -ml-0.5 pointer-events-none"
                style={{ left: `${splitSliderPos}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-800 text-xs font-bold">
                  ↔
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">Split Ratio:</span>
              <input
                type="range"
                min="10"
                max="90"
                value={splitSliderPos}
                onChange={(e) => setSplitSliderPos(Number(e.target.value))}
                className="flex-1 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-700 w-10">
                {splitSliderPos}%
              </span>
            </div>
          </div>
        )}

        {/* Feature Comparison Metrics Matrix */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Facial Similarity */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Facial Similarity
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-slate-900">
                {aiAnalysis.facialSimilarity}%
              </span>
              <span className="text-xs font-medium text-emerald-600">
                High Correlation
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Based on deep metric distance & facial nodal points.
            </p>
          </div>

          {/* Image Quality */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Image Quality
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-slate-900">
                {aiAnalysis.imageQuality}
              </span>
              <span className="text-xs font-medium text-blue-600">
                {aiAnalysis.imageQualityScore}% Clarity
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Adequate lighting, minimal motion blur detected.
            </p>
          </div>

          {/* Approximate Age Similarity */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Approximate Age Similarity
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-sm font-bold text-slate-900 truncate">
                {aiAnalysis.ageSimilarity}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Neural age range aligns with dossier timeline.
            </p>
          </div>

          {/* Other Available Attributes */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Other Matching Attributes
            </span>
            <div className="mt-1 text-xs font-semibold text-slate-900">
              Clothing & Landmark Plausibility
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug truncate" title={aiAnalysis.otherAttributes.clothingMatch}>
              {aiAnalysis.otherAttributes.clothingMatch}
            </p>
          </div>
        </div>

        {/* Prominent Caution Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <span className="font-bold">Human Oversight Mandatory:</span>{' '}
            AI indicators represent probabilistic pattern matching and do not imply that AI has definitively identified the person. Physical verification by certified officers is always required.
          </div>
        </div>
      </div>
    </div>
  );
};
