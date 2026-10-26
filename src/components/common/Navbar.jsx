import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  Clock,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useActiveOffers } from '../../hooks/useActiveOffers';
import { useStoreStatus } from '../../hooks/useStoreStatus';
import { useStore } from '../../context/StoreContext';
import { CountdownTimer } from './CountdownTimer';
import { GlobalAdTicker } from './GlobalAdTicker';

export const Navbar = ({ onSearchOpen, onOpenAdsDrawer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const { primaryOffer } = useActiveOffers();
  const storeStatus = useStoreStatus();
  const { wishlist, cart, setIsWishlistOpen, setIsCartOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Phones', path: '/products?category=smartphone' },
    { label: 'Accessories', path: '/products?category=accessory' },
    { label: 'Pre-owned', path: '/products?category=preowned' },
    { label: 'Repair', path: '/repair', badge: 'Dehradun Only' },
    { label: 'Offers', path: '/offers', isSpecial: true },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && (location.pathname + location.search).startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Global Real-Time Live Ad Ticker */}
      <GlobalAdTicker onOpenAdsDrawer={onOpenAdsDrawer} />

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isHome
            ? isScrolled
              ? 'bg-[#0C160F]/90 backdrop-blur-xl shadow-xl shadow-black/40 py-3 border-b border-[#233F2B]'
              : 'bg-[#0C160F]/75 backdrop-blur-md py-3.5 border-b border-[#233F2B]/70'
            : isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md shadow-[#16271D]/5 py-3 border-b border-[#E3ECE5]'
              : 'bg-white py-3.5 border-b border-[#E8EFE9]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full transition-colors flex items-center justify-center shadow-xs ${
                  isHome
                    ? 'bg-[#1C3624] border border-[#2E583A] group-hover:bg-[#254630]'
                    : 'bg-[#D4E3D6] group-hover:bg-[#C2D8C5]'
                }`}
              >
                <span
                  className={`font-serif text-xl font-bold italic translate-y-[-1px] ${
                    isHome ? 'text-[#86EFAC]' : 'text-[#16271D]'
                  }`}
                >
                  p
                </span>
              </div>
              <span className="absolute -top-1 -right-1 text-[#FBBF24] text-xs font-serif select-none pointer-events-none">
                ✦
              </span>
            </div>

            <div className="flex flex-col">
              <span
                className={`font-bold text-lg sm:text-xl tracking-tight leading-tight font-heading transition-colors ${
                  isHome ? 'text-white group-hover:text-[#86EFAC]' : 'text-[#16271D] group-hover:text-[#23422E]'
                }`}
              >
                prateeksha
              </span>
              <span
                className={`text-[9px] font-semibold tracking-[0.2em] uppercase -mt-0.5 ${
                  isHome ? 'text-[#86EFAC]' : 'text-[#667E6D]'
                }`}
              >
                MOBILE GALLERY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isHome
                    ? isActive(link.path)
                      ? 'text-[#86EFAC] font-bold border-b-2 border-[#86EFAC] pb-0.5'
                      : 'text-[#C4D8C8] hover:text-white'
                    : isActive(link.path)
                      ? 'text-[#16271D] font-bold border-b-2 border-[#16271D] pb-0.5'
                      : 'text-[#4A5D50] hover:text-[#16271D]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action Icons & Primary CTA Button */}
          <div className="flex items-center gap-1.5 sm:gap-3.5">
            {/* Store Status Pill */}
            <div
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${storeStatus.badgeColor}`}
              title={storeStatus.subText}
            >
              <span className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-[#4ADE80] animate-pulse' : 'bg-amber-400'}`} />
              <span className={isHome ? 'text-white' : 'text-[#2B3E31]'}>{storeStatus.statusText}</span>
            </div>

            {/* Search Trigger */}
            <button
              onClick={onSearchOpen}
              aria-label="Search Catalog"
              className={`p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer ${
                isHome ? 'text-[#C4D8C8] hover:text-white hover:bg-[#1A3123]' : 'text-[#384A3E] hover:text-[#16271D] hover:bg-[#EFF5F0]'
              }`}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className={`p-2 sm:p-2.5 rounded-full relative transition-colors cursor-pointer ${
                isHome ? 'text-[#C4D8C8] hover:text-white hover:bg-[#1A3123]' : 'text-[#384A3E] hover:text-[#16271D] hover:bg-[#EFF5F0]'
              }`}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span
                  className={`absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                    isHome ? 'bg-[#86EFAC] text-[#122016]' : 'bg-[#16271D] text-white'
                  }`}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart & Checkout"
              title="Shopping Cart & Checkout"
              className={`p-2 sm:p-2.5 rounded-full relative transition-colors cursor-pointer ${
                isHome ? 'text-[#C4D8C8] hover:text-white hover:bg-[#1A3123]' : 'text-[#384A3E] hover:text-[#16271D] hover:bg-[#EFF5F0]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cart.length > 0 && (
                <span
                  className={`absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                    isHome ? 'bg-[#86EFAC] text-[#122016]' : 'bg-[#2F593C] text-white'
                  }`}
                >
                  {cart.length}
                </span>
              )}
            </button>

            {/* "Find your fit ↗" CTA Button */}
            <Link
              to="/products"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer ${
                isHome
                  ? 'bg-[#86EFAC] hover:bg-[#A7F3D0] text-[#122016]'
                  : 'bg-[#16271D] hover:bg-[#203628] text-white'
              }`}
            >
              <span>Find your fit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              className={`lg:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                isHome ? 'text-white hover:bg-[#1A3123]' : 'text-[#2B3E31] hover:bg-[#EFF5F0]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-5rem)] overflow-y-auto ${
              isHome
                ? 'bg-[#14261B]/95 backdrop-blur-2xl border-[#233F2B] text-[#F3F8F4]'
                : 'bg-white border-[#E5EDE7] text-[#2D3F33]'
            }`}
          >
            {/* Store Status Mobile */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border mb-3 ${
                isHome ? 'bg-[#0D1811] border-[#2D5039]' : 'bg-[#F4F8F5] border-[#E0ECE2]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${isHome ? 'text-[#86EFAC]' : 'text-[#2E543A]'}`} />
                <span className={`text-xs ${isHome ? 'text-[#C4D8C8]' : 'text-[#384C3F]'}`}>{storeStatus.subText}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${storeStatus.badgeColor}`}>
                {storeStatus.statusText}
              </span>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isHome
                    ? isActive(link.path)
                      ? 'bg-[#1A3123] text-[#86EFAC] border border-[#2D5039]'
                      : 'text-[#C4D8C8] hover:bg-[#1A3123]'
                    : isActive(link.path)
                      ? 'bg-[#16271D] text-white'
                      : 'text-[#2D3F33] hover:bg-[#F2F6F3]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isHome ? 'bg-[#1C3624] text-[#86EFAC] border border-[#2E583A]' : 'bg-[#D4E3D6] text-[#16271D]'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className={`pt-3 border-t grid grid-cols-2 gap-2 ${isHome ? 'border-[#233F2B]' : 'border-[#E5EDE7]'}`}>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isHome ? 'bg-[#86EFAC] text-[#122016]' : 'bg-[#16271D] text-white'
                }`}
              >
                <span>Find your fit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={SITE_CONFIG.createWhatsAppLink('Hello Prateeksha Mobile Gallery!')}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isHome ? 'bg-[#1C3624] text-white border border-[#2E583A]' : 'bg-[#2E543A] text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
