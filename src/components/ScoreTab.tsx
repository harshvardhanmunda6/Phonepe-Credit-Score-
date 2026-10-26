import React, { useState } from 'react';
import {
  Bell,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Info,
  Calendar,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { ScoreGauge } from './ScoreGauge';
import { ScoreSimulator } from './ScoreSimulator';
import { BureauMockBadge, EmptyStateView, ErrorStateView } from './common/ScreenStates';
import { ScoreSkeleton } from './common/LoadingSkeletons';
import { FactorItem } from '../types/credit';

export const ScoreTab: React.FC = () => {
  const {
    persona,
    alertEnabled,
    toggleAlertEnabled,
    isSimulatedLoading,
    isSimulatedEmpty,
    isSimulatedError,
    setIsSimulatedError,
    logEvent,
  } = useCredit();

  const [selectedFactor, setSelectedFactor] = useState<FactorItem | null>(null);
  const [selectedHistoryIdx, setSelectedHistoryIdx] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsRefreshing(false);
    triggerToast('Bureau report refreshed successfully');
    logEvent('score_viewed', `Refreshed bureau credit report for ${persona.name}`);
  };

  const handleAlertToggle = () => {
    toggleAlertEnabled();
    triggerToast(
      !alertEnabled
        ? 'Credit Score Change alerts activated!'
        : 'Score Change alerts deactivated.'
    );
  };

  // State checks for testing
  if (isSimulatedLoading || isRefreshing) {
    return (
      <div className="p-4">
        <ScoreSkeleton />
      </div>
    );
  }

  if (isSimulatedError) {
    return (
      <div className="p-4">
        <ErrorStateView
          title="Bureau API Unavailable"
          message="Could not establish secure handshake with Bureau (mock). Please retry."
          onRetry={() => setIsSimulatedError(false)}
        />
      </div>
    );
  }

  if (isSimulatedEmpty) {
    return (
      <div className="p-4">
        <EmptyStateView
          title="No Credit File Registered"
          message="No credit accounts or trade lines have been reported for this identity in the bureau system."
          actionText="Explore Credit Builders"
          onAction={() => {}}
        />
      </div>
    );
  }

  // 6-Month History SVG coordinates calculation
  const history = persona.scoreHistory;
  const hasHistory = history.length > 0;
  const svgWidth = 320;
  const svgHeight = 110;
  const paddingX = 28;
  const paddingY = 18;

  let pointsString = '';
  let areaString = '';
  const coords: { x: number; y: number; month: string; score: number; reason?: string }[] = [];

  if (hasHistory) {
    const scores = history.map((h) => h.score);
    const minHScore = Math.min(...scores) - 10;
    const maxHScore = Math.max(...scores) + 10;
    const range = Math.max(20, maxHScore - minHScore);

    history.forEach((item, index) => {
      const x = paddingX + (index / (history.length - 1)) * (svgWidth - 2 * paddingX);
      const y = svgHeight - paddingY - ((item.score - minHScore) / range) * (svgHeight - 2 * paddingY);
      coords.push({ x, y, month: item.month, score: item.score, reason: item.reason });
    });

    pointsString = coords.map((c) => `${c.x},${c.y}`).join(' ');
    areaString = `${paddingX},${svgHeight} ${pointsString} ${svgWidth - paddingX},${svgHeight}`;
  }

  const activeHistoryPoint =
    selectedHistoryIdx !== null ? coords[selectedHistoryIdx] : coords[coords.length - 1];

  return (
    <div className="p-4 space-y-4 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg border border-purple-800 animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Bureau Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <BureauMockBadge />
          <span className="text-[11px] text-gray-500 font-medium">
            Updated {persona.lastUpdated}
          </span>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#5F259F] hover:text-[#4F1D85] bg-purple-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          title="Refresh Bureau Records"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Score Gauge */}
      <ScoreGauge
        score={persona.score}
        band={persona.band}
        scoreDelta={persona.scoreDelta}
      />

      {/* 4 Factor Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
            Key Score Factors (Bureau Impact)
          </h3>
          <span className="text-[10px] text-gray-400">Tap for details</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {persona.factors.map((factor) => {
            const getChipStyle = () => {
              switch (factor.statusColor) {
                case 'green':
                  return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                case 'amber':
                  return 'bg-amber-50 text-amber-700 border-amber-200';
                case 'red':
                  return 'bg-red-50 text-red-700 border-red-200';
                case 'purple':
                  return 'bg-purple-50 text-purple-700 border-purple-200';
                default:
                  return 'bg-gray-100 text-gray-600 border-gray-200';
              }
            };

            // Factor-specific visual meters
            const renderVisualMeter = () => {
              if (factor.name.includes('Payment')) {
                const percent = persona.paymentHistory || 0;
                return (
                  <div className="space-y-1 mt-2">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-600 font-medium">
                      <span>On-time Rate</span>
                      <span className="font-mono font-bold text-emerald-600">{percent}%</span>
                    </div>
                  </div>
                );
              }

              if (factor.name.includes('Utilization')) {
                const util = persona.utilization || 0;
                const isOver = util > 30;
                return (
                  <div className="space-y-1 mt-2">
                    <div className="relative w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isOver ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, util)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-600 font-medium">
                      <span>Safe &lt;30%</span>
                      <span className={`font-mono font-bold ${isOver ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {util}% used
                      </span>
                    </div>
                  </div>
                );
              }

              if (factor.name.includes('Age')) {
                return (
                  <div className="space-y-1 mt-2">
                    <div className="flex gap-1">
                      <div className="flex-1 h-1.5 rounded-full bg-purple-500" />
                      <div
                        className={`flex-1 h-1.5 rounded-full ${
                          persona.score && persona.score > 700 ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                      />
                      <div
                        className={`flex-1 h-1.5 rounded-full ${
                          persona.score && persona.score > 750 ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-600 font-medium">
                      <span>History Depth</span>
                      <span className="font-mono text-purple-700 font-bold">{factor.valueDisplay}</span>
                    </div>
                  </div>
                );
              }

              // Enquiries visual dots
              const count = persona.enquiries || 0;
              return (
                <div className="space-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 flex-1 rounded-full ${
                          idx <= count
                            ? count > 4
                              ? 'bg-red-500'
                              : count > 2
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-600 font-medium">
                    <span>Inquiries in 6m</span>
                    <span className="font-mono font-bold text-gray-700">{count} total</span>
                  </div>
                </div>
              );
            };

            return (
              <div
                key={factor.id}
                onClick={() => setSelectedFactor(factor)}
                className="bg-white rounded-2xl p-3 shadow-xs border border-purple-100/90 hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-semibold text-gray-800 leading-tight">
                      {factor.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${getChipStyle()}`}
                    >
                      {factor.status}
                    </span>
                  </div>
                  <div className="text-base font-extrabold text-gray-900 font-mono tracking-tight">
                    {factor.valueDisplay}
                  </div>
                </div>

                {/* Visual Progress Meter */}
                {renderVisualMeter()}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6-Month Score History Chart */}
      {hasHistory && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/90 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-xs">6-Month Score Trend</h3>
              <p className="text-[10px] text-gray-400">Monthly bureau reporting snapshots</p>
            </div>
            {activeHistoryPoint && (
              <div className="text-right">
                <span className="text-xs font-bold text-[#5F259F] font-mono">
                  {activeHistoryPoint.score} pts
                </span>
                <span className="block text-[10px] text-gray-500">
                  {activeHistoryPoint.month} 2026
                </span>
              </div>
            )}
          </div>

          {/* SVG Line Chart */}
          <div className="relative w-full h-28 flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5F259F" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#5F259F" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <polygon points={areaString} fill="url(#chartGradient)" />

              {/* Line path */}
              <polyline
                fill="none"
                stroke="#5F259F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />

              {/* Clickable Dots */}
              {coords.map((c, i) => (
                <g key={i} onClick={() => setSelectedHistoryIdx(i)} className="cursor-pointer">
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={selectedHistoryIdx === i ? 6 : 4}
                    className="fill-white stroke-[#5F259F] transition-all"
                    strokeWidth={selectedHistoryIdx === i ? 3 : 2}
                  />
                  {selectedHistoryIdx === i && (
                    <circle cx={c.x} cy={c.y} r={9} className="stroke-[#5F259F]/40 fill-none animate-ping" />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Month labels along x-axis */}
          <div className="flex justify-between text-[10px] text-gray-400 font-medium px-2">
            {coords.map((c, i) => (
              <span
                key={i}
                onClick={() => setSelectedHistoryIdx(i)}
                className={`cursor-pointer ${
                  selectedHistoryIdx === i ? 'text-[#5F259F] font-bold' : ''
                }`}
              >
                {c.month}
              </span>
            ))}
          </div>

          {/* Detail tooltip note for selected point */}
          {activeHistoryPoint?.reason && (
            <div className="p-2 rounded-xl bg-purple-50 text-[11px] text-purple-900 border border-purple-100 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#5F259F] shrink-0 mt-0.5" />
              <span>
                <strong>{activeHistoryPoint.month}:</strong> {activeHistoryPoint.reason}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Alert Toggle Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5F259F] flex items-center justify-center">
            <Bell className="w-4 h-4 text-[#5F259F]" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-xs">
              Alert me when my score changes
            </h4>
            <p className="text-[10px] text-gray-500">
              Instant notification for score updates &amp; inquiries
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleAlertToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
            alertEnabled ? 'bg-[#5F259F]' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={alertEnabled}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              alertEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Recent Changes Timeline */}
      {persona.recentChanges.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/90 space-y-3">
          <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
            Recent Credit Changes
          </h3>
          <div className="space-y-2.5">
            {persona.recentChanges.map((change) => (
              <div key={change.id} className="flex items-start gap-2.5 pb-2 border-b border-gray-100 last:border-none last:pb-0">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 shrink-0 ${
                    change.delta > 0
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {change.delta > 0 ? `+${change.delta}` : change.delta} pts
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900 truncate">{change.title}</span>
                    <span className="text-[10px] text-gray-400">{change.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{change.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Embedded Simulator Section */}
      <ScoreSimulator />

      {/* Factor Breakdown Modal */}
      {selectedFactor && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-[390px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 p-5 space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase">
                  {selectedFactor.weight}
                </span>
                <h3 className="text-sm font-bold text-gray-900">{selectedFactor.name}</h3>
              </div>
              <button
                onClick={() => setSelectedFactor(null)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="bg-purple-50/70 p-3 rounded-xl space-y-1">
              <span className="text-[10px] text-purple-800 font-semibold uppercase">
                Your Current Status
              </span>
              <div className="text-base font-extrabold text-[#5F259F]">
                {selectedFactor.valueDisplay} ({selectedFactor.status})
              </div>
              <p className="text-xs text-gray-600">{selectedFactor.explanation}</p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-gray-900">Why this matters</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {selectedFactor.detailedInsight}
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Next Best Action</span>
              </div>
              <p className="text-xs text-emerald-900 leading-snug">
                {selectedFactor.recommendedAction}
              </p>
            </div>

            <button
              onClick={() => setSelectedFactor(null)}
              className="w-full py-2.5 rounded-xl bg-[#5F259F] text-white text-xs font-bold hover:bg-[#4F1D85] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
