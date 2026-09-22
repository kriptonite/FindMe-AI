import React from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Navigation, 
  Clock, 
  Sparkles, 
  Radio, 
  Eye, 
  ArrowRight, 
  ChevronLeft, 
  AlertTriangle,
  Info,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { FieldCase } from '../types';

interface CaseDetailsScreenProps {
  caseItem: FieldCase;
  onBack: () => void;
  onStartResponse: () => void;
  onContactDispatch: () => void;
  onViewEvidence: () => void;
}

export const CaseDetailsScreen: React.FC<CaseDetailsScreenProps> = ({
  caseItem,
  onBack,
  onStartResponse,
  onContactDispatch,
  onViewEvidence
}) => {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col p-4 sm:p-5 space-y-4 select-none">
      {/* Top Bar with Back Action & Case ID Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Active Cases</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-1 rounded-md">
          DISPATCH PRIORITY
        </span>
      </div>

      {/* Screen Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Case {caseItem.id}
          </h1>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Authorized Field Dispatch • Emergency Response Incident Record
        </p>
      </div>

      {/* Key Metadata Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        {/* Status & Priority Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Status:</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
              Assigned
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400">Priority:</span>
            <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
              {caseItem.priority}
            </span>
          </div>
        </div>

        {/* Reported Time, Location, Distance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Reported Time</span>
              <span className="font-bold text-slate-900">{caseItem.reportedTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700">
            <Navigation className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Distance</span>
              <span className="font-bold text-slate-900">{caseItem.distanceKm} km • {caseItem.travelTimeMin} min drive</span>
            </div>
          </div>

          <div className="sm:col-span-2 flex items-start gap-2 text-slate-700 pt-1">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span>
              <span className="font-bold text-slate-900 leading-snug">{caseItem.location}</span>
            </div>
          </div>
        </div>

        {/* AI Match Badge */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between bg-blue-50/60 -mx-4 -mb-4 p-3 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                AI Match Score
              </span>
              <span className="text-sm font-black text-blue-900">
                {caseItem.aiConfidence}% Potential Match
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200">
            Advisory Only
          </span>
        </div>
      </div>

      {/* Sighting Photograph in Secure Evidence Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Secure Sighting Evidence Card
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">HASH: SHA256-4F8A</span>
        </div>

        {/* Photo Container */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 aspect-16/9 flex items-center justify-center group">
          <img 
            src={caseItem.sightingImage} 
            alt="Secure sighting evidence" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Sighting Overlay Pill */}
          <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded border border-slate-700">
            Citizen Mobile Capture • {caseItem.reportedTime}
          </div>

          {/* Quick Evidence Trigger */}
          <button
            onClick={onViewEvidence}
            className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Inspect Evidence</span>
          </button>
        </div>
      </div>

      {/* Important Advisory Notice Message (Mandatory Requirement) */}
      <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <h4 className="font-extrabold text-amber-900 uppercase tracking-wide">
            Important Message
          </h4>
          <p className="text-amber-800 mt-0.5 leading-relaxed font-semibold">
            “AI results are advisory. Confirm identity through authorized procedures.”
          </p>
        </div>
      </div>

      {/* Reported Description Section */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 space-y-2">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
          Reported Description
        </h3>
        <p className="text-sm font-bold text-slate-900 leading-snug">
          “{caseItem.description}”
        </p>
        <p className="text-xs text-slate-600 pt-1 border-t border-slate-100">
          <span className="font-bold text-slate-700">Clothing Details: </span>
          {caseItem.clothingDetails}
        </p>
      </div>

      {/* Action Buttons Section */}
      <div className="pt-2 space-y-2.5">
        {/* Primary: "Start Response" */}
        <button
          onClick={onStartResponse}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Navigation className="w-4 h-4" />
          <span>Start Response</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          {/* "Contact Dispatch" */}
          <button
            onClick={onContactDispatch}
            className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            <span>Contact Dispatch</span>
          </button>

          {/* "View Evidence" */}
          <button
            onClick={onViewEvidence}
            className="py-3 px-3 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>View Evidence</span>
          </button>
        </div>
      </div>
    </div>
  );
};
