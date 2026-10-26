import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Megaphone, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Copy, 
  Check, 
  Tag, 
  Clock, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { useActiveOffers } from '../../hooks/useActiveOffers';
import { CountdownTimer } from '../common/CountdownTimer';
import { SITE_CONFIG } from '../../config/site';

export const OfferBannerCarousel = () => {
  const { activeOffers } = useActiveOffers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  // Safety check if active offers are empty
  const offers = activeOffers.length > 0 ? activeOffers : [];

  useEffect(() => {
    if (offers.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [offers.length, isPaused]);

  if (offers.length === 0) return null;

  const current = offers[currentIndex % offers.length];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`relative rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-10 bg-gradient-to-r ${current.theme.gradient} text-white shadow-2xl border border-white/15 backdrop-blur-xl transition-all duration-700`}
        >
          {/* Background Ambient Glow & Patterns */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Top Ad Navigation Bar & Counter */}
          <div className="relative z-20 flex items-center justify-between pb-4 mb-4 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                SPONSORED AD
              </span>
              <span className="text-[11px] text-white/80 font-medium hidden sm:inline">
                Real-Time Running Discount Deal
              </span>
            </div>

            {offers.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Ad"
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-white/90">
                  Ad {currentIndex + 1} of {offers.length}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next Ad"
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Offer Content */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#86EFAC] text-[#0C160F] shadow-md font-heading">
                  {current.badgeText || '⚡ LIMITED TIME OFFER'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-black/50 text-white border border-white/20">
                  {current.discountText}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight leading-tight text-white drop-shadow-md">
                {current.title}
              </h3>

              <p className="text-xs sm:text-base text-white/90 leading-relaxed font-medium">
                {current.subtitle}
              </p>

              {/* Live Countdown & Scope */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] sm:text-xs text-white/80 font-medium">Expires in:</span>
                  <CountdownTimer offer={current} size="banner" />
                </div>

                {/* Coupon Code Chip */}
                {current.couponCode && (
                  <button
                    onClick={() => handleCopyCode(current.couponCode)}
                    className="inline-flex items-center gap-1.5 bg-[#142A1C]/90 hover:bg-[#1E3F2A] px-3 py-1.5 rounded-xl border border-[#3E704C] text-xs font-mono font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                    title="Click to copy coupon code"
                  >
                    <Tag className="w-3.5 h-3.5 text-[#86EFAC]" />
                    <span>CODE: <strong className="text-white">{current.couponCode}</strong></span>
                    {copiedCode === current.couponCode ? (
                      <span className="text-[#86EFAC] text-[10px] font-sans flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      <Copy className="w-3 h-3 text-slate-300 ml-0.5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href={SITE_CONFIG.createWhatsAppLink(`Hello! I saw your website Ad for "${current.title}" (${current.discountText}) with Coupon Code: ${current.couponCode || 'ACTIVE'}. Please share offer details!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-[#4ADE80] hover:bg-[#86EFAC] text-[#0C160F] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
              >
                <span>Claim Ad on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/products"
                className="px-6 py-3.5 rounded-2xl bg-black/40 hover:bg-black/60 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Browse Products</span>
              </Link>
            </div>
          </div>

          {/* Carousel Indicator Dots */}
          {offers.length > 1 && (
            <div className="relative z-10 flex items-center gap-1.5 mt-6 pt-4 border-t border-white/10">
              {offers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'w-8 bg-[#86EFAC]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to ad ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
