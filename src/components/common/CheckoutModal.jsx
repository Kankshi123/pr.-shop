import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  Banknote, 
  Store, 
  Copy, 
  Check, 
  ArrowRight, 
  Smartphone, 
  MessageCircle, 
  Lock, 
  PackageCheck,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useActiveOffers } from '../../hooks/useActiveOffers';
import { SITE_CONFIG } from '../../config/site';
import { ProductImage } from './ProductImage';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    checkoutProduct, 
    cart, 
    clearCart,
    showToast 
  } = useStore();
  const { getProductPricing, primaryOffer } = useActiveOffers();

  // Step state: 'checkout' | 'success'
  const [step, setStep] = useState('checkout');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Customer Form state
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dehradun',
    state: 'Uttarakhand',
    pincode: '248001',
    deliveryType: 'delivery', // 'delivery' | 'pickup'
  });

  // Payment Mode: 'upi' | 'card' | 'netbanking' | 'cod' | 'store'
  const [paymentMode, setPaymentMode] = useState('upi');
  
  // Card Details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // UPI Details state
  const [upiRef, setUpiRef] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Placed order receipt data
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  // Determine items to checkout
  const items = checkoutProduct 
    ? [checkoutProduct] 
    : cart;

  if (items.length === 0 && step !== 'success') {
    setIsCheckoutOpen(false);
    return null;
  }

  // Calculate totals with active real-time offers applied
  let subtotal = 0;
  let totalDiscount = 0;

  const enrichedItems = items.map((item) => {
    const pricing = getProductPricing(item);
    const qty = item.quantity || 1;
    const itemTotal = pricing.effectivePrice * qty;
    const originalTotal = pricing.originalPrice * qty;
    subtotal += originalTotal;
    totalDiscount += (originalTotal - itemTotal);
    return {
      ...item,
      effectivePrice: pricing.effectivePrice,
      originalPrice: pricing.originalPrice,
      itemTotal,
      pricing
    };
  });

  const finalPayable = subtotal - totalDiscount;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('prateekshamobile@okaxis');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim()) {
      showToast('Please enter your Name and Mobile Number', 'error');
      return;
    }
    if (customer.deliveryType === 'delivery' && (!customer.address.trim() || !customer.pincode.trim())) {
      showToast('Please enter your complete delivery address and PIN code', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `PMG-${Date.now().toString().slice(-6)}`;
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        customer,
        paymentMode,
        items: enrichedItems,
        subtotal,
        totalDiscount,
        finalPayable,
        upiRef: paymentMode === 'upi' ? upiRef : null,
      };

      setPlacedOrder(orderData);
      setIsSubmitting(false);
      setStep('success');

      // If checking out cart, clear cart
      if (!checkoutProduct) {
        clearCart();
      }

      showToast(`Order #${orderId} Placed Successfully! 🎉`, 'success');
    }, 1200);
  };

  // WhatsApp order receipt sender
  const handleSendWhatsAppOrder = () => {
    if (!placedOrder) return;

    let text = `*New Order Confirmed! - ${SITE_CONFIG.name}*\n`;
    text += `*Order ID:* #${placedOrder.orderId}\n`;
    text += `*Date:* ${placedOrder.date}\n\n`;
    text += `*Customer Details:*\n`;
    text += `• Name: ${placedOrder.customer.name}\n`;
    text += `• Phone: +91 ${placedOrder.customer.phone}\n`;
    if (placedOrder.customer.deliveryType === 'pickup') {
      text += `• Mode: *Store Pickup at G.M.S. Road Showroom (Dehradun)*\n`;
    } else {
      text += `• Address: ${placedOrder.customer.address}, ${placedOrder.customer.city}, ${placedOrder.customer.state} - ${placedOrder.customer.pincode}\n`;
    }
    text += `• Payment Mode: *${placedOrder.paymentMode.toUpperCase()}*\n`;
    if (placedOrder.upiRef) {
      text += `• UPI UTR Ref: ${placedOrder.upiRef}\n`;
    }

    text += `\n*Items Ordered (${placedOrder.items.length}):*\n`;
    placedOrder.items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}* (Qty: ${item.quantity || 1}) - ₹${item.itemTotal.toLocaleString('en-IN')}\n`;
    });

    text += `\n*Total Paid/Payable:* ₹${placedOrder.finalPayable.toLocaleString('en-IN')}\n`;
    text += `\nPlease confirm order packaging and dispatch timeline. Thank you!`;

    window.open(SITE_CONFIG.createWhatsAppLink(text), '_blank');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('checkout');
    setPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="min-h-screen px-3 sm:px-4 py-6 sm:py-10 flex items-center justify-center">
        <div className="relative w-full max-w-2xl bg-[#0D1811] text-white rounded-3xl shadow-2xl border border-[#2D5039]/90 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#213828] bg-[#122217] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#1C3624] text-[#86EFAC] border border-[#2B4B35]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl font-heading text-white">
                  {step === 'checkout' ? 'Direct Purchase & Checkout' : 'Order Placed Successfully!'}
                </h3>
                <p className="text-xs text-[#A2BEAA]">
                  {step === 'checkout' 
                    ? '100% Genuine Gadgets • Pan-India Delivery • Store Warranty' 
                    : `Order ID: #${placedOrder?.orderId}`}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              aria-label="Close checkout"
              className="p-2 rounded-xl bg-[#1A3122] hover:bg-[#254631] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'checkout' ? (
            <form onSubmit={handlePlaceOrder}>
              <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto scroll-touch">
                
                {/* 1. Item Summary Preview */}
                <div className="rounded-2xl bg-[#132419] p-4 border border-[#24422D] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#86EFAC]">
                    <span>Items to Buy ({items.length})</span>
                    <span>Free Insured Delivery</span>
                  </div>

                  <div className="divide-y divide-[#1D3524] space-y-2.5">
                    {enrichedItems.map((item) => (
                      <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-[#09130D] border border-[#25442E] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                            <ProductImage src={item.image} alt={item.name} category={item.category} />
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                            <p className="text-[11px] text-[#A2BEAA]">
                              Qty: {item.quantity || 1} • {item.brand}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-extrabold text-[#86EFAC]">
                            ₹{item.itemTotal.toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice > item.effectivePrice && (
                            <span className="block text-[10px] text-slate-400 line-through">
                              ₹{(item.originalPrice * (item.quantity || 1)).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown pill */}
                  <div className="pt-3 border-t border-[#233F2B] flex items-center justify-between text-xs">
                    <span className="text-[#A2BEAA]">Total Payable Amount:</span>
                    <div className="text-right">
                      <span className="text-lg font-black text-white font-heading">
                        ₹{finalPayable.toLocaleString('en-IN')}
                      </span>
                      {totalDiscount > 0 && (
                        <span className="text-[11px] text-[#4ADE80] block font-semibold">
                          You save ₹{totalDiscount.toLocaleString('en-IN')} today!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Delivery / Pickup Preferences */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#86EFAC]" />
                    Delivery Option
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setCustomer({ ...customer, deliveryType: 'delivery' })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        customer.deliveryType === 'delivery'
                          ? 'bg-[#1C3624] border-[#4ADE80] text-white shadow-md'
                          : 'bg-[#122217] border-[#25422D] text-[#A2BEAA] hover:border-[#386B47]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">🚚 Pan-India Delivery</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#274E33] text-[#86EFAC] font-bold">
                          FREE
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C4D8C8]">
                        Insured express shipping to any pincode in India (2-4 days)
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCustomer({ ...customer, deliveryType: 'pickup' })}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        customer.deliveryType === 'pickup'
                          ? 'bg-[#1C3624] border-[#4ADE80] text-white shadow-md'
                          : 'bg-[#122217] border-[#25422D] text-[#A2BEAA] hover:border-[#386B47]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">🏬 Store Pickup</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#274E33] text-[#86EFAC] font-bold">
                          SAME-DAY
                        </span>
                      </div>
                      <p className="text-[11px] text-[#C4D8C8]">
                        Collect from G.M.S. Road, Dehradun store immediately
                      </p>
                    </button>
                  </div>
                </div>

                {/* 3. Customer & Shipping Details Form */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#86EFAC]" />
                    {customer.deliveryType === 'delivery' ? 'Delivery Address' : 'Customer Contact Details'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#A2BEAA] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#122217] border border-[#25422D] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A2BEAA] mb-1">Mobile Number (for Order Updates) *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#25422D] bg-[#16291C] text-xs text-[#A2BEAA]">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value.replace(/\D/g, '') })}
                          placeholder="98765 43210"
                          className="w-full text-xs px-3 py-2.5 rounded-r-xl bg-[#122217] border border-[#25422D] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                        />
                      </div>
                    </div>

                    {customer.deliveryType === 'delivery' && (
                      <>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] text-[#A2BEAA] mb-1">Street Address, House/Flat No., Landmark *</label>
                          <input
                            type="text"
                            required
                            value={customer.address}
                            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                            placeholder="e.g. Flat 302, Green View Apts, Ballupur Road"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#122217] border border-[#25422D] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-[#A2BEAA] mb-1">City / District *</label>
                          <input
                            type="text"
                            required
                            value={customer.city}
                            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                            placeholder="Dehradun"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#122217] border border-[#25422D] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] text-[#A2BEAA] mb-1">State *</label>
                            <input
                              type="text"
                              required
                              value={customer.state}
                              onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                              placeholder="Uttarakhand"
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#122217] border border-[#25422D] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-[#A2BEAA] mb-1">PIN Code *</label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              value={customer.pincode}
                              onChange={(e) => setCustomer({ ...customer, pincode: e.target.value.replace(/\D/g, '') })}
                              placeholder="248001"
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#122217] border border-[#25422D] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 4. MODE OF PAYMENT SELECTION */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#86EFAC]" />
                      Select Mode of Payment
                    </h4>
                    <span className="text-[11px] text-[#86EFAC] font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> 256-Bit Encrypted
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* Mode: UPI */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode('upi')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === 'upi'
                          ? 'bg-[#1C3624] border-[#4ADE80] text-white shadow-md'
                          : 'bg-[#122217] border-[#25422D] text-[#A2BEAA] hover:border-[#386B47]'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-[#86EFAC]" />
                      <span className="text-xs font-bold">UPI / GPay</span>
                      <span className="text-[9px] text-[#86EFAC] font-mono">0% Fee • Instant</span>
                    </button>

                    {/* Mode: Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode('card')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === 'card'
                          ? 'bg-[#1C3624] border-[#4ADE80] text-white shadow-md'
                          : 'bg-[#122217] border-[#25422D] text-[#A2BEAA] hover:border-[#386B47]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#86EFAC]" />
                      <span className="text-xs font-bold">Debit / Card</span>
                      <span className="text-[9px] text-slate-400 font-mono">Visa / Master</span>
                    </button>

                    {/* Mode: Net Banking */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode('netbanking')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === 'netbanking'
                          ? 'bg-[#1C3624] border-[#4ADE80] text-white shadow-md'
                          : 'bg-[#122217] border-[#25422D] text-[#A2BEAA] hover:border-[#386B47]'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-[#86EFAC]" />
                      <span className="text-xs font-bold">Net Banking</span>
                      <span className="text-[9px] text-slate-400 font-mono">All Banks</span>
                    </button>

                    {/* Mode: COD or Store Pay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode(customer.deliveryType === 'pickup' ? 'store' : 'cod')}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === 'cod' || paymentMode === 'store'
                          ? 'bg-[#1C3624] border-[#4ADE80] text-white shadow-md'
                          : 'bg-[#122217] border-[#25422D] text-[#A2BEAA] hover:border-[#386B47]'
                      }`}
                    >
                      {customer.deliveryType === 'pickup' ? (
                        <>
                          <Store className="w-5 h-5 text-[#86EFAC]" />
                          <span className="text-xs font-bold">Pay at Store</span>
                          <span className="text-[9px] text-amber-300 font-mono">Dehradun</span>
                        </>
                      ) : (
                        <>
                          <Banknote className="w-5 h-5 text-[#86EFAC]" />
                          <span className="text-xs font-bold">Cash on Delivery</span>
                          <span className="text-[9px] text-amber-300 font-mono">Pan-India COD</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-4 rounded-2xl bg-[#14261B] border border-[#25442E] space-y-3">
                    {paymentMode === 'upi' && (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-xl bg-[#09130D] border border-[#233F2B]">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-20 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center shadow-md">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=prateekshamobile@okaxis&pn=Prateeksha%20Mobile%20Gallery&am=${finalPayable}&cu=INR`)}`}
                                alt="Store UPI QR Code"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-xs space-y-1">
                              <span className="text-[10px] text-[#86EFAC] font-bold uppercase tracking-wider block">
                                Scan & Pay via GPay / PhonePe / Paytm
                              </span>
                              <p className="font-extrabold text-sm text-white">Prateeksha Mobile Gallery</p>
                              <div className="flex items-center gap-1.5 font-mono text-xs text-[#D8E6DA]">
                                <span>prateekshamobile@okaxis</span>
                                <button
                                  type="button"
                                  onClick={handleCopyUpi}
                                  className="text-[#86EFAC] hover:text-white p-1 cursor-pointer"
                                  title="Copy UPI ID"
                                >
                                  {copiedUpi ? <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="text-center sm:text-right w-full sm:w-auto">
                            <span className="text-xs text-[#A2BEAA] block">Amount to Scan & Pay</span>
                            <span className="text-xl font-black text-[#86EFAC] font-heading">
                              ₹{finalPayable.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-[#A2BEAA] mb-1">
                            UPI Transaction / UTR Number (Optional, for instant verification)
                          </label>
                          <input
                            type="text"
                            value={upiRef}
                            onChange={(e) => setUpiRef(e.target.value)}
                            placeholder="e.g. 428938192039 or your UPI handle"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#09130D] border border-[#233F2B] text-white placeholder-slate-500 focus:outline-none focus:border-[#4ADE80]"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMode === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] text-[#A2BEAA] mb-1">Card Number</label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim() })}
                            placeholder="4532 •••• •••• 8921"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#09130D] border border-[#233F2B] text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#4ADE80]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] text-[#A2BEAA] mb-1">Valid Thru</label>
                            <input
                              type="text"
                              maxLength={5}
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              placeholder="MM/YY"
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#09130D] border border-[#233F2B] text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#4ADE80]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-[#A2BEAA] mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                              placeholder="•••"
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#09130D] border border-[#233F2B] text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#4ADE80]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMode === 'netbanking' && (
                      <div>
                        <label className="block text-[11px] text-[#A2BEAA] mb-1">Select Bank</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#09130D] border border-[#233F2B] text-white focus:outline-none focus:border-[#4ADE80]"
                        >
                          <option>State Bank of India (SBI)</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Punjab National Bank (PNB)</option>
                          <option>Kotak Mahindra Bank</option>
                          <option>Bank of Baroda</option>
                        </select>
                      </div>
                    )}

                    {paymentMode === 'cod' && (
                      <div className="text-xs text-[#C4D8C8] space-y-1">
                        <p className="font-bold text-white">📦 Cash on Delivery Confirmed</p>
                        <p className="text-[11px] text-[#A2BEAA]">
                          You can pay ₹{finalPayable.toLocaleString('en-IN')} in Cash or via UPI upon delivery of your insured package.
                        </p>
                      </div>
                    )}

                    {paymentMode === 'store' && (
                      <div className="text-xs text-[#C4D8C8] space-y-1">
                        <p className="font-bold text-white">🏪 Pay upon Store Pickup</p>
                        <p className="text-[11px] text-[#A2BEAA]">
                          Visit our showroom on G.M.S. Road, Ballupur Chowk, Dehradun. Inspect your gadget and pay in person via Cash, Card or UPI.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom CTA */}
              <div className="p-4 sm:p-6 border-t border-[#213828] bg-[#0E1A12] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[11px] text-[#A2BEAA] block">Total Amount to Pay</span>
                  <span className="text-2xl font-black text-white font-heading">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#4ADE80] hover:bg-[#86EFAC] text-[#0C160F] font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/40 transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0C160F] border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order & Pay</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Order Placed Success View */
            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1C3624] border border-[#4ADE80] text-[#4ADE80] flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/30">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#183120] text-[#86EFAC] border border-[#2D5438]">
                  Order Placed Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-2">
                  Thank You, {placedOrder?.customer.name}!
                </h3>
                <p className="text-xs sm:text-sm text-[#C4D8C8] mt-1 max-w-md mx-auto">
                  Your order <strong className="text-white">#{placedOrder?.orderId}</strong> has been registered at Prateeksha Mobile Gallery.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="rounded-2xl bg-[#122217] p-5 border border-[#24422D] text-left text-xs space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between pb-2 border-b border-[#1F3A27]">
                  <span className="text-[#A2BEAA]">Order Number:</span>
                  <span className="font-mono font-bold text-white">#{placedOrder?.orderId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#1F3A27]">
                  <span className="text-[#A2BEAA]">Mode of Payment:</span>
                  <span className="font-bold text-[#86EFAC] uppercase">{placedOrder?.paymentMode}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#1F3A27]">
                  <span className="text-[#A2BEAA]">Delivery Method:</span>
                  <span className="font-bold text-white">
                    {placedOrder?.customer.deliveryType === 'pickup' 
                      ? 'Store Pickup (G.M.S. Road)' 
                      : `Insured Courier to ${placedOrder?.customer.city}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-[#86EFAC] font-heading font-extrabold">
                    ₹{placedOrder?.finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#4ADE80] hover:bg-[#86EFAC] text-[#0C160F] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-[#0C160F]" />
                  <span>Send Confirmation on WhatsApp</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#1A3122] hover:bg-[#254631] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
