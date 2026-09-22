import React from 'react';
import { FilmScene } from './types';
import { FindMePinIcon, FindMeLogo } from '../FindMeLogo';
import { 
  ShieldCheck, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  Radio, 
  Navigation, 
  Clock, 
  Sparkles,
  AlertTriangle,
  UserCheck,
  Compass,
  FileText,
  Search,
  Bell,
  Home,
  Check,
  ArrowRight,
  Shield,
  Smartphone,
  Monitor,
  Car,
  LayoutDashboard,
  Eye,
  FileCheck2,
  Building2,
  ArrowLeft,
  Sliders,
  ZoomIn,
  Send,
  User,
  Layers,
  ChevronRight,
  ListChecks,
  Globe,
  AlertCircle,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';

interface CinematicSceneVisualProps {
  scene: FilmScene;
  currentTime: number;
  onSwitchToConsole?: () => void;
  onSwitchToCitizen?: () => void;
  onSwitchToField?: () => void;
}

export const CinematicSceneVisual: React.FC<CinematicSceneVisualProps> = ({
  scene,
  currentTime,
  onSwitchToConsole,
  onSwitchToCitizen,
  onSwitchToField
}) => {
  // Relative time within current scene (in seconds)
  const sceneProgress = Math.max(0, Math.min(1, (currentTime - scene.startTime) / (scene.endTime - scene.startTime)));
  const sceneTime = Math.max(0, currentTime - scene.startTime);

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      {/* 16:9 Widescreen Viewport Container */}
      <div className="absolute inset-0 w-full h-full">

        {/* ========================================================= */}
        {/* PROLOGUE: THE PROBLEM & THE SOLUTION (0 - 52s)            */}
        {/* ========================================================= */}
        {scene.id === 'prologue' && (
          <div className="relative w-full h-full overflow-hidden">
            {/* Cinematic City Street & Lost Child Shot (0s - 9.5s) */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform ease-out duration-1000"
              style={{
                transform: `scale(${1 + Math.min(0.08, (sceneTime / 9.5) * 0.08)}) translate(${Math.min(0, (sceneTime / 9.5) * -0.5)}%, ${Math.min(0, (sceneTime / 9.5) * -0.3)}%)`,
                filter: sceneTime > 9.0 ? `blur(${Math.min(8, (sceneTime - 9.0) * 4)}px)` : 'none',
                opacity: sceneTime > 9.5 ? Math.max(0, 1 - (sceneTime - 9.5) * 2) : 1
              }}
            >
              <img 
                src={scene.imageSrc} 
                alt="City street with lost child sitting near sidewalk"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cinematic Lens Flare & Anamorphic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/75 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/75 pointer-events-none" />

            {/* ========================================================= */}
            {/* PHASE 1: THE GLOBAL PROBLEM & VERIFIED STATISTICS (0 - 9.5s) */}
            {/* ========================================================= */}
            {sceneTime < 9.5 && (
              <>
                {/* Unified Global Crisis & Verified Statistics Card */}
                <div className="absolute top-5 left-4 right-4 sm:left-10 sm:right-10 z-20 pointer-events-none animate-in fade-in duration-500 max-w-4xl mx-auto">
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        <Globe className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          The Challenge of Missing Persons is Global
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">
                        Official Verified Data
                      </span>
                    </div>

                    {/* 3 Unified Jurisdictional Statistics Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-3">
                      {/* India */}
                      <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-2.5 sm:p-3">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                          <span>India (2023)</span>
                          <span className="text-slate-400 font-sans font-normal text-[9px]">NCRB</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                          91,296
                        </div>
                        <div className="text-[11px] font-semibold text-slate-300">
                          Children Reported Missing
                        </div>
                        <div className="text-[10px] text-rose-400 font-mono font-bold mt-1">
                          48,800 untraced at year-end
                        </div>
                      </div>

                      {/* United States */}
                      <div className="bg-slate-950/80 border border-blue-500/30 rounded-xl p-2.5 sm:p-3">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                          <span>United States (2025)</span>
                          <span className="text-slate-400 font-sans font-normal text-[9px]">FBI NCIC</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                          498,038
                        </div>
                        <div className="text-[11px] font-semibold text-slate-300">
                          NCIC Missing Records
                        </div>
                        <div className="text-[10px] text-cyan-400 font-mono font-bold mt-1">
                          21,487 active child cases
                        </div>
                      </div>

                      {/* United Kingdom */}
                      <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-2.5 sm:p-3">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                          <span>United Kingdom (2023–24)</span>
                          <span className="text-slate-400 font-sans font-normal text-[9px]">Police Data</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                          304,674
                        </div>
                        <div className="text-[11px] font-semibold text-slate-300">
                          Missing Incidents
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono font-bold mt-1">
                          196,645 involving children
                        </div>
                      </div>
                    </div>

                    {/* Core Bottleneck Callout */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                      <span className="italic font-sans text-[11px] sm:text-xs">
                        “The challenge is not only reporting someone missing — it is turning a potential sighting into timely, coordinated action.”
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cinematic Lower Third Overlay */}
                <div className="absolute bottom-5 left-4 sm:left-10 z-20 max-w-md pointer-events-none animate-in fade-in duration-400">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-semibold tracking-wider uppercase mb-1.5 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    Context: Unaccompanied Minor Sighting
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-md">
                    Transit Concourse • Unaccompanied Child
                  </h2>
                </div>
              </>
            )}

            {/* ========================================================= */}
            {/* PHASE 2: THE SOLUTION INTRODUCTION — FINDME AI (9.5 - 18s)*/}
            {/* ========================================================= */}
            {sceneTime >= 9.5 && (
              <div 
                className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-center p-6 z-40 transition-opacity duration-700 animate-in zoom-in-95 duration-500"
              >
                <div className="mb-3 animate-in zoom-in-90 duration-500">
                  <FindMePinIcon size={56} />
                </div>
                <FindMeLogo size="lg" variant="dark" showTagline={true} />

                <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-xl font-sans">
                  Connecting citizens, human reviewers, and field response teams through one intelligent workflow.
                </p>

                {/* Intelligent Workflow 3 Connected Pillars */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-600">
                  <div className="bg-slate-900/90 border border-blue-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-left shadow-lg">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-400 font-mono font-bold block uppercase">Pillar 1</span>
                      <span className="text-xs font-bold text-white">Citizens</span>
                      <span className="text-[10px] text-slate-400 block font-sans">Secure Mobile Ingestion</span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

                  <div className="bg-slate-900/90 border border-emerald-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-left shadow-lg">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block uppercase">Pillar 2</span>
                      <span className="text-xs font-bold text-white">Human Reviewers</span>
                      <span className="text-[10px] text-slate-400 block font-sans">CAD AI-Assisted Match</span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

                  <div className="bg-slate-900/90 border border-amber-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-left shadow-lg">
                    <div className="w-8 h-8 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-400">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono font-bold block uppercase">Pillar 3</span>
                      <span className="text-xs font-bold text-white">Field Response</span>
                      <span className="text-[10px] text-slate-400 block font-sans">Tactical GPS & Rescue</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>One Unified Intelligent Public Safety Workflow</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* SCENE 1: CITIZEN APP | DATA (18 - 44s, duration 26s)      */}
        {/* ========================================================= */}
        {scene.id === 'scene-1' && (
          <div className="relative w-full h-full bg-slate-950 overflow-hidden">
            {/* Real-World Street Background (0s - 2.5s push in, 24.5s - 26s zoom back out) */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform ease-out duration-700"
              style={{
                transform: sceneTime < 2.5 
                  ? `scale(${1 + (sceneTime / 2.5) * 0.3}) translate(-${(sceneTime / 2.5) * 2}%, -${(sceneTime / 2.5) * 2}%)` 
                  : sceneTime > 24 
                    ? `scale(${1.3 - ((sceneTime - 24) / 2) * 0.3})`
                    : 'scale(1.3)',
                filter: sceneTime >= 2.0 && sceneTime <= 24.5 ? 'blur(8px)' : 'none',
                opacity: sceneTime >= 2.0 && sceneTime <= 24.5 ? 0.3 : 1
              }}
            >
              <img 
                src={scene.imageSrc} 
                alt="Woman holding phone on city street"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Seamless Phone Screen Dive (2.0s - 24.5s) */}
            {sceneTime >= 1.8 && sceneTime <= 24.8 && (
              <div 
                className="absolute inset-0 flex items-center justify-center p-3 z-30 transition-all duration-500"
                style={{
                  transform: sceneTime < 2.5 
                    ? `scale(${0.7 + (sceneTime - 1.8) * 0.4})` 
                    : sceneTime > 24 
                      ? `scale(${1 - (sceneTime - 24) * 0.4})` 
                      : 'scale(1)',
                  opacity: sceneTime < 2.2 ? (sceneTime - 1.8) * 2.5 : sceneTime > 24.2 ? 1 - (sceneTime - 24.2) * 2.5 : 1
                }}
              >
                {/* Physical Phone Frame */}
                <div className="relative w-[340px] sm:w-[380px] h-[520px] sm:h-[560px] bg-slate-950 rounded-[42px] border-4 border-slate-700/90 shadow-[0_0_80px_rgba(37,99,235,0.3)] flex flex-col overflow-hidden text-slate-100 ring-1 ring-blue-500/40">
                  
                  {/* Dynamic Island / Camera Notch */}
                  <div className="w-full pt-2 pb-1 flex justify-center bg-slate-950 shrink-0">
                    <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-between px-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[9px] font-mono text-slate-400">17:42</span>
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                    </div>
                  </div>

                  {/* App Header with Official FindMe Logo */}
                  <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <FindMePinIcon size={22} />
                      <span className="text-xs font-bold text-white tracking-tight">FindMe Citizen</span>
                    </div>
                    <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                      SECURE INGESTION
                    </span>
                  </div>

                  {/* Top Sequential Navigation Breadcrumb Ribbon */}
                  <div className="px-2 py-1 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-[8px] font-mono overflow-x-auto whitespace-nowrap text-slate-500">
                    <span className={sceneTime < 4.8 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Login</span>
                    <span>›</span>
                    <span className={sceneTime >= 4.8 && sceneTime < 7.0 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>OTP</span>
                    <span>›</span>
                    <span className={sceneTime >= 7.0 && sceneTime < 9.2 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Home</span>
                    <span>›</span>
                    <span className={sceneTime >= 9.2 && sceneTime < 11.4 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Report</span>
                    <span>›</span>
                    <span className={sceneTime >= 11.4 && sceneTime < 13.8 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Camera</span>
                    <span>›</span>
                    <span className={sceneTime >= 13.8 && sceneTime < 16.0 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Capture</span>
                    <span>›</span>
                    <span className={sceneTime >= 16.0 && sceneTime < 18.2 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Location</span>
                    <span>›</span>
                    <span className={sceneTime >= 18.2 && sceneTime < 20.4 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Details</span>
                    <span>›</span>
                    <span className={sceneTime >= 20.4 && sceneTime < 22.4 ? 'text-blue-400 font-bold underline' : 'text-slate-400'}>Review</span>
                    <span>›</span>
                    <span className={sceneTime >= 22.4 ? 'text-emerald-400 font-bold underline' : 'text-slate-400'}>Submit</span>
                  </div>

                  {/* Complete Sequential Navigation Screens */}
                  <div className="flex-1 flex flex-col p-4 overflow-hidden relative bg-slate-900">

                    {/* Step 1: Login (2.5s - 4.8s) */}
                    {sceneTime < 4.8 && (
                      <div className="flex-1 flex flex-col justify-center text-center px-2 animate-in fade-in duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mx-auto mb-2">
                          <Smartphone className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white">Sign In to Report</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Two-Factor Citizen Authentication</p>

                        <div className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-left mb-2">
                          <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Mobile Number</span>
                          <span className="text-xs font-mono text-white font-semibold">+1 (555) 382-9014</span>
                        </div>

                        {/* Animated Tap Ring */}
                        <div className="relative mt-2">
                          <div className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md">
                            <span>Send Verification Code</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                          {sceneTime >= 4.0 && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-400/50 animate-ping pointer-events-none" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 2: OTP Verification (4.8s - 7.0s) */}
                    {sceneTime >= 4.8 && sceneTime < 7.0 && (
                      <div className="flex-1 flex flex-col justify-center text-center px-2 animate-in fade-in duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white">Enter OTP Code</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Code sent to +1 (555) 382-9014</p>

                        <div className="flex justify-center gap-2 mb-3">
                          {['8', '4', '2', '9'].map((digit, i) => (
                            <div key={i} className="w-10 h-11 rounded-lg bg-blue-950/80 border border-blue-500/60 flex items-center justify-center font-mono font-bold text-sm text-blue-200">
                              {sceneTime >= 5.2 + i * 0.3 ? digit : '•'}
                            </div>
                          ))}
                        </div>

                        {sceneTime >= 6.2 && (
                          <div className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold animate-in zoom-in-95 duration-300">
                            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                            Verified User: Citizen #8291
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 3: Home Dashboard (7.0s - 9.2s) */}
                    {sceneTime >= 7.0 && sceneTime < 9.2 && (
                      <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                        <div className="space-y-3">
                          <div className="bg-gradient-to-br from-blue-900/60 to-slate-950 border border-blue-500/30 rounded-2xl p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-blue-300 font-mono font-bold">COMMUNITY SHIELD</span>
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                            </div>
                            <h4 className="text-sm font-bold text-white mt-1">Ready to Report a Sighting</h4>
                            <p className="text-[11px] text-slate-300 mt-0.5">Your observation can protect someone in need.</p>
                          </div>

                          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Local Active Search Bulletins</span>
                            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                              <span>Missing Child Alert: Marcus Vance (Age 8)</span>
                            </div>
                          </div>
                        </div>

                        {/* Animated Tap on "Report a Sighting" */}
                        <div className="relative mt-2">
                          <div className="w-full bg-blue-600 text-white font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                            <Camera className="w-4 h-4" />
                            <span>Report a Sighting</span>
                          </div>
                          {sceneTime >= 8.5 && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/60 animate-ping pointer-events-none" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Report a Sighting Category (9.2s - 11.4s) */}
                    {sceneTime >= 9.2 && sceneTime < 11.4 && (
                      <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                        <div>
                          <h4 className="text-xs font-bold text-white mb-2">Select Sighting Type</h4>
                          <div className="space-y-2">
                            <div className="p-3 bg-blue-600/20 border-2 border-blue-500 rounded-xl flex items-center justify-between text-xs font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <User className="w-4 h-4 text-blue-400" />
                                <span>Lost or Unaccompanied Minor</span>
                              </div>
                              <CheckCircle2 className="w-4 h-4 text-blue-400" />
                            </div>

                            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-400">
                              <div className="flex items-center gap-2.5">
                                <Search className="w-4 h-4 text-slate-500" />
                                <span>Vulnerable Adult / Senior</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md">
                          <span>Continue to Smart Camera</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}

                    {/* Step 5: Camera Viewfinder (11.4s - 13.8s) */}
                    {sceneTime >= 11.4 && sceneTime < 13.8 && (
                      <div className="flex-1 flex flex-col animate-in fade-in duration-300">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px]">
                          <span className="font-bold text-white flex items-center gap-1">
                            <Camera className="w-3.5 h-3.5 text-blue-400" /> Smart Camera
                          </span>
                          <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded-full font-mono">
                            LIVE VIEWFINDER
                          </span>
                        </div>

                        <div className="flex-1 my-2 bg-slate-950 rounded-xl overflow-hidden relative border border-slate-700">
                          <img 
                            src={scene.imageSrc} 
                            alt="Child sighting viewfinder"
                            className="w-full h-full object-cover opacity-90"
                            referrerPolicy="no-referrer"
                          />
                          {/* Framing brackets */}
                          <div className="absolute inset-4 border-2 border-dashed border-white/40 rounded-xl pointer-events-none" />
                        </div>

                        <div className="relative">
                          <div className="w-full bg-blue-600 text-white font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md">
                            <Camera className="w-4 h-4" />
                            <span>Capture Photo</span>
                          </div>
                          {sceneTime >= 13.0 && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 animate-ping pointer-events-none" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 6: Capture & AI Feature Bounding Box (13.8s - 16.0s) */}
                    {sceneTime >= 13.8 && sceneTime < 16.0 && (
                      <div className="flex-1 flex flex-col animate-in fade-in duration-300">
                        <div className="flex-1 bg-slate-950 rounded-xl overflow-hidden relative border border-slate-700">
                          <img 
                            src={scene.imageSrc} 
                            alt="Child sighting captured"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />

                          {/* AI Bounding Box */}
                          <div className="absolute inset-x-8 top-8 bottom-6 border-2 border-amber-400 rounded-lg pointer-events-none p-1.5 flex flex-col justify-between shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                            <div className="flex justify-between items-center text-[9px] font-mono">
                              <span className="bg-amber-500 text-slate-950 font-bold px-1 rounded-xs">
                                SUBJECT DETECTED
                              </span>
                              <span className="bg-black/70 text-amber-300 px-1 rounded-xs">
                                CONF: 94%
                              </span>
                            </div>
                            <div className="bg-black/80 backdrop-blur-xs p-1 rounded border border-amber-500/40 text-[9px] text-amber-200">
                              • Apparel: Gray Hoodie, Dark Trousers • Approx Age: 8
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 w-full bg-emerald-600 text-slate-950 font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Photo Captured Successfully</span>
                        </div>
                      </div>
                    )}

                    {/* Step 7: Location Geotag (16.0s - 18.2s) */}
                    {sceneTime >= 16.0 && sceneTime < 18.2 && (
                      <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-white block">Auto-Detected GPS Location</span>
                          
                          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-white block">Transit Plaza & 5th Ave Concourse</span>
                              <span className="text-[10px] text-slate-400 font-mono">Coords: 40.7580° N, 73.9855° W (±3m)</span>
                            </div>
                          </div>

                          <div className="h-28 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                            <div className="w-full h-full opacity-60 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="w-4 h-4 rounded-full bg-rose-500 animate-ping absolute" />
                              <span className="w-3 h-3 rounded-full bg-rose-500 relative" />
                            </div>
                          </div>
                        </div>

                        <div className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl text-xs text-center">
                          Confirm Geotag Location
                        </div>
                      </div>
                    )}

                    {/* Step 8: Details Notes (18.2s - 20.4s) */}
                    {sceneTime >= 18.2 && sceneTime < 20.4 && (
                      <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-white block">Sighting Observations</span>
                          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                            <span className="text-[10px] text-slate-400 font-mono block mb-1">Citizen Remarks</span>
                            <p className="text-xs text-white italic">
                              "Child appears lost and looking for family near sidewalk. Wearing gray hoodie."
                            </p>
                          </div>
                          <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Immediate Danger:</span>
                            <span className="text-emerald-400 font-bold font-mono">NO IMMEDIATE HAZARD</span>
                          </div>
                        </div>

                        <div className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl text-xs text-center">
                          Proceed to Final Review
                        </div>
                      </div>
                    )}

                    {/* Step 9: Review (20.4s - 22.4s) */}
                    {sceneTime >= 20.4 && sceneTime < 22.4 && (
                      <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300 text-xs">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                            <span className="font-bold text-white">Review Sighting Package</span>
                            <span className="text-[10px] text-blue-400 font-mono">CONFIDENTIAL</span>
                          </div>

                          <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 space-y-1.5 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Location:</span>
                              <span className="font-semibold text-white">Transit Plaza & 5th Ave</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Detected Features:</span>
                              <span className="font-semibold text-amber-300">Gray Hoodie, 8yo Male</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Timestamp:</span>
                              <span className="font-mono text-slate-300">17:42 Local (Live)</span>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button with Animated Tap */}
                        <div className="relative pt-2">
                          <div className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-2.5 rounded-xl text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Submit Sighting to CAD</span>
                          </div>
                          {sceneTime >= 21.6 && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 animate-ping pointer-events-none" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 10: Submit Confirmed — FM-10427 (22.4s - 24.8s) */}
                    {sceneTime >= 22.4 && (
                      <div className="flex-1 flex flex-col justify-center items-center text-center p-3 animate-in zoom-in-95 duration-400">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          Transmission Confirmed
                        </span>
                        <h3 className="text-base font-extrabold text-white mt-1">
                          Sighting Submitted — FM-10427
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 max-w-xs">
                          Encrypted dispatch package routed to CAD Central Operations.
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Citizen App Bottom Navigation Bar */}
                  <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex justify-around text-slate-400 text-[10px] shrink-0">
                    <div className="flex flex-col items-center gap-0.5">
                      <Home className="w-4 h-4" />
                      <span>Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-blue-400 font-bold">
                      <Camera className="w-4 h-4" />
                      <span>Report</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <FileText className="w-4 h-4" />
                      <span>My Reports</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Cinematic Lower Third Overlay */}
            <div className="absolute bottom-6 left-8 z-20 max-w-md pointer-events-none">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Scene 1 — Citizen App | Data
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                Sighting Submitted — FM-10427
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Complete sequential ingestion: sign in, smart camera capture, auto-GPS, and encrypted dispatch submission.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCENE 2: CAD CONSOLE | INSIGHT (44 - 72s, duration 28s)   */}
        {/* ========================================================= */}
        {scene.id === 'scene-2' && (
          <div className="relative w-full h-full bg-slate-950 overflow-hidden">
            {/* Workstation Physical Room Background (0s - 3.0s push in, 27.0s - 28s pull back) */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform ease-out duration-700"
              style={{
                transform: sceneTime < 3.0 
                  ? `scale(${1 + (sceneTime / 3.0) * 0.3})` 
                  : sceneTime > 26.5 
                    ? `scale(${1.3 - ((sceneTime - 26.5) / 1.5) * 0.3})` 
                    : 'scale(1.3)',
                filter: sceneTime >= 2.8 && sceneTime <= 27.0 ? 'blur(8px)' : 'none',
                opacity: sceneTime >= 2.8 && sceneTime <= 27.0 ? 0.2 : 1
              }}
            >
              <img 
                src={scene.imageSrc} 
                alt="CAD reviewer workstation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Notification on Monitor before Camera Enters (0s - 3.0s) */}
            {sceneTime < 3.0 && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-top-4 duration-500">
                <div className="bg-slate-900/95 border-2 border-amber-500 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Radio className="w-6 h-6 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block">
                      New Sighting Report — Priority Triage
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Case FM-10427 • Transit Plaza & 5th Ave
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* THE EXACT CAD CONSOLE DEMO FILLS 16:9 SCREEN (3.0s - 27.0s) */}
            {sceneTime >= 2.8 && sceneTime <= 27.2 && (
              <div className="absolute inset-0 bg-slate-950 flex flex-col z-20 animate-in fade-in zoom-in-95 duration-500 text-slate-100 font-sans overflow-hidden">
                
                {/* 1. TOP CAD CONSOLE BAR */}
                <header className="h-11 sm:h-12 bg-slate-900/95 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2.5">
                    <FindMePinIcon size={24} />
                    <span className="text-xs sm:text-sm font-black text-white tracking-tight">
                      FindMe CAD Operations
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-blue-300 bg-blue-950/80 border border-blue-500/40 px-2 py-0.5 rounded-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      TERM-04
                    </span>
                  </div>

                  {/* Sequential Navigation Breadcrumb Ribbon */}
                  <div className="hidden md:flex items-center gap-1.5 text-[9px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <span className={sceneTime < 6.2 ? 'text-blue-400 font-bold' : ''}>Dashboard</span>
                    <span>›</span>
                    <span className={sceneTime >= 6.2 && sceneTime < 9.5 ? 'text-blue-400 font-bold' : ''}>New Sightings</span>
                    <span>›</span>
                    <span className={sceneTime >= 9.5 && sceneTime < 13.0 ? 'text-blue-400 font-bold' : ''}>Open Report</span>
                    <span>›</span>
                    <span className={sceneTime >= 13.0 && sceneTime < 16.5 ? 'text-blue-400 font-bold' : ''}>AI Analysis</span>
                    <span>›</span>
                    <span className={sceneTime >= 16.5 && sceneTime < 19.8 ? 'text-amber-400 font-bold' : ''}>Potential Match</span>
                    <span>›</span>
                    <span className={sceneTime >= 19.8 && sceneTime < 23.0 ? 'text-blue-400 font-bold' : ''}>Evidence Review</span>
                    <span>›</span>
                    <span className={sceneTime >= 23.0 && sceneTime < 25.5 ? 'text-blue-400 font-bold' : ''}>Human Verification</span>
                    <span>›</span>
                    <span className={sceneTime >= 25.5 ? 'text-emerald-400 font-bold' : ''}>Approve & Forward</span>
                  </div>

                  {/* Certified Reviewer */}
                  <div className="flex items-center gap-2 sm:gap-3 text-xs">
                    <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                      <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-[10px] font-bold text-blue-300">
                        SJ
                      </div>
                      <div className="hidden sm:block text-left leading-tight">
                        <span className="text-[11px] font-bold text-white block">Sarah Jenkins</span>
                        <span className="text-[9px] text-emerald-400 font-mono">Certified Reviewer</span>
                      </div>
                    </div>
                  </div>
                </header>

                {/* 2. MAIN CAD BODY: SIDEBAR + EXACT WORKSPACE */}
                <div className="flex-1 flex overflow-hidden">
                  
                  {/* Left CAD Navigation Sidebar */}
                  <aside className="w-44 sm:w-48 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between p-2 shrink-0 select-none text-xs">
                    <div className="space-y-1">
                      <div className="px-2 py-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                        CAD Workspace
                      </div>

                      <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${sceneTime < 6.2 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800/60'}`}>
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Dashboard</span>
                      </div>

                      <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg ${sceneTime >= 6.2 && sceneTime < 9.5 ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800/60'}`}>
                        <div className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5" />
                          <span>New Sightings</span>
                        </div>
                        <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 rounded-full font-mono">
                          3
                        </span>
                      </div>

                      <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg ${sceneTime >= 9.5 ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20' : 'text-slate-400'}`}>
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>Under Review</span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      </div>
                    </div>

                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800/80 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5 text-blue-300 font-semibold mb-1">
                        <ShieldCheck className="w-3 h-3 text-blue-400" />
                        <span>Human Authority</span>
                      </div>
                      <span className="text-[9px] text-slate-500 block leading-tight">
                        Certified Tier 3 protocol strictly active.
                      </span>
                    </div>
                  </aside>

                  {/* Main Work Area: Multi-Step Navigation Views */}
                  <main className="flex-1 bg-slate-950 p-3 overflow-y-auto flex flex-col justify-between">
                    
                    {/* View 1: Dashboard (3.0s - 6.2s) */}
                    {sceneTime < 6.2 && (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <h2 className="text-sm font-bold text-white">Central Operations Dashboard</h2>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                            <span className="text-[10px] text-slate-400 block font-mono">Active Bulletins</span>
                            <span className="text-xl font-bold text-white">14</span>
                          </div>
                          <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl">
                            <span className="text-[10px] text-amber-400 block font-mono">New Sightings Queue</span>
                            <span className="text-xl font-bold text-amber-300">3 Priority</span>
                          </div>
                          <div className="bg-slate-900 border border-emerald-500/40 p-3 rounded-xl">
                            <span className="text-[10px] text-emerald-400 block font-mono">Units In Field</span>
                            <span className="text-xl font-bold text-emerald-300">8 Deployed</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View 2: New Sightings Queue (6.2s - 9.5s) */}
                    {sceneTime >= 6.2 && sceneTime < 9.5 && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <h2 className="text-sm font-bold text-white mb-2">New Sightings Queue (3 Pending Triage)</h2>
                        <div className="p-3 bg-blue-600/20 border-2 border-blue-500 rounded-xl flex items-center justify-between text-xs cursor-pointer shadow-lg">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">FM-10427 • Transit Plaza</span>
                              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-mono font-bold">HIGH PRIORITY</span>
                            </div>
                            <p className="text-[11px] text-slate-300 mt-1">Minor observed sitting alone in gray hoodie • Ingested 2m ago</p>
                          </div>
                          <button className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-xs">Open Report</button>
                        </div>

                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs opacity-60">
                          <div>
                            <span className="font-bold text-slate-300">FM-10426 • Metro Terminal B</span>
                            <p className="text-[11px] text-slate-400">Adult description match • 14m ago</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View 3, 4, 5, 6, 7, 8: Case Review Flow (9.5s - 27.2s) */}
                    {sceneTime >= 9.5 && (
                      <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
                        <div>
                          {/* Case Header */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">Case FM-10427</span>
                              <span className="text-slate-600">/</span>
                              <span className="text-xs font-bold text-white">Transit Plaza Sighting</span>
                              <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded-xs">
                                HIGH PRIORITY
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                                sceneTime < 25.5 
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                              }`}>
                                {sceneTime < 25.5 ? '● UNDER REVIEW' : '✓ APPROVED — LOCAL AUTHORITY NOTIFIED'}
                              </span>
                            </div>
                          </div>

                          {/* PROMINENT VISUAL LABELS: "Potential Match" & "Human Verification Required" */}
                          <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-2.5 mb-2.5 flex flex-wrap items-center justify-between gap-2 shadow-lg">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wide">
                                Potential Match Detected (87% Feature Correlation)
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 px-2 py-0.5 rounded-full animate-pulse">
                              Human Verification Required
                            </span>
                          </div>

                          {/* Evidence Review Side-by-Side Comparison */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                            {/* Left: Citizen Sighting Photo */}
                            <div className="bg-slate-900 rounded-xl p-2.5 border border-slate-800">
                              <div className="flex items-center justify-between mb-1.5 text-[11px]">
                                <span className="font-bold text-white flex items-center gap-1">
                                  <Camera className="w-3.5 h-3.5 text-blue-400" /> Citizen Ingestion Photo
                                </span>
                                <span className="font-mono text-slate-400 text-[10px]">17:42 Local</span>
                              </div>
                              <div className="h-32 bg-slate-950 rounded-lg overflow-hidden relative border border-slate-700">
                                <img 
                                  src={scene.imageSrc} 
                                  alt="Citizen photo"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                {sceneTime >= 13.0 && sceneTime < 16.5 && (
                                  <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-400 animate-pulse flex items-center justify-center">
                                    <span className="bg-black/80 text-blue-300 font-mono text-[9px] px-2 py-1 rounded">
                                      AI Biometric Scan Running...
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Right: Official Missing Bulletin Comparison */}
                            <div className="bg-slate-900 rounded-xl p-2.5 border border-slate-800">
                              <div className="flex items-center justify-between mb-1.5 text-[11px]">
                                <span className="font-bold text-white flex items-center gap-1">
                                  <FileText className="w-3.5 h-3.5 text-amber-400" /> Official Missing Bulletin
                                </span>
                                <span className="font-mono text-amber-300 text-[10px]">MP-2024-0982</span>
                              </div>
                              <div className="h-32 bg-slate-950 rounded-lg p-2.5 border border-slate-700 flex flex-col justify-between text-[11px]">
                                <div>
                                  <span className="font-bold text-white block">Marcus Vance (8yo Male)</span>
                                  <span className="text-slate-400 block text-[10px]">Last Seen: Near 5th Ave Transit</span>
                                  <span className="text-slate-300 text-[10px] mt-1 block">• Gray hoodie with navy trim</span>
                                </div>
                                <div className="p-1.5 bg-emerald-950/80 border border-emerald-500/40 rounded text-[10px] text-emerald-300">
                                  ✓ Biometric Landmark Match Confirmed
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reviewer Action Bar */}
                        <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                          <div className="text-[11px] text-slate-300">
                            <span className="font-bold text-white">Reviewer Note: </span>
                            <span>Visual confirmation validated against bulletin MP-2024-0982.</span>
                          </div>

                          <div className="relative">
                            <button className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-lg ${
                              sceneTime >= 25.5 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                            }`}>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{sceneTime >= 25.5 ? '✓ Approved & Forwarded' : 'Approve & Forward to Authorities'}</span>
                            </button>
                            {sceneTime >= 24.8 && sceneTime < 25.8 && (
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 animate-ping pointer-events-none" />
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  </main>
                </div>
              </div>
            )}

            {/* Cinematic Lower Third Overlay */}
            <div className="absolute bottom-6 left-8 z-20 max-w-md pointer-events-none">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Scene 2 — CAD Console | Insight
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                Certified Reviewer Verification
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Human authority governs every step. Reviewer assesses AI matching and approves prioritized authority dispatch.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCENE 3: FIELD RESPONSE | RESPONSE (72 - 94s, duration 22s)*/}
        {/* ========================================================= */}
        {scene.id === 'scene-3' && (
          <div className="relative w-full h-full bg-slate-950 overflow-hidden">
            {/* Physical Vehicle Cabin Background (0s - 2.5s push in, 21.0s - 22s pull back) */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform ease-out duration-700"
              style={{
                transform: sceneTime < 2.5 
                  ? `scale(${1 + (sceneTime / 2.5) * 0.2})` 
                  : sceneTime > 21 
                    ? `scale(${1.2 - ((sceneTime - 21) / 1) * 0.2})` 
                    : 'scale(1.2)',
                filter: sceneTime >= 2.2 && sceneTime <= 21.5 ? 'blur(6px)' : 'none',
                opacity: sceneTime >= 2.2 && sceneTime <= 21.5 ? 0.3 : 1
              }}
            >
              <img 
                src={scene.imageSrc} 
                alt="Field response unit inside vehicle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Notification on Rugged Smartphone before Camera Enters (0s - 2.5s) */}
            {sceneTime < 2.5 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-top-4 duration-500">
                <div className="bg-blue-950/95 border-2 border-blue-500 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Radio className="w-6 h-6 text-blue-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wide block">
                      New Case Assigned — FM-10427
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Priority Dispatch to Unit 4
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actual Field Response Application (2.2s - 21.5s) */}
            {sceneTime >= 2.0 && sceneTime <= 21.8 && (
              <div className="absolute inset-0 flex items-center justify-center p-3 z-30 animate-in fade-in zoom-in-95 duration-500">
                <div className="relative w-[340px] sm:w-[380px] h-[520px] sm:h-[560px] bg-slate-950 rounded-[36px] border-4 border-slate-700 shadow-2xl flex flex-col overflow-hidden text-slate-100 ring-1 ring-blue-500/30">
                  
                  {/* Field Terminal Header */}
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
                    <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                      <FindMePinIcon size={18} /> UNIT 4 TERMINAL
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono transition-colors ${
                      sceneTime >= 20.0 
                        ? 'bg-emerald-500 text-slate-950' 
                        : sceneTime >= 18.0 
                          ? 'bg-blue-500 text-white' 
                          : sceneTime >= 16.0 
                            ? 'bg-emerald-600 text-white' 
                            : sceneTime >= 13.5 
                              ? 'bg-amber-500 text-slate-950' 
                              : 'bg-blue-600 text-white'
                    }`}>
                      {sceneTime >= 20.0 
                        ? 'RESOLUTION' 
                        : sceneTime >= 18.0 
                          ? 'PERSON LOCATED' 
                          : sceneTime >= 16.0 
                            ? 'ARRIVED ON SCENE' 
                            : sceneTime >= 13.5 
                              ? 'ACTION IN PROGRESS' 
                              : 'ASSIGNED'}
                    </span>
                  </div>

                  {/* Top Sequential Navigation Breadcrumb Ribbon */}
                  <div className="px-2 py-1 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-[8px] font-mono overflow-x-auto whitespace-nowrap text-slate-500 shrink-0">
                    <span className={sceneTime < 4.8 ? 'text-blue-400 font-bold' : ''}>New Assignment</span>
                    <span>›</span>
                    <span className={sceneTime >= 4.8 && sceneTime < 7.0 ? 'text-blue-400 font-bold' : ''}>Case Details</span>
                    <span>›</span>
                    <span className={sceneTime >= 7.0 && sceneTime < 9.2 ? 'text-blue-400 font-bold' : ''}>Location</span>
                    <span>›</span>
                    <span className={sceneTime >= 9.2 && sceneTime < 11.2 ? 'text-blue-400 font-bold' : ''}>Accept</span>
                    <span>›</span>
                    <span className={sceneTime >= 11.2 && sceneTime < 13.5 ? 'text-blue-400 font-bold' : ''}>Navigation</span>
                    <span>›</span>
                    <span className={sceneTime >= 13.5 && sceneTime < 16.0 ? 'text-amber-400 font-bold' : ''}>Action</span>
                    <span>›</span>
                    <span className={sceneTime >= 16.0 && sceneTime < 18.0 ? 'text-blue-400 font-bold' : ''}>Arrived</span>
                    <span>›</span>
                    <span className={sceneTime >= 18.0 && sceneTime < 20.0 ? 'text-blue-400 font-bold' : ''}>Located</span>
                    <span>›</span>
                    <span className={sceneTime >= 20.0 ? 'text-emerald-400 font-bold' : ''}>Resolution</span>
                  </div>

                  {/* Case Summary Card */}
                  <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex items-center gap-3 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-700">
                      <img 
                        src={scene.imageSrc} 
                        alt="Subject thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-white block">Case FM-10427 • Marcus Vance (8yo)</span>
                      <span className="text-[11px] text-amber-300 block">Transit Plaza Concourse</span>
                      <span className="text-[10px] text-slate-400">Gray hoodie, navy trim, dark trousers</span>
                    </div>
                  </div>

                  {/* Tactical GPS & Turn-by-Turn Routing Area */}
                  <div className="flex-1 bg-slate-950 p-3 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-blue-400 font-bold flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> 1.2 MILES
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ETA: 4 MIN
                      </span>
                    </div>

                    {/* Vector Tactical Route */}
                    <div className="w-full h-28 relative flex items-center justify-center my-1">
                      <svg className="w-full h-full" viewBox="0 0 300 120">
                        <path 
                          d="M 30 90 Q 90 20 160 70 T 270 30" 
                          fill="none" 
                          stroke="#1e3a8a" 
                          strokeWidth="6" 
                          strokeLinecap="round"
                        />
                        <path 
                          d="M 30 90 Q 90 20 160 70 T 270 30" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="3" 
                          strokeDasharray="8 4"
                          strokeLinecap="round"
                          className="animate-pulse"
                        />
                        <circle cx="30" cy="90" r="7" fill="#3b82f6" />
                        <circle cx="270" cy="30" r="8" fill="#ef4444" className="animate-ping" />
                        <circle cx="270" cy="30" r="5" fill="#ef4444" />
                      </svg>
                    </div>

                    {/* Dynamic Turn-by-Turn Guidance */}
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-200 flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>
                        {sceneTime >= 20.0 
                          ? 'Case Concluded: Child in Protective Care' 
                          : sceneTime >= 18.0 
                            ? 'Visual Contact Made: Child Identified Near Steps' 
                            : sceneTime >= 16.0 
                              ? 'Arrived: Transit Plaza Concourse North' 
                              : 'In 400 ft, turn right on 5th Ave Concourse'}
                      </span>
                    </div>

                    {/* Navigation / Action State Button */}
                    <div className="relative mt-2">
                      <div className={`w-full font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                        sceneTime >= 20.0 
                          ? 'bg-emerald-600 text-white' 
                          : sceneTime >= 13.5 
                            ? 'bg-amber-500 text-slate-950' 
                            : 'bg-blue-600 text-white'
                      }`}>
                        <Navigation className="w-4 h-4" />
                        <span>
                          {sceneTime >= 20.0 
                            ? 'Resolution Confirmed' 
                            : sceneTime >= 18.0 
                              ? 'Person Located — Confirming Safeguard' 
                              : sceneTime >= 16.0 
                                ? 'Arrived on Scene — Searching' 
                                : sceneTime >= 13.5 
                                  ? 'Action in Progress (Routing Active)' 
                                  : 'Start Navigation'}
                        </span>
                      </div>
                      {sceneTime >= 10.5 && sceneTime < 11.5 && (
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 animate-ping pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* Field App Bottom Navigation */}
                  <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex justify-around text-slate-400 text-[10px] shrink-0">
                    <span className="text-blue-400 font-bold">Route</span>
                    <span>Dossier</span>
                    <span>Safeguarding</span>
                    <span>Radio</span>
                  </div>

                </div>
              </div>
            )}

            {/* Cinematic Lower Third Overlay */}
            <div className="absolute bottom-6 left-8 z-30 max-w-md pointer-events-none">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Scene 3 — Field Response
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                Tactical Navigation & 4-Min ETA
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Field terminal with synchronized sighting dossier, live GPS route, and turn-by-turn guidance.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCENE 4: ACTION | RESPONSE (94 - 105s, duration 11s)      */}
        {/* ========================================================= */}
        {scene.id === 'scene-4' && (
          <div className="relative w-full h-full bg-slate-950 overflow-hidden">
            {/* Response Personnel Reassuring Child Image */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out"
              style={{
                transform: `scale(${1 + sceneProgress * 0.12}) translate(0, ${sceneProgress * -1}%)`
              }}
            >
              <img 
                src={scene.imageSrc} 
                alt="Response personnel reassuring child"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cinematic Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Safeguarding Procedures HUD Overlay */}
            <div className="absolute top-8 right-8 z-20 max-w-xs bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-3.5 backdrop-blur-md text-xs space-y-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-4 h-4" />
                Safeguarding Verification Active
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-200">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Subject Approached at Eye-Level</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Identity Confirmed (Marcus, Age 8)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Immediate Medical & Warmth Check: OK</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Guardian Contact Initiated</span>
                </div>
              </div>
            </div>

            {/* Cinematic Lower Third Overlay */}
            <div className="absolute bottom-6 left-8 z-20 max-w-md pointer-events-none">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Scene 4 — Final Moment
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                Child Found & Safeguarded
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Responders reach the location safely, finding and reassuring the child.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCENE 5: CLOSE THE LOOP (105 - 118s, duration 13s)        */}
        {/* ========================================================= */}
        {scene.id === 'scene-5' && (
          <div className="relative w-full h-full bg-slate-950 overflow-hidden">
            {/* Relieved Woman Film Still (0s - 7.5s) */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out"
              style={{
                transform: `scale(${1 + sceneProgress * 0.1})`,
                opacity: sceneTime > 7.5 ? Math.max(0, 1 - (sceneTime - 7.5) * 0.7) : 1
              }}
            >
              <img 
                src={scene.imageSrc} 
                alt="Woman looking relieved at smartphone"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Soft Ambient Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none" />

            {/* CITIZEN NOTIFICATIONS (1s - 7.5s) */}
            {sceneTime >= 0.8 && sceneTime < 7.5 && (
              <div className="absolute top-1/4 right-8 sm:right-24 z-30 max-w-sm space-y-2.5 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-slate-900/95 border border-blue-500/50 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <FindMePinIcon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-400 font-mono font-bold block">CITIZEN NOTIFICATION</span>
                    <span className="text-xs font-semibold text-white">Authorities Have Been Notified</span>
                  </div>
                </div>

                {sceneTime > 2.8 && (
                  <div className="bg-slate-900/95 border border-amber-500/50 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-right-4 duration-300">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <Radio className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono font-bold block">STATUS UPDATE</span>
                      <span className="text-xs font-semibold text-white">Response in Progress — Unit on scene</span>
                    </div>
                  </div>
                )}

                {sceneTime > 4.8 && (
                  <div className="bg-emerald-950/95 border-2 border-emerald-400 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in zoom-in-95 duration-400">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block">CASE RESOLVED</span>
                      <span className="text-sm font-extrabold text-white">Person Located — Safe & Reunited</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Official Brand Outro & Correct FindMe AI Logo (7.2s - 13s) */}
            {sceneTime >= 7.2 && (
              <div 
                className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-center p-8 z-40 transition-opacity duration-1000"
                style={{ opacity: Math.min(1, (sceneTime - 7.2) * 1.2) }}
              >
                <div className="mb-6 animate-in zoom-in-90 duration-500">
                  <FindMePinIcon size={80} />
                </div>
                
                <FindMeLogo size="xl" variant="dark" showTagline={true} />

                <div className="inline-flex items-center gap-4 text-xs text-slate-400 font-mono border-t border-slate-800 pt-6 mt-6">
                  <span>Citizen Sighting App</span>
                  <span>•</span>
                  <span>CAD Review Console</span>
                  <span>•</span>
                  <span>Field Response Terminal</span>
                </div>
              </div>
            )}

            {/* Cinematic Lower Third Overlay */}
            {sceneTime < 7.2 && (
              <div className="absolute bottom-6 left-8 z-20 max-w-md pointer-events-none">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Scene 5 — Close the Loop
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                  Citizen Kept Informed
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Citizen receives immediate confirmation that the child has been located safely.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Cinematic Anamorphic Letterbox Framing Bars */}
      <div className="absolute top-0 inset-x-0 h-4 sm:h-6 bg-black z-30 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-4 sm:h-6 bg-black z-30 pointer-events-none" />
    </div>
  );
};
