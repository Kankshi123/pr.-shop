import React from 'react';
import { Truck, ShieldCheck, MapPin, PackageCheck, Zap, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { SITE_CONFIG } from '../../config/site';

export const DeliverySection = () => {
  const routes = [
    { zone: 'Dehradun & Doon Valley', time: 'Same-Day / 2-4 Hours', type: 'Local Express', tag: 'LOCAL EXPRESS / STORE' },
    { zone: 'Delhi-NCR & North India', time: '24 - 48 Hours', type: 'Air Cargo', tag: 'BLUE DART / DTDC' },
    { zone: 'Mumbai, Bangalore & Metros', time: '2 - 3 Working Days', type: 'Priority Air', tag: 'FULLY INSURED' },
    { zone: 'Tier 2/3 Cities & Pan-India', time: '3 - 5 Working Days', type: 'Express Ground', tag: 'OTP DELIVERY' },
  ];

  return (
    <section id="delivery" className="py-20 relative z-10 overflow-hidden text-[#F3F8F4]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          dark
          badge="Nationwide Reach"
          title="Delivering Happiness"
          highlight="All Over India"
          subtitle="From our flagship store on G.M.S. Road, Dehradun to every corner of India. Safe, tracked, and tamper-proof delivery."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Stylized India Network Graphic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#14261B]/85 border border-[#2D5039]/80 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-2xl">
              {/* Decorative Map Grid Lines & Pulsing Nodes */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#213929]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#223E2C] text-[#86EFAC] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm font-heading">Pan-India Transit Network</h4>
                    <p className="text-[11px] text-[#A6C0AE]">Hub origin: G.M.S. Road, Dehradun (248001)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#86EFAC] bg-[#1E3926] px-2.5 py-1 rounded-full border border-[#2F5A3D]">
                  LIVE DISPATCH
                </span>
              </div>

              {/* Stylized Network Visual */}
              <div className="relative h-64 w-full rounded-2xl bg-gradient-to-b from-[#182B1E] to-[#101C13] border border-[#274431] p-4 flex flex-col justify-between overflow-hidden">
                {/* Dehradun Central Hub */}
                <div className="relative z-10 flex items-center gap-3 bg-[#1C3324] border border-[#345D40] p-3 rounded-xl max-w-xs">
                  <div className="w-3 h-3 rounded-full bg-[#86EFAC] animate-ping shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white font-heading">Dehradun Main Hub (GMS Road)</p>
                    <p className="text-[10px] text-[#86EFAC]">Central inventory & express dispatch</p>
                  </div>
                </div>

                {/* Animated connecting flow lines */}
                <div className="relative py-2 flex justify-center">
                  <div className="w-full h-0.5 bg-gradient-to-r from-[#86EFAC]/20 via-[#4ADE80] to-[#86EFAC]/20 opacity-80 animate-pulse" />
                </div>

                {/* Destination Hubs */}
                <div className="grid grid-cols-3 gap-2 relative z-10 text-center">
                  <div className="p-2 rounded-xl bg-[#16271D] border border-[#2B4B35] text-[11px]">
                    <span className="text-[#9EB9A6] block text-[9px] uppercase">North</span>
                    <strong className="text-white">Delhi-NCR</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#16271D] border border-[#2B4B35] text-[11px]">
                    <span className="text-[#9EB9A6] block text-[9px] uppercase">West & South</span>
                    <strong className="text-white">Mumbai / BLR</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#16271D] border border-[#2B4B35] text-[11px]">
                    <span className="text-[#9EB9A6] block text-[9px] uppercase">East & Central</span>
                    <strong className="text-white">Pan-India</strong>
                  </div>
                </div>
              </div>

              {/* Safety Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 text-xs text-[#C4D8C8]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
                  <span>100% Insured Against Loss</span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#86EFAC]" />
                  <span>Tamper-Proof Box Sealing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timelines & Policy */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-extrabold font-heading text-white mb-2">
              Fast, Reliable & Transparent Delivery Timelines
            </h3>
            <p className="text-xs sm:text-sm text-[#C4D8C8] leading-relaxed">
              Whether you are ordering an iPhone 15 to Dehradun, a certified MacBook to Delhi, or premium earbuds to Bangalore, we partner with premier courier networks (Blue Dart, DTDC, Delhivery) with active live tracking links sent to your WhatsApp.
            </p>

            <div className="space-y-3 pt-2">
              {routes.map((rt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#182C1E]/80 border border-[#284833] flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#86EFAC] uppercase tracking-wider block">
                      {rt.type} • {rt.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white font-heading mt-0.5">{rt.zone}</h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#86EFAC] bg-[#24452F] px-2.5 py-1 rounded-full border border-[#366343]">
                      {rt.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href={SITE_CONFIG.createWhatsAppLink('Hello! I would like to check delivery time and courier options for my pincode.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#86EFAC] hover:text-[#BBF7D0] group"
              >
                <span>Check delivery timeline for your pincode on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
