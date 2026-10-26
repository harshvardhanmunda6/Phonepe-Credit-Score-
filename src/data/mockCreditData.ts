import { OfferCategory, OfferItem, PersonaId, PersonaProfile } from '../types/credit';

export const PERSONAS: Record<PersonaId, PersonaProfile> = {
  'near-prime': {
    id: 'near-prime',
    name: 'Harsh Munda',
    phone: '+91 98765 43210',
    panMasked: 'HRMPM4821N',
    score: 712,
    band: 'Good',
    scoreDelta: 6,
    lastUpdated: '24 Oct 2026',
    utilization: 38,
    paymentHistory: 97,
    creditAge: '2 yrs 4 mos',
    enquiries: 4,
    monthlyIncome: 65000,
    suggestedBudget: 28000,
    emergencyFund: {
      current: 42000,
      target: 75000,
    },
    scoreHistory: [
      { month: 'May', score: 692, reason: 'High credit card usage (>45%)' },
      { month: 'Jun', score: 698, reason: 'Small loan repayment on time' },
      { month: 'Jul', score: 704, reason: 'Paid off consumer durable loan' },
      { month: 'Aug', score: 700, reason: 'Hard enquiry for retail card' },
      { month: 'Sep', score: 706, reason: 'Regular EMI autopay maintained' },
      { month: 'Oct', score: 712, reason: 'Card balance paid before cycle date' },
    ],
    recentChanges: [
      {
        id: 'rc-1',
        date: '18 Oct 2026',
        delta: 6,
        title: 'Card Balance Reduced',
        reason: 'Paid ₹16,200 towards Apex Credit Card balance.',
        type: 'positive',
      },
      {
        id: 'rc-2',
        date: '02 Sep 2026',
        delta: 4,
        title: 'On-time AutoPay Payment',
        reason: 'Personal Loan EMI of ₹6,800 cleared via UPI AutoPay.',
        type: 'positive',
      },
      {
        id: 'rc-3',
        date: '12 Aug 2026',
        delta: -4,
        title: 'New Credit Inquiry',
        reason: 'FinBridge Capital inquiry recorded for pre-qualified card.',
        type: 'negative',
      },
    ],
    factors: [
      {
        id: 'f-1',
        name: 'Payment History',
        status: 'Good',
        statusColor: 'green',
        valueDisplay: '97% on-time',
        weight: '35% Impact',
        explanation: '1 delayed payment 8 months ago. 35 out of 36 payments on time.',
        detailedInsight: 'Payment history is the heaviest factor in your Bureau (mock) score. Even a single 30-day delay takes 12-24 months of consistent on-time payments to fully heal.',
        recommendedAction: 'Set up UPI AutoPay for your active personal loan EMI to guarantee 100% timeliness.',
      },
      {
        id: 'f-2',
        name: 'Credit Utilization',
        status: 'Average',
        statusColor: 'amber',
        valueDisplay: '38% used',
        weight: '30% Impact',
        explanation: '₹38,000 used of ₹1,00,000 total limit. Ideal is under 30%.',
        detailedInsight: 'Bureau algorithms penalize utilization above 30%. Reducing your active balance by ₹8,000 could instantly boost your score into the Prime (750+) tier.',
        recommendedAction: 'Pay ₹8,500 before your bill generation date on the 20th of this month.',
      },
      {
        id: 'f-3',
        name: 'Credit Age',
        status: 'Good',
        statusColor: 'purple',
        valueDisplay: '2 yrs 4 mos',
        weight: '15% Impact',
        explanation: 'Oldest active account is 2.3 years old with healthy tenure.',
        detailedInsight: 'Lenders look for a steady track record of debt management over at least 3 years.',
        recommendedAction: 'Keep your oldest credit card active with minor recurring utility payments.',
      },
      {
        id: 'f-4',
        name: 'Credit Enquiries',
        status: 'Needs Attention',
        statusColor: 'red',
        valueDisplay: '4 in 6 mos',
        weight: '10% Impact',
        explanation: '4 hard credit inquiries in the past 6 months from lenders.',
        detailedInsight: 'Multiple applications within short windows make you appear credit-hungry to automated underwriting models.',
        recommendedAction: 'Pause applying for fresh credit cards or unsecured loans for the next 90 days.',
      },
    ],
    debts: [
      {
        id: 'debt-1',
        name: 'Personal Loan',
        type: 'Personal Loan',
        lender: 'Apex Bank (Mock)',
        balance: 142000,
        originalAmount: 200000,
        emi: 6800,
        interestRate: 14.5,
        dueDate: '5th of every month',
        nextDueDate: '05 Nov 2026',
        daysLeft: 10,
        isPaidThisMonth: false,
        autopayEnabled: true,
      },
      {
        id: 'debt-2',
        name: 'Laptop Consumer Durable',
        type: 'Consumer Durable',
        lender: 'NeoCred Finance (Mock)',
        balance: 14400,
        originalAmount: 28800,
        emi: 2400,
        interestRate: 11.0,
        dueDate: '10th of every month',
        nextDueDate: '10 Nov 2026',
        daysLeft: 15,
        isPaidThisMonth: false,
        autopayEnabled: false,
      },
      {
        id: 'debt-3',
        name: 'Rewards Credit Card',
        type: 'Credit Card',
        lender: 'FinBridge Bank (Mock)',
        balance: 38000,
        originalAmount: 100000,
        emi: 3800,
        interestRate: 36.0,
        dueDate: '20th of every month',
        nextDueDate: '20 Nov 2026',
        daysLeft: 25,
        isPaidThisMonth: true,
        autopayEnabled: true,
      },
    ],
    spendBreakdown: [
      { name: 'Shopping & Electronics', amount: 12400, percentage: 38, color: '#5F259F' },
      { name: 'Food & Groceries', amount: 9200, percentage: 28, color: '#8B5CF6' },
      { name: 'Utilities & Bills', amount: 6500, percentage: 20, color: '#C4B5FD' },
      { name: 'Travel & Commute', amount: 4600, percentage: 14, color: '#DDD6FE' },
    ],
    cannedQuestions: [
      'How can I cross 750 into the Prime tier?',
      'Why is my credit utilization flagged as average?',
      'Which loan should I pay off first: Personal Loan or Card?',
      'Will soft inquiries on this app hurt my score?',
    ],
  },

  prime: {
    id: 'prime',
    name: 'Ananya Verma',
    phone: '+91 98111 22334',
    panMasked: 'ANVPV9921K',
    score: 780,
    band: 'Excellent',
    scoreDelta: 12,
    lastUpdated: '25 Oct 2026',
    utilization: 12,
    paymentHistory: 100,
    creditAge: '5 yrs 8 mos',
    enquiries: 1,
    monthlyIncome: 135000,
    suggestedBudget: 55000,
    emergencyFund: {
      current: 185000,
      target: 200000,
    },
    scoreHistory: [
      { month: 'May', score: 765, reason: 'Pristine payment track record' },
      { month: 'Jun', score: 768, reason: 'Low utilization maintained (<15%)' },
      { month: 'Jul', score: 772, reason: 'Home loan principal prepaid' },
      { month: 'Aug', score: 775, reason: 'Consistent bureau reporting' },
      { month: 'Sep', score: 775, reason: 'Steady low balance' },
      { month: 'Oct', score: 780, reason: 'Added prime credit limit increase' },
    ],
    recentChanges: [
      {
        id: 'rc-p1',
        date: '20 Oct 2026',
        delta: 5,
        title: 'Limit Increase Reported',
        reason: 'NeoCred upgraded credit card limit to ₹5,00,000.',
        type: 'positive',
      },
      {
        id: 'rc-p2',
        date: '05 Sep 2026',
        delta: 4,
        title: 'On-time Home Loan EMI',
        reason: 'Home loan EMI of ₹32,000 cleared automatically.',
        type: 'positive',
      },
    ],
    factors: [
      {
        id: 'f-p1',
        name: 'Payment History',
        status: 'Excellent',
        statusColor: 'green',
        valueDisplay: '100% on-time',
        weight: '35% Impact',
        explanation: 'Flawless record across 72 consecutive monthly billing cycles.',
        detailedInsight: 'Lenders view a 100% on-time history as prime creditworthiness, unlocking the lowest interest rate brackets in India.',
        recommendedAction: 'Keep all active UPI AutoPay mandates running smoothly.',
      },
      {
        id: 'f-p2',
        name: 'Credit Utilization',
        status: 'Excellent',
        statusColor: 'green',
        valueDisplay: '12% used',
        weight: '30% Impact',
        explanation: 'Only ₹60,000 used of ₹5,00,000 total credit limit.',
        detailedInsight: 'Utilization below 15% places you in the top 5th percentile of Indian credit card users.',
        recommendedAction: 'Continue current discipline. Your high limits safeguard your score.',
      },
      {
        id: 'f-p3',
        name: 'Credit Age',
        status: 'Excellent',
        statusColor: 'green',
        valueDisplay: '5 yrs 8 mos',
        weight: '15% Impact',
        explanation: 'Mature credit mix of home loan and premium credit cards.',
        detailedInsight: 'An established credit file over 5 years demonstrates high resilience through economic cycles.',
        recommendedAction: 'Never close your oldest zero-annual-fee credit card.',
      },
      {
        id: 'f-p4',
        name: 'Credit Enquiries',
        status: 'Excellent',
        statusColor: 'green',
        valueDisplay: '1 in 6 mos',
        weight: '10% Impact',
        explanation: 'Only 1 hard inquiry over the last half year.',
        detailedInsight: 'Low inquiry velocity proves you are not reliant on emergency credit.',
        recommendedAction: 'Use in-app pre-qualified checks which rely only on soft inquiries.',
      },
    ],
    debts: [
      {
        id: 'debt-p1',
        name: 'Housing Mortgage Loan',
        type: 'Home Loan',
        lender: 'Apex Housing Bank (Mock)',
        balance: 3450000,
        originalAmount: 4000000,
        emi: 32000,
        interestRate: 8.45,
        dueDate: '7th of every month',
        nextDueDate: '07 Nov 2026',
        daysLeft: 12,
        isPaidThisMonth: false,
        autopayEnabled: true,
      },
      {
        id: 'debt-p2',
        name: 'Electric SUV Vehicle Loan',
        type: 'Car Loan',
        lender: 'FinBridge Auto (Mock)',
        balance: 480000,
        originalAmount: 850000,
        emi: 14500,
        interestRate: 8.95,
        dueDate: '15th of every month',
        nextDueDate: '15 Nov 2026',
        daysLeft: 20,
        isPaidThisMonth: true,
        autopayEnabled: true,
      },
    ],
    spendBreakdown: [
      { name: 'Home & Furnishing', amount: 24000, percentage: 40, color: '#5F259F' },
      { name: 'Travel & Dining', amount: 18000, percentage: 30, color: '#8B5CF6' },
      { name: 'Investments & SIPs', amount: 12000, percentage: 20, color: '#C4B5FD' },
      { name: 'Utilities', amount: 6000, percentage: 10, color: '#DDD6FE' },
    ],
    cannedQuestions: [
      'What prime loan rates am I eligible for at 780?',
      'How does pre-paying my home loan impact my credit score?',
      'Should I request another credit limit enhancement?',
      'What are the best lifetime-free travel credit cards for me?',
    ],
  },

  subprime: {
    id: 'subprime',
    name: 'Vikram Patel',
    phone: '+91 97722 88441',
    panMasked: 'VKPPA4419M',
    score: 620,
    band: 'Fair',
    scoreDelta: -14,
    lastUpdated: '22 Oct 2026',
    utilization: 74,
    paymentHistory: 89,
    creditAge: '1 yr 2 mos',
    enquiries: 6,
    monthlyIncome: 38000,
    suggestedBudget: 16000,
    emergencyFund: {
      current: 8500,
      target: 40000,
    },
    scoreHistory: [
      { month: 'May', score: 654, reason: 'Initial credit line accessed' },
      { month: 'Jun', score: 648, reason: 'High balance reported' },
      { month: 'Jul', score: 640, reason: 'Late payment 15 days on instant loan' },
      { month: 'Aug', score: 632, reason: 'Second missed payment' },
      { month: 'Sep', score: 628, reason: 'Multiple loan rejections' },
      { month: 'Oct', score: 620, reason: 'Card utilization surged to 74%' },
    ],
    recentChanges: [
      {
        id: 'rc-s1',
        date: '15 Oct 2026',
        delta: -8,
        title: 'Missed Payment Reported',
        reason: 'Micro-credit line payment of ₹3,100 delayed by 32 days.',
        type: 'negative',
      },
      {
        id: 'rc-s2',
        date: '28 Sep 2026',
        delta: -6,
        title: 'High Card Utilization',
        reason: 'Credit card utilization reported at 74% (₹37,000 / ₹50,000).',
        type: 'negative',
      },
    ],
    factors: [
      {
        id: 'f-s1',
        name: 'Payment History',
        status: 'Needs Attention',
        statusColor: 'red',
        valueDisplay: '89% on-time',
        weight: '35% Impact',
        explanation: '3 missed or delayed payments in the last 12 months.',
        detailedInsight: 'Missed payments stay on your bureau report for 36 months, severely depressing approval probabilities with tier-1 lenders.',
        recommendedAction: 'Clear the overdue ₹3,100 balance immediately to prevent account default marking.',
      },
      {
        id: 'f-s2',
        name: 'Credit Utilization',
        status: 'Needs Attention',
        statusColor: 'red',
        valueDisplay: '74% used',
        weight: '30% Impact',
        explanation: '₹37,000 used of ₹50,000 limit. Risk threshold exceeded (>50%).',
        detailedInsight: 'Utilization above 70% suggests acute financial distress to scoring algorithms.',
        recommendedAction: 'Direct any upcoming festival bonus or extra income to reduce balance under ₹15,000.',
      },
      {
        id: 'f-s3',
        name: 'Credit Age',
        status: 'Average',
        statusColor: 'amber',
        valueDisplay: '1 yr 2 mos',
        weight: '15% Impact',
        explanation: 'Relatively short credit history with high borrowing velocity.',
        detailedInsight: 'Young credit profiles are more vulnerable to score volatility.',
        recommendedAction: 'Do not close active accounts even after settling balances.',
      },
      {
        id: 'f-s4',
        name: 'Credit Enquiries',
        status: 'Needs Attention',
        statusColor: 'red',
        valueDisplay: '6 in 6 mos',
        weight: '10% Impact',
        explanation: '6 hard inquiries resulted in multiple lender rejections.',
        detailedInsight: 'Rejections followed by repeated applications create a negative scoring spiral.',
        recommendedAction: 'Switch to credit builder products (secured cards) that require no hard checks.',
      },
    ],
    debts: [
      {
        id: 'debt-s1',
        name: 'Instant Cash Loan',
        type: 'Personal Loan',
        lender: 'FastCredit App (Mock)',
        balance: 42000,
        originalAmount: 50000,
        emi: 4200,
        interestRate: 28.0,
        dueDate: '3rd of every month',
        nextDueDate: '03 Nov 2026',
        daysLeft: 8,
        isPaidThisMonth: false,
        autopayEnabled: false,
      },
      {
        id: 'debt-s2',
        name: 'Micro Credit Line',
        type: 'Credit Card',
        lender: 'Prism MicroFinance (Mock)',
        balance: 31000,
        originalAmount: 35000,
        emi: 3100,
        interestRate: 32.0,
        dueDate: '12th of every month',
        nextDueDate: '12 Nov 2026',
        daysLeft: 17,
        isPaidThisMonth: false,
        autopayEnabled: false,
      },
    ],
    spendBreakdown: [
      { name: 'EMI Repayments', amount: 7300, percentage: 42, color: '#DC2626' },
      { name: 'Groceries & Household', amount: 5500, percentage: 32, color: '#5F259F' },
      { name: 'Utilities & Bills', amount: 2800, percentage: 16, color: '#8B5CF6' },
      { name: 'Personal & Misc', amount: 1800, percentage: 10, color: '#C4B5FD' },
    ],
    cannedQuestions: [
      'How quickly can I rebuild my score from 620 to 700?',
      'What is a Credit Builder card and how does it work?',
      'How do I stop lenders from rejecting my applications?',
      'Should I settle my overdue instant loan or pay in full?',
    ],
  },

  'thin-file': {
    id: 'thin-file',
    name: 'Pooja Nair',
    phone: '+91 99003 44112',
    panMasked: 'PJPNR7712E',
    score: null,
    band: 'New to Credit',
    scoreDelta: 0,
    lastUpdated: 'Just now',
    utilization: 0,
    paymentHistory: 0,
    creditAge: '0 months',
    enquiries: 0,
    monthlyIncome: 45000,
    suggestedBudget: 22000,
    emergencyFund: {
      current: 25000,
      target: 60000,
    },
    scoreHistory: [],
    recentChanges: [],
    factors: [
      {
        id: 'f-t1',
        name: 'Payment History',
        status: 'No Data',
        statusColor: 'gray',
        valueDisplay: 'No records',
        weight: '35% Impact',
        explanation: 'No past loan or credit card repayment data found in Bureau (mock).',
        detailedInsight: 'Credit bureaus require at least one active trade-line with 3-6 months of reported transactions to compute your first official score.',
        recommendedAction: 'Open a zero-fee Fixed Deposit (FD) backed credit card to establish your first trade-line.',
      },
      {
        id: 'f-t2',
        name: 'Credit Utilization',
        status: 'No Data',
        statusColor: 'gray',
        valueDisplay: '0% (No lines)',
        weight: '30% Impact',
        explanation: 'You currently have zero active revolving credit lines.',
        detailedInsight: 'Once your first credit card is active, spending modest amounts and keeping utilization below 25% quickly builds a 720+ first score.',
        recommendedAction: 'Use your UPI credit line or credit builder card for everyday grocery and utility bills.',
      },
      {
        id: 'f-t3',
        name: 'Credit Age',
        status: 'No Data',
        statusColor: 'gray',
        valueDisplay: '0 months',
        weight: '15% Impact',
        explanation: 'No historical credit bureau accounts on file.',
        detailedInsight: 'Starting early gives you a significant advantage in long-term borrowing terms.',
        recommendedAction: 'Start your credit clock today with a credit builder product.',
      },
      {
        id: 'f-t4',
        name: 'Credit Enquiries',
        status: 'Excellent',
        statusColor: 'green',
        valueDisplay: '0 inquiries',
        weight: '10% Impact',
        explanation: 'Clean record with zero credit inquiries.',
        detailedInsight: 'Having zero inquiries is a great baseline. Avoid applying randomly to unverified loan apps.',
        recommendedAction: 'Stick to pre-qualified or guaranteed credit-builder options.',
      },
    ],
    debts: [],
    spendBreakdown: [
      { name: 'Rent & Living', amount: 14000, percentage: 45, color: '#5F259F' },
      { name: 'Food & Dining', amount: 8000, percentage: 26, color: '#8B5CF6' },
      { name: 'Shopping & Fashion', amount: 5500, percentage: 18, color: '#C4B5FD' },
      { name: 'Bills & Recharge', amount: 3500, percentage: 11, color: '#DDD6FE' },
    ],
    cannedQuestions: [
      'I have no credit score. How do I start from scratch?',
      'What is an FD-backed credit card?',
      'How many months before I get my first bureau score?',
      'Can I get a loan without a credit history?',
    ],
  },
};

