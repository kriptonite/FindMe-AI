import React from 'react';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';
import { FindMePinIcon } from '../FindMeLogo';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-gradient-to-b from-white via-slate-50 to-blue-50/40 text-slate-900 select-none">
      {/* Top Security Pill */}
      <div className="pt-3 flex justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-[11px] font-semibold shadow-xs">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>Verified Citizen Safety Network</span>
        </div>
      </div>

      {/* Center Hero & Logo */}
      <div className="flex flex-col items-center text-center my-auto py-8">
        {/* Animated AI / Network Constellation Graphic */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Subtle AI Network Pulsing Rings */}
          <div className="absolute w-44 h-44 rounded-full border border-blue-200/60 animate-ping opacity-25" />
          <div className="absolute w-36 h-36 rounded-full border border-blue-300/40 animate-pulse" />
          <div className="absolute w-28 h-28 rounded-full bg-blue-50/80" />

          {/* Network Connection Nodes */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 shadow-sm ring-4 ring-white" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm ring-4 ring-white" />
          <div className="absolute top-1/2 -left-4 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-white" />
          <div className="absolute top-1/3 -right-3 w-2 h-2 rounded-full bg-blue-400 ring-2 ring-white" />

          {/* Center FindMe AI Pin Logo */}
          <div className="relative z-10 p-3 bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-slate-100 flex items-center justify-center">
            <FindMePinIcon size={64} glow={true} />
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            FindMe
          </span>
          <span className="text-3xl font-black tracking-tight text-blue-600 font-display">
            AI
          </span>
        </div>

        {/* Tagline */}
        <div className="mt-3 text-lg font-bold tracking-wide text-blue-900">
          “See. Report. Connect. Find.”
        </div>

        {/* Subtext */}
        <p className="mt-2 text-sm text-slate-600 max-w-[260px] leading-relaxed">
          Helping people find people through responsible AI.
        </p>

        {/* Responsible AI Feature Points */}
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs text-xs text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Human-Verified • CJIS Compliant</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pb-4 space-y-3">
        <button
          onClick={onContinue}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] text-center text-slate-500">
          Built for verified citizens & authorized emergency responders.
        </p>
      </div>
    </div>
  );
};
