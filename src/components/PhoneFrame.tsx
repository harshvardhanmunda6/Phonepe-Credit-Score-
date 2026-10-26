import React from 'react';
import {
  Activity,
  Tag,
  CreditCard,
  MessageSquareCode,
  Wifi,
  Battery,
  SlidersHorizontal,
  BarChart3,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const {
    currentView,
    setCurrentView,
    activeTab,
    setActiveTab,
    hasConsented,
    persona,
    setIsPrivacySheetOpen,
    setIsDemoDrawerOpen,
    setIsAnalyticsDrawerOpen,
  } = useCredit();

  return (
    <div className="min-h-screen bg-[#110e1b] py-4 sm:py-8 px-2 flex flex-col items-center justify-center font-['Inter',sans-serif] selection:bg-[#5F259F] selection:text-white">
      {/* Top Desktop Helper Bar */}
      <div className="w-full max-w-[390px] mb-2.5 flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-1.5 text-purple-200/90 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Credit Health &amp; Offers</span>
          <span className="text-[10px] text-purple-300/60 bg-purple-900/40 px-1.5 py-0.5 rounded border border-purple-700/50">
            Concept Prototype
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDemoDrawerOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#5F259F] text-white hover:bg-[#4F1D85] transition-all text-[11px] font-semibold shadow-sm shadow-purple-950"
            title="Switch Personas & Test States"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Demo Controls</span>
          </button>
          <button
            onClick={() => setIsAnalyticsDrawerOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-950 text-purple-200 hover:bg-purple-900 transition-all text-[11px] font-medium border border-purple-800/60"
            title="View Live Analytics Funnel"
          >
            <BarChart3 className="w-3 h-3 text-purple-300" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* 390px Mobile Frame */}
      <div className="relative w-[390px] h-[830px] max-h-[92vh] bg-[#F5F3FA] rounded-[42px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_10px_#231d33,0_0_0_12px_#382f50] overflow-hidden flex flex-col border border-purple-900/40">
        {/* Dynamic Island & Notch Area */}
        <div className="bg-[#5F259F] pt-2 px-6 pb-2 text-white flex items-center justify-between z-30 select-none">
          <span className="text-xs font-semibold tracking-tight">9:41</span>
          {/* Dynamic Island pill */}
          <div className="w-24 h-4 bg-black/40 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400/80 mr-1.5" />
            <span className="text-[9px] text-white/80 font-mono tracking-widest">UPI SAFE</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/90">
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* In-app Header (Changes based on whether inside Credit Hub or UPI Home) */}
        {currentView === 'credit_hub' && (
          <header className="bg-[#5F259F] text-white px-4 py-2.5 flex items-center justify-between border-b border-purple-800/40 shadow-sm z-20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('upi_home')}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors -ml-1"
                title="Back to UPI Home"
                aria-label="Back to UPI Home"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-sm font-bold tracking-tight leading-none">Credit Health</h1>
                <p className="text-[10px] text-purple-200/80 leading-tight mt-0.5">
                  {persona.name} • {persona.score ? `${persona.score} ${persona.band}` : 'New to Credit'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPrivacySheetOpen(true)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-100 transition-colors"
                title="Privacy & Data Consents"
                aria-label="Privacy Settings"
              >
                <ShieldCheck className="w-4 h-4 text-purple-200" />
              </button>
              <button
                onClick={() => setIsDemoDrawerOpen(true)}
                className="px-2 py-1 rounded-md bg-purple-900/80 text-[10px] font-semibold text-purple-200 border border-purple-700/60 hover:bg-purple-800 transition-colors"
              >
                {persona.id.toUpperCase()}
              </button>
            </div>
          </header>
        )}

        {/* Scrollable Screen Content Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F5F3FA] relative select-text">
          {children}
        </main>

        {/* Bottom Navigation (Only visible inside Credit Hub) */}
        {currentView === 'credit_hub' && (
          <nav className="bg-white border-t border-purple-100/90 px-2 py-1.5 flex items-center justify-around z-20 shadow-[0_-4px_16px_rgba(95,37,159,0.06)]">
            {/* Tab 1: Score */}
            <button
              onClick={() => setActiveTab('score')}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] rounded-xl transition-all ${
                activeTab === 'score'
                  ? 'text-[#5F259F] font-semibold scale-105'
                  : 'text-gray-400 hover:text-gray-600 font-normal'
              }`}
            >
              <Activity className={`w-5 h-5 ${activeTab === 'score' ? 'text-[#5F259F] stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] mt-0.5">Score</span>
            </button>

            {/* Tab 2: Offers */}
            <button
              onClick={() => setActiveTab('offers')}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] rounded-xl relative transition-all ${
                activeTab === 'offers'
                  ? 'text-[#5F259F] font-semibold scale-105'
                  : 'text-gray-400 hover:text-gray-600 font-normal'
              }`}
            >
              <span className="relative">
                <Tag className={`w-5 h-5 ${activeTab === 'offers' ? 'text-[#5F259F] stroke-[2.5]' : 'stroke-2'}`} />
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </span>
              <span className="text-[11px] mt-0.5">Offers</span>
            </button>

            {/* Tab 3: Debt */}
            <button
              onClick={() => setActiveTab('debt')}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] rounded-xl transition-all ${
                activeTab === 'debt'
                  ? 'text-[#5F259F] font-semibold scale-105'
                  : 'text-gray-400 hover:text-gray-600 font-normal'
              }`}
            >
              <CreditCard className={`w-5 h-5 ${activeTab === 'debt' ? 'text-[#5F259F] stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] mt-0.5">Debt</span>
            </button>

            {/* Tab 4: Coach */}
            <button
              onClick={() => setActiveTab('coach')}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] rounded-xl transition-all ${
                activeTab === 'coach'
                  ? 'text-[#5F259F] font-semibold scale-105'
                  : 'text-gray-400 hover:text-gray-600 font-normal'
              }`}
            >
              <div className="relative">
                <MessageSquareCode className={`w-5 h-5 ${activeTab === 'coach' ? 'text-[#5F259F] stroke-[2.5]' : 'stroke-2'}`} />
                <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-gradient-to-r from-purple-600 to-indigo-600 text-[8px] font-bold text-white rounded-full leading-none">
                  AI
                </span>
              </div>
              <span className="text-[11px] mt-0.5">Coach</span>
            </button>
          </nav>
        )}

        {/* Home Indicator bar */}
        <div className="w-full bg-white flex justify-center pb-2 pt-1">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
