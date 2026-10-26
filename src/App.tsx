/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CreditProvider, useCredit } from './context/CreditContext';
import { PhoneFrame } from './components/PhoneFrame';
import { UpiHomeScreen } from './components/UpiHomeScreen';
import { ScoreTab } from './components/ScoreTab';
import { OffersTab } from './components/OffersTab';
import { DebtTab } from './components/DebtTab';
import { CoachTab } from './components/CoachTab';
import { PrivacySheet } from './components/PrivacySheet';
import { DemoControlsDrawer } from './components/DemoControlsDrawer';
import { AnalyticsPanel } from './components/AnalyticsPanel';

const AppContent: React.FC = () => {
  const { currentView, activeTab } = useCredit();

  return (
    <PhoneFrame>
      {currentView === 'upi_home' ? (
        <UpiHomeScreen />
      ) : (
        <>
          {activeTab === 'score' && <ScoreTab />}
          {activeTab === 'offers' && <OffersTab />}
          {activeTab === 'debt' && <DebtTab />}
          {activeTab === 'coach' && <CoachTab />}
        </>
      )}

      {/* Global Drawers & Sheets */}
      <PrivacySheet />
      <DemoControlsDrawer />
      <AnalyticsPanel />
    </PhoneFrame>
  );
};

export default function App() {
  return (
    <CreditProvider>
      <AppContent />
    </CreditProvider>
  );
}
