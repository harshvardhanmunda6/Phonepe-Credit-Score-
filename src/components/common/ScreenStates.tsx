import React from 'react';
import { AlertCircle, RefreshCw, Inbox, ShieldAlert } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export const ErrorStateView: React.FC<ErrorStateProps> = ({
  title = 'Bureau Connection Timeout',
  message = 'Unable to fetch the latest credit bureau records. Please check your network or try again.',
  onRetry,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 flex flex-col items-center text-center my-4">
      <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-gray-900 text-base mb-1">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-xs">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5F259F] text-white text-xs font-semibold hover:bg-[#4F1D85] transition-colors shadow-sm"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry Bureau Request
      </button>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyStateView: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  message = 'There are currently no active records or offers matching this criteria.',
  icon,
  actionText,
  onAction,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 flex flex-col items-center text-center my-4">
      <div className="w-12 h-12 rounded-full bg-purple-50 text-[#5F259F] flex items-center justify-center mb-3">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="font-semibold text-gray-900 text-base mb-1">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-xs">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2.5 rounded-xl bg-purple-100 text-[#5F259F] text-xs font-semibold hover:bg-purple-200 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const BureauMockBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide bg-purple-100/90 text-[#5F259F] border border-purple-200/60 ${className}`}
      title="Mock educational credit data"
    >
      <ShieldAlert className="w-3 h-3 text-[#5F259F]" />
      Bureau (mock)
    </span>
  );
};
