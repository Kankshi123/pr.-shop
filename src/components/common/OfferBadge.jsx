import React from 'react';

export const OfferBadge = ({ text, type = 'offer', className = '' }) => {
  if (type === 'flash') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm tracking-wide ${className}`}>
        <span>⚡</span> {text}
      </span>
    );
  }

  if (type === 'grade') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
        <span>✓</span> {text}
      </span>
    );
  }

  if (type === 'discount') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white tracking-wider uppercase ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 ${className}`}>
      {text}
    </span>
  );
};
