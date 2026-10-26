import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, BatteryCharging, RotateCcw, ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ProductCard } from '../common/ProductCard';
import { PRODUCTS_DATA } from '../../data/products';

export const PreOwnedHighlight = () => {
  const preOwnedItems = PRODUCTS_DATA.filter((p) => p.category.startsWith('preowned')).slice(0, 4);

  const trustChecklist = [
    { title: '32-Point Quality Check', desc: 'Display, FaceID, Cameras, Speakers, Microphones & Motherboard verified' },
    { title: '85%+ Battery Health Guaranteed', desc: 'All certified iPhones and laptops retain verified healthy original battery cells' },
    { title: '6-Month Store Warranty', desc: 'Hassle-free instant hardware replacement or repair at our G.M.S. Road store' },
    { title: 'Clean IMEI & Original Invoices', desc: 'Zero blacklisted devices, clean bill with physical store receipt' },
  ];

  return (
    <section className="py-20 text-[#F3F8F4] relative z-10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          dark
          badge="Certified Second-Hand Lounge"
          title="Flagship Power at"
          highlight="Half the Price"
          subtitle="Own verified Apple iPhones, MacBooks, and business ThinkPads with physical store warranty and clean diagnostics."
        />

        {/* 32-Point Inspection Trust Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {trustChecklist.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#14261B]/80 border border-[#2D5039]/80 backdrop-blur-xl shadow-lg hover:border-[#4ADE80]/50 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <h4 className="font-bold text-xs text-white font-heading">{item.title}</h4>
              </div>
              <p className="text-[11px] text-[#A6BFAC] leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {preOwnedItems.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="grid" dark={true} />
          ))}
        </div>

        {/* Bottom CTA to Pre-Owned Catalog */}
        <div className="mt-12 text-center">
          <Link
            to="/products?category=preowned-phone"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#D4E3D6] hover:bg-[#E3EFE5] text-[#142318] font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-105"
          >
            <span>Explore All Certified Phones & Laptops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
