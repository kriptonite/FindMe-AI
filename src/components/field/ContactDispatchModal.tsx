import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  ShieldAlert, 
  X, 
  Check, 
  Send,
  AlertCircle
} from 'lucide-react';

interface ContactDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  location: string;
  onStatusUpdate?: (statusMessage: string) => void;
}

export const ContactDispatchModal: React.FC<ContactDispatchModalProps> = ({
  isOpen,
  onClose,
  caseId,
  location,
  onStatusUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'radio' | 'cad-msg'>('radio');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [callSeconds, setCallSeconds] = useState(12);
  const [pttActive, setPttActive] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [sentConfirm, setSentConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !callActive) return;
    const interval = setInterval(() => {
      setCallSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, callActive]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleQuickCode = (code: string, text: string) => {
    setSentConfirm(`Sent: [${code}] ${text}`);
    if (onStatusUpdate) onStatusUpdate(`Sent to CAD: ${code} - ${text}`);
    setTimeout(() => setSentConfirm(null), 3500);
  };

  const handleSendCustomMsg = () => {
    if (!customMsg.trim()) return;
    setSentConfirm(`Transmitted: "${customMsg}"`);
    if (onStatusUpdate) onStatusUpdate(`Field message: ${customMsg}`);
    setCustomMsg('');
    setTimeout(() => setSentConfirm(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col text-white animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-sm tracking-wide text-white">CAD DISPATCH TRUNK TAC-4</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Case Info Banner */}
        <div className="bg-blue-950/60 border-b border-blue-800/40 px-4 py-2 text-xs flex items-center justify-between">
          <span className="font-semibold text-blue-200">Active Case: {caseId}</span>
          <span className="text-slate-300 truncate max-w-[160px]">{location}</span>
        </div>

        {/* Channel / Call Mode Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-950/80 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('radio')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'radio'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Radio / PTT Voice</span>
          </button>
          <button
            onClick={() => setActiveTab('cad-msg')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'cad-msg'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Quick CAD Codes</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {sentConfirm && (
            <div className="mb-3 bg-emerald-900/60 border border-emerald-500/50 rounded-xl p-2.5 flex items-center gap-2 text-xs text-emerald-200">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{sentConfirm}</span>
            </div>
          )}

          {activeTab === 'radio' ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center relative">
                <Radio className="w-8 h-8 text-blue-400" />
                {callActive && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-bold text-base text-white">Central Emergency CAD</h4>
                <p className="text-xs text-slate-400">Dispatcher K. Ramos • Operator #14</p>
                <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 text-xs font-mono font-bold">
                  <span>● Live Trunk</span>
                  <span>{formatTimer(callSeconds)}</span>
                </div>
              </div>

              {/* Push To Talk Button */}
              <div className="w-full pt-2">
                <button
                  onMouseDown={() => setPttActive(true)}
                  onMouseUp={() => setPttActive(false)}
                  onTouchStart={() => setPttActive(true)}
                  onTouchEnd={() => setPttActive(false)}
                  className={`w-full py-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all shadow-lg select-none cursor-pointer ${
                    pttActive
                      ? 'bg-rose-600 text-white ring-4 ring-rose-400/50 scale-[0.98]'
                      : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black tracking-wider text-base">
                    <Mic className="w-5 h-5" />
                    <span>{pttActive ? 'TRANSMITTING VOICE...' : 'PRESS & HOLD TO TALK (PTT)'}</span>
                  </div>
                  <span className="text-[11px] opacity-80">Channel TAC-4 priority broadcast</span>
                </button>
              </div>

              {/* Dispatch Voice Audio Waveform Simulation */}
              <div className="w-full bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  <span>Radio Monitor:</span>
                </div>
                <div className="flex items-center gap-0.5 h-4">
                  {[4, 12, 8, 16, 20, 14, 6, 18, 10, 14, 8].map((h, i) => (
                    <span 
                      key={i} 
                      className="w-1 bg-emerald-400 rounded-full animate-pulse" 
                      style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }} 
                    />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">CLEAR</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">Tap standard code to log directly into Dispatch CAD record:</p>
              
              <div className="grid grid-cols-1 gap-2">
                {[
                  { code: '10-97', label: 'Arrived on Scene', desc: 'Unit 4 at designated transit location' },
                  { code: '10-06', label: 'Subject Visual Contact', desc: 'Sighting in sight, approaching on foot' },
                  { code: '10-78', label: 'Request Backup Unit', desc: 'Additional officers for perimeter containment' },
                  { code: '10-52', label: 'Request EMS / Medic', desc: 'Medical evaluation needed on scene' },
                  { code: 'Code 4', label: 'Scene Safe / Subject Located', desc: 'Individual in protective custody' }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => handleQuickCode(item.code, item.label)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold text-xs">
                          {item.code}
                        </span>
                        <span className="text-xs font-semibold text-white">{item.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </button>
                ))}
              </div>

              {/* Custom CAD message */}
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type urgent CAD note..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendCustomMsg}
                  disabled={!customMsg.trim()}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 rounded-xl text-xs font-bold text-white flex items-center justify-center transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            Minimize Radio Channel
          </button>
        </div>
      </div>
    </div>
  );
};
