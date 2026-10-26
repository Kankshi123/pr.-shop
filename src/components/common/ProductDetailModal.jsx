import React, { useEffect } from 'react';
import { X, MessageCircle, Phone, Heart, Plus, ShoppingCart, Zap, ShieldCheck, BatteryCharging, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useActiveOffers } from '../../hooks/useActiveOffers';
import { SITE_CONFIG } from '../../config/site';
import { ProductImage } from './ProductImage';
import { CountdownTimer } from './CountdownTimer';
import { PRODUCTS_DATA } from '../../data/products';

export const ProductDetailModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    isInWishlist,
    toggleWishlist,
    addToCart,
    initiateBuyNow,
    getSingleProductWhatsAppUrl
  } = useStore();

  const { getProductPricing } = useActiveOffers();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const pricing = getProductPricing(product);
  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(((pricing.originalPrice - pricing.effectivePrice) / pricing.originalPrice) * 100);

  // Related products from same category or brand
  const relatedProducts = PRODUCTS_DATA
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E1710]/80 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card - Bottom Sheet on Mobile, Centered Card on Tablet/Desktop */}
      <div className="relative w-full max-w-4xl bg-[#14261B]/95 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#2D5039]/80 overflow-hidden z-10 max-h-[92dvh] sm:max-h-[90vh] my-0 sm:my-8 flex flex-col md:flex-row text-[#F3F8F4]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close details"
          className="absolute top-3.5 right-3.5 z-20 p-2 sm:p-2.5 rounded-full bg-[#0D1811] hover:bg-[#1C3624] text-slate-300 hover:text-white border border-[#2B4B35] transition-colors shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Visual Column - Off-white retail gallery style */}
        <div className="w-full md:w-1/2 bg-[#0D1811]/90 border-b md:border-b-0 md:border-r border-[#233F2B] p-4 sm:p-6 flex flex-col justify-between relative shrink-0">
          {/* Top badges */}
          <div className="flex items-center justify-between z-10 pr-10 md:pr-0">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#86EFAC] uppercase">
              {product.brand} ORIGINAL
            </span>
            {product.condition && (
              <span className="bg-[#1C3624] text-[#86EFAC] border border-[#2D5838] text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full">
                {product.condition}
              </span>
            )}
          </div>

          {/* Real Photo Canvas */}
          <div className="my-auto py-2 sm:py-4 flex items-center justify-center">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              className="h-40 sm:h-64 sm:h-72 w-full rounded-2xl"
            />
          </div>

          {/* Guarantee pill */}
          <div className="z-10 bg-[#14261B]/95 border border-[#2D5039]/80 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-md">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#86EFAC] shrink-0" />
            <div className="text-left text-xs">
              <p className="text-white font-semibold text-[11px] sm:text-xs">Store Verified & Inspected</p>
              <p className="text-[#A2BEA9] text-[10px] sm:text-[11px]">100% genuine guaranteed by Prateeksha Mobile</p>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col justify-between overflow-y-auto scroll-touch">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#86EFAC] uppercase tracking-wider">{product.category.replace('-', ' ')}</span>
              <span className="text-[#2B4B35]">•</span>
              <span className="text-xs text-emerald-400 font-medium">In Stock at G.M.S. Road</span>
            </div>

            <h2 className="text-2xl font-extrabold text-white font-heading leading-snug">
              {product.name}
            </h2>

            {/* Active Offer Countdown if live */}
            {pricing.hasDiscount && pricing.activeOffer && (
              <div className="mt-3 p-3 rounded-xl bg-[#1C3624]/90 border border-[#2E583A] text-white">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#86EFAC] flex items-center gap-1">
                    <span>⚡</span> {pricing.activeOffer.title}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">{pricing.discountText}</span>
                </div>
                <CountdownTimer offer={pricing.activeOffer} size="banner" />
              </div>
            )}

            {/* Pricing Section */}
            <div className="mt-4 pb-4 border-b border-[#233F2B]">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-white font-heading">
                  ₹{pricing.effectivePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-base text-slate-400 line-through">
                  ₹{pricing.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold bg-[#1A3123] text-[#86EFAC] border border-[#2B4B35] px-2 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              </div>
              <p className="text-xs text-[#86EFAC] font-semibold mt-1">
                You save ₹{(pricing.originalPrice - pricing.effectivePrice).toLocaleString('en-IN')} on this purchase
              </p>
            </div>

            {/* Pre-Owned Specifics */}
            {(product.condition || product.batteryHealth || product.warranty) && (
              <div className="py-3 border-b border-[#233F2B] grid grid-cols-2 gap-2 text-xs">
                {product.batteryHealth && (
                  <div className="p-2 rounded-lg bg-[#1A3123] border border-[#2B4B35] flex items-center gap-2 text-white">
                    <BatteryCharging className="w-4 h-4 text-[#86EFAC]" />
                    <span>Battery Health: <strong className="text-[#86EFAC]">{product.batteryHealth}</strong></span>
                  </div>
                )}
                {product.warranty && (
                  <div className="p-2 rounded-lg bg-[#1A3123] border border-[#2B4B35] flex items-center gap-2 col-span-2 text-white">
                    <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
                    <span>Warranty: <strong className="text-[#86EFAC]">{product.warranty}</strong></span>
                  </div>
                )}
              </div>
            )}

            {/* Specs List */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-heading">
                Key Specifications
              </h4>
              <ul className="space-y-1.5 text-xs text-[#C4D8C8]">
                {product.specs?.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#86EFAC]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Highlights */}
            <div className="mt-5 space-y-2 text-xs text-[#C4D8C8] bg-[#1A3123]/80 p-3 rounded-xl border border-[#2B4B35]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span><strong className="text-white">Delivery All Over India:</strong> Insured express courier with tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span><strong className="text-white">Dehradun Store:</strong> Walk-in demo & immediate pickup at G.M.S. Road</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#233F2B] space-y-2.5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            {/* Direct Buy Now Button */}
            <button
              onClick={() => {
                setQuickViewProduct(null);
                initiateBuyNow(product);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all text-center active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-slate-950" />
              <span>Buy Now (Select Payment Mode)</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => addToCart(product)}
                className="py-3 px-3 rounded-xl border border-[#2D5039] hover:border-[#4ADE80] bg-[#1A3123] hover:bg-[#223E2D] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-[#86EFAC]" />
                <span>Add to Shopping Cart</span>
              </button>

              <a
                href={getSingleProductWhatsAppUrl(product, pricing.activeOffer)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-[#1C3624] hover:bg-[#254630] text-[#E0EFE4] font-semibold text-xs border border-[#2F523B] flex items-center justify-center gap-2 shadow-md transition-all text-center active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex-1 py-2 px-3 rounded-lg bg-[#14261B] hover:bg-[#1A3123] text-[#A2BEA9] hover:text-white font-medium text-xs border border-[#233F2B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Store ({SITE_CONFIG.phoneDisplay})</span>
              </a>

              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle Wishlist"
                className={`p-2.5 rounded-lg border transition-colors active:scale-95 cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    : 'border-[#2D5039] bg-[#1A3123] hover:bg-[#223E2D] text-slate-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
