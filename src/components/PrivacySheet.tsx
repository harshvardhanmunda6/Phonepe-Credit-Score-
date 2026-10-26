import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { BureauMockBadge } from './common/ScreenStates';

export const PrivacySheet: React.FC = () => {
  const {
    isPrivacySheetOpen,
    setIsPrivacySheetOpen,
    privacySettings,
    updatePrivacySetting,
    deleteUserData,
  } = useCredit();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isPrivacySheetOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleToggle = (key: 'shareWithLenders' | 'monthlyBureauRefresh' | 'whatsappAlerts') => {
    const nextVal = !privacySettings[key];
    updatePrivacySetting(key, nextVal);
    showToast(nextVal ? 'Permission granted' : 'Consent revoked immediately');
  };

  const handleConfirmDelete = () => {
    deleteUserData();
    setShowConfirmDelete(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 p-5 space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-3.5 py-1.5 rounded-xl shadow-lg border border-purple-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#5F259F] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#5F259F]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Privacy &amp; Data Control</h3>
              <p className="text-[10px] text-gray-500">Manage consent and bureau authorizations</p>
            </div>
          </div>
          <button
            onClick={() => setIsPrivacySheetOpen(false)}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Toggles */}
        <div className="space-y-3 text-xs">
          {/* Toggle 1: Share with partner lenders */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-gray-900 text-xs">
                Share Data with Partner Lenders
              </h4>
              <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                Allows registered financial institutions to generate instant pre-qualified loan and card offers.
              </p>
            </div>
            <button
              onClick={() => handleToggle('shareWithLenders')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                privacySettings.shareWithLenders ? 'bg-[#5F259F]' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={privacySettings.shareWithLenders}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  privacySettings.shareWithLenders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Monthly Bureau Soft Refresh */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-gray-900 text-xs">
                Monthly Bureau Soft Refresh
              </h4>
              <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                Automatically fetches fresh scores on the 1st of every month without impacting your bureau rating.
              </p>
            </div>
            <button
              onClick={() => handleToggle('monthlyBureauRefresh')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                privacySettings.monthlyBureauRefresh ? 'bg-[#5F259F]' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={privacySettings.monthlyBureauRefresh}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  privacySettings.monthlyBureauRefresh ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: WhatsApp Alerts */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-gray-900 text-xs">
                WhatsApp Credit Change Alerts
              </h4>
              <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                Receive instant messaging notifications whenever your score increases or a new enquiry occurs.
              </p>
            </div>
            <button
              onClick={() => handleToggle('whatsappAlerts')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                privacySettings.whatsappAlerts ? 'bg-[#5F259F]' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={privacySettings.whatsappAlerts}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  privacySettings.whatsappAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Delete My Data Danger Button */}
        {showConfirmDelete ? (
          <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200 space-y-2.5 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Are you sure you want to delete your data?</span>
            </div>
            <p className="text-[11px] text-red-700 leading-snug">
              This will permanently purge your cached bureau score records, revoke all lender data consents, and reset your session back to the UPI home screen.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="w-full py-3 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            <span>Delete My Data &amp; Revoke Consents</span>
          </button>
        )}
      </div>
    </div>
  );
};
