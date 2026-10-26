import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  MessageCircle,
  CheckCircle,
  ShieldCheck,
  Truck,
  Heart
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useStoreStatus } from '../../hooks/useStoreStatus';

export const Footer = () => {
  const storeStatus = useStoreStatus();
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setSubscribedEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C160F]/90 text-[#D1E0D4] pt-16 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:pb-12 border-t border-[#233527]/80 backdrop-blur-2xl relative z-10">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5">
        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="p-2.5 sm:p-3 rounded-full bg-[#1C2C20]/90 hover:bg-[#253D2C] text-[#E0EFE4] shadow-xl border border-[#2F4A35] backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* WhatsApp Floating Chat */}
        <a
          href={SITE_CONFIG.createWhatsAppLink('Hello Prateeksha Mobile Gallery, I would like to inquire about products and in-store repair.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with store on WhatsApp"
          className="p-3 sm:p-3.5 rounded-full bg-[#2E543A] hover:bg-[#3B6B4A] text-white shadow-xl shadow-[#1C2C20]/40 transition-all active:scale-95 flex items-center justify-center animate-bounce duration-1000 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#233527]">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#19271D] border border-[#273E2D]">
            <div className="p-3 rounded-xl bg-[#26412D] text-[#86EFAC]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm font-heading">Delivery All Over India</h4>
              <p className="text-xs text-[#95AD9A] mt-0.5">Insured express delivery to any pin code</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#19271D] border border-[#273E2D]">
            <div className="p-3 rounded-xl bg-[#26412D] text-[#86EFAC]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm font-heading">100% Certified Genuine</h4>
              <p className="text-xs text-[#95AD9A] mt-0.5">32-point inspection + store warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#19271D] border border-[#273E2D]">
            <div className="p-3 rounded-xl bg-[#26412D] text-[#86EFAC]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm font-heading">Instant WhatsApp Enquiries</h4>
              <p className="text-xs text-[#95AD9A] mt-0.5">Get price quotes & stock checks in minutes</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#233527]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#D4E3D6] flex items-center justify-center shadow-xs">
                  <span className="font-serif text-[#16271D] text-xl font-bold italic translate-y-[-1px]">
                    p
                  </span>
                </div>
                <span className="absolute -top-1 -right-1 text-[#D97706] text-xs font-serif">
                  ✦
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-tight font-heading">
                  prateeksha
                </span>
                <span className="text-[9px] font-semibold text-[#86EFAC] tracking-[0.2em] uppercase -mt-0.5">
                  MOBILE GALLERY
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dehradun&apos;s premier destination for original smartphones, certified pre-owned gadgets, premium accessories with delivery all over India, and certified in-store device repair exclusively in Dehradun.
            </p>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Store Status:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 ${storeStatus.badgeColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${storeStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {storeStatus.statusText}
              </span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-heading">
                Subscribe for Flash Sale Alerts
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>You&apos;re subscribed to VIP price drop notifications!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    placeholder="Enter your phone or email..."
                    className="flex-1 text-base sm:text-xs px-3.5 py-2.5 rounded-xl bg-[#1A2C20] border border-[#2E4A34] text-white placeholder-[#7C9783] focus:outline-none focus:border-[#86EFAC]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#D4E3D6] hover:bg-[#E3EFE5] text-[#142318] text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
                  >
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-heading">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A7BFA9]">
              <li>
                <Link to="/products?category=smartphone&os=ios" className="hover:text-[#86EFAC] transition-colors">
                  Apple iPhones (New)
                </Link>
              </li>
              <li>
                <Link to="/products?category=smartphone&os=android" className="hover:text-[#86EFAC] transition-colors">
                  Android Flagships
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessory" className="hover:text-[#86EFAC] transition-colors">
                  AirPods & TWS Audio
                </Link>
              </li>
              <li>
                <Link to="/products?category=preowned-phone" className="hover:text-[#86EFAC] transition-colors">
                  Certified Pre-Owned iPhones
                </Link>
              </li>
              <li>
                <Link to="/products?category=preowned-laptop" className="hover:text-[#86EFAC] transition-colors">
                  Certified MacBooks & Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessory" className="hover:text-[#86EFAC] transition-colors">
                  Fast Chargers & MagSafe
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A7BFA9]">
              <li>
                <Link to="/repair" className="hover:text-[#86EFAC] transition-colors">
                  Book Repair (Dehradun)
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#86EFAC] transition-colors">
                  Live Offers & Flash Sales
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#86EFAC] transition-colors">
                  All 40+ Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#86EFAC] transition-colors">
                  Store Directions & Timings
                </Link>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-[#86EFAC] transition-colors">
                  Why Choose Prateeksha
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-[#86EFAC] transition-colors">
                  Pan-India Shipping Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Store Location & Timings */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-heading">
              Store Contact
            </h4>
            <ul className="space-y-3 text-xs text-[#A7BFA9]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#86EFAC] shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address.full}
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>{SITE_CONFIG.timings.displayText}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-[11px] text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Dehradun&apos;s mobile enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};
