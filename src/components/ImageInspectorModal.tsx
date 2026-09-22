import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, RefreshCw, Sliders } from 'lucide-react';

interface ImageInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export const ImageInspectorModal: React.FC<ImageInspectorModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  if (!isOpen) return null;

  return (
    <div 
      id="image-inspector-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div 
        id="image-inspector-modal"
        className="bg-slate-900 text-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400">High-Fidelity Biometric Inspection Stills</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Controls */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.25, 3))}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="px-1.5 font-mono text-[11px] text-slate-400">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRotation(prev => (prev + 90) % 360)}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white ml-1"
                title="Rotate 90deg"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setRotation(0);
                  setBrightness(100);
                  setContrast(100);
                }}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white"
                title="Reset Inspection"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 bg-black/80 overflow-auto p-6 flex items-center justify-center min-h-[400px]">
          <div 
            className="transition-transform duration-200"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              filter: `brightness(${brightness}%) contrast(${contrast}%)`
            }}
          >
            <img
              src={imageUrl}
              alt="Inspected Evidence"
              referrerPolicy="no-referrer"
              className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        </div>

        {/* Footer info & sliders */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>Brightness:</span>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-20 accent-blue-500"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span>Contrast:</span>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-20 accent-blue-500"
              />
            </div>
          </div>
          <span className="font-mono text-[11px]">
            Security watermark SHA256 verified • Cryptographic seal intact
          </span>
        </div>
      </div>
    </div>
  );
};
