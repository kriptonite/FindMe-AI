import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Send, 
  XCircle, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Building2, 
  ChevronRight, 
  ZoomIn, 
  Sliders, 
  RotateCcw,
  Eye,
  Radio,
  Share2,
  Lock
} from 'lucide-react';
import { SightingCase, ReviewerProfile } from '../types';
import { SideBySideComparison } from './SideBySideComparison';
import { ApprovalConfirmationModal } from './ApprovalConfirmationModal';

interface CaseReviewScreenProps {
  sightingCase: SightingCase;
  reviewer: ReviewerProfile;
  onBack: () => void;
  onApproveAndForward: (caseId: string, notes: string, authority: string) => void;
  onRejectCase: (caseId: string, notes: string) => void;
  onRequestMoreInfo: (caseId: string, notes: string) => void;
  onTrackCase: (caseId: string) => void;
  onInspectImage: (imageUrl: string, title: string) => void;
}

export const CaseReviewScreen: React.FC<CaseReviewScreenProps> = ({
  sightingCase,
  reviewer,
  onBack,
  onApproveAndForward,
  onRejectCase,
  onRequestMoreInfo,
  onTrackCase,
  onInspectImage
}) => {
  // Decision form state
  const [decision, setDecision] = useState<
    'Confirm Potential Match' | 'Request More Information' | 'Reject Match'
  >('Confirm Potential Match');

  const [reviewerNotes, setReviewerNotes] = useState(
    sightingCase.humanVerification?.reviewerNotes || 
    'Facial structure and clothing match the MP-44021 reference record. Sighting coordinates coincide with priority search perimeter.'
  );

  const [destinationAuthority, setDestinationAuthority] = useState(
    sightingCase.forwarding?.destinationAuthority || 'Metro Emergency Dispatch — Precinct 4'
  );

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison'>('overview');
  const [imageBrightness, setImageBrightness] = useState(100);
  const [imageContrast, setImageContrast] = useState(100);
  const [noteError, setNoteError] = useState('');

  // Is case already approved or in progress?
  const isApproved = sightingCase.status === 'Approved' || sightingCase.status === 'Action in Progress' || sightingCase.status === 'Resolved';

  const handleApproveClick = () => {
    if (!reviewerNotes.trim()) {
      setNoteError('Reviewer notes are required before approving and forwarding.');
      return;
    }
    setNoteError('');
    setShowApprovalModal(true);
  };

  const handleConfirmApproval = () => {
    setShowApprovalModal(false);
    onApproveAndForward(sightingCase.id, reviewerNotes, destinationAuthority);
  };

  const handleRejectClick = () => {
    if (!reviewerNotes.trim()) {
      setNoteError('Please provide a reason in Reviewer Notes for rejection.');
      return;
    }
    setNoteError('');
    onRejectCase(sightingCase.id, reviewerNotes);
  };

  const handleMoreInfoClick = () => {
    if (!reviewerNotes.trim()) {
      setNoteError('Please specify what information is needed in Reviewer Notes.');
      return;
    }
    setNoteError('');
    onRequestMoreInfo(sightingCase.id, reviewerNotes);
  };

  const applyTemplateNote = (text: string) => {
    setReviewerNotes(text);
    setNoteError('');
  };

  return (
    <div id="case-review-screen-container" className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back to queue"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900">
                Case Review: {sightingCase.id}
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                {sightingCase.status}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-rose-50 text-rose-700 rounded-md border border-rose-200">
                {sightingCase.priority} Priority
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Target Reference: <span className="font-semibold text-slate-700">{sightingCase.aiAnalysis.recordName}</span> ({sightingCase.aiAnalysis.matchingRecordId})
            </p>
          </div>
        </div>

        {/* View Switcher & Case Tracker Link */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'overview' 
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Split View Analysis
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'comparison' 
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side Biometrics
            </button>
          </div>

          {isApproved && (
            <button
              onClick={() => onTrackCase(sightingCase.id)}
              className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>View Tracking</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* SECTION 6: APPROVAL CONFIRMATION SUCCESS PANEL (Shown when already approved) */}
      {isApproved && (
        <div 
          id="approval-confirmation-panel"
          className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-emerald-900 font-display">
                  ✓ Sighting Approved
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-200/80 text-emerald-800 rounded-full">
                  Authorities Notified
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-1">
                Case {sightingCase.id} has been forwarded to the appropriate local authority.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-700 font-mono">
                <span>Approved by: {sightingCase.humanVerification?.reviewedBy || reviewer.name}</span>
                <span>•</span>
                <span>Timestamp: {sightingCase.humanVerification?.reviewedAt || sightingCase.sightingTime}</span>
                <span>•</span>
                <span>Destination: {sightingCase.forwarding?.destinationAuthority || destinationAuthority}</span>
              </div>
            </div>
          </div>

          <button
            id="view-case-tracking-btn"
            onClick={() => onTrackCase(sightingCase.id)}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors self-end md:self-auto flex items-center gap-1.5 shrink-0"
          >
            <span>View Case</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active Tab View */}
      {activeTab === 'comparison' ? (
        <SideBySideComparison 
          sightingCase={sightingCase} 
          onInspectImage={onInspectImage}
        />
      ) : (
        /* SECTION 3: CASE REVIEW SCREEN (Detailed Split-Screen Layout) */
        <div id="split-screen-review-layout" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT PANEL: Reported Sighting */}
          <div 
            id="reported-sighting-left-panel"
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h2 className="text-base font-bold font-display text-slate-900">
                    Reported Sighting
                  </h2>
                </div>
                <span className="font-mono text-xs font-bold text-slate-500">
                  {sightingCase.id}
                </span>
              </div>

              {/* Large Image with Inspection / Enhancement Controls */}
              <div className="space-y-2">
                <div className="relative h-80 rounded-xl bg-slate-950 overflow-hidden border border-slate-300 group">
                  <img
                    src={sightingCase.reportedImage}
                    alt="Reported citizen capture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all"
                    style={{
                      filter: `brightness(${imageBrightness}%) contrast(${imageContrast}%)`
                    }}
                  />

                  {/* Top image bar */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-900/80 text-white rounded-md backdrop-blur-xs border border-white/20">
                      Surveillance / Mobile Still
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => onInspectImage(sightingCase.reportedImage, `Reported Evidence Image — ${sightingCase.id}`)}
                      className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                      title="Inspect High-Resolution"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image enhancement mini-controls */}
                  <div className="absolute bottom-3 left-3 right-3 p-2 rounded-lg bg-slate-950/80 backdrop-blur-xs border border-white/10 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-300">Brightness:</span>
                        <input
                          type="range"
                          min="70"
                          max="150"
                          value={imageBrightness}
                          onChange={(e) => setImageBrightness(Number(e.target.value))}
                          className="w-16 accent-blue-500 cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-300">Contrast:</span>
                        <input
                          type="range"
                          min="70"
                          max="150"
                          value={imageContrast}
                          onChange={(e) => setImageContrast(Number(e.target.value))}
                          className="w-16 accent-blue-500 cursor-pointer"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setImageBrightness(100);
                        setImageContrast(100);
                      }}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sighting Metadata Details */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-500 block">Report ID:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {sightingCase.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date & Time:</span>
                    <span className="font-medium text-slate-800">
                      {sightingCase.sightingTime}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Location:</span>
                    <span className="font-medium text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {sightingCase.location}
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-slate-500">Reporter:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {sightingCase.reporter.name} ({sightingCase.reporter.status})
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="font-bold text-slate-700 block mb-1">
                    Submitted Description:
                  </span>
                  <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700 leading-relaxed">
                    {sightingCase.description}
                  </p>
                </div>

                {/* Clothing & Identifying Details */}
                <div>
                  <span className="font-bold text-slate-700 block mb-1">
                    Clothing / Identifying Details:
                  </span>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                    <p className="text-slate-800">{sightingCase.clothingDetails}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {sightingCase.physicalAttributes.distinguishingMarks.map((mark, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white text-slate-700 rounded-md border border-slate-200 text-[11px] font-medium">
                          • {mark}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: AI Analysis */}
          <div 
            id="ai-analysis-right-panel"
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h2 className="text-base font-bold font-display text-slate-900">
                    AI Analysis
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Engine: BiometricVision v5.1
                </span>
              </div>

              {/* Large Confidence Indicator Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                      Label: Potential Match Found
                    </span>
                    <h3 
                      id="ai-large-confidence-indicator"
                      className="text-4xl font-extrabold font-display tracking-tight text-white mt-1"
                    >
                      {sightingCase.aiConfidence}% MATCH
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Correlated against public missing person repository
                    </p>
                  </div>

                  {/* Circular Gauge Graphic */}
                  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-sky-400"
                        strokeDasharray={`${sightingCase.aiConfidence}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-mono font-bold text-sm text-white">
                      {sightingCase.aiConfidence}%
                    </span>
                  </div>
                </div>

                {/* Subtle background glow */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Matching Record Dossier Preview */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-slate-900 overflow-hidden border border-slate-200 shrink-0">
                    <img 
                      src={sightingCase.aiAnalysis.recordImage} 
                      alt="Record dossier" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {sightingCase.aiAnalysis.recordName}
                    </div>
                    <div className="font-mono text-blue-600 font-semibold text-xs">
                      Matching Record ID: {sightingCase.aiAnalysis.matchingRecordId}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Age: {sightingCase.aiAnalysis.recordAge} yrs • Height: {sightingCase.aiAnalysis.recordHeight}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-500 block">Previous Report Date:</span>
                    <span className="font-semibold">{sightingCase.aiAnalysis.recordMissingSince}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Last Known Location:</span>
                    <span className="font-semibold truncate block" title={sightingCase.aiAnalysis.recordLastKnownLocation}>
                      {sightingCase.aiAnalysis.recordLastKnownLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Similarity Indicators Breakdown */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  Similarity Indicators
                </span>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Facial Nodal Similarity</span>
                      <span className="font-mono font-bold text-slate-900">
                        {sightingCase.aiAnalysis.facialSimilarity}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full" 
                        style={{ width: `${sightingCase.aiAnalysis.facialSimilarity}%` }} 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Image Capture Quality</span>
                      <span className="font-mono font-bold text-slate-900">
                        {sightingCase.aiAnalysis.imageQualityScore}% ({sightingCase.aiAnalysis.imageQuality})
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-full rounded-full" 
                        style={{ width: `${sightingCase.aiAnalysis.imageQualityScore}%` }} 
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                    <div className="text-slate-700 font-semibold">
                      Spatiotemporal & Biometric Plausibility:
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {sightingCase.aiAnalysis.otherAttributes.temporalSpatialPlausibility}
                    </p>
                    <p className="text-slate-500 font-mono text-[10px] pt-1">
                      {sightingCase.aiAnalysis.otherAttributes.biometricLandmarks}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mandatory AI Disclaimer Banner */}
              <div 
                id="ai-analysis-disclaimer"
                className="p-3.5 bg-blue-50/90 border border-blue-200 rounded-xl flex items-start gap-2.5 text-xs text-blue-900"
              >
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  <span className="font-bold">Important Disclaimer:</span>{' '}
                  “AI-generated results support human review and do not independently confirm identity.”
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: REVIEW DECISION (“Human Verification” section) */}
      <div 
        id="human-verification-section" 
        className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                HV
              </div>
              <h2 className="text-lg font-bold font-display text-slate-900">
                Human Verification
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Authorized Reviewer Elena Rostova ({reviewer.reviewerId}) • Required evidence audit log will be signed
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Session SLA: 03:24 active</span>
          </div>
        </div>

        {/* Reviewer Options */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Reviewer Decision:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Option 1: Confirm Potential Match */}
            <label 
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                decision === 'Confirm Potential Match' 
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">Confirm Potential Match</span>
                <input
                  type="radio"
                  name="review-decision"
                  value="Confirm Potential Match"
                  checked={decision === 'Confirm Potential Match'}
                  onChange={() => setDecision('Confirm Potential Match')}
                  className="w-4 h-4 accent-blue-600"
                />
              </div>
              <p className="text-xs text-slate-500">
                Evidence aligns with record. Validated for emergency authority dispatch.
              </p>
            </label>

            {/* Option 2: Request More Information */}
            <label 
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                decision === 'Request More Information' 
                  ? 'border-purple-600 bg-purple-50/50 shadow-xs' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">Request More Information</span>
                <input
                  type="radio"
                  name="review-decision"
                  value="Request More Information"
                  checked={decision === 'Request More Information'}
                  onChange={() => setDecision('Request More Information')}
                  className="w-4 h-4 accent-purple-600"
                />
              </div>
              <p className="text-xs text-slate-500">
                Inconclusive imagery or partial occlusion. Request additional angles or verification.
              </p>
            </label>

            {/* Option 3: Reject Match */}
            <label 
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                decision === 'Reject Match' 
                  ? 'border-rose-600 bg-rose-50/50 shadow-xs' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900">Reject Match</span>
                <input
                  type="radio"
                  name="review-decision"
                  value="Reject Match"
                  checked={decision === 'Reject Match'}
                  onChange={() => setDecision('Reject Match')}
                  className="w-4 h-4 accent-rose-600"
                />
              </div>
              <p className="text-xs text-slate-500">
                Determined to be a false correlation. Dismiss from active dispatch queue.
              </p>
            </label>
          </div>
        </div>

        {/* Destination Authority Selector (when confirming) */}
        {decision === 'Confirm Potential Match' && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Forwarding Authority Agency:
            </label>
            <select
              id="destination-authority-select"
              value={destinationAuthority}
              onChange={(e) => setDestinationAuthority(e.target.value)}
              className="w-full sm:w-96 px-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden"
            >
              <option value="Metro Emergency Dispatch — Precinct 4">
                Metro Emergency Dispatch — Precinct 4 (Central District)
              </option>
              <option value="North Bay Regional Transit Police">
                North Bay Regional Transit Police (Ferry & Bus Terminals)
              </option>
              <option value="Riverfront Precinct 6 & Park Ranger Service">
                Riverfront Precinct 6 & Park Ranger Service
              </option>
              <option value="Juvenile & Family Protective Services Liaison">
                Juvenile & Family Protective Services Liaison
              </option>
            </select>
          </div>
        )}

        {/* Required field: Reviewer Notes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label 
              htmlFor="reviewer-notes-textarea" 
              className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1"
            >
              <span>Reviewer Notes</span>
              <span className="text-rose-500 font-bold">* (Required)</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Logged to immutable audit ledger
            </span>
          </div>

          <textarea
            id="reviewer-notes-textarea"
            rows={3}
            value={reviewerNotes}
            onChange={(e) => {
              setReviewerNotes(e.target.value);
              if (e.target.value.trim()) setNoteError('');
            }}
            placeholder="Explain the evidence supporting this decision."
            className="w-full p-3.5 text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition-all"
          />

          {noteError && (
            <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{noteError}</span>
            </p>
          )}

          {/* Quick template chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400">Quick Templates:</span>
            <button
              type="button"
              onClick={() => applyTemplateNote('Facial geometry, hairline, and reported charcoal windbreaker correlate with MP-44021 record.')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
            >
              Positive Corroboration
            </button>
            <button
              type="button"
              onClick={() => applyTemplateNote('Inconclusive lighting and angle. Supplementary CCTV still requested before field dispatch.')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
            >
              Request Camera Feed
            </button>
            <button
              type="button"
              onClick={() => applyTemplateNote('Biometric facial distance fails threshold. Distinct structural ear and nasal mismatch.')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
            >
              Negative Mismatch
            </button>
          </div>
        </div>

        {/* Primary & Secondary Action Buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Digital signature verified under Reviewer Key: REV-8042-ED</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {decision === 'Reject Match' ? (
              <button
                id="reject-sighting-btn"
                type="button"
                onClick={handleRejectClick}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Sighting</span>
              </button>
            ) : decision === 'Request More Information' ? (
              <button
                id="request-info-sighting-btn"
                type="button"
                onClick={handleMoreInfoClick}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Request Supplementary Info</span>
              </button>
            ) : (
              <>
                <button
                  id="reject-secondary-btn"
                  type="button"
                  onClick={handleRejectClick}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Reject
                </button>

                <button
                  id="approve-forward-primary-btn"
                  type="button"
                  onClick={handleApproveClick}
                  className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Approve & Forward</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ApprovalConfirmationModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onConfirm={handleConfirmApproval}
        sightingCase={sightingCase}
        destinationAuthority={destinationAuthority}
        reviewerNotes={reviewerNotes}
      />
    </div>
  );
};
