import React, { useState } from 'react';
import {
  Wrench,
  Truck,
  Clock,
  ShieldCheck,
  CheckCircle,
  MessageCircle,
  MapPin,
  Smartphone,
  Cpu,
  BatteryCharging,
  Layers,
  Droplets,
  AlertTriangle
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { SITE_CONFIG } from '../../config/site';

export const RepairSection = () => {
  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deviceModel: '',
    issueType: 'Broken Screen Replacement',
    dehradunArea: 'G.M.S. Road',
    address: '',
    preferredSlot: 'Morning (10 AM - 1 PM)',
  });

  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const repairServices = [
    { title: 'Screen & Touch Glass', time: '45 Mins', icon: Layers, desc: 'Original OLED/AMOLED and OEM high-grade glass panels with 3-month warranty' },
    { title: 'Battery Replacement', time: '30 Mins', icon: BatteryCharging, desc: 'High-density OEM batteries with 100% capacity calibration and no warning popups' },
    { title: 'Charging Port & Mic', time: '40 Mins', icon: Cpu, desc: 'Type-C, Lightning port fixes, slow charging & voice transmission diagnosis' },
    { title: 'Water & Liquid Damage', time: 'Same-Day', icon: Droplets, desc: 'Ultrasonic board cleaning, short-circuit tracing, and micro-soldering revival' },
    { title: 'Motherboard IC Repair', time: '1-2 Days', icon: Wrench, desc: 'Power IC, audio IC, network signal, and FaceID logic board repairs' },
    { title: 'MacBook & Laptop Servicing', time: 'Same-Day', icon: Smartphone, desc: 'Display replacement, SSD upgrade, thermal paste repasting & keyboard swaps' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Select Issue & Reserve Slot',
      desc: 'Fill the quick form or message our Dehradun repair desk directly on WhatsApp.',
      icon: Clock,
    },
    {
      step: '02',
      title: 'Walk in to G.M.S. Road Lab',
      desc: 'Bring your device to our cleanroom counter on G.M.S. Road, Dehradun (near Ballupur Chowk).',
      icon: Wrench,
    },
    {
      step: '03',
      title: '45-Min Fix & Store Warranty',
      desc: 'Tested thoroughly in front of you, with our 90-day physical store warranty certificate.',
      icon: ShieldCheck,
    },
  ];

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.deviceModel) return;

    let text = `*In-Store Repair Booking (Dehradun Only) - ${SITE_CONFIG.name}*\n\n`;
    text += `*Customer:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    text += `*Device Model:* ${formData.deviceModel}\n`;
    text += `*Issue Type:* ${formData.issueType}\n`;
    text += `*Dehradun Area:* ${formData.dehradunArea}\n`;
    text += `*Preferred Store Visit Slot:* ${formData.preferredSlot}\n`;
    text += `\nPlease confirm my repair slot at your G.M.S. Road Dehradun store. Thank you!`;

    const url = SITE_CONFIG.createWhatsAppLink(text);
    setBookingSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="repair" className="py-20 relative z-10 overflow-hidden text-[#F3F8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Dehradun Only Notice */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 flex items-center justify-between gap-4 max-w-3xl mx-auto backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/25 text-amber-300 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <strong className="block text-sm font-bold font-heading text-white">
                Hardware Repair strictly EXCLUSIVE to Dehradun City • Delivery All Over India
              </strong>
              <span className="text-amber-200/90">
                Repair service is strictly available in-store at G.M.S. Road, Dehradun. All gadget & accessory purchases are delivered across India.
              </span>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-[#122016] uppercase tracking-wider shrink-0">
            Dehradun Only
          </span>
        </div>

        <SectionHeading
          badge="Expert Cleanroom Lab"
          title="In-Store Mobile & Laptop"
          highlight="Repairing"
          subtitle="Broken screen? Drained battery? Liquid damage? Visit our G.M.S. Road lab in Dehradun. 45-minute turnaround with original OEM parts & 90-day warranty."
        />

        {/* 3-Step In-Store Repair Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="relative bg-[#14261B]/80 rounded-3xl p-6 sm:p-7 border border-[#2D5039]/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#86EFAC]/40 font-heading">{st.step}</span>
                  <div className="w-12 h-12 rounded-2xl bg-[#1C3625] border border-[#2D543B] text-[#86EFAC] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white font-heading mb-1.5">{st.title}</h4>
                <p className="text-xs text-[#C5D8C9] leading-relaxed font-normal">{st.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Two-Column: Services Grid & Live Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services List Column */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-white font-heading mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#86EFAC]" />
              Specialist Services & Turnaround Time
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repairServices.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#14261B]/80 border border-[#2D5039]/70 hover:border-[#4ADE80]/50 backdrop-blur-xl transition-all shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-xl bg-[#1C3625] text-[#86EFAC]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E3B29] text-[#86EFAC] border border-[#2D543B]">
                          ⚡ {srv.time}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white font-heading">{srv.title}</h4>
                      <p className="text-[11px] text-[#C5D8C9] mt-1 leading-relaxed">{srv.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Repair Guarantee Banner in Forest Green */}
            <div className="p-5 rounded-2xl bg-[#14261B]/90 border border-[#2D5039]/80 backdrop-blur-xl text-white flex items-center gap-4 mt-6 shadow-xl">
              <ShieldCheck className="w-10 h-10 text-[#86EFAC] shrink-0" />
              <div className="text-xs">
                <h4 className="font-bold text-sm text-white font-heading">
                  90-Day Unconditional Replacement Warranty
                </h4>
                <p className="text-[#C4D8C8] mt-0.5">
                  Every screen, battery and motherboard repair comes with a store warranty certificate. If the part malfunctions, we replace it free of cost.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#14261B]/90 rounded-3xl p-6 sm:p-7 border border-[#2D5039]/80 backdrop-blur-2xl shadow-2xl relative text-white">
              <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[#233F2B]/70">
                <div className="p-2 rounded-xl bg-[#1C3625] text-[#86EFAC]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-heading text-sm sm:text-base">
                    Book Dehradun Repair Slot
                  </h3>
                  <p className="text-[11px] text-[#A2BEA9]">Reserve store slot at G.M.S. Road lab on WhatsApp</p>
                </div>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#A2BEA9] uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Negi"
                    className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] focus:outline-none focus:border-[#4ADE80] bg-[#0D1811] text-white placeholder-[#789680]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#A2BEA9] uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] focus:outline-none focus:border-[#4ADE80] bg-[#0D1811] text-white placeholder-[#789680]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#A2BEA9] uppercase mb-1">
                      Device Model *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.deviceModel}
                      onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                      placeholder="e.g. iPhone 13 / OnePlus 11"
                      className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] focus:outline-none focus:border-[#4ADE80] bg-[#0D1811] text-white placeholder-[#789680]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#A2BEA9] uppercase mb-1">
                    Issue Description
                  </label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] focus:outline-none focus:border-[#4ADE80] bg-[#0D1811] text-white"
                  >
                    <option className="bg-[#0D1811] text-white">Broken Screen Replacement</option>
                    <option className="bg-[#0D1811] text-white">Battery Draining Quickly / Swollen</option>
                    <option className="bg-[#0D1811] text-white">Charging Port Loose / Not Charging</option>
                    <option className="bg-[#0D1811] text-white">Water / Liquid Dropped Inside</option>
                    <option className="bg-[#0D1811] text-white">No Display / Black Screen</option>
                    <option className="bg-[#0D1811] text-white">Camera Blurry / Lens Cracked</option>
                    <option className="bg-[#0D1811] text-white">MacBook / Laptop Repair</option>
                    <option className="bg-[#0D1811] text-white">Other Hardware / Software Glitch</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#A2BEA9] uppercase mb-1">
                      Your Dehradun Area
                    </label>
                    <select
                      value={formData.dehradunArea}
                      onChange={(e) => setFormData({ ...formData, dehradunArea: e.target.value })}
                      className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] focus:outline-none focus:border-[#4ADE80] bg-[#0D1811] text-white"
                    >
                      {SITE_CONFIG.repairDehradunAreas.map((area) => (
                        <option key={area} className="bg-[#0D1811] text-white">{area}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#A2BEA9] uppercase mb-1">
                      Preferred Store Visit Slot
                    </label>
                    <select
                      value={formData.preferredSlot}
                      onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                      className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-[#2D5039] focus:outline-none focus:border-[#4ADE80] bg-[#0D1811] text-white"
                    >
                      <option className="bg-[#0D1811] text-white">Morning (10 AM - 1 PM)</option>
                      <option className="bg-[#0D1811] text-white">Afternoon (1 PM - 4 PM)</option>
                      <option className="bg-[#0D1811] text-white">Evening (4 PM - 8 PM)</option>
                      <option className="bg-[#0D1811] text-white">Immediate / Visiting Store Today</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#86EFAC] hover:bg-[#A7F3D0] text-[#122016] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#86EFAC]/20 transition-all cursor-pointer mt-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#122016]" />
                  <span>Reserve Store Slot on WhatsApp</span>
                </button>
              </form>

              {bookingSubmitted && (
                <p className="text-[11px] text-[#86EFAC] font-semibold text-center mt-2">
                  ✓ WhatsApp message opened! Our team will confirm your repair slot shortly.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
