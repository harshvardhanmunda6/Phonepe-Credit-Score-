import React, { useEffect, useState } from 'react';
import { CreditBand } from '../types/credit';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface ScoreGaugeProps {
  score: number | null;
  band: CreditBand;
  scoreDelta: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, band, scoreDelta }) => {
  const [animatedScore, setAnimatedScore] = useState<number>(300);

  useEffect(() => {
    if (score === null) return;
    let start = 300;
    const end = score;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  if (score === null) {
    return (
      <div className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50/80 to-white rounded-2xl border border-purple-100/90 text-center shadow-xs">
        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-3 text-[#5F259F]">
          <Sparkles className="w-8 h-8 text-[#5F259F]" />
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-[#5F259F] text-xs font-bold mb-2">
          New to Credit (Thin-File)
        </span>
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">No Bureau History Yet</h3>
        <p className="text-xs text-gray-500 max-w-xs mt-1 leading-relaxed">
          You don’t have a credit score yet because you haven’t taken a registered loan or credit card. Get your first score in 60-90 days with a Credit Builder card!
        </p>
      </div>
    );
  }

  // Range: 300 to 900 => total 600 points
  const minScore = 300;
  const maxScore = 900;
  const progressRatio = Math.max(0, Math.min(1, (animatedScore - minScore) / (maxScore - minScore)));

  // SVG Semi-Circle Arc Parameters
  const radius = 88;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // Half-circle perimeter
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Band colors
  const getBandColor = (b: CreditBand) => {
    switch (b) {
      case 'Excellent':
        return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', fill: '#10B981' };
      case 'Good':
        return { text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', fill: '#5F259F' };
      case 'Fair':
        return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', fill: '#F59E0B' };
      case 'Poor':
      default:
        return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', fill: '#EF4444' };
    }
  };

  const colors = getBandColor(band);

  return (
    <div className="relative flex flex-col items-center justify-center pt-2 pb-4 bg-gradient-to-b from-white to-purple-50/40 rounded-2xl border border-purple-100/90 shadow-xs">
      {/* Gauge SVG */}
      <div className="relative w-56 h-32 flex items-center justify-center overflow-hidden">
        <svg className="w-56 h-56 transform -rotate-180" viewBox="0 0 200 200">
          {/* Background Track with color gradient stops */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#E9E3F5"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
          />

          {/* Animated Fill Arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Score Display */}
        <div className="absolute top-10 flex flex-col items-center text-center">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight font-mono">
            {animatedScore}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {band}
            </span>
            {scoreDelta !== 0 && (
              <span
                className={`text-[11px] font-bold ${
                  scoreDelta > 0 ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} pts
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Min & Max labels */}
      <div className="w-52 flex justify-between text-[10px] font-semibold text-gray-600 -mt-2 px-1">
        <span>300 (Poor)</span>
        <span>650</span>
        <span>750</span>
        <span>900 (Excellent)</span>
      </div>
    </div>
  );
};
