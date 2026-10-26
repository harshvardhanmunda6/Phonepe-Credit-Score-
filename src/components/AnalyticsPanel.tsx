import React from 'react';
import { X, BarChart3, TrendingUp, Bell, Tag, CheckCircle2, RotateCcw, Activity } from 'lucide-react';
import { useCredit } from '../context/CreditContext';

export const AnalyticsPanel: React.FC = () => {
  const {
    isAnalyticsDrawerOpen,
    setIsAnalyticsDrawerOpen,
    analyticsEvents,
    clearAnalytics,
    funnelStats,
  } = useCredit();

  if (!isAnalyticsDrawerOpen) return null;

  const {
    scoreViewed,
    alertEnabled,
    offerViewed,
    offerApplied,
    alertOptInRate,
    tabToApplyRate,
    repeatChecksCount,
  } = funnelStats;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-[390px] max-h-[88vh] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="bg-[#5F259F] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Live Analytics Panel</h3>
              <p className="text-[10px] text-purple-200">Real-time funnel &amp; engagement KPIs</p>
            </div>
          </div>
          <button
            onClick={() => setIsAnalyticsDrawerOpen(false)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-purple-50/80 p-2.5 rounded-xl border border-purple-100 text-center">
              <span className="text-[10px] text-gray-500 font-semibold block leading-tight">
                Repeat Checks
              </span>
              <span className="text-lg font-extrabold text-[#5F259F] font-mono">
                {repeatChecksCount}
              </span>
              <span className="text-[9px] text-purple-700 block">Monthly habit</span>
            </div>

            <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100 text-center">
              <span className="text-[10px] text-gray-500 font-semibold block leading-tight">
                Alert Opt-In
              </span>
              <span className="text-lg font-extrabold text-emerald-700 font-mono">
                {alertOptInRate}%
              </span>
              <span className="text-[9px] text-emerald-700 block">Retention lock</span>
            </div>

            <div className="bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-100 text-center">
              <span className="text-[10px] text-gray-500 font-semibold block leading-tight">
                Tab-to-Apply
              </span>
              <span className="text-lg font-extrabold text-indigo-700 font-mono">
                {tabToApplyRate}%
              </span>
              <span className="text-[9px] text-indigo-700 block">Marketplace</span>
            </div>
          </div>

          {/* User Journey Funnel */}
          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-xs">Growth &amp; Conversion Funnel</h4>
              <span className="text-[10px] text-gray-400">Live events</span>
            </div>

            {/* Funnel Step 1: Score Viewed */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-purple-600" />
                  1. Score Viewed
                </span>
                <span className="font-mono">{scoreViewed}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#5F259F] h-full rounded-full transition-all"
                  style={{ width: scoreViewed > 0 ? '100%' : '0%' }}
                />
              </div>
            </div>

            {/* Funnel Step 2: Alert Enabled */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                <span className="flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  2. Alert Enabled
                </span>
                <span className="font-mono">
                  {alertEnabled} ({scoreViewed > 0 ? Math.round((alertEnabled / scoreViewed) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{
                    width: scoreViewed > 0 ? `${Math.min(100, (alertEnabled / scoreViewed) * 100)}%` : '0%',
                  }}
                />
              </div>
            </div>

            {/* Funnel Step 3: Offer Viewed */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-blue-500" />
                  3. Offer Viewed
                </span>
                <span className="font-mono">
                  {offerViewed} ({scoreViewed > 0 ? Math.round((offerViewed / scoreViewed) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{
                    width: scoreViewed > 0 ? `${Math.min(100, (offerViewed / scoreViewed) * 100)}%` : '0%',
                  }}
                />
              </div>
            </div>

            {/* Funnel Step 4: Applied */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  4. Offer Applied
                </span>
                <span className="font-mono">
                  {offerApplied} ({offerViewed > 0 ? Math.round((offerApplied / offerViewed) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{
                    width: offerViewed > 0 ? `${Math.min(100, (offerApplied / offerViewed) * 100)}%` : '0%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Live Event Stream Log */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
                Live Event Stream ({analyticsEvents.length})
              </h4>
              <button
                onClick={clearAnalytics}
                className="text-[10px] text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 p-1 font-mono text-[11px]">
              {analyticsEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-2 rounded-lg bg-gray-50 border border-gray-100 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-[#5F259F] block truncate">
                      {ev.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-sans block truncate">
                      {ev.details}
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-400 shrink-0">{ev.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-gray-100 text-center">
          <button
            onClick={() => setIsAnalyticsDrawerOpen(false)}
            className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold cursor-pointer"
          >
            Close Analytics
          </button>
        </div>
      </div>
    </div>
  );
};
