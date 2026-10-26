import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Smartphone, Wrench, Tag, ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav = () => {
  const { cart, wishlist, setIsCartOpen, setIsWishlistOpen } = useStore();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Catalog', path: '/products', icon: Smartphone },
    { label: 'Repair', path: '/repair', icon: Wrench, badge: 'Dehradun' },
    { label: 'Offers', path: '/offers', icon: Tag, isHot: true },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#DDE7DF] shadow-[0_-4px_20px_rgba(22,39,29,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+0.35rem)] pt-2 px-2 transition-all duration-300"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#16271D] font-bold'
                    : 'text-[#617768] hover:text-[#16271D]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg transition-transform ${
                      isActive ? 'bg-[#D4E3D6] scale-105' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] tracking-tight mt-0.5 leading-tight">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  )}
                  {item.isHot && (
                    <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Shopping Cart Trigger Button with Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label="Open Shopping Cart & Checkout"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-[#617768] hover:text-[#16271D] transition-all relative"
        >
          <div className="relative p-1 rounded-lg">
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#16271D] text-[#86EFAC] text-[9px] font-black flex items-center justify-center shadow-xs">
                {cart.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-tight font-medium">
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
};
