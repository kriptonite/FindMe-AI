import React, { useState } from 'react';
import { X, ShieldAlert, ZoomIn, Eye, Sparkles, AlertCircle, FileCheck, Layers } from 'lucide-react';
import { FieldCase } from './types';

interface EvidenceInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: FieldCase;
}

export const EvidenceInspectionModal: React.FC<EvidenceInspectionModalProps> = ({
  isOpen,
  onClose,
  caseItem
}) => {
  const [activeView, setActiveView] = useState<'sighting' | 'comparison' | 'metadata'>('sighting');
  const [showOverlays, setShowOverlays] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col text-white max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold text-xs border border-blue-500/30">
              EVIDENCE
            </span>
            <span className="font-bold text-sm text-white">{caseItem.id} Sighting Evidence</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="grid grid-cols-3 p-1.5 bg-slate-950/80 border-b border-slate-800 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveView('sighting')}
            className={`py-1.5 rounded-xl transition-all ${
              activeView === 'sighting'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Captured Photo
          </button>
          <button
            onClick={() => setActiveView('comparison')}
            className={`py-1.5 rounded-xl transition-all ${
              activeView === 'comparison'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setActiveView('metadata')}
            className={`py-1.5 rounded-xl transition-all ${
              activeView === 'metadata'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Landmarks
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {/* Important Advisory Banner */}
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-amber-300 uppercase tracking-wide">Mandatory Advisory Notice</p>
              <p className="text-amber-100/90 mt-0.5 leading-relaxed">
                AI results are advisory. Confirm identity through authorized procedures. Do not base protective custody solely on visual match scores.
              </p>
            </div>
          </div>

          {activeView === 'sighting' && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-4/3 flex items-center justify-center group">
                <img 
                  src={caseItem.sightingImage} 
                  alt="Citizen Sighting"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* AI Facial & Upper Body Landmark Overlays */}
                {showOverlays && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Bounding box around subject */}
                    <div className="absolute top-[18%] left-[26%] w-[48%] h-[68%] border-2 border-dashed border-blue-400/80 rounded-lg">
                      <div className="absolute -top-5 left-1 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                        Subject #1 • 87% Match
                      </div>
                    </div>
                    {/* Upper torso garment note */}
                    <div className="absolute bottom-[22%] left-[28%] bg-slate-900/90 text-sky-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-sky-400/40">
                      Gray Hooded Sweatshirt
                    </div>
                  </div>
                )}

                {/* Toggle Overlay Button */}
                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-[10px] font-semibold text-slate-200 border border-slate-700 flex items-center gap-1 backdrop-blur-xs transition-colors"
                >
                  <Layers className="w-3 h-3 text-blue-400" />
                  <span>{showOverlays ? 'Hide Landmarks' : 'Show Landmarks'}</span>
                </button>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Photo Source:</span>
                  <span className="text-white font-medium">{caseItem.reporter.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Captured:</span>
                  <span className="text-white font-medium">{caseItem.reportedTime}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Location:</span>
                  <span className="text-white font-medium truncate max-w-[200px]">{caseItem.location}</span>
                </div>
              </div>
            </div>
          )}

          {activeView === 'comparison' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 bg-black">
                    <img 
                      src={caseItem.sightingImage} 
                      alt="Sighting" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Field Sighting
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium text-center">Citizen Capture</p>
                </div>

                <div className="space-y-1">
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 bg-black">
                    <img 
                      src={caseItem.referenceRecordImage || caseItem.sightingImage} 
                      alt="Reference Record" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Missing Record
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium text-center">{caseItem.reportedIndividual} (Age {caseItem.age})</p>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Biometric Similarity:</span>
                  <span className="text-emerald-400 font-bold">{caseItem.aiConfidence}% Advisory Match</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Facial Proportion Index:</span>
                  <span className="text-blue-300 font-medium">91.4% Correlation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Clothing Advisory:</span>
                  <span className="text-amber-300 font-medium">Upper Garment Matched</span>
                </div>
              </div>
            </div>
          )}

          {activeView === 'metadata' && (
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2">
                <h5 className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Biometric Diagnostic Markers</span>
                </h5>
                <p className="text-slate-400 leading-relaxed">
                  The neural model matched facial bone geometry, ocular distance, and outer apparel silhouette with active Missing Bulletin MP-44021.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Image Quality</span>
                    <span className="font-bold text-emerald-400">High (92%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">GPS Precision</span>
                    <span className="font-bold text-blue-400">± 8.2 meters</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">Reported Description</span>
                <p className="text-white font-medium leading-snug">{caseItem.description}</p>
                <p className="text-slate-300 mt-1 text-[11px]">{caseItem.clothingDetails}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-colors"
          >
            Close Evidence Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