// Raw marketplace offer data
export const RAW_MARKETPLACE_OFFERS: OfferItem[] = [
  {
    id: 'off-1',
    partnerName: 'Apex Bank (Mock)',
    partnerTagline: 'India’s Leading Digital Credit Partner',
    title: 'Super Saver Cashback Credit Card',
    category: 'cards',
    isPreQualified: true,
    preQualifiedBadge: 'Pre-Qualified: 96% Match',
    creditLimitDisplay: 'Up to ₹2,50,000',
    rawLimitNum: 250000,
    interestRateOrFeeDisplay: 'Zero annual fee for 1st year',
    rawCostRate: 0.1, // very low cost
    approvalProbability: 0.94,
    costScore: 0.92,
    limitScore: 0.85,
    fitScore: 0, // calculated deterministically below
    isSponsored: true, // Marked sponsored, but formula will strictly control rank
    minScoreRequired: 700,
    isCreditBuilder: false,
    perks: ['5% cashback on all UPI spends', 'Complimentary domestic airport lounge access', '₹1,500 welcome fuel vouchers'],
    termsSummary: 'Zero joining fee for verified UPI users. Subsequent year annual fee ₹499 waived on ₹50,000 annual spend.',
    bureauReporting: true,
    processingFee: '₹0 Joining Fee',
    tenureOrCycle: '45-Day Interest Free Period',
  },
  {
    id: 'off-2',
    partnerName: 'NeoCred Capital (Mock)',
    partnerTagline: 'Fast Digital Lending & Rewards',
    title: 'Instant Flexi Personal Loan',
    category: 'loans',
    isPreQualified: true,
    preQualifiedBadge: 'Instant Bureau Pre-Approval',
    creditLimitDisplay: 'Up to ₹5,00,000',
    rawLimitNum: 500000,
    interestRateOrFeeDisplay: 'Starting @ 10.99% p.a.',
    rawCostRate: 0.15,
    approvalProbability: 0.92,
    costScore: 0.88,
    limitScore: 0.95,
    fitScore: 0,
    isSponsored: false,
    minScoreRequired: 720,
    isCreditBuilder: false,
    perks: ['Disbursal in 90 seconds to UPI VPA', 'Flexible EMI tenures from 6 to 36 months', 'Zero foreclosure charges after 6 EMIs'],
    termsSummary: 'Fixed interest rates starting from 10.99% per annum based on bureau tier. Soft check with no score impact.',
    bureauReporting: true,
    processingFee: '1% Processing Fee',
    tenureOrCycle: '6 - 36 Months Tenure',
  },
  {
    id: 'off-3',
    partnerName: 'Prism MicroFinance (Mock)',
    partnerTagline: 'Guaranteed Bureau Score Builder',
    title: 'FD-Backed Secured Credit Builder Card',
    category: 'builder',
    isPreQualified: true,
    preQualifiedBadge: 'Guaranteed 100% Approval',
    creditLimitDisplay: '₹20,000 - ₹1,00,000 (90% of FD)',
    rawLimitNum: 100000,
    interestRateOrFeeDisplay: 'Zero Income Proof Needed',
    rawCostRate: 0.08,
    approvalProbability: 0.99,
    costScore: 0.95,
    limitScore: 0.65,
    fitScore: 0,
    isSponsored: false,
    minScoreRequired: 0, // for all scores including thin-file & subprime
    isCreditBuilder: true,
    perks: ['Earn 7.1% interest on your fixed deposit', 'Reports to Bureau (mock) every 30 days', 'Average +45 pts score boost in 4 months'],
    termsSummary: 'Minimum ₹10,000 deposit held securely in partner bank. Builds credit score automatically with regular UPI repayments.',
    bureauReporting: true,
    processingFee: '₹0 Lifetime Free',
    tenureOrCycle: 'Interest-free 45 days',
  },
  {
    id: 'off-4',
    partnerName: 'FinBridge Capital (Mock)',
    partnerTagline: 'Customized Credit Lines',
    title: 'UPI Revolving Credit Line',
    category: 'loans',
    isPreQualified: true,
    preQualifiedBadge: 'Pre-Approved by Bureau Match',
    creditLimitDisplay: 'Up to ₹1,50,000',
    rawLimitNum: 150000,
    interestRateOrFeeDisplay: '12.49% p.a. on used amount only',
    rawCostRate: 0.18,
    approvalProbability: 0.89,
    costScore: 0.82,
    limitScore: 0.78,
    fitScore: 0,
    isSponsored: false,
    minScoreRequired: 670,
    isCreditBuilder: false,
    perks: ['Pay interest only on withdrawn balance', 'Scan & Pay directly using your UPI app', 'No pre-payment penalty'],
    termsSummary: 'Revolving line linked to your primary UPI ID. Pay back anytime or convert to 3/6 month EMIs with 1 click.',
    bureauReporting: true,
    processingFee: 'Flat ₹299 Setup',
    tenureOrCycle: 'Revolving 12-Month Line',
  },
  {
    id: 'off-5',
    partnerName: 'Nova Trust (Mock)',
    partnerTagline: 'Micro Credit Specialist',
    title: 'Step-Up Credit Rebuilder Micro-Loan',
    category: 'builder',
    isPreQualified: true,
    preQualifiedBadge: 'Rebuilder Guaranteed Match',
    creditLimitDisplay: '₹15,000 Starter Line',
    rawLimitNum: 15000,
    interestRateOrFeeDisplay: 'Flat ₹99/month service fee',
    rawCostRate: 0.12,
    approvalProbability: 0.96,
    costScore: 0.89,
    limitScore: 0.55,
    fitScore: 0,
    isSponsored: false,
    minScoreRequired: 0,
    isCreditBuilder: true,
    perks: ['Specifically designed to cure delinquent files', 'Automatic bureau trade-line positive status', 'Upgrade to ₹50,000 unsecured line after 90 days'],
    termsSummary: 'Small predictable micro-installments that establish positive repayment cycles in bureau databases.',
    bureauReporting: true,
    processingFee: 'Zero Hidden Fees',
    tenureOrCycle: '3 - 6 Months Micro EMIs',
  },
  {
    id: 'off-6',
    partnerName: 'Stride Small Finance (Mock)',
    partnerTagline: 'Empowering Everyday Bharat',
    title: 'Express Two-Wheeler & EV Loan',
    category: 'loans',
    isPreQualified: false,
    preQualifiedBadge: 'High Eligibility Probability',
    creditLimitDisplay: 'Up to ₹1,20,000',
    rawLimitNum: 120000,
    interestRateOrFeeDisplay: '11.5% fixed interest',
    rawCostRate: 0.16,
    approvalProbability: 0.84,
    costScore: 0.80,
    limitScore: 0.72,
    fitScore: 0,
    isSponsored: false,
    minScoreRequired: 650,
    isCreditBuilder: false,
    perks: ['100% on-road financing available', 'Instant sanction with Aadhaar e-Sign', 'Low EMI options starting ₹1,899'],
    termsSummary: 'Requires basic address verification and income self-declaration.',
    bureauReporting: true,
    processingFee: '₹499 Document Fee',
    tenureOrCycle: '12 - 36 Months',
  },
  {
    id: 'off-7',
    partnerName: 'ZestShield Insurance (Mock)',
    partnerTagline: 'Complete Credit & Health Shield',
    title: 'EMI Protect + Hospital Cash Suraksha',
    category: 'insurance',
    isPreQualified: true,
    preQualifiedBadge: 'Zero Medical Exam Required',
    creditLimitDisplay: 'Covers EMIs up to ₹50,000/mo',
    rawLimitNum: 300000,
    interestRateOrFeeDisplay: 'Starting @ ₹149/month',
    rawCostRate: 0.05,
    approvalProbability: 0.98,
    costScore: 0.94,
    limitScore: 0.82,
    fitScore: 0,
    isSponsored: false,
    minScoreRequired: 0,
    isCreditBuilder: false,
    perks: ['Pays up to 3 loan EMIs during involuntary job loss', '₹3,000/day hospital daily cash allowance', 'Direct claim settlement to your UPI bank account'],
    termsSummary: 'Protection cover that safeguards your bureau score from falling during unexpected health or career pauses.',
    bureauReporting: false,
    processingFee: 'No Setup Fee',
    tenureOrCycle: 'Annual Renewable Policy',
  },
  {
    id: 'off-8',
    partnerName: 'Aegis Pay Insurance (Mock)',
    partnerTagline: 'Comprehensive Digital Safety',
    title: 'UPI Cyber Fraud & Identity Theft Cover',
    category: 'insurance',
    isPreQualified: true,
    preQualifiedBadge: 'Instant 1-Click Policy',
    creditLimitDisplay: '₹1,00,000 Protection Sum',
    rawLimitNum: 100000,
    interestRateOrFeeDisplay: 'Flat ₹39/month',
    rawCostRate: 0.03,
    approvalProbability: 0.99,
    costScore: 0.98,
    limitScore: 0.75,
    fitScore: 0,
    isSponsored: true, // Sponsored tag, but rank is purely math-driven
    minScoreRequired: 0,
    isCreditBuilder: false,
    perks: ['Covers phishing, SIM swap, and fraudulent UPI transfers', '24x7 Cyber Assistance Hotline', 'Zero deductible on valid claims'],
    termsSummary: 'Immediate policy issuance underwritten by mock insurance partner.',
    bureauReporting: false,
    processingFee: 'Zero Paperwork',
    tenureOrCycle: 'Monthly UPI AutoPay Subscription',
  },
  {
    id: 'off-9',
    partnerName: 'Kite Prime Bank (Mock)',
    partnerTagline: 'Ultra Premium Lifestyle Banking',
    title: 'Infinite Metal Travel Credit Card',
    category: 'cards',
    isPreQualified: true,
    preQualifiedBadge: 'Invite-Only Prime Match',
    creditLimitDisplay: 'Up to ₹10,00,000',
    rawLimitNum: 1000000,
    interestRateOrFeeDisplay: '₹4,999 Annual Fee (Waivable)',
    rawCostRate: 0.35,
    approvalProbability: 0.88,
    costScore: 0.68,
    limitScore: 0.99,
    fitScore: 0,
    isSponsored: false,
    minScoreRequired: 760, // Prime only
    isCreditBuilder: false,
    perks: ['Unlimited International & Domestic Lounge Access', '3.3% reward rate on flights & hotels', 'Dedicated 24/7 Lifestyle Concierge'],
    termsSummary: 'Exclusive for score 760+ users. Annual fee waived on spending ₹4,00,000 in a membership year.',
    bureauReporting: true,
    processingFee: '₹4,999 Joining Fee',
    tenureOrCycle: '50-Day Interest Free Window',
  },
];

