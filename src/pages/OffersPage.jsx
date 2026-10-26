import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Clock, 
  Zap, 
  Sunrise, 
  Sparkles, 
  Gift, 
  Truck, 
  ArrowRight, 
  ShieldCheck,
  Megaphone,
  Copy,
  Check,
  Tag,
  ExternalLink
} from 'lucide-react';
import { useActiveOffers, SIMULATION_MODES } from '../hooks/useActiveOffers';
import { OFFERS_DATA } from '../data/offers';
import { CountdownTimer } from '../components/common/CountdownTimer';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { SITE_CONFIG } from '../config/site';

export const OffersPage = () => {
  const { activeOffers, simulationMode, setSimulationMode } = useActiveOffers();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const simulationButtons = [
    { mode: SIMULATION_MODES.REAL, label: 'Actual System Time', icon: Clock },
    { mode: SIMULATION_MODES.MORNING, label: '🌅 Morning Deal (10:30 AM)', icon: Sunrise },
    { mode: SIMULATION_MODES.EVENING, label: '⚡ Evening Flash (7:30 PM)', icon: Zap },
    { mode: SIMULATION_MODES.WEEKEND, label: '🎉 Weekend Special (Sat 4 PM)', icon: Sparkles },
    { mode: SIMULATION_MODES.FESTIVE, label: '🪔 Festive Dhamaka', icon: Gift },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-28 lg:pb-20 text-slate-900">
      {/* Top Banner with Boutique Showroom Background Image */}
      <div className="relative text-white py-14 sm:py-18 px-4 border-b border-[#233527] overflow-hidden bg-[#0C160F]">
        {/* Background Showroom Image - High Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Showroom Background"
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.05] saturate-[1.15] scale-105"
          />
          {/* Balanced soft atmospheric overlay for maximum image visibility */}
          <div className="absolute inset-0 bg-[#0C160F]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C160F]/65 via-[#0C160F]/30 to-[#0C160F]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C160F]/40 via-transparent to-[#0C160F]/65" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4ADE80]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3624]/90 text-[#86EFAC] border border-[#2E583A] text-xs font-bold backdrop-blur-md">
            <Flame className="w-4 h-4 text-[#86EFAC]" />
            <span>Time-Synchronized Offer Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Live Offers &{' '}
            <span className="italic font-serif font-light text-[#86EFAC]">
              Curated Flash Deals
            </span>
          </h1>

          <p className="text-[#C4D8C8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Our dynamic offer system automatically triggers morning early-bird deals, evening flash discounts, and festive specials without reloading.
          </p>

          {/* Time Warp Simulation Panel */}
          <div className="pt-4 sm:pt-6 max-w-3xl mx-auto">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#14261B]/85 border border-[#2B4B35]/80 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 text-xs text-[#C5D8C9]">
                <span className="font-bold uppercase tracking-wider text-[#86EFAC] font-heading text-left">
                  Demo Time Simulation (Pitch Mode)
                </span>
                <span className="text-[#A2BEA9] text-left sm:text-right">
                  Active: <strong className="text-[#86EFAC] uppercase">{simulationMode}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 min-[460px]:grid-cols-3 sm:grid-cols-5 gap-2">
                {simulationButtons.map((btn) => {
                  const isSelected = simulationMode === btn.mode;
                  return (
                    <button
                      key={btn.mode}
                      onClick={() => setSimulationMode(btn.mode)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'bg-[#4ADE80] text-[#122016] shadow-lg font-extrabold border border-white/20'
                          : 'bg-[#182C1E]/90 hover:bg-[#223E2A] text-[#C4D8C8] border border-[#2B4B35]'
                      }`}
                    >
                      <span>{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Active Promos Strip */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                Currently Live Promotions ({activeOffers.length})
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                These offers are currently active and modifying store catalog prices in real-time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOffers.map((offer, index) => (
              <div
                key={offer.id}
                className={`rounded-3xl p-6 bg-gradient-to-br ${offer.theme.gradient} text-white shadow-xl flex flex-col justify-between relative overflow-hidden border border-white/20 hover:border-[#86EFAC]/50 transition-all`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

                <div>
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

                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-black/45 border border-white/25 text-[#86EFAC]">
                      {offer.discountText}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold font-heading mb-1.5">{offer.title}</h3>
                  <p className="text-xs text-white/90 leading-relaxed font-medium mb-4">
                    {offer.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20 space-y-3">
                  <div className="flex items-center justify-between text-xs bg-black/35 p-2 rounded-xl border border-white/10">
                    <span className="text-white/90 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      Expires in:
                    </span>
                    <CountdownTimer offer={offer} size="banner" />
                  </div>

                  {/* Coupon Code Block */}
                  {offer.couponCode && (
                    <div className="p-2 rounded-xl bg-black/40 border border-white/15 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#86EFAC]" />
                        <span className="text-[11px] text-[#A2BEAA]">Code:</span>
                        <span className="font-mono font-bold text-xs text-white">
                          {offer.couponCode}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(offer.couponCode)}
                        className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                      >
                        {copiedCode === offer.couponCode ? (
                          <>
                            <Check className="w-3 h-3 text-[#4ADE80]" />
                            <span className="text-[#4ADE80]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-200" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={SITE_CONFIG.createWhatsAppLink(`Hello! I saw your Ad for "${offer.title}" (${offer.discountText}) with Coupon Code: ${offer.couponCode || 'LIVE'}. I would like to claim this offer!`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#4ADE80] hover:bg-[#86EFAC] text-[#0C160F] text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Claim Ad</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      to="/products"
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-white/20"
                    >
                      <span>Shop Items</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Available Offers Master List */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 text-slate-900">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Complete Offer Schedule & Timings
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              How Prateeksha Mobile Gallery rewards customers at different times of day and week:
            </p>
          </div>

          <div className="space-y-4">
            {OFFERS_DATA.map((item) => {
              const isLive = activeOffers.some((a) => a.id === item.id);
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isLive ? 'border-emerald-400 bg-emerald-50/50 shadow-sm' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-heading">{item.title}</span>
                      {isLive ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white animate-pulse">
                          LIVE RIGHT NOW
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                          SCHEDULED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{item.subtitle}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      Trigger rule: {item.timeWindow ? `Daily ${item.timeWindow}` : item.daysOfWeek ? 'Weekends (Sat-Sun)' : 'Ongoing Promotion'}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold px-3 py-1 rounded-xl bg-white text-emerald-800 border border-slate-200 shadow-xs">
                      {item.discountText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
