import React from 'react';
import { 
  UserCheck, 
  Image as ImageIcon, 
  BrainCircuit, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Network, 
  CheckCircle2, 
  Lock, 
  LocateFixed, 
  ClipboardCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/**
 * 5 Pipeline Stages as presented in FindMe AI architecture:
 * 1. Verified Users
 * 2. Report Sightings
 * 3. AI Match & Analysis
 * 4. Location Intelligence
 * 5. Secure & Privacy First
 */
export const FindMePipelineSteps: React.FC<{ compact?: boolean; className?: string }> = ({ 
  compact = false,
  className = ''
}) => {
  const steps = [
    {
      id: 'verified',
      title: 'Verified Users',
      desc: 'Trusted citizen reporters',
      icon: (
        <div className="relative">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
        </div>
      )
    },
    {
      id: 'report',
      title: 'Report Sightings',
      desc: 'High-res photos & notes',
      icon: <ImageIcon className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'ai-match',
      title: 'AI Match & Analysis',
      desc: 'Biometric landmarking',
      icon: <BrainCircuit className="w-5 h-5 text-sky-400 animate-pulse" />
    },
    {
      id: 'location',
      title: 'Location Intelligence',
      desc: 'Geospatial CAD mapping',
      icon: <MapPin className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'security',
      title: 'Secure & Privacy First',
      desc: 'End-to-end encrypted',
      icon: <Lock className="w-5 h-5 text-sky-400" />
    }
  ];

  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 sm:gap-3 ${className}`}>
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center text-center group cursor-default">
            {/* Squircle Icon Badge */}
            <div className={`rounded-xl border border-sky-500/30 bg-gradient-to-b from-slate-800 to-slate-900 shadow-md shadow-sky-950/40 flex items-center justify-center transition-all group-hover:border-sky-400/60 group-hover:scale-105 ${
              compact ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              {step.icon}
            </div>
            
            {/* Step Label */}
            <span className={`mt-2 font-semibold text-slate-200 group-hover:text-white transition-colors ${
              compact ? 'text-[11px]' : 'text-xs'
            }`}>
              {step.title}
            </span>
            {!compact && (
              <span className="text-[10px] text-slate-400 hidden sm:block">
                {step.desc}
              </span>
            )}
          </div>

          {/* Dotted connector */}
          {idx < steps.length - 1 && (
            <div className="hidden lg:flex items-center text-sky-400/40 tracking-widest text-xs select-none">
              ••••
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * "Stronger Together" Triad Badge from the official reference graphic:
 * Technology + Community + Authorities = More Lives Reunited
 */
export const StrongerTogetherBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-4 rounded-xl bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 border border-blue-900/40 text-white shadow-lg ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" />
            <h4 className="font-bold text-base tracking-tight text-white">Stronger Together</h4>
          </div>
          <p className="text-xs text-sky-200/80 mt-0.5">
            Technology + Community + Authorities = <span className="font-semibold text-white">More Lives Reunited</span>
          </p>
        </div>

        {/* 3 Action Badges: Report, Analyze, Act */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-sky-500/40 flex items-center justify-center text-sky-300 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-300 mt-1">Report</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-sky-500/50 hidden sm:block" />

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-sky-500/40 flex items-center justify-center text-sky-300 shadow-xs">
              <Network className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-300 mt-1">Analyze</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-sky-500/50 hidden sm:block" />

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 border border-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-sky-200 mt-1">Act</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * "Every Sightings Can Bring Hope" floating badge from the reference graphic
 */
export const EverySightingsHopeBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 border border-sky-400/40 transition-all select-none ${className}`}>
      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
      </div>
      <span>Every Sightings Can Bring Hope</span>
    </div>
  );
};

/**
 * Enterprise Capabilities Footer Bar from the bottom of the reference graphic:
 * 1. AI-Powered Matching
 * 2. Real-time Location Tracking
 * 3. Secure & Encrypted
 * 4. Role-based Access
 * 5. Audit & Accountability
 */
export const FindMeCapabilitiesBar: React.FC<{ className?: string; dark?: boolean }> = ({ 
  className = '',
  dark = true
}) => {
  const capabilities = [
    {
      id: 'ai',
      label: 'AI-Powered Matching',
      icon: BrainCircuit,
      color: 'text-sky-400'
    },
    {
      id: 'location',
      label: 'Real-time Location Tracking',
      icon: LocateFixed,
      color: 'text-emerald-400'
    },
    {
      id: 'security',
      label: 'Secure & Encrypted',
      icon: Lock,
      color: 'text-amber-400'
    },
    {
      id: 'rbac',
      label: 'Role-based Access',
      icon: Users,
      color: 'text-indigo-400'
    },
    {
      id: 'audit',
      label: 'Audit & Accountability',
      icon: ClipboardCheck,
      color: 'text-sky-300'
    }
  ];

  return (
    <div className={`py-3 px-4 rounded-xl border flex flex-wrap items-center justify-around gap-4 text-xs select-none ${
      dark 
        ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
        : 'bg-white border-slate-200 text-slate-700 shadow-xs'
    } ${className}`}>
      {capabilities.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="flex items-center gap-2 group cursor-default">
            <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${item.color}`} />
            <span className="font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
