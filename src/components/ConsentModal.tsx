import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { BureauMockBadge } from './common/ScreenStates';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose }) => {
  const { persona, completeConsent, isConsentLoading } = useCredit();

  const [pan, setPan] = useState(persona.panMasked);
  const [dob, setDob] = useState('14/08/1996');
  const [isAgreed, setIsAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      setErrorMsg('Please accept the soft inquiry consent terms to proceed.');
      return;
    }
    setErrorMsg('');
    await completeConsent(pan, dob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 overflow-hidden animate-in fade-in slide-in-from-bottom duration-300">
        {/* Modal Top Bar */}
        <div className="bg-[#5F259F] text-white px-5 pt-4 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Bureau Credit Consent</h3>
              <p className="text-[10px] text-purple-200">100% Free • Soft Bureau Check</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isConsentLoading}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Form Body or Loading Animation */}
        {isConsentLoading ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-purple-100 border-t-[#5F259F] animate-spin flex items-center justify-center" />
              <ShieldCheck className="w-6 h-6 text-[#5F259F] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 text-sm">Fetching Bureau Records</h4>
              <p className="text-xs text-purple-700 font-medium animate-pulse">
                Initiating soft inquiry with Bureau (mock)...
              </p>
              <p className="text-[11px] text-gray-400">
                Checking payment history, accounts, and active EMIs
              </p>
            </div>

            <div className="w-full max-w-xs bg-purple-50 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#5F259F] h-full rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">Verified Identity</span>
              <BureauMockBadge />
            </div>

            {/* User Name (Read-only verified) */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-600">Full Name (as per PAN)</label>
              <input
                type="text"
                readOnly
                value={persona.name}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 outline-none"
              />
            </div>

            {/* PAN & DOB Inputs */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-600">PAN Number</label>
                <input
                  type="text"
                  required
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  className="w-full px-3 py-2 bg-white border border-purple-200 focus:border-[#5F259F] rounded-xl text-xs font-mono font-semibold text-gray-900 outline-none uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-600">Date of Birth</label>
                <input
                  type="text"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3 py-2 bg-white border border-purple-200 focus:border-[#5F259F] rounded-xl text-xs font-medium text-gray-900 outline-none"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-600">Mobile (Linked to UPI)</label>
              <input
                type="text"
                readOnly
                value={persona.phone}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-700 outline-none"
              />
            </div>

            {/* Required Consent Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#5F259F] border-gray-300 focus:ring-[#5F259F] cursor-pointer"
                />
                <span className="text-xs text-gray-600 leading-snug">
                  I agree to a <strong className="text-gray-900 font-semibold">soft inquiry (no impact on score)</strong> and authorize Bureau (mock) to fetch my credit history for monthly health tracking.
                </span>
              </label>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                {errorMsg}
              </p>
            )}

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isConsentLoading}
              className="w-full min-h-[44px] py-3 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Fetch Credit Score</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pb-1">
              <Lock className="w-3 h-3 text-gray-400" />
              <span>256-bit bank grade encryption • Bureau (mock) verified</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
