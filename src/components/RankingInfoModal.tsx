import React from 'react';
import { X, Award, ShieldAlert, Sparkles, Check, DollarSign, Percent, BarChart } from 'lucide-react';

interface RankingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RankingInfoModal: React.FC<RankingInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 p-5 space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5F259F] flex items-center justify-center">
              <Award className="w-4 h-4 text-[#5F259F]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">How We Rank Offers</h3>
              <p className="text-[10px] text-gray-500">Transparent 3-factor algorithm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Algorithm Formula Banner */}
        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 text-center space-y-1">
          <span className="text-[10px] font-bold text-purple-800 tracking-wider uppercase">
            Fit Score Mathematical Formula
          </span>
          <div className="text-xs font-mono font-extrabold text-[#5F259F]">
            Fit = 0.5 × Approval + 0.3 × Cost + 0.2 × Limit
          </div>
          <p className="text-[10px] text-gray-500">
            Every product receives an objective 0.0 - 1.0 fit index based on your profile.
          </p>
        </div>

        {/* Breakdown of 3 Components */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
              50%
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs">Approval Probability</h4>
              <p className="text-[11px] text-gray-500 leading-snug">
                How closely your bureau score, active EMI track record, and income tier match partner underwriting rules.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#5F259F] font-bold text-xs flex items-center justify-center shrink-0">
              30%
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs">Total Cost of Credit</h4>
              <p className="text-[11px] text-gray-500 leading-snug">
                Lower annual fees, zero joining costs, and competitive APRs result in a higher cost score.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
              20%
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs">Credit Limit &amp; Utility</h4>
              <p className="text-[11px] text-gray-500 leading-snug">
                Appropriate credit lines that offer maximum liquidity without overburdening your debt-to-income balance.
              </p>
            </div>
          </div>
        </div>

        {/* Critical Rule Note */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Integrity Rule: Sponsored Tag Policy</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Partners may sponsor placement visibility, but <strong>a 'Sponsored' tag NEVER boosts rank or overrides better-fit offers</strong>. Rankings are strictly sorted by mathematical Fit Score descending.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Got It
        </button>
      </div>
    </div>
  );
};
