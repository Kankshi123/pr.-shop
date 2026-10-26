import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Wrench,
  Truck,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  Flame,
  Star,
  MapPin,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useActiveOffers } from '../../hooks/useActiveOffers';
import { CountdownTimer } from '../common/CountdownTimer';

export const Hero = () => {
  const { primaryOffer } = useActiveOffers();

  return (
    <section className="relative text-[#F3F8F4] pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs matching reference styling */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            {/* Tag matching screenshot: • YOUR NEIGHBOURHOOD TECH STORE, REIMAGINED */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A2E20] border border-[#2D4D36] text-[#A7F3D0] shadow-sm max-w-full">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span>
              </span>
              <span className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-[#86EFAC] truncate">
                YOUR NEIGHBOURHOOD TECH STORE, REIMAGINED
              </span>
            </div>

            {/* Main Editorial Serif Headline matching screenshot */}
            <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              Find your{' '}
              <span className="italic font-serif font-light text-[#E2ECE4]">
                next little upgrade.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-lg text-[#E0EDE2] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Official partner for latest Apple & Android smartphones, certified pre-owned gadgets & audio with{' '}
              <strong className="text-white font-semibold">Pan-India Insured Express Delivery</strong>, and certified{' '}
              <strong className="text-white font-semibold">In-Store Device Repair (Dehradun Exclusive)</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
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
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 border-t border-[#233C2C] text-left">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">Delivery Across India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">100% Genuine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">32-Pt Inspected</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FACC15] shrink-0 fill-[#FACC15]" />
                <span className="text-[11px] sm:text-xs text-[#C5D8C9] font-medium">4.9★ Dehradun</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Offer Showcase Card in Forest Glass Theme */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative gradient glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#295036] via-[#3E704D] to-[#1E3827] rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Card */}
              <div className="relative bg-[#14261B]/80 border border-[#2E543B]/80 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#243E2C]">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-[#264531] text-[#86EFAC]">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-[#86EFAC] tracking-wider uppercase">
                        Current Flash Offer
                      </span>
                      <h3 className="text-sm font-bold text-white font-heading">
                        {primaryOffer.badgeText || 'LIVE DISCOUNT'}
                      </h3>
                    </div>
                  </div>

                  <CountdownTimer offer={primaryOffer} size="banner" />
                </div>

                {/* Offer Body */}
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#D4E3D6] text-[#142318] shadow-sm">
                    {primaryOffer.discountText}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-editorial font-bold text-white leading-snug">
                    {primaryOffer.title}
                  </h4>
                  <p className="text-xs text-[#C5D8C9] leading-relaxed">
                    {primaryOffer.subtitle}
                  </p>
                </div>

                {/* Mini Editorial Tag Card matching screenshot */}
                <div className="p-3.5 rounded-2xl bg-[#122218]/80 border border-[#26422F] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#D97706] text-sm">✦</span>
                    <div>
                      <p className="text-xs font-serif italic text-white">your next little upgrade</p>
                      <p className="text-[10px] text-[#86EFAC]">Live price auto-applied at checkout</p>
                    </div>
                  </div>
                  <Link
                    to="/offers"
                    className="px-3 py-1.5 rounded-xl bg-[#274833] hover:bg-[#315A40] text-white text-xs font-bold transition-all shrink-0"
                  >
                    View Offer
                  </Link>
                </div>

                {/* Quick WhatsApp Link */}
                <a
                  href={SITE_CONFIG.createWhatsAppLink(`Hello! I saw your live offer "${primaryOffer.title}". Can you give me the best deal on WhatsApp?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-[#D4E3D6] hover:bg-[#E5F2E7] text-[#142318] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Claim Deal on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#142318]" />
                </a>

                <p className="text-[11px] text-center text-[#8FA895]">
                  ⚡ Updates dynamically based on time of day & weekend specials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
