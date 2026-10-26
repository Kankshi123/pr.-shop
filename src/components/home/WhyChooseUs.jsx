import React, { useState } from 'react';
import { Users, Smartphone, ShieldCheck, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { BrandLogo } from '../common/BrandLogo';
import { BRANDS_LIST } from '../../data/products';

export const WhyChooseUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { value: '12,500+', label: 'Happy Customers', icon: Users, sub: 'Across Dehradun & Uttarakhand' },
    { value: '1,200+', label: 'Gadgets & Audio', icon: Smartphone, sub: 'Original & certified inventory' },
    { value: '9+ Years', label: 'Trusted Store', icon: ShieldCheck, sub: 'Physical presence on G.M.S. Road' },
    { value: '4.9 ★', label: 'Google Rating', icon: Star, sub: '500+ verified customer reviews' },
  ];

  const testimonials = [
    {
      name: 'Rohan Sharma',
      location: 'Ballupur Chowk, Dehradun',
      device: 'Bought iPhone 15 & AirPods Pro',
      comment:
        'Prateeksha Mobile Gallery on G.M.S. Road is easily the best tech store in Dehradun. Got my iPhone 15 at a price lower than online sales, with free tempered glass and instant data transfer done by their staff!',
      rating: 5,
    },
    {
      name: 'Anjali Rawat',
      location: 'Rajpur Road, Dehradun',
      device: 'In-Store Screen Replacement (Dehradun Lab)',
      comment:
        'My iPhone screen shattered during an office call. I walked into their G.M.S. Road cleanroom lab; the technician replaced the original display and calibrated it within 40 minutes with a 90-day store warranty. Truly exceptional service!',
      rating: 5,
    },
    {
      name: 'Major K.S. Negi (Retd.)',
      location: 'Clement Town, Dehradun',
      device: 'Pre-Owned MacBook Air M1',
      comment:
        'Purchased a certified pre-owned MacBook Air M1 for my daughter’s architecture college. Battery health was 93% and device was spotless with a proper 6-month store warranty receipt. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Deepak Bhatt',
      location: 'Premnagar, Dehradun',
      device: 'Samsung S24 Ultra & GaN Charger',
      comment:
        'The WhatsApp enquiry system is super convenient. I asked for availability on WhatsApp, reserved my phone, and picked it up within 30 minutes. Genuine bill and warm staff hospitality.',
      rating: 5,
    },
  ];

  const brands = BRANDS_LIST.filter((b) => b !== 'All Brands');

  return (
    <section id="why-choose-us" className="py-20 relative z-10 overflow-hidden text-[#F3F8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          badge="Why Dehradun Trusts Us"
          title="Building Trust Since"
          highlight="2015"
          subtitle="A physical showroom where you can touch, inspect, and experience your gadget with authentic billing and guaranteed after-sales support."
        />

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-14 sm:mb-20">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#14261B]/80 border border-[#2D5039]/70 hover:border-[#4ADE80]/50 backdrop-blur-xl transition-all text-center group shadow-lg"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#1C3625] text-[#86EFAC] flex items-center justify-center mx-auto mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                  {st.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#E2ECE4] mt-1">{st.label}</div>
                <div className="text-[10px] sm:text-xs text-[#A2BEA9] mt-0.5">{st.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Slider in Rich Forest Green Theme */}
        <div className="max-w-4xl mx-auto bg-[#14261B]/85 text-[#F3F8F4] rounded-3xl p-5 sm:p-12 shadow-2xl border border-[#2D5039]/80 backdrop-blur-2xl relative mb-14 sm:mb-20">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5 pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1 text-[#FACC15]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FACC15]" />
              ))}
              <span className="text-xs font-bold text-[#E2EFE5] ml-2">Verified Dehradun Buyer</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                aria-label="Previous Testimonial"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                aria-label="Next Testimonial"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#D1E2D4] leading-relaxed italic mb-6">
            &ldquo;{testimonials[activeTestimonial].comment}&rdquo;
          </p>

          <div className="flex items-center justify-between border-t border-[#233F2B] pt-4">
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white font-heading">
                {testimonials[activeTestimonial].name}
              </h4>
              <p className="text-xs text-[#86EFAC]">
                {testimonials[activeTestimonial].location} • {testimonials[activeTestimonial].device}
              </p>
            </div>

            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeTestimonial ? 'w-6 bg-[#86EFAC]' : 'w-2 bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Brand Text & Logo Marquee */}
        <div className="text-center">
          <p className="text-xs font-bold text-[#86EFAC] uppercase tracking-widest mb-6 font-heading flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-[#86EFAC]/40"></span>
            <span>Authorised Dealer & Stockist for Top Brands</span>
            <span className="w-8 h-[1px] bg-[#86EFAC]/40"></span>
          </p>

          <div className="overflow-hidden relative py-4 bg-[#14261B]/85 rounded-2xl border border-[#2D5039]/70 backdrop-blur-xl shadow-xl">
            {/* Fade edge masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#14261B] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#14261B] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-5 sm:gap-7 whitespace-nowrap">
              {brands.concat(brands).map((brand, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#1C3625]/60 hover:bg-[#1C3625] border border-[#2D543B]/60 hover:border-[#86EFAC]/60 transition-all group shrink-0 shadow-xs cursor-default"
                >
                  <BrandLogo
                    brand={brand}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#86EFAC] group-hover:scale-110 transition-transform shrink-0"
                  />
                  <span className="text-sm sm:text-base font-bold font-heading text-[#E0EFE4] group-hover:text-white uppercase tracking-wider transition-colors">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
