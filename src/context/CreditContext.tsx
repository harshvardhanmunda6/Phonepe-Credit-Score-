import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  AnalyticsEvent,
  AnalyticsEventType,
  OfferItem,
  PersonaId,
  PersonaProfile,
} from '../types/credit';
import { ALL_OFFERS, PERSONAS } from '../data/mockCreditData';

interface CreditContextType {
  // Screen state & navigation
  currentView: 'upi_home' | 'credit_hub';
  setCurrentView: (view: 'upi_home' | 'credit_hub') => void;
  activeTab: 'score' | 'offers' | 'debt' | 'coach';
  setActiveTab: (tab: 'score' | 'offers' | 'debt' | 'coach') => void;

  // Persona management
  currentPersonaId: PersonaId;
  setPersona: (id: PersonaId) => void;
  persona: PersonaProfile;

  // Consent flow
  hasConsented: boolean;
  completeConsent: (pan: string, dob: string) => Promise<void>;
  isConsentLoading: boolean;

  // Alerts
  alertEnabled: boolean;
  toggleAlertEnabled: () => void;

  // Debt actions
  payEmi: (debtId: string) => void;
  addEmergencySavings: (amount: number) => void;

  // Offer actions
  comparedOfferIds: string[];
  toggleCompareOffer: (offerId: string) => void;
  clearComparedOffers: () => void;
  selectedOfferForApply: OfferItem | null;
  openApplyModal: (offer: OfferItem) => void;
  closeApplyModal: () => void;
  submitOfferApplication: (offer: OfferItem) => Promise<boolean>;
  isApplying: boolean;
  applySuccessOffer: OfferItem | null;
  dismissApplySuccess: () => void;

  // Simulator state
  simUtilization: number;
  setSimUtilization: (val: number) => void;
  simLoanPayoff: number;
  setSimLoanPayoff: (val: number) => void;
  simMissedPayments: number;
  setSimMissedPayments: (val: number) => void;
  resetSimulator: () => void;
  projectedScore: number | null;
  scoreDifference: number;
  estimatedMonths: number;

  // Privacy & Consent
  privacySettings: {
    shareWithLenders: boolean;
    monthlyBureauRefresh: boolean;
    whatsappAlerts: boolean;
  };
  updatePrivacySetting: (key: 'shareWithLenders' | 'monthlyBureauRefresh' | 'whatsappAlerts', val: boolean) => void;
  deleteUserData: () => void;
  isPrivacySheetOpen: boolean;
  setIsPrivacySheetOpen: (open: boolean) => void;

  // Info sheet for ranking
  isRankingInfoOpen: boolean;
  setIsRankingInfoOpen: (open: boolean) => void;

  // Demo controls & Testing states
  isDemoDrawerOpen: boolean;
  setIsDemoDrawerOpen: (open: boolean) => void;
  isAnalyticsDrawerOpen: boolean;
  setIsAnalyticsDrawerOpen: (open: boolean) => void;
  isSimulatedLoading: boolean;
  setIsSimulatedLoading: (val: boolean) => void;
  isSimulatedEmpty: boolean;
  setIsSimulatedEmpty: (val: boolean) => void;
  isSimulatedError: boolean;
  setIsSimulatedError: (val: boolean) => void;

  // Analytics logging & metrics
  analyticsEvents: AnalyticsEvent[];
  logEvent: (name: AnalyticsEventType, details?: string, metadata?: Record<string, any>) => void;
  clearAnalytics: () => void;
  funnelStats: {
    scoreViewed: number;
    alertEnabled: number;
    offerViewed: number;
    offerApplied: number;
    alertOptInRate: number;
    tabToApplyRate: number;
    repeatChecksCount: number;
  };
}

