import React from 'react';
import { Hero } from '../components/home/Hero';
import { OfferBannerCarousel } from '../components/home/OfferBannerCarousel';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PreOwnedHighlight } from '../components/home/PreOwnedHighlight';
import { RepairSection } from '../components/home/RepairSection';
import { DeliverySection } from '../components/home/DeliverySection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage = () => {
  return (
    <main>
      {/* 1. Hero with animated floating emoji illustrations, glow and trust badges */}
      <Hero />

      {/* 2. Auto-rotating live offer carousel */}
      <OfferBannerCarousel />

      {/* 3. Shop by Category Grid with iOS/Android quick links */}
      <CategoryGrid />

      {/* 4. Featured & Trending Products with live countdown timer badges */}
      <FeaturedProducts />

      {/* 5. Pre-Owned Section: 32-Point inspection, Grade A+, 85%+ Battery Guarantee */}
      <PreOwnedHighlight />

      {/* 6. In-Store Mobile & Laptop Repairing (Dehradun Exclusive Cleanroom Lab) */}
      <RepairSection />

      {/* 7. Pan-India Insured Express Delivery */}
      <DeliverySection />

      {/* 8. Why Choose Us: Counter stats, Dehradun testimonials & Brand marquee */}
      <WhyChooseUs />

      {/* 9. Contact: G.M.S. Road Dehradun Map, Live Store Timings & Instant WhatsApp */}
      <ContactSection />
    </main>
  );
};
