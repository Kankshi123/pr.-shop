import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Truck,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative text-[#F3F8F4] pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center space-y-5 sm:space-y-6">
        {/* Tag matching reference: • YOUR NEIGHBOURHOOD TECH STORE, REIMAGINED */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A2E20] border border-[#2D4D36] text-[#A7F3D0] shadow-sm max-w-full">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span>
          </span>
          <span className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-[#86EFAC] truncate">
            YOUR NEIGHBOURHOOD TECH STORE, REIMAGINED
          </span>
        </div>

        {/* Main Editorial Serif Headline */}
        <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
          Find your{' '}
          <span className="italic font-serif font-light text-[#E2ECE4]">
            next little upgrade.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-lg text-[#E0EDE2] max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          Official partner for latest Apple & Android smartphones, certified pre-owned gadgets & audio with{' '}
          <strong className="text-white font-semibold">Pan-India Insured Express Delivery</strong>, and certified{' '}
          <strong className="text-white font-semibold">In-Store Device Repair (Dehradun Exclusive)</strong>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <Link
            to="/products"
            className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-2xl bg-[#D4E3D6] hover:bg-[#E3EFE5] text-[#142318] font-bold text-xs sm:text-sm shadow-xl shadow-[#102015]/30 flex items-center gap-2 transition-all active:scale-95"
          >
            <span>Explore Phones & Deals</span>
            <ArrowRight className="w-4 h-4 text-[#142318]" />
          </Link>

          <Link
            to="/repair"
            className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-2xl bg-[#1C3224] hover:bg-[#254230] text-[#E0EFE4] font-semibold text-xs sm:text-sm border border-[#2F523B] transition-all active:scale-95 flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-[#86EFAC]" />
            <span>Dehradun Repair Lab</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-8 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-[#233C2C] text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Truck className="w-4 h-4 text-[#86EFAC] shrink-0" />
            <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">Delivery Across India</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-[#86EFAC] shrink-0" />
            <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">100% Genuine</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <CheckCircle className="w-4 h-4 text-[#86EFAC] shrink-0" />
            <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">32-Pt Inspected</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Star className="w-4 h-4 text-[#FACC15] shrink-0 fill-[#FACC15]" />
            <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">4.9★ Dehradun</span>
          </div>
        </div>
      </div>
    </section>
  );
};
