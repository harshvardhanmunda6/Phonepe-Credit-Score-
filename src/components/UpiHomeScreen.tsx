import React, { useState } from 'react';
import {
  QrCode,
  Send,
  Building,
  UserCheck,
  Smartphone,
  Zap,
  Tv,
  Car,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Bell,
  Search,
  Sparkles,
  Award,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { BureauMockBadge } from './common/ScreenStates';
import { ConsentModal } from './ConsentModal';

export const UpiHomeScreen: React.FC = () => {
  const { persona, hasConsented, setCurrentView, setActiveTab } = useCredit();
  const [showConsentModal, setShowConsentModal] = useState(false);

  const handleCreditCardClick = () => {
    if (hasConsented) {
      setCurrentView('credit_hub');
      setActiveTab('score');
    } else {
      setShowConsentModal(true);
    }
  };

  return (
    <div className="pb-8 space-y-4">
      {/* UPI Top Header */}
      <div className="bg-[#5F259F] text-white px-4 pt-3 pb-6 rounded-b-[28px] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-bold text-sm shadow-inner">
              {persona.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm">{persona.name}</span>
                <span className="text-[9px] bg-emerald-400/20 text-emerald-300 font-medium px-1.5 py-0.5 rounded-full border border-emerald-400/40">
                  Verified UPI
                </span>
              </div>
              <p className="text-[11px] text-purple-200/80 font-mono">
                {persona.name.toLowerCase().replace(' ', '.')}@upi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-purple-100" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-white text-[#5F259F] flex items-center justify-center shadow-md hover:bg-purple-50 transition-colors"
              title="Scan any QR code"
            >
              <QrCode className="w-5 h-5 text-[#5F259F]" />
            </button>
          </div>
        </div>

        {/* Quick Send Money Actions */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
          <p className="text-[10px] text-purple-200 font-medium uppercase tracking-wider mb-2.5 px-1">
            Transfer Money
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 rounded-xl bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all">
                <Smartphone className="w-5 h-5 text-purple-100" />
              </div>
              <span className="text-[10px] text-purple-100 leading-tight">To Mobile Number</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 rounded-xl bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all">
                <Building className="w-5 h-5 text-purple-100" />
              </div>
              <span className="text-[10px] text-purple-100 leading-tight">To Bank / UPI ID</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 rounded-xl bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all">
                <UserCheck className="w-5 h-5 text-purple-100" />
              </div>
              <span className="text-[10px] text-purple-100 leading-tight">To Self Account</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="w-11 h-11 rounded-xl bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all">
                <CreditCard className="w-5 h-5 text-purple-100" />
              </div>
              <span className="text-[10px] text-purple-100 leading-tight">Check Balance</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROMINENT CREDIT HEALTH HERO CARD - HIGHLY VISUAL */}
      <div className="px-4">
        <div
          onClick={handleCreditCardClick}
          className="relative bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/70 rounded-2xl p-4 shadow-md border border-purple-200/90 cursor-pointer hover:shadow-lg transition-all group overflow-hidden"
        >
          {/* Subtle decorative glowing background shapes */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#5F259F]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-12 -bottom-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

          {/* Top Bar: Title & Bureau Badge */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5F259F] to-indigo-600 text-white flex items-center justify-center shadow-xs">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-extrabold text-gray-900 text-sm tracking-tight">Credit Health</h2>
                  <BureauMockBadge />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Monthly Bureau Tracking</span>
              </div>
            </div>

            {hasConsented && persona.score ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Score
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold shadow-xs">
                ₹0 FREE
              </span>
            )}
          </div>

          {/* VISUAL SCORE DISPLAY / GAUGE PREVIEW */}
          {hasConsented && persona.score ? (
            /* Consented: Rich visual scorecard with mini meter & factor pills */
            <div className="space-y-3 relative z-10">
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-purple-100 flex items-center justify-between shadow-xs">
                {/* Visual score dial graphic */}
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#5F259F]"
                        strokeDasharray={`${Math.round(((persona.score - 300) / 600) * 100)}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center flex flex-col items-center">
                      <span className="text-xs font-mono font-extrabold text-gray-900 leading-none">
                        {persona.score}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-gray-900">{persona.band} Tier</span>
                      {persona.scoreDelta !== 0 && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          +{persona.scoreDelta} pts
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 block mt-0.5">
                      Next Bureau refresh: 01 Nov
                    </span>
                  </div>
                </div>

                {/* Score scale visual bar */}
                <div className="w-24 text-right space-y-1">
                  <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                    <span>300</span>
                    <span className="text-purple-700 font-bold">{persona.score}</span>
                    <span>900</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-[#5F259F] rounded-full"
                      style={{ width: `${((persona.score - 300) / 600) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 3 Visual Metric Pills */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-white/80 p-1.5 rounded-lg border border-purple-100/80">
                  <span className="text-[9px] text-gray-500 block uppercase font-semibold">Payment</span>
                  <span className="text-xs font-mono font-extrabold text-emerald-600">
                    {persona.paymentHistory}%
                  </span>
                </div>
                <div className="bg-white/80 p-1.5 rounded-lg border border-purple-100/80">
                  <span className="text-[9px] text-gray-500 block uppercase font-semibold">Usage</span>
                  <span className="text-xs font-mono font-extrabold text-amber-600">
                    {persona.utilization}%
                  </span>
                </div>
                <div className="bg-white/80 p-1.5 rounded-lg border border-purple-100/80">
                  <span className="text-[9px] text-gray-500 block uppercase font-semibold">Accounts</span>
                  <span className="text-xs font-mono font-extrabold text-[#5F259F]">
                    {persona.debts.length} active
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Not Consented / Starter: Visual speedometer preview & benefit tags */
            <div className="space-y-3 relative z-10">
              {/* Visual Meter Bar Preview */}
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-purple-100 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Free Bureau Score Check</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#5F259F] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    300 — 900
                  </span>
                </div>

                {/* Visual spectrum gradient track */}
                <div className="relative pt-1 pb-1">
                  <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-red-500 via-amber-400 via-purple-500 to-emerald-500 opacity-90" />
                  <div className="flex justify-between text-[9px] text-gray-400 font-semibold mt-1">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span className="text-emerald-600 font-bold">Excellent (750+)</span>
                  </div>
                </div>
              </div>

              {/* 3 Visual Feature Badges */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="bg-white/80 py-1.5 px-1 rounded-lg border border-purple-100 flex flex-col items-center gap-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-gray-800 leading-tight">Soft Inquiry</span>
                  <span className="text-[9px] text-gray-400">0 Score Drop</span>
                </div>
                <div className="bg-white/80 py-1.5 px-1 rounded-lg border border-purple-100 flex flex-col items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#5F259F]" />
                  <span className="font-bold text-gray-800 leading-tight">Simulator</span>
                  <span className="text-[9px] text-gray-400">3 Best Moves</span>
                </div>
                <div className="bg-white/80 py-1.5 px-1 rounded-lg border border-purple-100 flex flex-col items-center gap-0.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-bold text-gray-800 leading-tight">Top Offers</span>
                  <span className="text-[9px] text-gray-400">Pre-Qualified</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Strip */}
          <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-purple-100/90 text-xs relative z-10">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Bureau (mock) Soft Check</span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5F259F] group-hover:translate-x-0.5 transition-transform">
              <span>{hasConsented ? 'Open Dashboard' : 'Check Score Free'}</span>
              <ChevronRight className="w-4 h-4 text-[#5F259F]" />
            </span>
          </div>
        </div>
      </div>

      {/* Recharge & Pay Bills Grid */}
      <div className="px-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
              Recharge &amp; Bill Payments
            </h3>
            <span className="text-[11px] text-[#5F259F] font-semibold cursor-pointer">
              View All
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5F259F] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-700">Mobile Recharge</span>
            </div>

            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5F259F] flex items-center justify-center">
                <Tv className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-700">DTH TV</span>
            </div>

            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5F259F] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-700">Electricity</span>
            </div>

            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5F259F] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-700">FASTag</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Sided Marketplace Teaser */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-1 max-w-[210px]">
            <div className="flex items-center gap-1 text-amber-300 text-[10px] font-bold">
              <Sparkles className="w-3 h-3 fill-amber-300" />
              <span>PARTNER OFFERS</span>
            </div>
            <h4 className="text-xs font-bold leading-tight">Pre-approved Cards &amp; Loans</h4>
            <p className="text-[10px] text-purple-200/90 leading-tight">
              Pre-qualified rates tailored to your credit band.
            </p>
          </div>
          <button
            onClick={handleCreditCardClick}
            className="px-3 py-2 rounded-xl bg-white text-[#5F259F] text-xs font-bold shadow hover:bg-purple-50 transition-colors"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Consent Modal */}
      {showConsentModal && (
        <ConsentModal
          isOpen={showConsentModal}
          onClose={() => setShowConsentModal(false)}
        />
      )}
    </div>
  );
};
