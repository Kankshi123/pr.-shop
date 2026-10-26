import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock, Mail, Navigation, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { SITE_CONFIG } from '../../config/site';
import { useStoreStatus } from '../../hooks/useStoreStatus';

export const ContactSection = ({ dark }) => {
  const location = useLocation();
  const isDark = dark !== undefined ? dark : location.pathname === '/';
  const storeStatus = useStoreStatus();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendQuery = (e) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    let text = `*New Customer Message from Website*\n\n`;
    text += `*Name:* ${contactName}\n`;
    text += `*Phone:* ${contactPhone}\n`;
    if (contactMsg) {
      text += `*Message:* ${contactMsg}\n`;
    }
    text += `\nPlease revert at your earliest convenience.`;

    const url = SITE_CONFIG.createWhatsAppLink(text);
    setSentSuccess(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className={`py-12 sm:py-20 relative overflow-hidden ${isDark ? 'z-10 text-[#F3F8F4]' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark={isDark}
          badge="Visit Our Showroom"
          title="Connect with"
          highlight="Prateeksha Gallery"
          subtitle="Conveniently situated on G.M.S. Road, Dehradun. Walk in to test drive smartphones, get instant repair diagnostics, or chat with us on WhatsApp."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Live Timings */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Store Timings Card */}
            <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#14261B]/85 border-[#2D5039]/80 backdrop-blur-xl shadow-xl' : 'bg-white border-slate-200/90 shadow-sm'} border space-y-3`}>
              <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-[#233F2B]' : 'border-slate-100'}`}>
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${isDark ? 'text-[#86EFAC]' : 'text-emerald-600'}`} />
                  <h4 className={`font-bold text-sm font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>Store Hours</h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${storeStatus.badgeColor}`}>
                  {storeStatus.statusText}
                </span>
              </div>

              <div className={`space-y-1.5 text-xs ${isDark ? 'text-[#C5D8C9]' : 'text-slate-600'}`}>
                <div className="flex justify-between py-1">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Monday – Sunday</span>
                  <span className={`font-bold ${isDark ? 'text-[#86EFAC]' : 'text-emerald-700'}`}>10:00 AM – 9:30 PM</span>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-[#A2BEA9]' : 'text-slate-500'} pt-1`}>
                  Open all 7 days of the week including public holidays.
                </p>
              </div>
            </div>

            {/* Address & Navigation Card */}
            <div className={`p-6 rounded-3xl ${isDark ? 'bg-[#14261B]/85 border-[#2D5039]/80 backdrop-blur-xl shadow-xl' : 'bg-white border-slate-200/90 shadow-sm'} border space-y-4`}>
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-2xl ${isDark ? 'bg-[#1C3625] text-[#86EFAC]' : 'bg-emerald-50 text-emerald-700'} shrink-0 mt-0.5`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Store Address</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#C5D8C9]' : 'text-slate-600'}`}>
                    {SITE_CONFIG.address.full}
                  </p>
                  <p className={`text-[11px] font-semibold mt-1 ${isDark ? 'text-[#86EFAC]' : 'text-emerald-700'}`}>
                    Landmark: {SITE_CONFIG.address.landmark}
                  </p>
                </div>
              </div>

              <a
                href={SITE_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  isDark
                    ? 'bg-[#86EFAC] hover:bg-[#A7F3D0] text-[#122016]'
                    : 'bg-[#16271D] hover:bg-[#244A30] text-white'
                }`}
              >
                <Navigation className={`w-4 h-4 ${isDark ? 'text-[#122016]' : 'text-[#A7F3D0]'}`} />
                <span>Get Google Maps Directions</span>
              </a>
            </div>

            {/* Direct Contacts */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className={`p-4 rounded-2xl border transition-all text-center block shadow-sm ${
                  isDark
                    ? 'bg-[#14261B]/80 border-[#2D5039]/70 hover:border-[#4ADE80]/50 backdrop-blur-xl'
                    : 'bg-white border-slate-200/90 hover:border-emerald-300'
                }`}
              >
                <Phone className={`w-5 h-5 mx-auto mb-1.5 ${isDark ? 'text-[#86EFAC]' : 'text-emerald-600'}`} />
                <span className={`block text-[11px] ${isDark ? 'text-[#A2BEA9]' : 'text-slate-500'}`}>Call Directly</span>
                <strong className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{SITE_CONFIG.phone}</strong>
              </a>

              <a
                href={SITE_CONFIG.createWhatsAppLink('Hello! I would like to inquire about products.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border transition-all text-center block shadow-sm ${
                  isDark
                    ? 'bg-[#14261B]/80 border-[#2D5039]/70 hover:border-[#4ADE80]/50 backdrop-blur-xl'
                    : 'bg-white border-slate-200/90 hover:border-emerald-300'
                }`}
              >
                <MessageCircle className={`w-5 h-5 mx-auto mb-1.5 ${isDark ? 'text-[#86EFAC]' : 'text-emerald-600'}`} />
                <span className={`block text-[11px] ${isDark ? 'text-[#86EFAC]' : 'text-emerald-600 font-semibold'}`}>Instant Chat</span>
                <strong className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>WhatsApp Store</strong>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed & Quick Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Embedded Google Map */}
            <div className={`rounded-3xl overflow-hidden border ${isDark ? 'border-[#2D5039]/80 bg-[#0D1811]' : 'border-slate-200/90 bg-slate-100'} shadow-lg h-72 sm:h-80 relative`}>
              <iframe
                title="Prateeksha Mobile Gallery GMS Road Dehradun Map"
                src={SITE_CONFIG.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className={`absolute bottom-3 left-3 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border text-xs font-bold flex items-center gap-1.5 ${
                isDark ? 'bg-[#122016]/95 border-[#2D5039] text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>G.M.S. Road, Dehradun</span>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm ${
              isDark ? 'bg-[#14261B]/85 border-[#2D5039]/80 backdrop-blur-xl' : 'bg-white border-slate-200/90'
            }`}>
              <h4 className={`font-bold text-sm font-heading mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Send className={`w-4 h-4 ${isDark ? 'text-[#86EFAC]' : 'text-emerald-600'}`} />
                Send a Quick Store Enquiry
              </h4>

              <form onSubmit={handleSendQuery} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Name *"
                    className={`w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                      isDark
                        ? 'border-[#2D5039] focus:border-[#4ADE80] bg-[#0D1811] text-white placeholder-[#789680]'
                        : 'border-slate-200 focus:border-[#244A30] bg-slate-50 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Your WhatsApp/Phone Number *"
                    className={`w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                      isDark
                        ? 'border-[#2D5039] focus:border-[#4ADE80] bg-[#0D1811] text-white placeholder-[#789680]'
                        : 'border-slate-200 focus:border-[#244A30] bg-slate-50 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <textarea
                  rows={2}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Which smartphone model, accessory, or repair service do you need?"
                  className={`w-full text-base sm:text-xs px-3.5 py-2 rounded-xl border focus:outline-none ${
                    isDark
                      ? 'border-[#2D5039] focus:border-[#4ADE80] bg-[#0D1811] text-white placeholder-[#789680]'
                      : 'border-slate-200 focus:border-[#244A30] bg-slate-50 text-slate-900 placeholder-slate-400'
                  }`}
                />

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                    isDark
                      ? 'bg-[#86EFAC] hover:bg-[#A7F3D0] text-[#122016]'
                      : 'bg-[#16271D] hover:bg-[#244A30] text-white'
                  }`}
                >
                  <MessageCircle className={`w-4 h-4 ${isDark ? 'text-[#122016]' : 'text-[#A7F3D0]'}`} />
                  <span>Send Message on WhatsApp</span>
                </button>
                {sentSuccess && (
                  <div className={`flex items-center gap-2 text-xs font-semibold mt-2 ${isDark ? 'text-[#86EFAC]' : 'text-emerald-700'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Redirecting to WhatsApp with your query...</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
