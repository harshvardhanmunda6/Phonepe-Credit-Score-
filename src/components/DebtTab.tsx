import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingDown,
  ShieldCheck,
  PiggyBank,
  PieChart,
  ArrowRight,
  Plus,
  Flame,
  Snowflake,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { DebtItem } from '../types/credit';
import { DebtSkeleton } from './common/LoadingSkeletons';
import { EmptyStateView, ErrorStateView, BureauMockBadge } from './common/ScreenStates';
import { UpiPinModal } from './UpiPinModal';

export const DebtTab: React.FC = () => {
  const {
    persona,
    payEmi,
    addEmergencySavings,
    isSimulatedLoading,
    isSimulatedEmpty,
    isSimulatedError,
    setIsSimulatedError,
  } = useCredit();

  const [payoffMethod, setPayoffMethod] = useState<'avalanche' | 'snowball'>('avalanche');
  const [selectedDebtForPay, setSelectedDebtForPay] = useState<DebtItem | null>(null);

  // Screen state checks
  if (isSimulatedLoading) {
    return (
      <div className="p-4">
        <DebtSkeleton />
      </div>
    );
  }

  if (isSimulatedError) {
    return (
      <div className="p-4">
        <ErrorStateView
          title="Debt Records Unavailable"
          message="Could not retrieve your active EMI accounts from the bureau registry."
          onRetry={() => setIsSimulatedError(false)}
        />
      </div>
    );
  }

  const debts = persona.debts || [];
  const hasDebts = debts.length > 0;

  if (isSimulatedEmpty || (!hasDebts && persona.id !== 'thin-file')) {
    return (
      <div className="p-4">
        <EmptyStateView
          title="Zero Outstanding EMIs"
          message="Congratulations! You have zero active loans or credit card balances registered in Bureau (mock)."
          actionText="View Emergency Savings"
          onAction={() => {}}
        />
      </div>
    );
  }

  // Total monthly EMI
  const totalMonthlyEmi = debts.reduce((acc, d) => acc + (d.isPaidThisMonth ? 0 : d.emi), 0);
  const totalOutstanding = debts.reduce((acc, d) => acc + d.balance, 0);

  // Payoff Planner calculations (Avalanche vs Snowball)
  // Avalanche sorts by highest interest rate first
  // Snowball sorts by smallest balance first
  const sortedDebts = [...debts].sort((a, b) => {
    if (payoffMethod === 'avalanche') {
      return b.interestRate - a.interestRate;
    }
    return a.balance - b.balance;
  });

  // Calculate savings metrics
  const monthsSaved = payoffMethod === 'avalanche' ? 7 : 5;
  const interestSaved = payoffMethod === 'avalanche' ? Math.round(totalOutstanding * 0.082) : Math.round(totalOutstanding * 0.054);

  // Emergency Fund metrics
  const efCurrent = persona.emergencyFund.current;
  const efTarget = persona.emergencyFund.target;
  const efPercentage = Math.min(100, Math.round((efCurrent / efTarget) * 100));

  // Donut chart calculation
  const spendBreakdown = persona.spendBreakdown;
  const totalSpend = spendBreakdown.reduce((sum, item) => sum + item.amount, 0);

  // Build SVG Donut Segments
  let cumulativeAngle = 0;
  const donutRadius = 40;
  const donutCircumference = 2 * Math.PI * donutRadius;

  return (
    <div className="p-4 space-y-4 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-extrabold text-gray-900 text-sm tracking-tight">Debt &amp; EMI Hub</h2>
            <BureauMockBadge />
          </div>
          <p className="text-[10px] text-gray-500">Live UPI AutoPay &amp; Bureau Repayment Plan</p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-gray-500 block">Total Due this Month</span>
          <span className="text-sm font-extrabold text-[#5F259F] font-mono">
            ₹{totalMonthlyEmi.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Thin File Notice if applicable */}
      {persona.id === 'thin-file' && (
        <div className="p-4 bg-white rounded-2xl border border-purple-100 space-y-2">
          <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-[#5F259F]" />
            <span>Clean Debt Slate (No Active Debts)</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            You do not currently carry any debt. Keep this pristine record while using starter credit builder tools to create your score without falling into high-interest traps.
          </p>
        </div>
      )}

      {/* EMI Tracker List */}
      {hasDebts && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">
              Active EMIs &amp; Due Dates
            </h3>
            <span className="text-[10px] text-gray-500">
              {debts.filter((d) => d.isPaidThisMonth).length} of {debts.length} cleared
            </span>
          </div>

          <div className="space-y-2.5">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className={`bg-white rounded-2xl p-3.5 shadow-xs border transition-all ${
                  debt.isPaidThisMonth
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-purple-100/90'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      {debt.lender}
                    </span>
                    <h4 className="font-bold text-gray-900 text-xs">{debt.name}</h4>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-gray-900 font-mono">
                      ₹{debt.emi.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-gray-500">{debt.interestRate}% APR</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-600">
                      Due: <strong>{debt.nextDueDate}</strong> ({debt.daysLeft}d left)
                    </span>
                  </div>

                  {debt.isPaidThisMonth ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Paid This Month
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedDebtForPay(debt)}
                      className="min-h-[44px] px-3 py-1.5 rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Pay Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payoff Planner (Avalanche vs Snowball) */}
      {hasDebts && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/90 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-xs">Debt Payoff Strategy Planner</h3>
              <p className="text-[10px] text-gray-500">Accelerate debt-free date</p>
            </div>

            {/* Toggle Switch */}
            <div className="flex bg-gray-100 p-0.5 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setPayoffMethod('avalanche')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  payoffMethod === 'avalanche'
                    ? 'bg-[#5F259F] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Flame className="w-3 h-3" />
                <span>Avalanche</span>
              </button>

              <button
                onClick={() => setPayoffMethod('snowball')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  payoffMethod === 'snowball'
                    ? 'bg-[#5F259F] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Snowflake className="w-3 h-3" />
                <span>Snowball</span>
              </button>
            </div>
          </div>

          {/* Strategy Benefit Highlights */}
          <div className="grid grid-cols-2 gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl border border-purple-100">
            <div>
              <span className="text-[10px] text-gray-500 block">Months Saved</span>
              <span className="text-sm font-extrabold text-[#5F259F]">
                ~{monthsSaved} Months Sooner
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Interest Saved</span>
              <span className="text-sm font-extrabold text-emerald-700">
                Save ₹{interestSaved.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-gray-600 leading-snug">
            {payoffMethod === 'avalanche'
              ? 'Avalanche tackles the highest interest rate first (e.g. 36% Credit Cards), saving you the most rupee interest.'
              : 'Snowball clears the smallest loan balances first for quick psychological momentum and fewer active monthly bills.'}
          </p>

          {/* Recommended Repayment Queue */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Suggested Repayment Sequence:
            </span>
            <div className="space-y-1.5">
              {sortedDebts.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#5F259F] font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    {payoffMethod === 'avalanche' ? `${item.interestRate}% APR` : `₹${item.balance.toLocaleString('en-IN')}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Emergency Fund Goal */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PiggyBank className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs">Emergency Buffer Goal</h3>
              <p className="text-[10px] text-gray-500">Protects against missed EMIs during emergencies</p>
            </div>
          </div>

          <span className="text-xs font-extrabold text-emerald-700 font-mono">
            {efPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${efPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-medium">
            <span>Saved: ₹{efCurrent.toLocaleString('en-IN')}</span>
            <span>Target: ₹{efTarget.toLocaleString('en-IN')} (3 mo.)</span>
          </div>
        </div>

        {/* Quick Micro-Savings Simulator Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] text-gray-400 font-medium">Quick Deposit:</span>
          <button
            onClick={() => addEmergencySavings(500)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>₹500</span>
          </button>
          <button
            onClick={() => addEmergencySavings(2000)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>₹2,000</span>
          </button>
        </div>
      </div>

      {/* Monthly UPI Spend Donut Chart & Suggested Budget */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/90 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5F259F] flex items-center justify-center">
              <PieChart className="w-4 h-4 text-[#5F259F]" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs">Monthly UPI Spend Breakdown</h3>
              <p className="text-[10px] text-gray-500">Auto-categorized bank transactions</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-500 block">Total Spend</span>
            <span className="text-xs font-bold text-gray-900 font-mono">
              ₹{totalSpend.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Donut Chart & Legend */}
        <div className="flex items-center justify-between gap-4 py-1">
          {/* SVG Donut */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {spendBreakdown.map((item, idx) => {
                const strokeDasharray = `${(item.percentage / 100) * donutCircumference} ${donutCircumference}`;
                const strokeDashoffset = -cumulativeAngle;
                cumulativeAngle += (item.percentage / 100) * donutCircumference;

                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r={donutRadius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="14"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                  />
                );
              })}
            </svg>
            <div className="absolute text-center">
              <span className="text-[9px] text-gray-400 block font-semibold leading-none">UPI</span>
              <span className="text-xs font-bold text-[#5F259F] font-mono leading-none mt-0.5">
                30d
              </span>
            </div>
          </div>

          {/* Categories Legend */}
          <div className="flex-1 space-y-1.5 text-[11px]">
            {spendBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate max-w-[110px]">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Suggested Budget */}
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold text-[#5F259F] uppercase block">
              Suggested Monthly Discretionary Budget
            </span>
            <span className="text-xs font-bold text-gray-900 font-mono">
              ₹{persona.suggestedBudget.toLocaleString('en-IN')} / month
            </span>
          </div>
          <span className="text-[10px] text-purple-700 max-w-[130px] text-right font-medium leading-tight">
            Keeps card utilization safely under 30%
          </span>
        </div>
      </div>

      {/* Pay Now UPI PIN Modal */}
      {selectedDebtForPay && (
        <UpiPinModal
          debt={selectedDebtForPay}
          onSuccess={() => {
            payEmi(selectedDebtForPay.id);
            setSelectedDebtForPay(null);
          }}
          onClose={() => setSelectedDebtForPay(null)}
        />
      )}
    </div>
  );
};
