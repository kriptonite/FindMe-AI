import React from 'react';
import { 
  Play, 
  Smartphone, 
  Maximize2, 
  Radio, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { FieldScreen } from './types';

interface QuickScenarioBarProps {
  currentScreen: FieldScreen;
  onSelectScreen: (screen: FieldScreen) => void;
  isFrameless: boolean;
  onToggleFrameless: () => void;
  onOpenDispatch: () => void;
  onTriggerNewCaseAlert: () => void;
  onResetFlow: () => void;
}

export const QuickScenarioBar: React.FC<QuickScenarioBarProps> = ({
  currentScreen,
  onSelectScreen,
  isFrameless,
  onToggleFrameless,
  onOpenDispatch,
  onTriggerNewCaseAlert,
  onResetFlow
}) => {
  const steps: { screen: FieldScreen; label: string; num: string }[] = [
    { screen: 'login', label: '1. Login', num: '1' },
    { screen: 'home', label: '2. Home (KPIs)', num: '2' },
    { screen: 'case-details', label: '3. Case Details', num: '3' },
    { screen: 'navigation', label: '4. Navigation', num: '4' },
    { screen: 'action-in-progress', label: '5. In Progress', num: '5' },
    { screen: 'arrival', label: '6. Arrival', num: '6' },
    { screen: 'field-assessment', label: '7. Assessment', num: '7' },
    { screen: 'person-located', label: '8. Located!', num: '8' },
    { screen: 'resolution', label: '9. Resolution', num: '9' },
    { screen: 'case-history', label: '10. Timeline', num: '10' },
    { screen: 'notifications', label: '11. Notifications', num: '11' },
    { screen: 'profile-settings', label: '12. Profile', num: '12' }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white p-2 sm:px-4 flex flex-col gap-2 shrink-0 z-40 select-none shadow-md">
      {/* Top Controls Row */}
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold text-white tracking-wide">
            FINDME AI — FIELD RESPONSE PROTOTYPE
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 font-mono text-[10px] border border-blue-500/30">
            DISPATCH FLOW EVALUATOR
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Radio Call Dispatch Trigger */}
          <button
            onClick={onOpenDispatch}
            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-blue-200" />
            <span>Radio Trunk</span>
          </button>

          {/* Trigger Alert Notification */}
          <button
            onClick={onTriggerNewCaseAlert}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="Inject simulated CAD priority dispatch notification"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Simulate Alert</span>
          </button>

          {/* Chassis / Frame Toggle */}
          <button
            onClick={onToggleFrameless}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            {isFrameless ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Device Frame</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Full Screen</span>
              </>
            )}
          </button>

          {/* Restart Flow */}
          <button
            onClick={onResetFlow}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Reset to Screen 1 (Login)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen Steps Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 mr-1">
          Interactive Flow:
        </span>
        {steps.map((step) => {
          const isCurrent = currentScreen === step.screen;
          return (
            <button
              key={step.screen}
              onClick={() => onSelectScreen(step.screen)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-400'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
