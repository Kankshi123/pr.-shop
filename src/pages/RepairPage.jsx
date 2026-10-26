import React, { useState } from 'react';
import {
  Wrench,
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Layers,
  BatteryCharging,
  Cpu,
  Droplets
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const RepairPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    device: '',
    issue: 'Screen Replacement',
    locality: 'G.M.S. Road',
    address: '',
    slot: 'Morning (10:00 AM - 1:00 PM)',
  });

  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Is device repair available outside Dehradun?',
      a: 'No. Hardware repair is strictly exclusive to Dehradun city at our physical cleanroom lab on G.M.S. Road. While we deliver smartphones and accessories all over India, repair services are strictly available only in Dehradun.'
    },
    {
      q: 'Will my iPhone show an "Unknown Part" warning after screen or battery replacement?',
      a: 'No. For our premium OEM grade screen and battery replacements, our certified technicians program and calibrate the original serial chips so your TrueTone and Battery Health percentage remain fully operational.'
    },
    {
      q: 'What is the average turnaround time for repairs?',
      a: 'Most standard repairs like screen glass replacement, battery swap, and charging port repair are completed within 45 to 90 minutes right in front of you in our G.M.S. Road store lounge.'
    },
    {
      q: 'Do you offer a warranty on repairs?',
      a: 'Absolutely. Every screen, battery, and IC repair comes with our 90-day physical store warranty certificate. If the part malfunctions without physical/water damage, we fix or replace it free of charge.'
    },
    {
      q: 'Can you repair water-damaged devices?',
      a: 'Yes. We use advanced ultrasonic PCB baths and thermal imaging cameras to locate shorted capacitors and revive water-damaged smartphones and MacBooks.'
    }
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.device) return;

    let text = `*In-Store Repair Booking (Dehradun Only) - ${SITE_CONFIG.name}*\n\n`;
    text += `*Customer:* ${form.name}\n`;
    text += `*Phone:* ${form.phone}\n`;
    text += `*Device:* ${form.device}\n`;
    text += `*Issue:* ${form.issue}\n`;
    text += `*Locality in Dehradun:* ${form.locality}\n`;
    if (form.address) text += `*Address:* ${form.address}\n`;
    text += `*Preferred Store Visit Slot:* ${form.slot}\n`;
    text += `\nPlease reserve my priority slot at your G.M.S. Road Dehradun store. Thank you!`;

    const url = SITE_CONFIG.createWhatsAppLink(text);
    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-28 lg:pb-20 text-slate-900">
      {/* Hero Banner with Boutique Showroom Background Image */}
      <div className="relative text-white py-16 sm:py-20 px-4 border-b border-[#233527] overflow-hidden bg-[#0C160F]">
        {/* Background Showroom Image - High Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Showroom Background"
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.05] saturate-[1.15] scale-105"
          />
          {/* Balanced soft atmospheric overlay for maximum image visibility while keeping text legible */}
          <div className="absolute inset-0 bg-[#0C160F]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C160F]/75 via-[#0C160F]/35 to-[#0C160F]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C160F]/40 via-transparent to-[#0C160F]/65" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4ADE80]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3624]/90 text-[#86EFAC] border border-[#2E583A] text-xs font-bold backdrop-blur-md">
              <Wrench className="w-3.5 h-3.5" />
              <span>Certified Repair Lab • Strictly Exclusive to Dehradun</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Dehradun&apos;s Most Trusted{' '}
              <span className="italic font-serif font-light text-[#86EFAC]">
                Device Repair
              </span>
            </h1>

            <p className="text-[#C4D8C8] text-sm sm:text-base leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Don&apos;t risk your expensive smartphone or laptop with inexperienced roadside mechanics. Walk into our flagship cleanroom lab on G.M.S. Road, Dehradun for genuine OEM parts, 90-day warranty, and 45-minute express turnaround.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="#booking-form"
                className="px-6 py-3.5 rounded-2xl bg-[#4ADE80] hover:bg-[#22C55E] text-[#122016] font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Wrench className="w-4 h-4 text-[#122016]" />
                <span>Book Dehradun Repair Slot</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="px-6 py-3.5 rounded-2xl bg-[#1A3123]/90 hover:bg-[#254632] text-white font-semibold text-sm border border-[#2D543B] transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Phone className="w-4 h-4 text-[#86EFAC]" />
                <span>Call Repair Desk</span>
              </a>
            </div>
          </div>

          <div className="w-full md:w-80 bg-[#14261B]/85 border border-[#2B4B35]/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl space-y-4 text-white">
            <h3 className="font-bold text-sm text-white font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
              Repair Guarantees
            </h3>
            <ul className="space-y-2.5 text-xs text-[#C5D8C9]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>90-Day Unconditional Warranty</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Data Privacy & Security</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Inspection Fee if Not Repaired</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Original Serial Number Calibration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Dehradun Localities Coverage */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm text-slate-900">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900 font-heading">
              Dehradun Localities Served at Our G.M.S. Road Repair Lab
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-6">
            Customers from all across Dehradun valley walk into our cleanroom lab for genuine parts & 45-minute express turnaround:
          </p>
          <div className="flex flex-wrap gap-2">
            {SITE_CONFIG.repairDehradunAreas.map((area) => (
              <span
                key={area}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Repair Booking Form */}
        <div id="booking-form" className="bg-white p-5 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl max-w-3xl mx-auto text-slate-900">
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
              Reserve Store Slot • Dehradun Only
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-2">
              Book a Dehradun Repair Appointment
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Takes only 30 seconds. Opens direct priority chat with our G.M.S. Road service team.
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alok Sharma"
                  className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#244A30] bg-slate-50 text-slate-900 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#244A30] bg-slate-50 text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Device Brand & Model *
                </label>
                <input
                  type="text"
                  required
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                  placeholder="e.g. iPhone 14 Pro / MacBook Air"
                  className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#244A30] bg-slate-50 text-slate-900 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Primary Issue
                </label>
                <select
                  value={form.issue}
                  onChange={(e) => setForm({ ...form, issue: e.target.value })}
                  className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#244A30] bg-slate-50 text-slate-900"
                >
                  <option>Screen / Touch Glass Broken</option>
                  <option>Battery Health Degraded / Needs Replacement</option>
                  <option>Charging Port Loose / Not Charging</option>
                  <option>Water Damage / Phone Dropped in Liquid</option>
                  <option>Speaker / Microphone Distortion</option>
                  <option>MacBook Screen / Battery / Keyboard Repair</option>
                  <option>Motherboard / No Power / Restart Loop</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Dehradun Locality
                </label>
                <select
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#244A30] bg-slate-50 text-slate-900"
                >
                  {SITE_CONFIG.repairDehradunAreas.map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preferred Store Visit Slot
                </label>
                <select
                  value={form.slot}
                  onChange={(e) => setForm({ ...form, slot: e.target.value })}
                  className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#244A30] bg-slate-50 text-slate-900"
                >
                  <option>Morning (10:00 AM - 1:00 PM)</option>
                  <option>Afternoon (1:00 PM - 4:00 PM)</option>
                  <option>Evening (4:00 PM - 8:00 PM)</option>
                  <option>Urgent / Visiting Store Today</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#16271D] hover:bg-[#244A30] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer mt-4 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#A7F3D0]" />
              <span>Confirm & Reserve Slot on WhatsApp</span>
            </button>
          </form>

          {submitted && (
            <p className="text-xs text-emerald-600 font-bold text-center mt-3">
              ✓ Appointment sent to WhatsApp! Our service executive will confirm your slot within 15 minutes.
            </p>
          )}
        </div>

        {/* Repair FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Everything you need to know about our repair process and policies
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-colors hover:border-slate-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 font-heading cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-emerald-600 shrink-0 transition-transform ${
                      activeFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