// Helper to compute deterministic fit score:
// Fit = 0.5 * approvalProbability + 0.3 * costScore + 0.2 * limitScore
export function computeFitScore(offer: OfferItem): number {
  const fit = 0.5 * offer.approvalProbability + 0.3 * offer.costScore + 0.2 * offer.limitScore;
  return Number(fit.toFixed(3));
}

// Prepare offers with calculated fit scores
export const ALL_OFFERS: OfferItem[] = RAW_MARKETPLACE_OFFERS.map((off) => ({
  ...off,
  fitScore: computeFitScore(off),
}));

// Filter and sort offers based on persona and category
export function getOffersForPersona(
  persona: PersonaProfile,
  selectedCategory: OfferCategory = 'all'
): OfferItem[] {
  const userScore = persona.score;
  const isThinFile = userScore === null;
  const isSubprime = !isThinFile && userScore < 650;
  const isNearPrime = !isThinFile && userScore >= 650 && userScore < 750;

  // Filter by category
  let list = ALL_OFFERS.filter((off) => {
    if (selectedCategory !== 'all' && off.category !== selectedCategory) {
      return false;
    }

    // Eligibility check
    if (isThinFile) {
      // Thin file only sees products with minScoreRequired === 0 or builder/insurance
      return off.minScoreRequired === 0 || off.isCreditBuilder || off.category === 'insurance';
    }

    if (isSubprime) {
      // Subprime only sees products <= 640 or credit builder or insurance
      return off.minScoreRequired <= 640 || off.isCreditBuilder || off.category === 'insurance';
    }

    if (isNearPrime) {
      // Near prime sees products up to 730
      return off.minScoreRequired <= 730;
    }

    // Prime sees all
    return true;
  });

  // Sort logic:
  // "Default sort is 'Best fit'. Fit = 0.5 x approval probability + 0.3 x cost + 0.2 x limit.
  // A 'Sponsored' tag never changes rank.
  // Subprime and thin-file personas see Credit builder offers first."
  return list.sort((a, b) => {
    // If subprime or thin-file, credit builder offers bubble to top
    if (isThinFile || isSubprime) {
      if (a.isCreditBuilder && !b.isCreditBuilder) return -1;
      if (!a.isCreditBuilder && b.isCreditBuilder) return 1;
    }

    // Strictly sort by Fit Score descending! Sponsored tag does NOT affect order.
    if (b.fitScore !== a.fitScore) {
      return b.fitScore - a.fitScore;
    }

    // Tie-breaker: approval probability
    return b.approvalProbability - a.approvalProbability;
  });
}

