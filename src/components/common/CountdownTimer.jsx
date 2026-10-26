import React from 'react';
import { useActiveOffers } from '../../hooks/useActiveOffers';

export const CountdownTimer = ({ offer, size = 'sm', className = '' }) => {
  const { getOfferTimeRemaining } = useActiveOffers();
  const time = getOfferTimeRemaining(offer);

  const format = (num) => String(num).padStart(2, '0');

  if (size === 'banner') {
    return (
      <div className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold ${className}`}>
        <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-white border border-white/10">
          {format(time.hours)}
        </span>
        <span className="text-white/80 animate-pulse">:</span>
        <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-white border border-white/10">
          {format(time.minutes)}
        </span>
        <span className="text-white/80 animate-pulse">:</span>
        <span className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded text-white border border-white/10">
          {format(time.seconds)}
        </span>
      </div>
    );
  }

  if (size === 'card') {
    return (
      <div className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/80 ${className}`}>
        <span>⏱️ Ends in</span>
        <span className="font-bold">{format(time.hours)}:{format(time.minutes)}:{format(time.seconds)}</span>
      </div>
    );
  }

  // Default compact
  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <div className="flex flex-col items-center">
        <span className="bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded text-[11px]">
          {format(time.hours)}
        </span>
        <span className="text-[9px] text-slate-400 uppercase mt-0.5">hrs</span>
      </div>
      <span className="text-slate-400 font-bold mb-3">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded text-[11px]">
          {format(time.minutes)}
        </span>
        <span className="text-[9px] text-slate-400 uppercase mt-0.5">min</span>
      </div>
      <span className="text-slate-400 font-bold mb-3">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded text-[11px]">
          {format(time.seconds)}
        </span>
        <span className="text-[9px] text-slate-400 uppercase mt-0.5">sec</span>
      </div>
    </div>
  );
};
