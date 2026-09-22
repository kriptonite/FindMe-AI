import React from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Car, 
  Camera, 
  MapPin, 
  Clock, 
  Sparkles, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  Crosshair, 
  UserCheck, 
  FileText,
  Navigation as NavIcon,
  Search,
  Wifi,
  Eye
} from 'lucide-react';

interface VideoSceneRendererProps {
  currentTime: number;
}

export const VideoSceneRenderer: React.FC<VideoSceneRendererProps> = ({ currentTime }) => {
  // Phase 1: Intro (0.0s - 4.0s)
  if (currentTime < 4.0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
            <span>Complete Recovery Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            FindMe <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">AI Platform</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-lg mx-auto">
            From citizen sighting ingestion, to CAD human verification, to tactical field recovery.
          </p>

          {/* Tri-App Pipeline Nodes */}
          <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-blue-500/30 backdrop-blur-md text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-blue-300 uppercase tracking-wider block">App 1</span>
              <span className="text-xs sm:text-sm font-extrabold text-white block">Citizen Mobile</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-indigo-500/30 backdrop-blur-md text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/40">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-indigo-300 uppercase tracking-wider block">App 2</span>
              <span className="text-xs sm:text-sm font-extrabold text-white block">CAD Console</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-emerald-500/30 backdrop-blur-md text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider block">App 3</span>
              <span className="text-xs sm:text-sm font-extrabold text-white block">Field Response</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 2: App 1 — Citizen Mobile App (4.0s - 24.0s)
  if (currentTime >= 4.0 && currentTime < 24.0) {
    const subPhase = currentTime < 10.5 ? 'bulletin' : currentTime < 17.0 ? 'camera' : 'submit';

    return (
      <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-3 sm:p-6 relative select-none">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Side Callout Annotation */}
        <div className="hidden lg:flex flex-col justify-center max-w-xs space-y-4 mr-8 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Smartphone className="w-4 h-4" />
            <span>Step 1: Citizen Ingestion</span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">
            Vigilant Community Reporting
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Citizens receive geo-targeted missing person alerts. The smart camera automatically analyzes clothing colorways and biometric cues without storing personal surveillance.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'bulletin' ? 'bg-blue-600/20 border-blue-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              1. Missing Person Bulletin Viewed
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'camera' ? 'bg-blue-600/20 border-blue-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              2. Smart AI Camera Capture & Analysis
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'submit' ? 'bg-blue-600/20 border-blue-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              3. Encrypted CAD Transmission
            </div>
          </div>
        </div>

        {/* Phone Frame Mockup for Citizen App */}
        <div className="w-[310px] sm:w-[340px] h-[520px] sm:h-[550px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col ring-1 ring-blue-500/30 overflow-hidden">
          {/* Top Speaker / Notch */}
          <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
            <span className="w-10 h-1 rounded-full bg-slate-700" />
          </div>

          {/* Phone Screen Canvas */}
          <div className="flex-1 bg-slate-50 text-slate-900 rounded-[28px] overflow-hidden flex flex-col relative">
            {/* Screen Header */}
            <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-200" />
                <span className="font-extrabold text-xs tracking-tight">FindMe Citizen</span>
              </div>
              <span className="text-[10px] bg-blue-700/80 px-2 py-0.5 rounded-full font-bold">
                LIVE BULLETIN
              </span>
            </div>

            {/* Sub-scene 1: Bulletin Details */}
            {subPhase === 'bulletin' && (
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                <div className="space-y-2">
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    <span>PRIORITY ALERT: 14-yr old Missing</span>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex gap-3 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
                      alt="Marcus"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-black text-slate-900">Marcus Vance</h4>
                      <span className="text-[10px] text-slate-500 block">Age 14 • Last seen: Central Station</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded inline-block mt-1">
                        Wearing yellow hoodie
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">
                    Marcus went missing near the transit center this afternoon. If seen, submit photo verification immediately.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-600 text-white text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-md ring-4 ring-blue-100">
                  <Camera className="w-4 h-4" />
                  <span>Report Sighting with Photo</span>
                </div>
              </div>
            )}

            {/* Sub-scene 2: Smart Camera Viewfinder with AI Overlay */}
            {subPhase === 'camera' && (
              <div className="flex-1 bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between p-3 animate-in fade-in duration-300">
                {/* Simulated live viewfinder photo */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
                  alt="Camera view"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />

                {/* AI Bounding Box & Feature Tagging */}
                <div className="relative z-10 border-2 border-emerald-400 rounded-xl p-2 bg-slate-950/60 backdrop-blur-xs mt-6 mx-auto w-11/12">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-300">
                    <span className="flex items-center gap-1">
                      <Crosshair className="w-3 h-3 text-emerald-400 animate-pulse" />
                      <span>AI VISION ACTIVE</span>
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400/40">
                      94% Match
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[10px] text-slate-200">
                    <div className="flex justify-between">
                      <span>Clothing:</span>
                      <span className="font-bold text-amber-300">Yellow Hooded Sweatshirt</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pants:</span>
                      <span className="font-bold text-blue-300">Dark Denim</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-bold text-white">East Concourse Gate 3</span>
                    </div>
                  </div>
                </div>

                {/* Shutter Button Visual */}
                <div className="relative z-10 text-center pb-2">
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-white/20 mx-auto flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white mt-1 block drop-shadow">
                    Photo Captured & AI Verified
                  </span>
                </div>
              </div>
            )}

            {/* Sub-scene 3: Encrypted Submission Confirmed */}
            {subPhase === 'submit' && (
              <div className="p-4 space-y-4 flex-1 flex flex-col justify-center text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg ring-8 ring-blue-100">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Encrypted Direct Ingestion
                  </span>
                  <h3 className="text-base font-black text-slate-900">
                    Sighting Transmitted to CAD
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug">
                    Case FM-10427 created and routed to central emergency review with 89% triage confidence score.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-100 rounded-xl text-left text-[11px] space-y-1 text-slate-600 border border-slate-200">
                  <div className="flex justify-between">
                    <span>Transmitted to:</span>
                    <span className="font-bold text-slate-900">Metro Emergency CAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Queue Priority:</span>
                    <span className="font-bold text-rose-600">Level 1 - Critical</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Phase 3: App 2 — Reviewer CAD Console (24.0s - 48.0s)
  if (currentTime >= 24.0 && currentTime < 48.0) {
    const subPhase = currentTime < 31.0 ? 'incoming' : currentTime < 39.5 ? 'comparison' : 'dispatch';

    return (
      <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-3 sm:p-6 relative select-none">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Side Callout Annotation */}
        <div className="hidden lg:flex flex-col justify-center max-w-xs space-y-4 mr-8 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Monitor className="w-4 h-4" />
            <span>Step 2: Emergency CAD Review</span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">
            Human-Authorized CAD Triage
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Emergency specialists evaluate AI visual matching scores against official reference records. Certified human authority is required before field officers are dispatched.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'incoming' ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              1. Priority Lead Enters Queue
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'comparison' ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              2. 89% AI Match & Landmark Comparison
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'dispatch' ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              3. Dispatch Unit 4 Authorized
            </div>
          </div>
        </div>

        {/* Desktop CAD Console Frame */}
        <div className="w-full max-w-2xl h-[480px] sm:h-[520px] bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-700 flex flex-col ring-1 ring-indigo-500/30 overflow-hidden">
          {/* Desktop Window Titlebar */}
          <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                FindMe CAD Workstation • Terminal #12 • Dispatcher J. Reynolds
              </span>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
              CJIS SECURE
            </span>
          </div>

          {/* CAD Content Area */}
          <div className="flex-1 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden">
            {/* Top Incident Banner */}
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">CASE FM-10427</span>
                    <span className="text-[10px] font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded">
                      PRIORITY 1
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Subject: Marcus Vance (14) • Reported Sighting at East Transit Plaza
                  </span>
                </div>
              </div>

              {/* High AI Match Metric */}
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 block">AI Confidence</span>
                <span className="text-lg font-black text-emerald-400 font-mono">89% MATCH</span>
              </div>
            </div>

            {/* Sub-scene: Split-Screen Comparison */}
            <div className="grid grid-cols-2 gap-3 my-auto">
              {/* Reference Dossier Photo */}
              <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span>Reference Dossier</span>
                  <span className="text-[10px] text-slate-500">Official Report</span>
                </div>
                <div className="relative rounded-lg overflow-hidden h-36 bg-slate-800 border border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80"
                    alt="Marcus Reference"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/70 px-2 py-0.5 rounded text-[10px] text-slate-200">
                    Marcus Vance • Age 14
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5">
                  <div>• Yellow hooded sweatshirt</div>
                  <div>• Dark denim jeans</div>
                </div>
              </div>

              {/* Citizen Sighting Photo */}
              <div className="bg-slate-900 rounded-xl p-3 border border-blue-500/40 space-y-2 relative">
                <div className="flex items-center justify-between text-[11px] font-bold text-blue-300">
                  <span>Citizen Sighting</span>
                  <span className="text-[10px] text-emerald-400 font-mono">17:42 Ingested</span>
                </div>
                <div className="relative rounded-lg overflow-hidden h-36 bg-slate-800 border border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                    alt="Citizen Photo"
                    className="w-full h-full object-cover"
                  />
                  {/* Facial Alignment Dot Overlays */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-14 border border-emerald-400 rounded-lg ring-2 ring-emerald-400/30 flex items-center justify-center">
                      <span className="text-[9px] font-mono text-emerald-300 font-bold bg-black/60 px-1 rounded">
                        89% Align
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-300 space-y-0.5">
                  <div className="text-emerald-400 font-bold">✓ Apparel Match Confirmed</div>
                  <div>• East Concourse Transit Plaza</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row: One-Click Dispatch */}
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Reviewer Approval: <strong>Officer Reynolds (#1024)</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center gap-1.5 shadow-lg animate-pulse">
                  <Radio className="w-3.5 h-3.5" />
                  <span>Dispatch Unit 4 (Patrol)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 4: App 3 — Field Response Mobile Terminal (48.0s - 68.0s)
  if (currentTime >= 48.0 && currentTime < 68.0) {
    const subPhase = currentTime < 54.5 ? 'nav' : currentTime < 61.5 ? 'assessment' : 'located';

    return (
      <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center p-3 sm:p-6 relative select-none">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Side Callout Annotation */}
        <div className="hidden lg:flex flex-col justify-center max-w-xs space-y-4 mr-8 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Car className="w-4 h-4" />
            <span>Step 3: Field Response & Safe Recovery</span>
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">
            Tactical Verification & Resolution
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Patrol units navigate directly to the transit concourse. On scene, mandatory safeguarding checklists verify physical identity and secure family handoff.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'nav' ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              1. Turn-by-Turn Tactical Route
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'assessment' ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              2. On-Scene 5-Point Safeguarding Checklist
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${
              subPhase === 'located' ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold' : 'border-slate-800 text-slate-500'
            }`}>
              3. Subject Confirmed Safe & Case Closed
            </div>
          </div>
        </div>

        {/* Rugged Field Smartphone Mockup */}
        <div className="w-[310px] sm:w-[340px] h-[520px] sm:h-[550px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col ring-1 ring-emerald-500/30 overflow-hidden">
          {/* Top Speaker */}
          <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
            <span className="w-10 h-1 rounded-full bg-slate-700" />
          </div>

          {/* Field App Screen */}
          <div className="flex-1 bg-slate-50 text-slate-900 rounded-[28px] overflow-hidden flex flex-col relative">
            {/* Screen Header */}
            <div className="bg-slate-900 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-400" />
                <span className="font-extrabold text-xs tracking-tight">Unit 4 • Officer Mercer</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                10-97 ON SCENE
              </span>
            </div>

            {/* Sub-scene 1: Tactical Navigation Screen */}
            {subPhase === 'nav' && (
              <div className="flex-1 flex flex-col justify-between p-3 bg-slate-100 animate-in fade-in duration-300">
                {/* Navigation Turn Banner */}
                <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-md flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <NavIcon className="w-5 h-5 rotate-45" />
                  </div>
                  <div>
                    <span className="text-xs font-black block">In 200m, Turn Right</span>
                    <span className="text-[10px] text-slate-400">East Transit Concourse Pavilion</span>
                  </div>
                </div>

                {/* Simulated Vector Map Area */}
                <div className="h-44 bg-slate-200 rounded-2xl relative overflow-hidden border border-slate-300 my-2 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
                  {/* Route path */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 60 140 Q 140 100 240 50"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Patrol Vehicle Marker */}
                  <div className="absolute left-[130px] top-[90px] w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <Car className="w-3.5 h-3.5" />
                  </div>
                  {/* Target Pin Marker */}
                  <div className="absolute right-[60px] top-[40px] w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                {/* Arrival Trigger Button */}
                <div className="p-3 bg-emerald-600 text-white rounded-xl text-center text-xs font-black shadow-md flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Arrived on Scene • Log 10-97</span>
                </div>
              </div>
            )}

            {/* Sub-scene 2: Field Assessment Checklist Form */}
            {subPhase === 'assessment' && (
              <div className="p-3 space-y-2.5 flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    On-Scene Safeguarding Protocol
                  </span>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    Physical Field Assessment
                  </h3>
                </div>

                {/* Checklist Items */}
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Person located in East Concourse</span>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Identity verified through student ID</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No immediate medical distress</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Guardian handoff coordinated</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-600 text-white text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-md">
                  <span>Submit Authorized Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Sub-scene 3: Person Located Success Screen */}
            {subPhase === 'located' && (
              <div className="p-4 flex-1 flex flex-col justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative inline-flex items-center justify-center mx-auto">
                  <span className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-emerald-400 opacity-30" />
                  <div className="relative w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl ring-8 ring-emerald-100">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Incident Safely Resolved
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Marcus Vance Confirmed Safe
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug">
                    Protective custody established. Family safeguarding unit taking custody. CAD Case FM-10427 closed.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900 font-bold text-left space-y-1">
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="text-emerald-700">Person Located</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Elapsed Time:</span>
                    <span className="text-slate-800">28 Minutes</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Phase 5: Outro & Ecosystem Summary (68.0s - 72.0s)
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden select-none animate-in fade-in duration-500">
      <div className="relative z-10 text-center space-y-5 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl ring-8 ring-emerald-500/20">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            MISSION ACCOMPLISHED
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Complete Closed-Loop Recovery
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            From citizen camera capture to certified dispatch approval to on-scene physical verification.
          </p>
        </div>

        {/* 3 Metrics Badge */}
        <div className="grid grid-cols-3 gap-3 pt-2 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
            <span className="text-lg font-black text-emerald-400 block font-mono">&lt; 28 min</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Recovery Time</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
            <span className="text-lg font-black text-blue-400 block font-mono">89%</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">AI Triage Match</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
            <span className="text-lg font-black text-indigo-400 block font-mono">100%</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Human Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
