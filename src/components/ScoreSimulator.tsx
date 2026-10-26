import React from 'react';
import {
  Sliders,
  RotateCcw,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';

export const ScoreSimulator: React.FC = () => {
  const {
    persona,
    simUtilization,
    setSimUtilization,
    simLoanPayoff,
    setSimLoanPayoff,
    simMissedPayments,
    setSimMissedPayments,
    resetSimulator,
    projectedScore,
    scoreDifference,
    estimatedMonths,
    logEvent,
  } = useCredit();

  const handleSliderChange = (type: 'util' | 'loan' | 'missed', val: number) => {
    if (type === 'util') setSimUtilization(val);
    if (type === 'loan') setSimLoanPayoff(val);
    if (type === 'missed') setSimMissedPayments(val);
    logEvent('simulator_used', `Adjusted simulator: util=${simUtilization}%, loan=₹${simLoanPayoff}, missed=${simMissedPayments}`);
  };

  // Compute individual effect sizes for display:
  // 1. Utilization effect
  const utilDiff = (persona.utilization || 0) - simUtilization;
  const utilEffectPts = Math.round((utilDiff / 100) * 45);

  // 2. Loan payoff effect
  const loanEffectPts = Math.min(36, Math.round((simLoanPayoff / 25000) * 6));

  // 3. Missed payments penalty
  let missedPenaltyPts = 0;
  if (simMissedPayments === 1) missedPenaltyPts = -55;
  else if (simMissedPayments === 2) missedPenaltyPts = -95;
  else if (simMissedPayments >= 3) missedPenaltyPts = -140;

  // Ranked 3 Best Actions based on profile and simulation
  const getRankedActions = () => {
    const actions = [];

    // Action 1: Utilization management
    if (simUtilization > 30) {
      actions.push({
        id: 'act-1',
        title: 'Cut Card Utilization below 30%',
        impact: '+18 to +25 pts',
        detail: `Pay down ₹${Math.max(5000, Math.round((simUtilization - 25) * 800)).toLocaleString('en-IN')} before your billing cycle cuts to keep usage under 30%.`,
        badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
      });
    } else {
      actions.push({
        id: 'act-1-good',
        title: 'Maintain Low Utilization (<25%)',
        impact: '+10 to +15 pts',
        detail: 'Current low card balance proves optimal debt management to bureau scoring models.',
        badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      });
    }

    // Action 2: On-time payments guarantee
    if (simMissedPayments > 0) {
      actions.push({
        id: 'act-2-urgent',
        title: 'Clear Overdue EMI Within 30 Days',
        impact: `Save ${Math.abs(missedPenaltyPts)} pts penalty`,
        detail: 'A 30-day late report takes 24 months to age out. Clear active dues before the end of this month.',
        badgeColor: 'text-red-700 bg-red-50 border-red-200',
      });
    } else {
      actions.push({
        id: 'act-2',
        title: 'Enable UPI AutoPay on Active EMIs',
        impact: '+12 pts (compounding)',
        detail: 'Automate debits 2 days before due date so network holidays never trigger a technical bounce.',
        badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
      });
    }

    // Action 3: Debt consolidation or inquiry pause
    if (simLoanPayoff > 0) {
      actions.push({
        id: 'act-3',
        title: `Prepay Principal by ₹${simLoanPayoff.toLocaleString('en-IN')}`,
        impact: `+${loanEffectPts} pts boost`,
        detail: 'Lowering overall outstanding credit balances accelerates positive debt-to-income tiering.',
        badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      });
    } else {
      actions.push({
        id: 'act-3-inquiry',
        title: 'Pause New Hard Inquiries for 90 Days',
        impact: '+8 pts recovery',
        detail: 'Resting your credit profile lets past lender inquiries age, signaling financial stability.',
        badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      });
    }

    return actions.slice(0, 3);
  };

  const rankedActions = getRankedActions();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/90 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-50 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5F259F] flex items-center justify-center">
            <Sliders className="w-4 h-4 text-[#5F259F]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xs tracking-tight">
              Score Simulator &amp; Improve Plan
            </h3>
            <p className="text-[10px] text-gray-500">Deterministic bureau projection model</p>
          </div>
        </div>

        <button
          onClick={resetSimulator}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#5F259F] hover:text-[#4F1D85] bg-purple-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
          title="Reset Sliders to Current Profile"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Projected Score Result Card */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#5F259F] text-white rounded-xl p-3.5 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] text-purple-200 font-semibold tracking-wider uppercase">
            Projected Bureau Score
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-extrabold tracking-tight font-mono">
              {projectedScore}
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                scoreDifference > 0
                  ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                  : scoreDifference < 0
                  ? 'bg-red-400/20 text-red-300 border border-red-400/30'
                  : 'bg-white/10 text-white/80'
              }`}
            >
              {scoreDifference > 0 ? `+${scoreDifference} pts` : scoreDifference < 0 ? `${scoreDifference} pts` : 'No change'}
            </span>
          </div>
        </div>

        <div className="text-right border-l border-white/15 pl-3">
          <div className="flex items-center gap-1 text-[10px] text-purple-200 justify-end">
            <Clock className="w-3 h-3" />
            <span>Timeline</span>
          </div>
          <span className="text-sm font-bold text-amber-300">
            ~{estimatedMonths} {estimatedMonths === 1 ? 'Month' : 'Months'}
          </span>
        </div>
      </div>

      {/* 3 Interactive Sliders */}
      <div className="space-y-3.5 pt-1">
        {/* Slider 1: Card Utilization */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-gray-700">Card Utilization</label>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-gray-900">{simUtilization}%</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  utilEffectPts > 0
                    ? 'text-emerald-700 bg-emerald-50'
                    : utilEffectPts < 0
                    ? 'text-red-700 bg-red-50'
                    : 'text-gray-500 bg-gray-100'
                }`}
              >
                {utilEffectPts > 0 ? `+${utilEffectPts} pts` : `${utilEffectPts} pts`}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={simUtilization}
            onChange={(e) => handleSliderChange('util', Number(e.target.value))}
            className="w-full accent-[#5F259F] h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-600 font-medium px-0.5">
            <span>0% (Ideal)</span>
            <span>Current: {persona.utilization}%</span>
            <span>100% (Max)</span>
          </div>
        </div>

        {/* Slider 2: Loan to Pay Off in ₹ */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-gray-700">Extra Loan Payoff (₹)</label>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-gray-900">
                ₹{simLoanPayoff.toLocaleString('en-IN')}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  loanEffectPts > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-gray-500 bg-gray-100'
                }`}
              >
                {loanEffectPts > 0 ? `+${loanEffectPts} pts` : '0 pts'}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="250000"
            step="10000"
            value={simLoanPayoff}
            onChange={(e) => handleSliderChange('loan', Number(e.target.value))}
            className="w-full accent-[#5F259F] h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-600 font-medium px-0.5">
            <span>₹0</span>
            <span>₹1,00,000</span>
            <span>₹2,50,000</span>
          </div>
        </div>

        {/* Slider 3: Missed Payments (0 - 3) */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-gray-700">Simulate Missed Payments</label>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-gray-900">
                {simMissedPayments} {simMissedPayments === 1 ? 'delay' : 'delays'}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  missedPenaltyPts < 0 ? 'text-red-700 bg-red-50' : 'text-emerald-700 bg-emerald-50'
                }`}
              >
                {missedPenaltyPts < 0 ? `${missedPenaltyPts} pts` : '0 pts'}
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={simMissedPayments}
            onChange={(e) => handleSliderChange('missed', Number(e.target.value))}
            className="w-full accent-red-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-600 font-medium px-0.5">
            <span>0 (Flawless)</span>
            <span>1 missed (-55)</span>
            <span>2 missed (-95)</span>
            <span>3 missed (-140)</span>
          </div>
        </div>
      </div>

      {/* Ranked 3 Best Actions */}
      <div className="pt-2 border-t border-purple-50 space-y-2">
        <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
          <Sparkles className="w-3.5 h-3.5 text-[#5F259F]" />
          <span>Top 3 Recommended Actions (Ranked by ROI)</span>
        </div>

        <div className="space-y-2">
          {rankedActions.map((action, idx) => (
            <div
              key={action.id}
              className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100/80 flex items-start gap-2.5"
            >
              <div className="w-5 h-5 rounded-full bg-[#5F259F] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">{action.title}</h4>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${action.badgeColor}`}
                  >
                    {action.impact}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug">{action.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
