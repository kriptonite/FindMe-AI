import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  Image as ImageIcon, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  Lock,
  Info,
  Sliders,
  Maximize2
} from 'lucide-react';
import { CitizenReportFormState } from './types';
import { SAMPLE_GALLERY_PHOTOS, SampleGalleryItem } from './mockData';

interface ReportFlowProps {
  initialCaseId: string;
  onCancel: () => void;
  onSubmitReport: (data: CitizenReportFormState) => void;
}

export const ReportFlow: React.FC<ReportFlowProps> = ({
  initialCaseId,
  onCancel,
  onSubmitReport
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<CitizenReportFormState>({
    photo: SAMPLE_GALLERY_PHOTOS[0].url,
    photoName: 'Captured Photo — Sighting_IMG_0412.jpg',
    location: 'Central District, 4th & Grand Ave (Transit Plaza)',
    coordinates: { lat: 40.7128, lng: -74.006 },
    dateTime: 'Today, 10:35 AM (Auto-detected)',
    description: 'Individual seen near east transit pavilion coffee stand. Appeared disoriented, checking departure board repeatedly.',
    clothingDetails: 'Charcoal zip-up windbreaker jacket, dark denim trousers, tan hiking shoes.',
    needsImmediateAssistance: false,
    reporterVerified: true,
    generatedCaseId: initialCaseId || 'FM-10427'
  });

  // Simulated Camera Capture
  const handleShutterClick = () => {
    setCameraFlash(true);
    setTimeout(() => {
      setCameraFlash(false);
      // Advance to step 2 after capture animation
      setCurrentStep(2);
    }, 450);
  };

  // Gallery Select
  const handleSelectGalleryItem = (item: SampleGalleryItem) => {
    setFormData(prev => ({
      ...prev,
      photo: item.url,
      photoName: item.title,
      location: item.defaultLocation,
      description: item.defaultDescription,
      clothingDetails: item.defaultClothing
    }));
    setGalleryPickerOpen(false);
    setCurrentStep(2);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        photo: url,
        photoName: file.name
      }));
      setGalleryPickerOpen(false);
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitReport(formData);
    }, 850);
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-white text-slate-900 select-none">
      {/* Top Guided Flow Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 shadow-xs sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep((currentStep - 1) as 1 | 2);
              } else {
                onCancel();
              }
            }}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-sm font-bold text-slate-900">Report a Sighting</h2>
            <p className="text-[11px] text-blue-600 font-semibold">
              Step {currentStep} of 3 • {currentStep === 1 ? 'Capture' : currentStep === 2 ? 'Location & Details' : 'Review & Submit'}
            </p>
          </div>

          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 px-2 py-1"
          >
            Cancel
          </button>
        </div>

        {/* 3-Step Guided Progress Indicator */}
        <div className="mt-3 flex items-center gap-1.5 px-2">
          <div className={`h-1.5 flex-1 rounded-full transition-all ${
            currentStep >= 1 ? 'bg-blue-600' : 'bg-slate-200'
          }`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all ${
            currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'
          }`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all ${
            currentStep >= 3 ? 'bg-blue-600' : 'bg-slate-200'
          }`} />
        </div>
      </div>

      {/* =========================================================================
          STEP 1: CAPTURE
         ========================================================================= */}
      {currentStep === 1 && (
        <div className="flex-1 flex flex-col justify-between bg-slate-950 text-white relative overflow-hidden">
          {/* Flash animation */}
          {cameraFlash && (
            <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300" />
          )}

          {/* Camera Viewfinder Header Overlay */}
          <div className="p-4 z-10 bg-gradient-to-b from-black/80 to-transparent">
            <h3 className="text-base font-bold text-white text-center">Capture a Sighting</h3>
            <p className="text-xs text-slate-300 text-center mt-0.5">
              Take a clear photo of the person, only when it is safe to do so.
            </p>
          </div>

          {/* Simulated Active Camera Viewfinder Preview */}
          <div className="relative flex-1 bg-slate-900 overflow-hidden flex items-center justify-center">
            <img
              src={formData.photo}
              alt="Live Camera Viewfinder"
              className="w-full h-full object-cover opacity-90 transition-opacity"
            />

            {/* Viewfinder Reticle Overlay */}
            <div className="absolute inset-6 border-2 border-dashed border-white/40 rounded-3xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <div className="w-5 h-5 border-t-2 border-l-2 border-blue-400" />
                <div className="w-5 h-5 border-t-2 border-r-2 border-blue-400" />
              </div>

              {/* Center Biometric Focus Marker */}
              <div className="self-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-blue-400/80 animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
                <div className="mt-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] text-blue-300 font-medium">
                  AI Framing Guide • Optical Lock
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-5 h-5 border-b-2 border-l-2 border-blue-400" />
                <div className="w-5 h-5 border-b-2 border-r-2 border-blue-400" />
              </div>
            </div>
          </div>

          {/* Bottom Camera Controls & Privacy Notice */}
          <div className="p-4 bg-gradient-to-t from-black via-black/90 to-transparent space-y-3 z-10">
            {/* Privacy Notice: "Do not put yourself or the person at risk." */}
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center gap-2 text-amber-200 text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="font-semibold text-amber-100">Safety Notice:</strong> Do not put yourself or the person at risk. Maintain a safe distance.
              </span>
            </div>

            {/* Shutter & Gallery Buttons */}
            <div className="flex items-center justify-around pt-1">
              {/* Choose from Gallery Button */}
              <button
                type="button"
                onClick={() => setGalleryPickerOpen(true)}
                className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-xs">
                  <ImageIcon className="w-5 h-5 text-sky-400" />
                </div>
                <span className="text-[11px] font-medium">Gallery</span>
              </button>

              {/* Main Shutter Button: "Take Photo" */}
              <button
                type="button"
                onClick={handleShutterClick}
                className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20 cursor-pointer"
                aria-label="Take Photo"
              >
                <div className="w-full h-full rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </button>

              {/* Sample Preset Shortcut */}
              <button
                type="button"
                onClick={() => {
                  // Cycle to next sample
                  const nextIndex = (SAMPLE_GALLERY_PHOTOS.findIndex(s => s.url === formData.photo) + 1) % SAMPLE_GALLERY_PHOTOS.length;
                  handleSelectGalleryItem(SAMPLE_GALLERY_PHOTOS[nextIndex]);
                }}
                className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-xs">
                  <RotateCcw className="w-5 h-5 text-slate-300" />
                </div>
                <span className="text-[11px] font-medium">Cycle Preset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 2: LOCATION & DETAILS
         ========================================================================= */}
      {currentStep === 2 && (
        <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-slate-50/40">
          <div>
            <h3 className="text-base font-bold text-slate-900">Location & Details</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify detected geospatial data and describe relevant attributes.
            </p>
          </div>

          {/* Map Preview Card with Automatically Detected Location */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900">Automatically Detected Location</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                GPS Fixed (±4m)
              </span>
            </div>

            {/* Map Mini View */}
            <div className="h-28 bg-slate-100 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:16px_16px] bg-blue-50/70" />
              
              {/* Center Pin Graphic */}
              <div className="relative flex flex-col items-center z-10">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                  <MapPin className="w-4 h-4 fill-white" />
                </div>
                <div className="mt-1 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-xs">
                  Grand Ave Transit Pavilion
                </div>
              </div>
            </div>

            {/* Location Field */}
            <div className="p-3 bg-white">
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Location Address / Landmarks
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-hidden"
              />
            </div>
          </div>

          {/* Date & Time Field (Automatically Populated) */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Date & Time (Automatically Populated)</span>
            </label>
            <input
              type="text"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-hidden text-slate-700"
            />
          </div>

          {/* Clothing / Identifying Details Field */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Clothing / Identifying Details
            </label>
            <input
              type="text"
              value={formData.clothingDetails}
              onChange={(e) => setFormData({ ...formData, clothingDetails: e.target.value })}
              placeholder="e.g. Navy hoodie, dark jeans, backpack, glasses"
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-hidden"
            />
          </div>

          {/* Optional Description */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Optional Description / Context
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe posture, direction of travel, behavior..."
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-hidden resize-none"
            />
          </div>

          {/* Toggle: "Person appears to need immediate assistance" */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-bold text-amber-950">
                  Person appears to need immediate assistance
                </div>
                <p className="text-[11px] text-amber-800/80 mt-0.5 leading-snug">
                  Flags report for urgent triage if individual appears distressed, injured, or in imminent danger.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, needsImmediateAssistance: !formData.needsImmediateAssistance })}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                formData.needsImmediateAssistance ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                formData.needsImmediateAssistance ? 'translate-x-5.5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Step 2 Bottom Button: "Continue" */}
          <div className="pt-2 pb-6">
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Review</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STEP 3: REVIEW & SUBMIT
         ========================================================================= */}
      {currentStep === 3 && (
        <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-slate-50/40">
          <div>
            <h3 className="text-base font-bold text-slate-900">Review & Submit</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Confirm your report information before secure submission.
            </p>
          </div>

          {/* Photo Preview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Photo</span>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Retake
              </button>
            </div>
            <div className="relative h-44 bg-slate-950 flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Captured sighting"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>Ready for AI Biometric Analysis</span>
              </div>
            </div>
          </div>

          {/* Summary Details Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            {/* Location */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                <span>{formData.location}</span>
              </div>
            </div>

            {/* Time */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time</div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{formData.dateTime}</span>
              </div>
            </div>

            {/* Description & Clothing */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Description</div>
              <p className="text-xs text-slate-800 mt-0.5 leading-relaxed">
                {formData.clothingDetails}
              </p>
              {formData.description && (
                <p className="text-xs text-slate-600 mt-1 italic">
                  "{formData.description}"
                </p>
              )}
            </div>

            {/* Reporter Status: Verified */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reporter Status</div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Citizen</span>
              </div>
            </div>

            {/* Assistance Flag */}
            {formData.needsImmediateAssistance && (
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Flagged for immediate triage response</span>
              </div>
            )}
          </div>

          {/* Encryption & Ethics Guarantee */}
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2.5 text-xs text-blue-900">
            <Lock className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-[11px] leading-tight">
              Report is end-to-end encrypted and routed directly to certified emergency triage officers.
            </span>
          </div>

          {/* Action Buttons: "Submit Sighting" & "Edit" */}
          <div className="pt-2 pb-6 space-y-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Encrypting & Submitting Sighting...</span>
                </>
              ) : (
                <span>Submit Sighting</span>
              )}
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              disabled={isSubmitting}
              className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          GALLERY MODAL PICKER (Select Realistic Fictional Photos or Upload)
         ========================================================================= */}
      {galleryPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Choose Sighting Photo</h4>
                <p className="text-[11px] text-slate-500">Select a sample test photo or upload file</p>
              </div>
              <button
                onClick={() => setGalleryPickerOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
              >
                Close
              </button>
            </div>

            {/* Realistic Sample Photos Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {SAMPLE_GALLERY_PHOTOS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectGalleryItem(item)}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-blue-600 transition-all text-left flex flex-col bg-slate-50 cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="h-24 w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-2 bg-white">
                    <div className="text-[11px] font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[9px] text-blue-600 font-semibold mt-0.5 line-clamp-1">
                      {item.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Upload Option */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <label className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-blue-600 bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>Upload from Device Storage</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
