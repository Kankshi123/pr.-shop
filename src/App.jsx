import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { OfferProvider } from './hooks/useActiveOffers';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProductDetailModal } from './components/common/ProductDetailModal';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { EnquiryCartDrawer } from './components/common/EnquiryCartDrawer';
import { CheckoutModal } from './components/common/CheckoutModal';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { DemoModeController } from './components/common/DemoModeController';
import { Toast } from './components/common/Toast';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Global3DBackground } from './components/common/Global3DBackground';
import { LiveAdsDrawer } from './components/common/LiveAdsDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { RepairPage } from './pages/RepairPage';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top helper on navigation
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdsOpen, setIsAdsOpen] = useState(false);

  return (
    <BrowserRouter>
      <OfferProvider>
        <StoreProvider>
          <div className="flex flex-col min-h-screen selection:bg-[#4ADE80] selection:text-[#122016] relative">
            {/* Global Continuous 3D Parallax Boutique Showroom Background (Landing Page Only) */}
            <Global3DBackground />

            <ScrollToTopOnNavigate />

            {/* Sticky Navigation Bar */}
            <Navbar 
              onSearchOpen={() => setIsSearchOpen(true)} 
              onOpenAdsDrawer={() => setIsAdsOpen(true)}
            />

            {/* Page Routes */}
            <div className="flex-1 relative z-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/repair" element={<RepairPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>

            {/* Footer */}
            <Footer />

            {/* Overlays & Drawers */}
            <ProductDetailModal />
            <WishlistDrawer />
            <EnquiryCartDrawer />
            <CheckoutModal />
            <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <LiveAdsDrawer 
              isOpen={isAdsOpen} 
              onClose={() => setIsAdsOpen(false)} 
              onOpen={() => setIsAdsOpen(true)} 
            />
            <DemoModeController />
            <Toast />
            <MobileBottomNav />
          </div>
        </StoreProvider>
      </OfferProvider>
    </BrowserRouter>
  );
}

export default App;
