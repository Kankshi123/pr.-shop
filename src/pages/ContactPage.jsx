import React from 'react';
import { ContactSection } from '../components/home/ContactSection';
import { MapPin, Navigation, Bus, Clock, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const ContactPage = () => {
  const landmarks = [
    { from: 'From Ballupur Chowk', dist: '200 Meters', time: '1 Min Walk', desc: 'Head towards GMS road; showroom is opposite Reliance Digital on ground floor.' },
    { from: 'From Clock Tower (Ghanta Ghar)', dist: '3.8 Km', time: '10 Mins Drive', desc: 'Take Chakrata Road to Ballupur Chowk, turn left onto G.M.S. Road.' },
    { from: 'From ISBT Dehradun', dist: '6.2 Km', time: '15 Mins Drive', desc: 'Direct straight route via G.M.S. Road towards Ballupur.' },
    { from: 'From Premnagar / UPES', dist: '7.5 Km', time: '18 Mins Drive', desc: 'Drive via Chakrata Road, take right at Ballupur Chowk onto GMS Road.' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-28 lg:pb-20 text-slate-900">
      {/* Header with Boutique Showroom Background Image */}
      <div className="relative text-white py-16 sm:py-20 px-4 border-b border-[#233527] overflow-hidden bg-[#0C160F]">
        {/* Background Showroom Image - High Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Showroom Background"
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.05] saturate-[1.15] scale-105"
          />
          {/* Balanced soft atmospheric overlay for maximum image visibility */}
          <div className="absolute inset-0 bg-[#0C160F]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C160F]/65 via-[#0C160F]/30 to-[#0C160F]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C160F]/40 via-transparent to-[#0C160F]/65" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4ADE80]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3624]/90 text-[#86EFAC] border border-[#2E583A] text-xs font-bold backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5" />
            <span>G.M.S. Road, Dehradun</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Visit Our Dehradun Showroom
          </h1>

          <p className="text-[#C4D8C8] text-sm sm:text-base max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Convenient parking, air-conditioned gadget trial lounge, live data transfer desk, and express repair pickup counter.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Landmark Directions Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm text-slate-900">
          <h3 className="text-base font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            How to Reach Our Showroom
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {landmarks.map((lm, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 font-heading">{lm.from}</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {lm.time}
                  </span>
                </div>
                <p className="text-xs text-emerald-700 font-semibold">{lm.dist}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed pt-1">{lm.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reusable Contact Section with Map & Live Status */}
        <ContactSection dark={false} />
      </div>
    </div>
  );
};
