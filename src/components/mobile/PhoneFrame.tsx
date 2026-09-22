import React from 'react';
import { Wifi, Battery, Signal, Smartphone, Maximize2 } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  isFrameless?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  currentTime = '10:35',
  isFrameless = false
}) => {
  if (isFrameless) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-2xl flex flex-col relative overflow-hidden border-x border-slate-200">
        {/* Simple Top Status Bar for frameless view */}
        <div className="h-10 bg-white border-b border-slate-100 px-6 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0 z-30 select-none">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-4 sm:my-8 flex justify-center items-center select-none">
      {/* Phone Outer Chassis (Natural Titanium / Deep Slate Finish) */}
      <div className="w-[375px] sm:w-[390px] h-[812px] sm:h-[844px] bg-slate-900 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4),0_0_0_1px_rgba(255,255,255,0.1),0_0_0_8px_#334155] relative flex flex-col overflow-hidden ring-1 ring-slate-800">
        {/* External Hardware Buttons (Power & Volume Accents) */}
        <div className="absolute -left-[10px] top-28 w-[3px] h-9 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[10px] top-42 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[10px] top-58 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[10px] top-36 w-[3px] h-18 bg-slate-600 rounded-r-sm" />

        {/* Dynamic Island Capsule & iOS Status Bar */}
        <div className="h-11 bg-white rounded-t-[40px] px-6 flex items-center justify-between text-xs font-semibold text-slate-900 shrink-0 z-40 relative border-b border-slate-100/60">
          {/* Status Time */}
          <span className="font-semibold text-xs tracking-tight">{currentTime}</span>

          {/* Center Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-6.5 bg-black rounded-full flex items-center justify-between px-3 shadow-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-950 border border-blue-900" />
            </div>
          </div>

          {/* Right Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-900">
            <Signal className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">5G</span>
            <Battery className="w-4 h-4 fill-slate-900" />
          </div>
        </div>

        {/* Screen Content Container with Smooth Inset Radius */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-y-auto relative flex flex-col">
            {children}
          </div>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-6 bg-white rounded-b-[40px] flex items-center justify-center shrink-0 z-30">
          <div className="w-32 h-1 bg-slate-800/80 rounded-full" />
        </div>
      </div>
    </div>
  );
};