const CreditContext = createContext<CreditContextType | null>(null);

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<'upi_home' | 'credit_hub'>('upi_home');
  const [activeTab, setActiveTab] = useState<'score' | 'offers' | 'debt' | 'coach'>('score');

  // Persona State
  const [currentPersonaId, setCurrentPersonaId] = useState<PersonaId>('near-prime');
  // Copy of persona profiles to allow mutating debts, payments, etc.
  const [personaStore, setPersonaStore] = useState<Record<PersonaId, PersonaProfile>>(() => {
    return JSON.parse(JSON.stringify(PERSONAS));
  });

  const persona = personaStore[currentPersonaId];

  // Consent
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [isConsentLoading, setIsConsentLoading] = useState<boolean>(false);

  // Score alerts toggle
  const [alertEnabled, setAlertEnabled] = useState<boolean>(false);

  // Simulator values
  const [simUtilization, setSimUtilization] = useState<number>(persona.utilization);
  const [simLoanPayoff, setSimLoanPayoff] = useState<number>(0);
  const [simMissedPayments, setSimMissedPayments] = useState<number>(0);

  // When persona changes, reset simulator sliders to new persona defaults
  useEffect(() => {
    setSimUtilization(persona.utilization);
    setSimLoanPayoff(0);
    setSimMissedPayments(0);
    setComparedOfferIds([]);
  }, [currentPersonaId, persona.utilization]);

  // Compare offers
  const [comparedOfferIds, setComparedOfferIds] = useState<string[]>([]);

  // Apply modal
  const [selectedOfferForApply, setSelectedOfferForApply] = useState<OfferItem | null>(null);
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [applySuccessOffer, setApplySuccessOffer] = useState<OfferItem | null>(null);

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    shareWithLenders: true,
    monthlyBureauRefresh: true,
    whatsappAlerts: false,
  });
  const [isPrivacySheetOpen, setIsPrivacySheetOpen] = useState(false);
  const [isRankingInfoOpen, setIsRankingInfoOpen] = useState(false);

  // Demo controls & simulated states
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);
  const [isAnalyticsDrawerOpen, setIsAnalyticsDrawerOpen] = useState(false);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(false);
  const [isSimulatedEmpty, setIsSimulatedEmpty] = useState(false);
  const [isSimulatedError, setIsSimulatedError] = useState(false);

  // Analytics live events
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([
    {
      id: 'init-1',
      name: 'score_viewed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      details: 'Initial page visit (Default Near-prime 712)',
    },
  ]);

  const logEvent = (name: AnalyticsEventType, details?: string, metadata?: Record<string, any>) => {
    const newEvent: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      details: details || `${name} triggered`,
      metadata,
    };
    setAnalyticsEvents((prev) => [newEvent, ...prev]);
  };

  const clearAnalytics = () => {
    setAnalyticsEvents([]);
  };

  // Funnel and KPIs calculation
  const funnelStats = useMemo(() => {
    let scoreViewed = 0;
    let alertEnabledCount = 0;
    let offerViewed = 0;
    let offerApplied = 0;

    for (const ev of analyticsEvents) {
      if (ev.name === 'score_viewed') scoreViewed++;
      if (ev.name === 'alert_enabled') alertEnabledCount++;
      if (ev.name === 'offer_viewed') offerViewed++;
      if (ev.name === 'offer_applied') offerApplied++;
    }

    const alertOptInRate = scoreViewed > 0 ? Math.min(100, Math.round((alertEnabledCount / scoreViewed) * 100)) : 0;
    const tabToApplyRate = offerViewed > 0 ? Math.min(100, Math.round((offerApplied / offerViewed) * 100)) : 0;
    const repeatChecksCount = scoreViewed > 1 ? scoreViewed - 1 : 0;

    return {
      scoreViewed,
      alertEnabled: alertEnabledCount,
      offerViewed,
      offerApplied,
      alertOptInRate,
      tabToApplyRate,
      repeatChecksCount,
    };
  }, [analyticsEvents]);

  // Log score_viewed when entered or tab switches to score
  useEffect(() => {
    if (currentView === 'credit_hub' && activeTab === 'score') {
      logEvent('score_viewed', `Viewed score for ${persona.name} (${persona.score || 'Thin-file'})`);
    } else if (currentView === 'credit_hub' && activeTab === 'offers') {
      logEvent('offer_viewed', `Viewed Marketplace offers for ${persona.band}`);
    }
  }, [currentView, activeTab, currentPersonaId]);

  // Switch persona
  const setPersona = (id: PersonaId) => {
    setCurrentPersonaId(id);
    logEvent('score_viewed', `Switched persona to ${PERSONAS[id].name} (${PERSONAS[id].score ?? 'Thin-file'})`);
  };

  // Consent submission
  const completeConsent = async (_pan: string, _dob: string) => {
    setIsConsentLoading(true);
    // 2-second realistic fetch animation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConsentLoading(false);
    setHasConsented(true);
    setCurrentView('credit_hub');
    setActiveTab('score');
    logEvent('score_viewed', `Consent granted for Bureau (mock) inquiry`);
  };

  // Alert toggle
  const toggleAlertEnabled = () => {
    const nextVal = !alertEnabled;
    setAlertEnabled(nextVal);
    if (nextVal) {
      logEvent('alert_enabled', 'User enabled real-time credit score change alerts');
    }
  };

  // Pay EMI
  const payEmi = (debtId: string) => {
    setPersonaStore((prev) => {
      const current = { ...prev[currentPersonaId] };
      const debtIndex = current.debts.findIndex((d) => d.id === debtId);
      if (debtIndex !== -1) {
        const debt = current.debts[debtIndex];
        const newPaidStatus = true;
        const newBalance = Math.max(0, debt.balance - debt.emi);
        current.debts = [
          ...current.debts.slice(0, debtIndex),
          { ...debt, isPaidThisMonth: newPaidStatus, balance: newBalance },
          ...current.debts.slice(debtIndex + 1),
        ];
      }
      return {
        ...prev,
        [currentPersonaId]: current,
      };
    });
  };

  // Add emergency savings
  const addEmergencySavings = (amount: number) => {
    setPersonaStore((prev) => {
      const current = { ...prev[currentPersonaId] };
      current.emergencyFund = {
        ...current.emergencyFund,
        current: current.emergencyFund.current + amount,
      };
      return {
        ...prev,
        [currentPersonaId]: current,
      };
    });
  };

  // Compare offers
  const toggleCompareOffer = (offerId: string) => {
    setComparedOfferIds((prev) => {
      if (prev.includes(offerId)) {
        return prev.filter((id) => id !== offerId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      const updated = [...prev, offerId];
      logEvent('offer_compared', `Compared offers: ${updated.join(', ')}`);
      return updated;
    });
  };

  const clearComparedOffers = () => {
    setComparedOfferIds([]);
  };

  // Apply modal
  const openApplyModal = (offer: OfferItem) => {
    setSelectedOfferForApply(offer);
  };

  const closeApplyModal = () => {
    setSelectedOfferForApply(null);
  };

  const submitOfferApplication = async (offer: OfferItem) => {
    setIsApplying(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsApplying(false);
    setSelectedOfferForApply(null);
    setApplySuccessOffer(offer);
    logEvent('offer_applied', `Applied for ${offer.title} from ${offer.partnerName}`, {
      offerId: offer.id,
      category: offer.category,
      fitScore: offer.fitScore,
    });
    return true;
  };

  const dismissApplySuccess = () => {
    setApplySuccessOffer(null);
  };

  // Simulator Deterministic Math:
  // Lowering utilization raises score, loan payoff raises score, missed payments lower sharply
  const { projectedScore, scoreDifference, estimatedMonths } = useMemo(() => {
    const baseScore = persona.score;
    if (baseScore === null) {
      // Thin file has no score to project directly, but if they simulate builder actions, project starter score!
      const starterScore = 650;
      let delta = 0;
      if (simLoanPayoff > 0) delta += 15;
      if (simUtilization > 0 && simUtilization <= 30) delta += 20;
      if (simMissedPayments > 0) delta -= simMissedPayments * 40;
      const proj = Math.max(300, Math.min(900, starterScore + delta));
      return {
        projectedScore: proj,
        scoreDifference: proj - starterScore,
        estimatedMonths: delta >= 0 ? 3 : 1,
      };
    }

    // 1. Utilization impact:
    // Base line is persona.utilization
    // If utilization lowered, gain points up to +35
    // If utilization increased, lose points up to -45
    const utilDiff = persona.utilization - simUtilization;
    const utilDelta = Math.round((utilDiff / 100) * 45);

    // 2. Loan payoff impact:
    // Every ₹25,000 paid off adds +6 pts, max +36 pts
    const loanDelta = Math.min(36, Math.round((simLoanPayoff / 25000) * 6));

    // 3. Missed payments penalty (sharp reduction):
    // 1 missed: -55 pts
    // 2 missed: -95 pts
    // 3 missed: -140 pts
    let missedPenalty = 0;
    if (simMissedPayments === 1) missedPenalty = -55;
    else if (simMissedPayments === 2) missedPenalty = -95;
    else if (simMissedPayments >= 3) missedPenalty = -140;

    const totalDelta = utilDelta + loanDelta + missedPenalty;
    const finalScore = Math.max(300, Math.min(900, baseScore + totalDelta));

    // Estimated months calculation
    let months = 1;
    if (totalDelta > 25) months = 4;
    else if (totalDelta > 10) months = 2;
    else if (totalDelta < -30) months = 6; // recovery time

    return {
      projectedScore: finalScore,
      scoreDifference: totalDelta,
      estimatedMonths: months,
    };
  }, [persona.score, persona.utilization, simUtilization, simLoanPayoff, simMissedPayments]);

  const resetSimulator = () => {
    setSimUtilization(persona.utilization);
    setSimLoanPayoff(0);
    setSimMissedPayments(0);
  };

  // Privacy update
  const updatePrivacySetting = (
    key: 'shareWithLenders' | 'monthlyBureauRefresh' | 'whatsappAlerts',
    val: boolean
  ) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: val }));
  };

  const deleteUserData = () => {
    // Reset all data to default
    setPersonaStore(JSON.parse(JSON.stringify(PERSONAS)));
    setHasConsented(false);
    setCurrentView('upi_home');
    setAlertEnabled(false);
    setComparedOfferIds([]);
    setIsPrivacySheetOpen(false);
    logEvent('score_viewed', 'User requested full bureau data deletion and consent revoke');
  };

  return (
    <CreditContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        currentPersonaId,
        setPersona,
        persona,
        hasConsented,
        completeConsent,
        isConsentLoading,
        alertEnabled,
        toggleAlertEnabled,
        payEmi,
        addEmergencySavings,
        comparedOfferIds,
        toggleCompareOffer,
        clearComparedOffers,
        selectedOfferForApply,
        openApplyModal,
        closeApplyModal,
        submitOfferApplication,
        isApplying,
        applySuccessOffer,
        dismissApplySuccess,
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
        privacySettings,
        updatePrivacySetting,
        deleteUserData,
        isPrivacySheetOpen,
        setIsPrivacySheetOpen,
        isRankingInfoOpen,
        setIsRankingInfoOpen,
        isDemoDrawerOpen,
        setIsDemoDrawerOpen,
        isAnalyticsDrawerOpen,
        setIsAnalyticsDrawerOpen,
        isSimulatedLoading,
        setIsSimulatedLoading,
        isSimulatedEmpty,
        setIsSimulatedEmpty,
        isSimulatedError,
        setIsSimulatedError,
        analyticsEvents,
        logEvent,
        clearAnalytics,
        funnelStats,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredit must be used within a CreditProvider');
  }
  return context;
};
