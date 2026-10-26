import React from 'react';
import { Heart, MessageCircle, Eye, Plus, ShoppingCart, Zap, Check, ShieldCheck, BatteryCharging } from 'lucide-react';
import { useActiveOffers } from '../../hooks/useActiveOffers';
import { useStore } from '../../context/StoreContext';
import { ProductImage } from './ProductImage';
import { CountdownTimer } from './CountdownTimer';

export const ProductCard = ({ product, viewMode = 'grid', dark = false }) => {
  const { getProductPricing } = useActiveOffers();
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    initiateBuyNow,
    setQuickViewProduct,
    getSingleProductWhatsAppUrl
  } = useStore();

  const pricing = getProductPricing(product);
  const isWishlisted = isInWishlist(product.id);

  // Calculate discount percentage
  const discountPercent = Math.round(((pricing.originalPrice - pricing.effectivePrice) / pricing.originalPrice) * 100);

  if (viewMode === 'list') {
    return (
      <div className={`group rounded-2xl border transition-all duration-300 p-4 flex flex-col sm:flex-row gap-5 relative overflow-hidden ${
        dark
          ? 'bg-[#132418]/85 hover:bg-[#182F20]/95 backdrop-blur-xl border-[#2B4B35]/70 hover:border-[#4ADE80]/60 hover:shadow-2xl text-[#F3F8F4]'
          : 'bg-white hover:bg-white border-slate-200/90 hover:border-[#274B32] hover:shadow-xl text-slate-900'
      }`}>
        {/* Device graphic */}
        <div
          className={`w-full sm:w-48 h-44 sm:h-auto rounded-xl overflow-hidden shrink-0 relative cursor-pointer border ${
            dark ? 'bg-[#0D1811]/70 border-[#203927]/60' : 'bg-[#F8FAF8] border-[#E3ECE5]'
          }`}
          onClick={() => setQuickViewProduct(product)}
        >
          <ProductImage src={product.image} alt={product.name} category={product.category} />
          {pricing.hasDiscount && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                {pricing.discountText || `${discountPercent}% OFF`}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${dark ? 'text-[#86EFAC]' : 'text-[#274B32]'}`}>
                {product.brand}
              </span>
              {product.condition && (
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border ${
                  dark ? 'text-[#86EFAC] bg-[#1C3625] border-[#2D543B]' : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }`}>
                  <ShieldCheck className="w-3 h-3" />
                  {product.condition}
                </span>
              )}
            </div>

            <h3
              onClick={() => setQuickViewProduct(product)}
              className={`text-lg font-bold transition-colors mt-1 font-heading cursor-pointer ${
                dark ? 'text-white group-hover:text-[#86EFAC]' : 'text-slate-900 group-hover:text-[#274B32]'
              }`}
            >
              {product.name}
            </h3>

            {/* Specs chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.specs?.slice(0, 4).map((spec, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${
                    dark ? 'bg-[#1C3625]/80 text-[#C5D8C9] border-[#2C4F37]' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Battery health if pre-owned */}
            {product.batteryHealth && (
              <div className={`flex items-center gap-1.5 text-xs mt-2 font-medium ${dark ? 'text-[#A2BEA9]' : 'text-slate-600'}`}>
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-500" />
                <span>Battery Health: <strong className={dark ? 'text-white' : 'text-slate-900'}>{product.batteryHealth}</strong></span>
              </div>
            )}

            {/* Countdown timer if offer is live */}
            {pricing.hasDiscount && pricing.activeOffer && (
              <div className="mt-3">
                <CountdownTimer offer={pricing.activeOffer} size="card" />
              </div>
            )}
          </div>

          {/* Pricing & Actions */}
          <div className={`flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t ${dark ? 'border-[#233F2B]/60' : 'border-slate-100'}`}>
            <div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-extrabold font-heading ${dark ? 'text-white' : 'text-slate-900'}`}>
                  ₹{pricing.effectivePrice.toLocaleString('en-IN')}
                </span>
                <span className={`text-sm line-through ${dark ? 'text-[#8FA895]' : 'text-slate-400'}`}>
                  ₹{pricing.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className={`text-xs font-bold ${dark ? 'text-[#86EFAC]' : 'text-emerald-600'}`}>
                  Save ₹{(pricing.originalPrice - pricing.effectivePrice).toLocaleString('en-IN')}
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 ${dark ? 'text-[#A2BEA9]' : 'text-slate-500'}`}>
                Delivery All Over India • Dehradun Store Pickup
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                    : dark
                      ? 'border-[#2B4B35] text-[#C5D8C9] hover:text-rose-400 bg-[#16271D]'
                      : 'border-slate-200 text-slate-500 hover:text-rose-500 hover:bg-slate-100 bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => addToCart(product)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all shadow-sm cursor-pointer ${
                  dark
                    ? 'bg-[#1C3625] hover:bg-[#254631] text-white border-[#2E543B]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                <ShoppingCart className={`w-3.5 h-3.5 ${dark ? 'text-[#86EFAC]' : 'text-[#274B32]'}`} />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => initiateBuyNow(product)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Buy Now</span>
              </button>

              <a
                href={getSingleProductWhatsAppUrl(product, pricing.activeOffer)}
                target="_blank"
                rel="noopener noreferrer"
                title="Enquire on WhatsApp"
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  dark
                    ? 'border-[#2B4B35] text-[#A2BEA9] hover:text-emerald-300 bg-[#142319]'
                    : 'border-slate-200 text-slate-600 hover:text-emerald-700 bg-white'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Standard rich card)
  return (
    <div className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
      dark
        ? 'bg-[#132418]/85 hover:bg-[#182F20]/95 backdrop-blur-xl border-[#2B4B35]/70 hover:border-[#4ADE80]/60 hover:shadow-2xl text-[#F3F8F4]'
        : 'bg-white hover:bg-white border-slate-200/90 hover:border-[#274B32] hover:shadow-xl text-slate-900'
    }`}>
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1 max-w-[70%]">
          {pricing.hasDiscount ? (
            <span className="bg-gradient-to-r from-rose-600 to-orange-500 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-md tracking-wide truncate">
              {pricing.discountText || `${discountPercent}% OFF`}
            </span>
          ) : product.badge ? (
            <span className={`text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm truncate border ${
              dark ? 'bg-[#122016]/90 text-[#86EFAC] border-[#2C4E37]' : 'bg-slate-900/90 text-white border-slate-800'
            }`}>
              {product.badge}
            </span>
          ) : null}

          {product.condition && (
            <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 self-start border ${
              dark ? 'bg-[#1C3625] text-[#86EFAC] border-[#2D543B]' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}>
              <span>✓</span> {product.condition}
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Wishlist"
          className={`pointer-events-auto p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm active:scale-90 cursor-pointer border ${
            isWishlisted
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              : dark
                ? 'bg-[#122016]/80 text-[#C5D8C9] hover:text-rose-400 hover:bg-[#1A3121] border-[#2B4B35]'
                : 'bg-white/80 text-slate-500 hover:text-rose-500 hover:bg-white border-slate-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Visual Product Canvas with Quick View Overlay */}
      <div
        className={`w-full h-52 relative cursor-pointer overflow-hidden border-b ${
          dark ? 'bg-[#0D1811]/70 border-[#203927]/60' : 'bg-[#F8FAF8] border-[#E3ECE5]'
        }`}
        onClick={() => setQuickViewProduct(product)}
      >
        <ProductImage src={product.image} alt={product.name} category={product.category} />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-[#0C160F]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-3.5 py-1.5 rounded-full bg-[#86EFAC] text-[#122016] text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Stock */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-semibold uppercase tracking-wider ${dark ? 'text-[#86EFAC]' : 'text-[#274B32]'}`}>
              {product.brand}
            </span>
            <span className={`text-[11px] font-medium flex items-center gap-1 ${dark ? 'text-[#4ADE80]' : 'text-emerald-600'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> In Stock
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className={`font-bold text-sm leading-snug line-clamp-2 transition-colors font-heading cursor-pointer ${
              dark ? 'text-white group-hover:text-[#86EFAC]' : 'text-slate-900 group-hover:text-[#274B32]'
            }`}
          >
            {product.name}
          </h3>

          {/* Specs Snippet */}
          {product.specs && (
            <p className={`text-[11px] line-clamp-1 mt-1 ${dark ? 'text-[#A2BEA9]' : 'text-slate-500'}`}>
              {product.specs.slice(0, 2).join(' • ')}
            </p>
          )}

          {/* Battery health if pre-owned */}
          {product.batteryHealth && (
            <div className={`flex items-center gap-1 text-[11px] mt-1 font-medium ${dark ? 'text-[#86EFAC]' : 'text-emerald-700'}`}>
              <BatteryCharging className="w-3 h-3 text-emerald-500" />
              <span>Battery: <strong>{product.batteryHealth}</strong></span>
            </div>
          )}

          {/* Countdown timer if offer is live */}
          {pricing.hasDiscount && pricing.activeOffer && (
            <div className="mt-2.5">
              <CountdownTimer offer={pricing.activeOffer} size="card" />
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className={`mt-3 pt-3 border-t ${dark ? 'border-[#233F2B]/60' : 'border-slate-100'}`}>
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-extrabold font-heading ${dark ? 'text-white' : 'text-slate-900'}`}>
                  ₹{pricing.effectivePrice.toLocaleString('en-IN')}
                </span>
                <span className={`text-xs line-through ${dark ? 'text-[#8FA895]' : 'text-slate-400'}`}>
                  ₹{pricing.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className={`text-[10px] font-semibold block ${dark ? 'text-[#86EFAC]' : 'text-emerald-600'}`}>
                Save ₹{(pricing.originalPrice - pricing.effectivePrice).toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => addToCart(product)}
              title="Add to Shopping Cart"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                dark
                  ? 'bg-[#1C3625] hover:bg-[#254631] text-[#A2BEA9] hover:text-[#86EFAC] border-[#2D5039]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 border-slate-200'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>
          </div>

          {/* Action Buttons: ⚡ Buy Now (Primary) & WhatsApp (Enquiry) */}
          <div className="grid grid-cols-5 gap-1.5">
            <button
              onClick={() => initiateBuyNow(product)}
              className="col-span-3 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>

            <a
              href={getSingleProductWhatsAppUrl(product, pricing.activeOffer)}
              target="_blank"
              rel="noopener noreferrer"
              title="Enquire on WhatsApp"
              className={`col-span-2 py-2 px-1 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all active:scale-95 cursor-pointer ${
                dark
                  ? 'bg-[#132418] hover:bg-[#1A3121] border-[#2B4B35] text-[#C5D8C9] hover:text-white'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px]">Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