// Canned Fallback Coach generator for when Gemini API is unavailable or offline
export function getCannedCoachResponse(persona: PersonaProfile, userMessage: string): string {
  const query = userMessage.toLowerCase();
  const score = persona.score;

  if (query.includes('750') || query.includes('prime') || query.includes('cross') || query.includes('boost') || query.includes('increase')) {
    if (persona.id === 'prime') {
      return `Your current score of 780 is already in the Excellent tier! To maintain it: keep credit card utilization below 15%, preserve your oldest active credit card line, and avoid unnecessary hard inquiries. Mock data, not financial advice.`;
    }
    if (persona.id === 'subprime') {
      return `To climb from 620 to 700+, focus on two key actions: 1) Clear your overdue instant loan balance of ₹3,100 to stop negative bureau reporting, and 2) Consider an FD-backed Credit Builder card to build fresh on-time positive trade lines. In 4 to 6 months of flawless AutoPay, you can see significant score recovery. Mock data, not financial advice.`;
    }
    if (persona.id === 'thin-file') {
      return `Since you are new to credit with no bureau history, your best route to 750+ is opening a secured Fixed Deposit credit card or a micro credit builder line. Spend around ₹2,000 - ₹4,000 monthly on regular UPI/groceries, pay 100% on time, and your first bureau score will generate in 90 days. Mock data, not financial advice.`;
    }
    // Near-prime (712)
    return `To move from 712 into the 750+ Prime tier: 1) Reduce your card utilization from 38% to under 25% (paying off approx ₹8,500 will give a quick +15 to +20 pts boost), 2) Keep your personal loan UPI AutoPay active with zero delays, and 3) Refrain from new loan inquiries for 90 days. Mock data, not financial advice.`;
  }

  if (query.includes('utilization') || query.includes('usage') || query.includes('limit')) {
    return `Credit utilization is the percentage of your card limit you use. In your profile (${persona.utilization}% used), lenders prefer to see this under 30%. You can lower utilization by paying before the bill generation date or by requesting a credit limit enhancement without increasing spending. Mock data, not financial advice.`;
  }

  if (query.includes('which loan') || query.includes('pay off') || query.includes('debt') || query.includes('first')) {
    if (persona.debts.length === 0) {
      return `You currently have zero active debts on file. This keeps your debt burden low! Focus on building an emergency reserve equal to 3 months of expenses. Mock data, not financial advice.`;
    }
    const highestRate = [...persona.debts].sort((a, b) => b.interestRate - a.interestRate)[0];
    const lowestBalance = [...persona.debts].sort((a, b) => a.balance - b.balance)[0];
    return `Using the Avalanche method, paying off ${highestRate.name} first (${highestRate.interestRate}% interest rate) will save you the most money in interest charges. Alternatively, with the Snowball method, clearing ${lowestBalance.name} (balance ₹${lowestBalance.balance.toLocaleString('en-IN')}) gives you a fast psychological win. Mock data, not financial advice.`;
  }

  if (query.includes('soft') || query.includes('inquiry') || query.includes('hurt') || query.includes('impact')) {
    return `Checking your score inside this UPI payments app is a 'soft inquiry'. Soft inquiries are purely for your personal tracking and educational health and have absolutely 0% impact on your credit score. Only formal loan or card applications made with lenders count as 'hard inquiries'. Mock data, not financial advice.`;
  }

  if (query.includes('builder') || query.includes('fd') || query.includes('secured')) {
    return `A Credit Builder card is backed by a Fixed Deposit (e.g. ₹10,000). You earn FD interest while receiving a credit limit equal to 90% of the deposit. Since it requires no bureau history or salary slips, it guarantees approval and reports your monthly payments to the bureau every 30 days to systematically raise your score. Mock data, not financial advice.`;
  }

  if (query.includes('card') || query.includes('eligible') || query.includes('approval') || query.includes('offer')) {
    return `Based on your ${persona.band} profile (${score ? score + ' score' : 'New to credit'}), explore the 'Offers' tab. Our algorithm matches offers by approval likelihood, cost, and limit. Note that partner lenders make the final underwriting decision. Mock data, not financial advice.`;
  }

  return `Thanks for asking! Maintaining a healthy credit profile comes down to consistent on-time UPI AutoPay payments, keeping card utilization below 30%, and only applying for credit when truly needed. Check our 'Score Simulator' to see your projected score before making financial moves. Mock data, not financial advice.`;
}
