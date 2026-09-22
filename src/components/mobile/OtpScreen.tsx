import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, RotateCw, CheckCircle2, Lock } from 'lucide-react';
import { FindMePinIcon } from '../FindMeLogo';

interface OtpScreenProps {
  phoneOrEmail: string;
  onVerified: () => void;
  onBack: () => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({
  phoneOrEmail,
  onVerified,
  onBack
}) => {
  const [otp, setOtp] = useState<string[]>(['4', '8', '2', '9', '1', '0']);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedDigits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      pastedDigits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');

    // Auto advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = otp.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerified();
    }, 600);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-slate-900">
      <div>
        {/* Navigation Bar */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>256-Bit TLS Verification</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 mx-auto flex items-center justify-center text-blue-600 mb-3 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            Verify your mobile number
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-[280px] mx-auto">
            Enter the 6-digit code sent to{' '}
            <span className="font-semibold text-slate-900">
              {phoneOrEmail || '+1 (555) 234-5678'}
            </span>
          </p>
        </div>

        {/* Six OTP Input Boxes */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono rounded-2xl border ${
                  digit 
                    ? 'border-blue-600 bg-blue-50/30 text-blue-950' 
                    : 'border-slate-200 bg-slate-50/60 text-slate-900'
                } focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-hidden transition-all shadow-xs`}
              />
            ))}
          </div>

          {error && (
            <p className="mt-3 text-center text-xs text-rose-600 font-medium">
              {error}
            </p>
          )}

          {/* Test shortcut button to quickly autofill valid code */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setOtp(['4', '8', '2', '9', '1', '0'])}
              className="text-[11px] text-slate-500 hover:text-blue-600 font-medium underline transition-colors"
            >
              Demo: Fill sample code (482910)
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isVerifying ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>
        </div>

        {/* Resend Link */}
        <div className="mt-5 text-center">
          <button
            onClick={handleResend}
            disabled={resending}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            <span>{resending ? 'Sending new code...' : 'Resend code'}</span>
          </button>
          {resendSuccess && (
            <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>A fresh 6-digit code was sent!</span>
            </div>
          )}
        </div>
      </div>

      {/* Small Verified Security Icon Footer */}
      <div className="pt-6 pb-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Verified Identity Token (NIST SP 800-63B Level 2)</span>
      </div>
    </div>
  );
};
