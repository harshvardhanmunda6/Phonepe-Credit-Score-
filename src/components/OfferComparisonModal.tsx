import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { OfferItem } from '../types/credit';
import { ALL_OFFERS } from '../data/mockCreditData';

interface OfferComparisonModalProps {
  comparedIds: string[];
  onClose: () => void;
  onApply: (offer: OfferItem) => void;
  onRemove: (id: string) => void;
}

export const OfferComparisonModal: React.FC<OfferComparisonModalProps> = ({
  comparedIds,
  onClose,
  onApply,
  onRemove,
}) => {
  const offers = ALL_OFFERS.filter((o) => comparedIds.includes(o.id));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-2 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] max-h-[85vh] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="bg-[#5F259F] text-white px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm tracking-tight">Compare Offers</h3>
            <p className="text-[10px] text-purple-200">Side-by-side spec comparison ({offers.length}/3)</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Comparison Table / Grid */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Card Headers */}
          <div className="grid grid-cols-2 gap-2">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase">
                      {offer.category}
                    </span>
                    <button
                      onClick={() => onRemove(offer.id)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs mt-0.5 leading-tight line-clamp-2">
                    {offer.title}
                  </h4>
                  <p className="text-[10px] text-purple-800 font-medium">{offer.partnerName}</p>
                </div>

                <div className="mt-2 pt-2 border-t border-purple-100">
                  <div className="text-[10px] text-gray-500">Fit Score</div>
                  <div className="text-xs font-mono font-bold text-[#5F259F]">
                    {(offer.fitScore * 100).toFixed(0)}% Match
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metric 1: Credit Limit */}
          <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-600 uppercase">Credit Limit / Cover</span>
            <div className="grid grid-cols-2 gap-2 pt-1 font-semibold text-gray-900">
              {offers.map((o) => (
                <div key={o.id} className="text-xs">
                  {o.creditLimitDisplay}
                </div>
              ))}
            </div>
          </div>

          {/* Metric 2: Interest Rate / Cost */}
          <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-600 uppercase">Interest / Annual Fee</span>
            <div className="grid grid-cols-2 gap-2 pt-1 font-semibold text-purple-950">
              {offers.map((o) => (
                <div key={o.id} className="text-xs">
                  {o.interestRateOrFeeDisplay}
                </div>
              ))}
            </div>
          </div>

          {/* Metric 3: Processing Fee & Tenure */}
          <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-600 uppercase">Processing &amp; Tenure</span>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-gray-700">
              {offers.map((o) => (
                <div key={o.id}>
                  <div>{o.processingFee}</div>
                  <div className="text-[10px] text-gray-500">{o.tenureOrCycle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Metric 4: Bureau Reporting */}
          <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-600 uppercase">Bureau Score Impact</span>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              {offers.map((o) => (
                <div key={o.id} className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{o.bureauReporting ? 'Reports Monthly' : 'Insurance Cover'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Perks Comparison */}
          <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-gray-600 uppercase">Top Benefits</span>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] text-gray-600">
              {offers.map((o) => (
                <ul key={o.id} className="space-y-1">
                  {o.perks.slice(0, 2).map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{p}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-3 bg-white border-t border-gray-100 grid grid-cols-2 gap-2">
          {offers.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                onClose();
                onApply(o);
              }}
              className="py-2.5 px-2 rounded-xl bg-[#5F259F] text-white text-xs font-bold hover:bg-[#4F1D85] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Apply {o.category === 'cards' ? 'Card' : o.category === 'loans' ? 'Loan' : 'Plan'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
