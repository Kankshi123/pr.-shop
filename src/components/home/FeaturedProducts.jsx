import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ProductCard } from '../common/ProductCard';
import { PRODUCTS_DATA } from '../../data/products';

export const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: '🔥 All Trending' },
    { id: 'iphone', label: 'Apple iPhone' },
    { id: 'android', label: 'Android Flagships' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'preowned', label: 'Certified Pre-Owned' },
  ];

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    if (activeTab === 'all') return p.featured;
    if (activeTab === 'iphone') return p.category === 'smartphone' && p.os === 'ios';
    if (activeTab === 'android') return p.category === 'smartphone' && p.os === 'android';
    if (activeTab === 'accessories') return p.category === 'accessory';
    if (activeTab === 'preowned') return p.category.startsWith('preowned');
    return true;
  }).slice(0, 8);

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            align="left"
            badge="Customer Favorites"
            title="Featured & Trending"
            highlight="Gadgets"
            subtitle="Handpicked bestsellers, fresh arrivals, and limited-time offer highlights ready for immediate pickup in Dehradun."
          />

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86EFAC] hover:text-white pb-8 group transition-colors"
          >
            <span>Explore All 40+ Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none scroll-touch">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-[#86EFAC] text-[#122016] shadow-lg shadow-[#86EFAC]/25'
                  : 'bg-[#15271C]/80 hover:bg-[#1E3627] text-[#C5D8C9] border border-[#2B4B35]/70 backdrop-blur-md'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="grid" dark={true} />
          ))}
        </div>

        {/* Bottom Banner Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#142318] via-[#1C3323] to-[#121F16] border border-[#2B4B35] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#24452F] text-[#86EFAC] flex items-center justify-center text-xl shrink-0 border border-[#345D40]">
              ⚡
            </div>
            <div>
              <h4 className="font-bold text-sm font-heading text-white">Looking for a specific model or storage variant?</h4>
              <p className="text-xs text-[#C4D8C8] mt-0.5">We arrange any phone or accessory in 24 hours at wholesale market price.</p>
            </div>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-[#D4E3D6] hover:bg-[#E2EDE3] text-[#142318] font-bold text-xs shrink-0 transition-all shadow-sm"
          >
            Ask Store Manager
          </Link>
        </div>
      </div>
    </section>
  );
};
