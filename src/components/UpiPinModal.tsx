import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, Delete } from 'lucide-react';
import { DebtItem } from '../types/credit';

interface UpiPinModalProps {
  debt: DebtItem;
  onSuccess: () => void;
  onClose: () => void;
}

export const UpiPinModal: React.FC<UpiPinModalProps> = ({ debt, onSuccess, onClose }) => {
  const [pin, setPin] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        processPayment();
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const processPayment = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsProcessing(false);
    setIsSuccess(true);
    await new Promise((r) => setTimeout(r, 900));
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-purple-100 overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* UPI Header */}
        <div className="bg-[#5F259F] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-bold text-sm tracking-tight">UPI Direct Payment</h3>
              <p className="text-[10px] text-purple-200">{debt.lender}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Processing or Success State */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-extrabold text-gray-900 text-base">Payment Successful!</h4>
            <p className="text-xs text-gray-500">
              ₹{debt.emi.toLocaleString('en-IN')} paid to {debt.lender}. Bureau on-time status recorded.
            </p>
          </div>
        ) : isProcessing ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-[#5F259F] animate-spin mx-auto" />
            <h4 className="font-bold text-gray-900 text-sm">Debiting Bank via UPI AutoPay</h4>
            <p className="text-[11px] text-gray-400">Verifying NPCI response token...</p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Amount details */}
            <div className="text-center py-1 bg-purple-50 rounded-2xl border border-purple-100">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Paying EMI Amount</span>
              <div className="text-2xl font-extrabold text-gray-900 font-mono">
                ₹{debt.emi.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-purple-700 font-medium">For {debt.name}</p>
            </div>

            {/* PIN Dots */}
            <div className="space-y-1.5 text-center">
              <span className="text-xs font-semibold text-gray-700">Enter 4-Digit UPI PIN</span>
              <div className="flex justify-center gap-3 py-2">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                      pin.length > idx
                        ? 'bg-[#5F259F] border-[#5F259F] scale-110'
                        : 'border-gray-300 bg-gray-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 pt-1 max-w-[260px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleDigit(num)}
                  className="h-11 rounded-xl bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-900 font-bold text-base transition-colors flex items-center justify-center cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                type="button"
                onClick={() => handleDigit('0')}
                className="h-11 rounded-xl bg-gray-100 hover:bg-purple-100 active:bg-purple-200 text-gray-900 font-bold text-base transition-colors flex items-center justify-center cursor-pointer"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="h-11 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-600 flex items-center justify-center cursor-pointer"
              >
                <Delete className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
              <Lock className="w-3 h-3 text-gray-400" />
              <span>UPI encrypted PIN pad (Mock simulation)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
