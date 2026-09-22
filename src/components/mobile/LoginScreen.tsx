import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { FindMePinIcon } from '../FindMeLogo';

interface LoginScreenProps {
  onContinue: (phone: string) => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onContinue,
  onOpenTerms,
  onOpenPrivacy
}) => {
  const [phoneNumber, setPhoneNumber] = useState('(555) 234-5678');
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [email, setEmail] = useState('sarah.jenkins@community.org');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailMode && phoneNumber.trim().length < 7) {
      setError('Please enter a valid mobile number');
      return;
    }
    if (isEmailMode && !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    onContinue(isEmailMode ? email : phoneNumber);
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-slate-900">
      {/* Top Header */}
      <div>
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FindMePinIcon size={28} glow={false} />
            <div className="font-display font-bold text-slate-900 text-lg">
              FindMe<span className="text-blue-600">AI</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure Portal</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Welcome to FindMe AI
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Help report sightings and connect people with the right authorities.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isEmailMode ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mobile number
              </label>
              <div className="flex rounded-2xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 bg-slate-50/50 transition-all overflow-hidden shadow-xs">
                {/* Country Code Pill */}
                <div className="flex items-center gap-1 px-3.5 bg-slate-100/80 border-r border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="text-base leading-none">🇺🇸</span>
                  <span>+1</span>
                </div>
                {/* Phone Input */}
                <div className="relative flex-1 flex items-center">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setError('');
                    }}
                    placeholder="(555) 000-0000"
                    className="w-full py-3.5 pl-3 pr-10 text-sm font-medium text-slate-900 bg-transparent outline-hidden"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>We'll send a 6-digit one-time code to verify your device.</span>
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="flex rounded-2xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 bg-slate-50/50 transition-all overflow-hidden shadow-xs">
                <div className="relative flex-1 flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="you@example.com"
                    className="w-full py-3.5 px-3.5 text-sm font-medium text-slate-900 bg-transparent outline-hidden"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-rose-600 font-medium">{error}</p>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Option: Email / Phone toggle */}
          <button
            type="button"
            onClick={() => {
              setIsEmailMode(!isEmailMode);
              setError('');
            }}
            className="w-full py-2.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            {isEmailMode ? 'Sign in with mobile number' : 'Sign in with email'}
          </button>
        </form>

        {/* Trust & Safety Notice */}
        <div className="mt-8 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-900">Protected Citizen Identity</div>
            <p className="text-[11px] text-blue-800/80 mt-0.5 leading-relaxed">
              Your contact info is never shared publicly or visible to unauthorized parties. Reports are encrypted and routed only to accredited response coordinators.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal Links */}
      <div className="pt-6 pb-2 text-center text-xs text-slate-500">
        <span>By continuing, you agree to FindMe AI’s </span>
        <button
          type="button"
          onClick={onOpenTerms}
          className="text-blue-600 font-medium hover:underline inline"
        >
          Terms of Use
        </button>
        <span> and </span>
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="text-blue-600 font-medium hover:underline inline"
        >
          Privacy Policy
        </button>
        .
      </div>
    </div>
  );
};
