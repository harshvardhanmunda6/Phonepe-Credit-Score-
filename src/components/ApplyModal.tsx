import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles, Building2 } from 'lucide-react';
import { OfferItem } from '../types/credit';
import { useCredit } from '../context/CreditContext';
import { BureauMockBadge } from './common/ScreenStates';

interface ApplyModalProps {
  offer: OfferItem;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ offer, onClose }) => {
  const { persona, submitOfferApplication, isApplying, applySuccessOffer, dismissApplySuccess } =
    useCredit();

  const [step, setStep] = useState<'review' | 'consent' | 'decision'>('review');
  const [agreedConsent, setAgreedConsent] = useState(true);

  const handleProceedToConsent = () => {
    setStep('consent');
  };

  const handleFinalSubmit = async () => {
    setStep('decision');
    await submitOfferApplication(offer);
  };

  // If already in success state
  if (applySuccessOffer && applySuccessOffer.id === offer.id) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
        <div className="w-full max-w-[390px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Mock Application Approved
            </span>
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
              Pre-Qualified Sanction Granted!
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Your application for <strong>{offer.title}</strong> by {offer.partnerName} has been processed via Bureau (mock) instant verification.
            </p>
          </div>

          <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 text-left space-y-1 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Reference Number:</span>
              <span className="font-mono font-bold text-gray-900">#UPI-89420-MK</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Sanctioned Limit:</span>
              <span className="font-bold text-[#5F259F]">{offer.creditLimitDisplay}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Applicant Name:</span>
              <span className="font-semibold text-gray-800">{persona.name}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Disbursal Method:</span>
              <span className="font-semibold text-gray-800">Direct to UPI Bank VPA</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400">
            Note: This is a prototype mock decision. No real money or loans are issued.
          </p>

          <button
            onClick={() => {
              dismissApplySuccess();
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="bg-[#5F259F] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">{offer.partnerName}</h3>
              <p className="text-[10px] text-purple-200">Pre-Qualified Application Flow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isApplying}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Step 3: Decision Loading */}
        {isApplying || step === 'decision' ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-purple-100 border-t-[#5F259F] animate-spin flex items-center justify-center" />
              <Sparkles className="w-5 h-5 text-[#5F259F] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 text-sm">Underwriting Evaluation</h4>
              <p className="text-xs text-[#5F259F] font-semibold animate-pulse">
                Running mock automated decision engine...
              </p>
              <p className="text-[11px] text-gray-400">
                Matching verified PAN, bureau payment score &amp; lender risk matrices
              </p>
            </div>
          </div>
        ) : step === 'review' ? (
          /* Step 1: Review Terms */
          <div className="p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-sm">{offer.title}</span>
              <BureauMockBadge />
            </div>

            <div className="grid grid-cols-2 gap-2 bg-purple-50/70 p-3 rounded-xl border border-purple-100">
              <div>
                <span className="text-[10px] text-gray-500 block">Offer Limit</span>
                <span className="text-sm font-extrabold text-[#5F259F]">
                  {offer.creditLimitDisplay}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block">Pricing / Fee</span>
                <span className="text-xs font-bold text-gray-900">
                  {offer.interestRateOrFeeDisplay}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-bold text-gray-800 text-xs">Included Product Perks:</h5>
              <ul className="space-y-1 text-gray-600">
                {offer.perks.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500 leading-relaxed">
              <strong>Partner Terms:</strong> {offer.termsSummary}
            </div>

            <button
              onClick={handleProceedToConsent}
              className="w-full py-3 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Continue to Data Consent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Step 2: Consent to Share Data */
          <div className="p-5 space-y-4 text-xs">
            <div className="space-y-1">
              <h4 className="font-bold text-gray-900 text-sm">Data Sharing Authorization</h4>
              <p className="text-xs text-gray-500">
                To issue a formal pre-approved decision, the partner requires the following KYC profile attributes:
              </p>
            </div>

            <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-100 text-[11px]">
              <div className="flex justify-between text-gray-700">
                <span>Verified Name:</span>
                <span className="font-semibold text-gray-900">{persona.name}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>PAN Record:</span>
                <span className="font-mono font-semibold text-gray-900">{persona.panMasked}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Bureau Score Band:</span>
                <span className="font-semibold text-purple-700">{persona.band} ({persona.score || 'Thin-file'})</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Destination:</span>
                <span className="font-semibold text-gray-900">Linked Primary UPI Bank</span>
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedConsent}
                onChange={(e) => setAgreedConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#5F259F] border-gray-300 focus:ring-[#5F259F]"
              />
              <span className="text-xs text-gray-600 leading-snug">
                I authorize this UPI application to transmit my verified bureau eligibility report to{' '}
                <strong className="text-gray-900">{offer.partnerName}</strong> for mock underwriting.
              </span>
            </label>

            <button
              onClick={handleFinalSubmit}
              disabled={!agreedConsent}
              className="w-full py-3 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] disabled:bg-gray-300 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Submit &amp; Get Decision</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
