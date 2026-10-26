import React from 'react';
import { X, Heart, Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductImage } from './ProductImage';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
    getSingleProductWhatsAppUrl
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full justify-end">
        <div className="w-full sm:w-screen max-w-md bg-[#14261B]/95 backdrop-blur-2xl border-l border-[#2D5039]/80 shadow-2xl flex flex-col justify-between text-[#F3F8F4]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#233F2B] flex items-center justify-between bg-[#0F1C14]/90">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-bold text-white font-heading">My Wishlist</h3>
                <p className="text-xs text-[#A2BEA9]">{wishlist.length} saved gadgets</p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1D3625] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scroll-touch">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-[#1A3123] border border-[#2B4B35] flex items-center justify-center mb-3">
                  <Heart className="w-8 h-8 text-[#86EFAC]" />
                </div>
                <h4 className="font-bold text-white font-heading">Your wishlist is empty</h4>
                <p className="text-xs text-[#C4D8C8] mt-1 max-w-xs leading-relaxed">
                  Save your favourite iPhones, MacBooks, accessories and pre-owned deals by tapping the heart icon.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-[#2B4B35] bg-[#1A3123]/90 hover:border-[#4ADE80]/60 transition-colors shadow-md"
                >
                  <div
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#0D1811] border border-[#2B4B35] shrink-0 cursor-pointer p-1 flex items-center justify-center"
                    onClick={() => {
                      setQuickViewProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  >
                    <ProductImage src={product.image} alt={product.name} category={product.category} />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[#86EFAC] uppercase">{product.brand}</span>
                        <button
                          onClick={() => toggleWishlist(product)}
                          title="Remove from wishlist"
                          className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4
                        className="text-xs font-bold text-white line-clamp-1 cursor-pointer hover:text-[#86EFAC] transition-colors"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsWishlistOpen(false);
                        }}
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs font-extrabold text-[#86EFAC] mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product);
                        }}
                        className="text-[11px] font-semibold text-[#86EFAC] hover:underline cursor-pointer"
                      >
                        Move to Enquiry
                      </button>
                      <span className="text-[#2B4B35]">•</span>
                      <a
                        href={getSingleProductWhatsAppUrl(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Ask Shop
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#233F2B] bg-[#0F1C14]/90 space-y-2 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
              <button
                onClick={() => {
                  wishlist.forEach((item) => addToCart(item));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#86EFAC] hover:bg-[#A7F3D0] text-[#122016] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95 cursor-pointer"
              >
                <span>Add All Items to Enquiry Cart</span>
                <ArrowRight className="w-4 h-4 text-[#122016]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
