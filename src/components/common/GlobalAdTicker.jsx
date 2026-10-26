import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Megaphone, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Flame 
} from 'lucide-react';
import { useActiveOffers } from '../../hooks/useActiveOffers';
import { CountdownTimer } from './CountdownTimer';
import { SITE_CONFIG } from '../../config/site';

export const GlobalAdTicker = ({ onOpenAdsDrawer }) => {
  const { activeOffers, primaryOffer } = useActiveOffers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const ads = activeOffers && activeOffers.length > 0 ? activeOffers : (primaryOffer ? [primaryOffer] : []);

  useEffect(() => {
    if (ads.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [ads.length, isPaused]);

  if (ads.length === 0) return null;

  const currentAd = ads[currentIndex % ads.length];

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-[#0B150E] text-[#D1E2D4] text-xs border-b border-[#213526] relative z-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
        
        {/* Left: Ad Label + Content */}
        <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
          {/* Ad Badge Pill */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-[#86EFAC] border border-[#3A6B48] shrink-0 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-amber-300 font-black">AD</span>
            <span className="text-[#86EFAC] hidden sm:inline">• LIVE DEAL</span>
            {ads.length > 1 && (
              <span className="text-[#86EFAC]/80 font-mono text-[9px] hidden md:inline">
                ({currentIndex + 1}/{ads.length})
              </span>
            )}
          </span>

          {/* Discount Pill */}
          <span className="hidden min-[480px]:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#183120] text-white border border-[#2D5438] shrink-0">
            {currentAd.discountText}
          </span>

          {/* Scrolling/Transitioning Text */}
          <div className="truncate flex items-center gap-2">
            <span className="font-bold text-white truncate">
              {currentAd.adHeadline || currentAd.title}
            </span>
            <span className="text-[#9DBBA2] hidden lg:inline truncate">
              — {currentAd.subtitle}
            </span>
          </div>
        </div>

        {/* Right: Coupon Code + Timer + Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Coupon Code Pill with Copy */}
          {currentAd.couponCode && (
            <button
              onClick={(e) => handleCopyCode(currentAd.couponCode, e)}
              title="Click to copy coupon code"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#182C1E] hover:bg-[#223F2B] border border-[#2E583A] text-white text-[10px] sm:text-[11px] font-mono font-bold transition-all cursor-pointer active:scale-95"
            >
              <span className="text-[#86EFAC]">Code:</span>
              <span>{currentAd.couponCode}</span>
              {copiedCode === currentAd.couponCode ? (
                <Check className="w-3 h-3 text-[#4ADE80]" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>
          )}

          {/* Countdown timer */}
          <div className="hidden sm:block">
            <CountdownTimer offer={currentAd} size="banner" />
          </div>

          {/* WhatsApp Claim Ad Button */}
          <a
            href={SITE_CONFIG.createWhatsAppLink(`Hello Prateeksha Mobile Gallery! I saw your live Ad for "${currentAd.title}" (${currentAd.discountText}) on your website. Coupon Code: ${currentAd.couponCode || 'LIVE'}. I would like to claim this offer!`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#4ADE80] hover:bg-[#86EFAC] text-[#0C160F] text-[10px] sm:text-[11px] font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Claim Ad</span>
            <ArrowRight className="w-3 h-3" />
          </a>

          {/* View All Ads Trigger */}
          {onOpenAdsDrawer && (
            <button
              onClick={onOpenAdsDrawer}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#86EFAC] hover:text-white px-2 py-1 rounded-lg hover:bg-[#1C3624] transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">All Ads</span>
              <span className="sm:hidden font-mono text-[10px]">({ads.length})</span>
            </button>
          )}

          {/* Navigation Arrows for Ad Cycle */}
          {ads.length > 1 && (
            <div className="hidden min-[420px]:flex items-center gap-0.5 ml-1">
              <button
                onClick={handlePrev}
                aria-label="Previous Ad"
                className="p-1 rounded hover:bg-[#1A3120] text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Ad"
                className="p-1 rounded hover:bg-[#1A3120] text-slate-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
