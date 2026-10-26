export type PersonaId = 'prime' | 'near-prime' | 'subprime' | 'thin-file';

export type CreditBand = 'Poor' | 'Fair' | 'Good' | 'Excellent' | 'New to Credit';

export interface ScoreHistoryPoint {
  month: string;
  score: number;
  reason?: string;
}

export interface ScoreChangeItem {
  id: string;
  date: string;
  delta: number;
  title: string;
  reason: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface FactorItem {
  id: string;
  name: string;
  status: 'Excellent' | 'Good' | 'Average' | 'Needs Attention' | 'No Data';
  statusColor: 'green' | 'amber' | 'red' | 'purple' | 'gray';
  valueDisplay: string;
  weight: string;
  explanation: string;
  detailedInsight: string;
  recommendedAction: string;
}

export interface DebtItem {
  id: string;
  name: string;
  type: 'Personal Loan' | 'Home Loan' | 'Car Loan' | 'Credit Card' | 'Consumer Durable';
  lender: string;
  balance: number;
  originalAmount: number;
  emi: number;
  interestRate: number;
  dueDate: string; // e.g. "5th of every month"
  nextDueDate: string; // e.g. "05 Nov 2026"
  daysLeft: number;
  isPaidThisMonth: boolean;
  autopayEnabled: boolean;
}

export interface SpendCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface PersonaProfile {
  id: PersonaId;
  name: string;
  phone: string;
  panMasked: string;
  score: number | null; // null for thin-file
  band: CreditBand;
  scoreDelta: number;
  lastUpdated: string;
  utilization: number; // percentage
  paymentHistory: number; // on-time percentage
  creditAge: string;
  enquiries: number;
  scoreHistory: ScoreHistoryPoint[];
  recentChanges: ScoreChangeItem[];
  factors: FactorItem[];
  debts: DebtItem[];
  spendBreakdown: SpendCategory[];
  emergencyFund: {
    current: number;
    target: number;
  };
  monthlyIncome: number;
  suggestedBudget: number;
  cannedQuestions: string[];
}

export type OfferCategory = 'all' | 'loans' | 'cards' | 'builder' | 'insurance';

export interface OfferItem {
  id: string;
  partnerName: string;
  partnerTagline: string;
  title: string;
  category: 'loans' | 'cards' | 'builder' | 'insurance';
  isPreQualified: boolean;
  preQualifiedBadge: string;
  creditLimitDisplay: string;
  rawLimitNum: number;
  interestRateOrFeeDisplay: string;
  rawCostRate: number; // lower is better for costScore
  approvalProbability: number; // 0 to 1
  costScore: number; // 0 to 1
  limitScore: number; // 0 to 1
  fitScore: number; // 0 to 1 calculated as 0.5*approval + 0.3*cost + 0.2*limit
  isSponsored: boolean;
  minScoreRequired: number;
  maxScoreCap?: number;
  isCreditBuilder: boolean;
  perks: string[];
  termsSummary: string;
  bureauReporting: boolean;
  processingFee: string;
  tenureOrCycle: string;
}

export type AnalyticsEventType =
  | 'score_viewed'
  | 'alert_enabled'
  | 'simulator_used'
  | 'offer_viewed'
  | 'offer_compared'
  | 'offer_applied'
  | 'coach_asked';

export interface AnalyticsEvent {
  id: string;
  name: AnalyticsEventType;
  timestamp: string;
  details?: string;
  metadata?: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  isFallback?: boolean;
}
