import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Truck 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductImage } from './ProductImage';
import { SITE_CONFIG } from '../../config/site';

export const EnquiryCartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    generateCartWhatsAppUrl,
    initiateCartCheckout
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [enquiryNotes, setEnquiryNotes] = useState('');

  if (!isCartOpen) return null;

  const totalEstimate = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleWhatsAppSend = () => {
    let noteString = '';
    if (customerAddress) noteString += `Delivery Address: ${customerAddress}. `;
    if (enquiryNotes) noteString += enquiryNotes;

    const url = generateCartWhatsAppUrl(customerName, noteString);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full justify-end">
        <div className="w-full sm:w-screen max-w-md bg-[#14261B]/95 backdrop-blur-2xl border-l border-[#2D5039]/80 shadow-2xl flex flex-col justify-between text-[#F3F8F4]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#233F2B] flex items-center justify-between bg-[#0F1C14]/90">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#1C3624] text-[#86EFAC] border border-[#2B4B35]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white font-heading">Shopping Cart & Checkout</h3>
                <p className="text-xs text-[#A2BEA9]">{cart.length} items in your cart</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1D3625] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scroll-touch">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-[#1A3123] border border-[#2B4B35] flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-[#86EFAC]" />
                </div>
                <h4 className="font-bold text-white font-heading">No items in your enquiry list</h4>
                <p className="text-xs text-[#C4D8C8] mt-1 max-w-xs leading-relaxed">
                  Browse phones, laptops, and accessories and click &ldquo;Add to Enquiry&rdquo; to send a combined price quote request directly to the store on WhatsApp.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-[#A2BEA9] pb-2 border-b border-[#233F2B]">
                  <span>Selected Products</span>
                  <button onClick={clearCart} className="text-rose-400 hover:text-rose-300 hover:underline cursor-pointer">
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-2xl border border-[#2B4B35] bg-[#1A3123]/90 shadow-md"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0D1811] border border-[#2B4B35] shrink-0 p-1 flex items-center justify-center">
                        <ProductImage src={item.image} alt={item.name} category={item.category} />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-semibold text-[#86EFAC] uppercase">{item.brand}</span>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-400 transition-colors ml-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-extrabold text-[#86EFAC]">
                            ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center border border-[#2D5039] bg-[#0D1811] rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="p-1 hover:bg-[#1C3624] text-slate-300 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-white">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="p-1 hover:bg-[#1C3624] text-slate-300 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="pt-4 border-t border-[#233F2B] space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                    Your Contact Details (Optional)
                  </h4>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name (e.g. Rahul Sharma)"
                    className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] bg-[#0D1811] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                  />
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="City / Area (e.g. GMS Road, Dehradun)"
                    className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] bg-[#0D1811] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                  />
                  <textarea
                    value={enquiryNotes}
                    onChange={(e) => setEnquiryNotes(e.target.value)}
                    rows={2}
                    placeholder="Special requests, exchange phone details, or questions..."
                    className="w-full text-base sm:text-xs px-3.5 py-2 rounded-xl border border-[#2D5039] bg-[#0D1811] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer with Direct Buy / Checkout CTA and WhatsApp Enquiry CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#233F2B] bg-[#0F1C14]/90 space-y-3 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A2BEA9]">Total Cart Value:</span>
                <span className="text-lg font-extrabold text-white font-heading">
                  ₹{totalEstimate.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Primary: Proceed to Direct Buy (Mode of Payment) */}
              <button
                onClick={initiateCartCheckout}
                className="w-full py-3.5 rounded-2xl bg-[#4ADE80] hover:bg-[#86EFAC] text-[#0C160F] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/40 transition-all cursor-pointer active:scale-95"
              >
                <CreditCard className="w-4 h-4" />
                <span>Proceed to Buy (Select Payment Mode)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary: Send combined enquiry on WhatsApp */}
              <button
                onClick={handleWhatsAppSend}
                className="w-full py-2.5 rounded-xl bg-[#1C3624] hover:bg-[#254631] text-[#E0EFE4] font-semibold text-xs border border-[#2F523B] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#86EFAC]" />
                <span>Ask Questions on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#A2BEA9]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#86EFAC]" />
                <span>UPI, Cards, NetBanking, COD & Store Pickup Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
