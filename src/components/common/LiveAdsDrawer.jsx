import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Megaphone, 
  Flame, 
  Sparkles, 
  Clock, 
  Zap, 
  Sunrise, 
  Gift, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useActiveOffers, SIMULATION_MODES } from '../../hooks/useActiveOffers';
import { CountdownTimer } from './CountdownTimer';
import { SITE_CONFIG } from '../../config/site';

export const LiveAdsDrawer = ({ isOpen, onClose, onOpen }) => {
  const { activeOffers, simulationMode, setSimulationMode } = useActiveOffers();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const simulationOptions = [
    { mode: SIMULATION_MODES.REAL, label: 'Real Clock', icon: Clock },
    { mode: SIMULATION_MODES.MORNING, label: '🌅 Morning Deal', icon: Sunrise },
    { mode: SIMULATION_MODES.EVENING, label: '⚡ Evening Flash', icon: Zap },
    { mode: SIMULATION_MODES.WEEKEND, label: '🎉 Weekend Deal', icon: Sparkles },
    { mode: SIMULATION_MODES.FESTIVE, label: '🪔 Festive Sale', icon: Gift },
  ];

  return (
    <>
      {/* Floating Ad Trigger Pill (When Drawer is closed) */}
      {!isOpen && (
        <aside aria-label="Live discount advertisements">
          <button
            onClick={onOpen}
            aria-label="View real-time discount advertisements"
            className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-3 sm:bottom-6 sm:right-24 z-40 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#17301F] via-[#22482E] to-[#17301F] text-white text-xs font-bold shadow-2xl border border-[#3E744F] backdrop-blur-xl flex items-center gap-2 group hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(74,222,128,0.3)] animate-pulse"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-ping" />
            <span className="p-1 rounded-full bg-[#346342] text-amber-300">
              <Megaphone className="w-3.5 h-3.5" />
            </span>
            <span className="font-extrabold tracking-wide uppercase font-heading text-amber-300">
              AD
            </span>
            <span className="hidden min-[380px]:inline text-white font-medium">
              Live Deals
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#4ADE80] text-[#0C160F] font-black text-[10px] font-mono">
              {activeOffers.length} Active
            </span>
          </button>
        </aside>
      )}

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-in Drawer Container */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-lg bg-[#0C160F] text-white z-50 shadow-2xl border-l border-[#24422D] flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#213A28] bg-[#122217] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-[#3E744F] text-[#86EFAC]">
              <Megaphone className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg font-heading text-white">
                  Real-Time Discount Ads
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#21422B] text-[#86EFAC] border border-[#386B47]">
                  {activeOffers.length} Live
                </span>
              </div>
              <p className="text-[11px] text-[#A2BEAA]">
                Promotional deals running right now on the website
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close ads drawer"
            className="p-2 rounded-xl bg-[#1A3122] hover:bg-[#254631] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Simulation Switcher Strip */}
        <div className="bg-[#15271A] px-4 py-2.5 border-b border-[#24422D] shrink-0">
          <div className="flex items-center justify-between text-[11px] text-[#A2BEAA] mb-1.5">
            <span className="font-bold text-[#86EFAC] uppercase tracking-wider font-heading flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Test Live Ad Triggers
            </span>
            <span>Current: <strong className="text-white uppercase font-mono">{simulationMode}</strong></span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {simulationOptions.map((opt) => {
              const isSelected = simulationMode === opt.mode;
              return (
                <button
                  key={opt.mode}
                  onClick={() => setSimulationMode(opt.mode)}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-bold text-center transition-all cursor-pointer truncate ${
                    isSelected
                      ? 'bg-[#4ADE80] text-[#0C160F] shadow-md font-black'
                      : 'bg-[#1C3624] hover:bg-[#264A31] text-[#C4D8C8]'
                  }`}
                  title={opt.label}
                >
                  {opt.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Ads List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {activeOffers.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No special promotional ads active right now.</p>
            </div>
          ) : (
            activeOffers.map((ad, index) => (
              <div
                key={ad.id}
                className={`rounded-2xl p-5 bg-gradient-to-br ${ad.theme.gradient} border border-white/15 shadow-xl relative overflow-hidden transition-all hover:border-[#86EFAC]/50`}
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                {/* Ad Header Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      SPONSORED AD
                    </span>
                    <span className="text-[10px] text-white/80 font-mono font-bold">
                      #{index + 1}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-black/40 text-[#86EFAC] border border-white/20">
                    {ad.discountText}
                  </span>
                </div>

                {/* Ad Content */}
                <h4 className="text-base sm:text-lg font-bold font-heading text-white leading-snug mb-1">
                  {ad.title}
                </h4>
                <p className="text-xs text-[#C8DCCB] leading-relaxed mb-4">
                  {ad.subtitle}
                </p>

                {/* Live Countdown Clock */}
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs mb-4">
                  <span className="text-[11px] text-white/80 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    Offer Ends In:
                  </span>
                  <CountdownTimer offer={ad} size="banner" />
                </div>

                {/* Coupon Code Block */}
                {ad.couponCode && (
                  <div className="mb-4 p-2.5 rounded-xl bg-[#14291B]/80 border border-[#2F583B] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#86EFAC]" />
                      <span className="text-[11px] text-[#A2BEAA]">Promo Code:</span>
                      <span className="font-mono font-extrabold text-sm text-white tracking-wider">
                        {ad.couponCode}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyCode(ad.couponCode)}
                      className="px-2.5 py-1 rounded-lg bg-[#24472F] hover:bg-[#315E3F] text-white text-[11px] font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedCode === ad.couponCode ? (
                        <>
                          <Check className="w-3 h-3 text-[#4ADE80]" />
                          <span className="text-[#4ADE80]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-300" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={SITE_CONFIG.createWhatsAppLink(`Hello Prateeksha Mobile Gallery! I saw your live Ad for "${ad.title}" (${ad.discountText}) on your website. Coupon Code: ${ad.couponCode || 'ACTIVE'}. I want to claim this discount!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#4ADE80] hover:bg-[#86EFAC] text-[#0C160F] text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer"
                  >
                    <span>Claim on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    to="/products"
                    onClick={onClose}
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Shop Items</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Policy Guarantee */}
        <div className="p-4 border-t border-[#213A28] bg-[#0E1A12] text-center text-[11px] text-[#8DA693] shrink-0">
          <p className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
            <span>All real-time discounts verified with genuine GST store billing.</span>
          </p>
        </div>
      </div>
    </>
  );
};
