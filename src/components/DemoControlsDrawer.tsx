import React from 'react';
import {
  X,
  SlidersHorizontal,
  Users,
  CheckCircle2,
  RefreshCw,
  Eye,
  AlertOctagon,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { PersonaId } from '../types/credit';

export const DemoControlsDrawer: React.FC = () => {
  const {
    isDemoDrawerOpen,
    setIsDemoDrawerOpen,
    currentPersonaId,
    setPersona,
    isSimulatedLoading,
    setIsSimulatedLoading,
    isSimulatedEmpty,
    setIsSimulatedEmpty,
    isSimulatedError,
    setIsSimulatedError,
    setIsAnalyticsDrawerOpen,
  } = useCredit();

  if (!isDemoDrawerOpen) return null;

  const personasList: { id: PersonaId; label: string; score: string; band: string; badgeColor: string }[] = [
    {
      id: 'prime',
      label: '1. Prime Persona',
      score: '780',
      band: 'Excellent Tier',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'near-prime',
      label: '2. Near-Prime (Default)',
      score: '712',
      band: 'Good Tier',
      badgeColor: 'bg-purple-50 text-[#5F259F] border-purple-200',
    },
    {
      id: 'subprime',
      label: '3. Subprime Persona',
      score: '620',
      band: 'Fair / Delinquent',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'thin-file',
      label: '4. Thin-File Persona',
      score: 'No Score',
      band: 'New to Credit',
      badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-[390px] max-h-[88vh] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="bg-[#5F259F] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Demo Controls</h3>
              <p className="text-[10px] text-purple-200">Live Persona Switcher &amp; Test States</p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoDrawerOpen(false)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Persona Switcher Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs">
              <Users className="w-4 h-4 text-[#5F259F]" />
              <span>Switch Active Persona Live</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-snug">
              Instantly transforms the bureau score, active factor weights, marketplace offers, EMI debt schedule, and AI Coach answers.
            </p>

            <div className="space-y-2 pt-1">
              {personasList.map((p) => {
                const isSelected = currentPersonaId === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#5F259F] bg-purple-50/70 ring-1 ring-[#5F259F]'
                        : 'border-gray-200 hover:border-purple-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-xs">{p.label}</span>
                        {isSelected && (
                          <span className="text-[9px] bg-[#5F259F] text-white px-1.5 py-0.2 rounded font-semibold">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500">{p.band}</span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${p.badgeColor}`}
                      >
                        {p.score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Test Screen States Section */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs">
              <Eye className="w-4 h-4 text-[#5F259F]" />
              <span>Test Screen States (Requirement)</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-snug">
              Every screen includes loading skeletons, empty states, and error fallback states. Toggle them to test:
            </p>

            <div className="space-y-2 pt-1">
              {/* Loading Skeletons Toggle */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-800 block text-xs">
                    Simulate Loading Skeleton
                  </span>
                  <span className="text-[10px] text-gray-500">Shimmer skeletons on active tab</span>
                </div>
                <button
                  onClick={() => setIsSimulatedLoading(!isSimulatedLoading)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isSimulatedLoading ? 'bg-[#5F259F]' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={isSimulatedLoading}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isSimulatedLoading ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Empty State Toggle */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-800 block text-xs">
                    Simulate Empty State
                  </span>
                  <span className="text-[10px] text-gray-500">Zero records or empty queue</span>
                </div>
                <button
                  onClick={() => setIsSimulatedEmpty(!isSimulatedEmpty)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isSimulatedEmpty ? 'bg-[#5F259F]' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={isSimulatedEmpty}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isSimulatedEmpty ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Error State Toggle */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-800 block text-xs">
                    Simulate Bureau Error State
                  </span>
                  <span className="text-[10px] text-gray-500">API connection timeout + retry button</span>
                </div>
                <button
                  onClick={() => setIsSimulatedError(!isSimulatedError)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isSimulatedError ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={isSimulatedError}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isSimulatedError ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Trigger for Analytics */}
          <button
            onClick={() => {
              setIsDemoDrawerOpen(false);
              setIsAnalyticsDrawerOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-purple-300" />
            <span>Open Live Funnel &amp; Analytics Panel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
