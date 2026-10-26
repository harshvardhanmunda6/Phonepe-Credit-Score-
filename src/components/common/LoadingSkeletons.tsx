import React from 'react';

export const ScoreSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Gauge skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 flex flex-col items-center">
        <div className="w-48 h-28 bg-purple-100/70 rounded-t-full mb-3" />
        <div className="w-24 h-8 bg-purple-200/60 rounded-md mb-2" />
        <div className="w-36 h-4 bg-purple-100/70 rounded-md" />
      </div>

      {/* Factors grid skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-3.5 shadow-sm border border-purple-100 space-y-2">
            <div className="w-16 h-4 bg-purple-100 rounded" />
            <div className="w-20 h-5 bg-purple-200/70 rounded" />
            <div className="w-full h-3 bg-purple-100/60 rounded" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 space-y-3">
        <div className="w-32 h-4 bg-purple-200/60 rounded" />
        <div className="w-full h-32 bg-purple-100/50 rounded-xl" />
      </div>
    </div>
  );
};

export const OffersSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-20 h-8 bg-purple-200/50 rounded-full" />
        ))}
      </div>

      {/* Offer cards */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <div className="w-24 h-4 bg-purple-200/70 rounded" />
              <div className="w-40 h-5 bg-purple-300/60 rounded" />
            </div>
            <div className="w-14 h-6 bg-purple-100 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-50">
            <div className="w-24 h-4 bg-purple-100 rounded" />
            <div className="w-24 h-4 bg-purple-100 rounded" />
          </div>
          <div className="w-full h-10 bg-purple-200/60 rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export const DebtSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 space-y-3">
        <div className="w-32 h-5 bg-purple-200/70 rounded" />
        <div className="w-full h-24 bg-purple-100/60 rounded-xl" />
      </div>

      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100 space-y-2">
            <div className="flex justify-between">
              <div className="w-28 h-4 bg-purple-200 rounded" />
              <div className="w-16 h-4 bg-purple-200 rounded" />
            </div>
            <div className="w-36 h-3 bg-purple-100 rounded" />
            <div className="w-full h-8 bg-purple-100/50 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CoachSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse p-2">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-300/70" />
        <div className="w-3/4 h-16 bg-white rounded-2xl p-3 shadow-sm border border-purple-100" />
      </div>
      <div className="flex items-start gap-2 justify-end">
        <div className="w-2/3 h-12 bg-purple-200/70 rounded-2xl p-3" />
      </div>
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-300/70" />
        <div className="w-5/6 h-24 bg-white rounded-2xl p-3 shadow-sm border border-purple-100" />
      </div>
    </div>
  );
};
