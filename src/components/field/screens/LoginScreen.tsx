import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, User, ArrowRight, Radio, Sparkles } from 'lucide-react';
import { FindMeLogo } from '../../FindMeLogo';

interface LoginScreenProps {
  onSignInSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSignInSuccess }) => {
  const [officerId, setOfficerId] = useState('OFF-4028');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [useSso, setUseSso] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess();
    }, 600);
  };

  const handleQuickOfficerSelect = (id: string) => {
    setOfficerId(id);
    setPassword('SecurePass2026!');
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-6 select-none">
      {/* Top Secure Connection Badge */}
      <div className="flex items-center justify-between pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secure connection</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-600">CJIS LEVEL 4</span>
      </div>

      {/* Main Logo & Title */}
      <div className="my-auto py-6 space-y-5">
        <div className="flex flex-col items-center text-center space-y-3">
          <FindMeLogo size="lg" variant="dark" showTagline={false} />
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Field Response
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs mx-auto leading-relaxed">
              Secure access for authorized response teams.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Employee / Officer ID */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Employee / Officer ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="e.g. OFF-4028"
                required
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm font-semibold text-slate-900 placeholder-slate-400 bg-white transition-all outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm font-semibold text-slate-900 placeholder-slate-400 bg-white transition-all outline-none font-mono"
              />
            </div>
          </div>

          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating Unit...
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Organization Auth / SSO */}
        <div className="pt-2 text-center space-y-2">
          <button
            type="button"
            onClick={() => {
              setUseSso(true);
              setTimeout(() => {
                onSignInSuccess();
              }, 400);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
            <span>Use organization authentication</span>
          </button>

          <p className="text-[11px] text-slate-500">
            Authorized state & local public safety personnel only.
          </p>
        </div>

        {/* Quick Demo Pre-set Switcher */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Quick Demo Credential:</span>
          <button
            onClick={() => handleQuickOfficerSelect('OFF-4028')}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Officer J. Mercer (#4028)
          </button>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="text-center pt-2 border-t border-slate-100">
        <span className="text-[10px] text-slate-400 font-medium">
          FindMe AI Platform • Field Response Terminal v4.2
        </span>
      </div>
    </div>
  );
};
