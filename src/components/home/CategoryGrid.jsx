import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Headphones, RotateCcw, Laptop, Wrench, ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const CategoryGrid = () => {
  const categories = [
    {
      id: 'smartphones',
      title: 'Smartphones (iOS & Android)',
      tagline: 'Latest Apple iPhone 15 series & top Android flagships',
      count: '14+ In Stock',
      icon: Smartphone,
      image: '/cat-smartphones.jpg',
      gradient: 'from-[#16271D] via-[#223F2C] to-[#122217]',
      badge: 'Brand New Original',
      link: '/products?category=smartphone',
      sublinks: [
        { label: 'iPhones (iOS)', url: '/products?category=smartphone&os=ios' },
        { label: 'Samsung & OnePlus', url: '/products?category=smartphone&os=android' },
      ]
    },
    {
      id: 'accessories',
      title: 'Mobile Accessories',
      tagline: 'AirPods, GaN chargers, MagSafe covers, privacy glass & smartwatches',
      count: '17+ Items',
      icon: Headphones,
      image: '/cat-accessories.jpg',
      gradient: 'from-[#1C3325] via-[#2D5039] to-[#182B1F]',
      badge: 'Original & Premium',
      link: '/products?category=accessory',
      sublinks: [
        { label: 'TWS & Audio', url: '/products?category=accessory' },
        { label: 'Fast Chargers', url: '/products?category=accessory' },
      ]
    },
    {
      id: 'preowned-phones',
      title: 'Certified Pre-Owned Phones',
      tagline: '32-point tested iPhones & Galaxy flagships with 6-month store warranty',
      count: 'Grade A+ Certified',
      icon: RotateCcw,
      image: '/cat-preowned.jpg',
      gradient: 'from-[#142318] via-[#274431] to-[#16291C]',
      badge: 'Up to 50% Off vs New',
      link: '/products?category=preowned-phone',
      sublinks: [
        { label: 'Pre-Owned iPhones', url: '/products?category=preowned-phone' },
        { label: '90%+ Battery', url: '/products?category=preowned-phone' },
      ]
    },
    {
      id: 'preowned-laptops',
      title: 'Certified Laptops & MacBooks',
      tagline: 'MacBook Air M1, ThinkPads, Dell Latitude & Asus ROG gaming',
      count: 'Hardware Guaranteed',
      icon: Laptop,
      image: '/cat-laptops.jpg',
      gradient: 'from-[#182A1E] via-[#253E2D] to-[#0F1B12]',
      badge: 'Corporate & Creator Grade',
      link: '/products?category=preowned-laptop',
      sublinks: [
        { label: 'Apple MacBooks', url: '/products?category=preowned-laptop' },
        { label: 'Business ThinkPads', url: '/products?category=preowned-laptop' },
      ]
    },
    {
      id: 'repair-service',
      title: 'Mobile Repairing Service',
      tagline: 'Certified cleanroom lab repair exclusively in Dehradun with 90-day warranty',
      count: 'Dehradun Only',
      icon: Wrench,
      image: '/cat-repair.jpg',
      gradient: 'from-[#1F3D2A] via-[#2F5A3E] to-[#162D1E]',
      badge: 'Dehradun Only',
      link: '/repair',
      isHighlight: true,
      sublinks: [
        { label: 'Screen Replacement', url: '/repair' },
        { label: 'Battery Swap', url: '/repair' },
      ]
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curated Collections"
          title="Explore by"
          highlight="Category"
          subtitle="Discover authentic smartphones, certified pre-owned gadgets, premium accessories with Pan-India delivery, and in-store repair in Dehradun."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const isWide = index === 0 || cat.isHighlight;

            return (
              <div
                key={cat.id}
                className={`group relative rounded-3xl overflow-hidden p-7 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between bg-[#0E1A12] border border-[#2D4F37]/90 hover:border-[#4ADE80]/60 text-white min-h-[320px] ${
                  isWide ? 'md:col-span-1 lg:col-span-1' : ''
                }`}
              >
                {/* Related Category Background Image - High Visibility */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.08] saturate-[1.12] group-hover:scale-108 group-hover:brightness-[0.90] transition-all duration-700 ease-out"
                  />
                  {/* Balanced Vignette Overlay for High Image Clarity + Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060E08]/95 via-[#060E08]/50 to-[#060E08]/25" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#060E08]/40 via-transparent to-transparent" />
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#4ADE80]/15 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none z-1" />

                {/* Card Content (z-10) */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur-md text-[#E0EFE4] border border-white/25 shadow-md">
                        {cat.badge}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1E3B27]/90 transition-all shadow-lg">
                        <Icon className="w-6 h-6 text-[#86EFAC]" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-bold font-heading mb-2 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E2ECE4] leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                      {cat.tagline}
                    </p>

                    {/* Sublink Pills */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cat.sublinks.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.url}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-black/55 hover:bg-[#1C3624] text-[#E0EFE3] border border-white/20 backdrop-blur-md transition-all hover:border-[#86EFAC]/60 shadow-xs"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C5DBCB] drop-shadow-sm">{cat.count}</span>
                    <Link
                      to={cat.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86EFAC] hover:text-white group-hover:translate-x-1 transition-all drop-shadow-sm"
                    >
                      <span>View Products</span>
                      <ArrowRight className="w-4 h-4 text-[#86EFAC]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
