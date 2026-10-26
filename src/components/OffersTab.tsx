import React, { useState } from 'react';
import {
  Tag,
  HelpCircle,
  CheckCircle2,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Plus,
  Layers,
  Award,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { getOffersForPersona } from '../data/mockCreditData';
import { OfferCategory, OfferItem } from '../types/credit';
import { OffersSkeleton } from './common/LoadingSkeletons';
import { EmptyStateView, ErrorStateView, BureauMockBadge } from './common/ScreenStates';
import { OfferComparisonModal } from './OfferComparisonModal';
import { ApplyModal } from './ApplyModal';
import { RankingInfoModal } from './RankingInfoModal';

export const OffersTab: React.FC = () => {
  const {
    persona,
    comparedOfferIds,
    toggleCompareOffer,
    clearComparedOffers,
    selectedOfferForApply,
    openApplyModal,
    closeApplyModal,
    isSimulatedLoading,
    isSimulatedEmpty,
    isSimulatedError,
    setIsSimulatedError,
    logEvent,
  } = useCredit();

  const [selectedCategory, setSelectedCategory] = useState<OfferCategory>('all');
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showRankingInfo, setShowRankingInfo] = useState(false);

  // Offers computed for current persona and filter
  const offers = getOffersForPersona(persona, selectedCategory);

  // States check
  if (isSimulatedLoading) {
    return (
      <div className="p-4">
        <OffersSkeleton />
      </div>
    );
  }

  if (isSimulatedError) {
    return (
      <div className="p-4">
        <ErrorStateView
          title="Marketplace Service Offline"
          message="Could not load lender partner offers. Please retry."
          onRetry={() => setIsSimulatedError(false)}
        />
      </div>
    );
  }

  if (isSimulatedEmpty || offers.length === 0) {
    return (
      <div className="p-4 space-y-4">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {(['all', 'loans', 'cards', 'builder', 'insurance'] as OfferCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full capitalize font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#5F259F] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-purple-100'
              }`}
            >
              {cat === 'all' ? 'All Offers' : cat === 'builder' ? 'Credit Builder' : cat}
            </button>
          ))}
        </div>

        <EmptyStateView
          title="No Matching Offers"
          message="There are currently no partner offers matching this category for your credit tier."
          actionText="View All Offers"
          onAction={() => setSelectedCategory('all')}
        />
      </div>
    );
  }

  const isSubprimeOrThin = persona.score === null || persona.score < 650;

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Marketplace Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-extrabold text-gray-900 text-sm tracking-tight">
              Two-Sided Marketplace
            </h2>
            <BureauMockBadge />
          </div>
          <p className="text-[10px] text-gray-500">
            {persona.band} tier • Soft eligibility pre-screened
          </p>
        </div>

        <button
          onClick={() => setShowRankingInfo(true)}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#5F259F] bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-200/60 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>How we rank</span>
        </button>
      </div>

      {/* Credit Builder Priority Notice for Subprime / Thin-File */}
      {isSubprimeOrThin && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 p-3 rounded-2xl flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#5F259F] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-gray-900 leading-tight">Credit Builder Prioritized</h4>
            <p className="text-[11px] text-gray-600 leading-snug mt-0.5">
              Based on your {persona.band} profile, we have placed guaranteed FD-backed builder cards and micro-lines at the top to accelerate your score growth.
            </p>
          </div>
        </div>
      )}

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {(['all', 'loans', 'cards', 'builder', 'insurance'] as OfferCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full capitalize font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#5F259F] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-purple-100'
            }`}
          >
            {cat === 'all' ? 'All Offers' : cat === 'builder' ? 'Credit Builder' : cat}
          </button>
        ))}
      </div>

      {/* Offer Cards List */}
      <div className="space-y-3">
        {offers.map((offer) => {
          const isCompared = comparedOfferIds.includes(offer.id);

          return (
            <div
              key={offer.id}
              className={`bg-white rounded-2xl p-4 shadow-xs border transition-all ${
                offer.isCreditBuilder
                  ? 'border-purple-200 ring-1 ring-purple-100'
                  : 'border-purple-100/90 hover:border-purple-300'
              }`}
            >
              {/* Card Top Row: Partner, Badges & Fit Score */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      {offer.partnerName}
                    </span>
                    {offer.isSponsored && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200"
                        title="Sponsored partner. Rank determined strictly by Fit Score."
                      >
                        Sponsored
                      </span>
                    )}
                    {offer.isCreditBuilder && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-[#5F259F]">
                        Score Builder
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mt-0.5 leading-snug">
                    {offer.title}
                  </h3>
                </div>

                {/* Fit Score Badge */}
                <div
                  className="text-right shrink-0 bg-purple-50/80 px-2 py-1 rounded-xl border border-purple-100"
                  title="Fit = 0.5 approval + 0.3 cost + 0.2 limit"
                >
                  <span className="text-[9px] text-gray-500 uppercase block font-semibold">
                    Best Fit
                  </span>
                  <span className="text-xs font-mono font-extrabold text-[#5F259F]">
                    {(offer.fitScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Pre-qualified Tag & Soft Check Note */}
              <div className="flex items-center gap-2 mb-3 flex-wrap text-[11px]">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {offer.preQualifiedBadge}
                </span>

                <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-gray-400" />
                  No impact on your score
                </span>
              </div>

              {/* Metrics Grid: Limit & Rate */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#F5F3FA] border border-purple-100/60 mb-3 text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 block">Max Limit / Cover</span>
                  <span className="font-bold text-gray-900">{offer.creditLimitDisplay}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Pricing / APR</span>
                  <span className="font-bold text-[#5F259F]">
                    {offer.interestRateOrFeeDisplay}
                  </span>
                </div>
              </div>

              {/* Perks Highlights */}
              <ul className="space-y-1 mb-3.5 text-[11px] text-gray-600">
                {offer.perks.slice(0, 2).map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5F259F] shrink-0" />
                    <span className="truncate">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Card Bottom Actions: Compare Checkbox + Apply Button */}
              <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 gap-2">
                <label className="flex items-center gap-1.5 text-xs text-gray-600 font-medium cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isCompared}
                    onChange={() => toggleCompareOffer(offer.id)}
                    className="w-4 h-4 rounded text-[#5F259F] border-gray-300 focus:ring-[#5F259F]"
                  />
                  <span>Compare</span>
                </label>

                <button
                  onClick={() => openApplyModal(offer)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Comparison Tray (when 1 or more offers are checked) */}
      {comparedOfferIds.length > 0 && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30 w-[360px] bg-gray-900 text-white rounded-2xl p-3 shadow-xl border border-purple-800 flex items-center justify-between animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#5F259F] flex items-center justify-center font-bold text-xs">
              {comparedOfferIds.length}
            </div>
            <div>
              <span className="text-xs font-semibold block">Offers Selected</span>
              <span className="text-[10px] text-gray-400">Up to 3 side-by-side</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearComparedOffers}
              className="text-[11px] text-gray-400 hover:text-white underline cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Compare
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && (
        <OfferComparisonModal
          comparedIds={comparedOfferIds}
          onClose={() => setShowComparisonModal(false)}
          onApply={(offer) => {
            setShowComparisonModal(false);
            openApplyModal(offer);
          }}
          onRemove={(id) => toggleCompareOffer(id)}
        />
      )}

      {/* Apply Flow Modal */}
      {selectedOfferForApply && (
        <ApplyModal
          offer={selectedOfferForApply}
          onClose={closeApplyModal}
        />
      )}

      {/* Ranking Info Sheet Modal */}
      {showRankingInfo && (
        <RankingInfoModal
          isOpen={showRankingInfo}
          onClose={() => setShowRankingInfo(false)}
        />
      )}
    </div>
  );
};
