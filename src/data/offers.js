/**
 * Dynamic Time-Based Offer Rules & Data
 * Offers automatically trigger based on:
 * - Date ranges (startAt, endAt)
 * - Daily time windows (e.g. 18:00-22:00 for flash sale)
 * - Specific days of the week (e.g. Saturday & Sunday for weekend specials)
 * - Category / Product matching
 */

// Helper to get relative ISO strings so festive offers are always valid regardless of the current year
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentDay = now.getDate();

const makeDate = (offsetDays, hours = 0, minutes = 0) => {
  const d = new Date(currentYear, currentMonth, currentDay + offsetDays, hours, minutes, 0);
  return d.toISOString();
};

export const OFFERS_DATA = [
  {
    id: "festive-mega-sale",
    title: "✨ Festive Season Tech Celebration",
    subtitle: "A season worth celebrating. Special curated discounts across all smartphones & pre-owned gear.",
    discountText: "UP TO 35% OFF",
    discountPercent: 12,
    couponCode: "FESTIVE12",
    isAd: true,
    adBadge: "📢 SPONSORED AD",
    adHeadline: "FESTIVE MEGA TECH SALE",
    categories: ["smartphone", "accessory", "preowned-phone", "preowned-laptop"],
    startAt: makeDate(-7),
    endAt: makeDate(28),
    priority: 10,
    theme: {
      gradient: "from-[#16291C] via-[#23422E] to-[#122217]",
      accent: "#86EFAC",
      badgeBg: "bg-[#1E3A27] text-[#86EFAC] border border-[#315D3F]",
      glow: "shadow-[0_0_30px_rgba(74,222,128,0.25)]"
    },
    icon: "Gift",
    badgeText: "FESTIVE PRICES",
    announcement: "A season worth celebrating. Explore curated festive prices across Dehradun!"
  },
  {
    id: "evening-flash-sale",
    title: "⚡ Evening Flash Sale (6 PM - 10 PM)",
    subtitle: "Flat 10% Extra OFF on Premium Audio & Mobile Cases",
    discountText: "EXTRA 10% OFF",
    discountPercent: 10,
    couponCode: "FLASH10",
    isAd: true,
    adBadge: "⚡ FLASH SALE AD",
    adHeadline: "EVENING AUDIO & ACCESSORIES FLASH DEAL",
    categories: ["accessory"],
    applicableProducts: ["p-acc-1", "p-acc-2", "p-acc-4", "p-acc-7"],
    startAt: makeDate(-30),
    endAt: makeDate(365),
    timeWindow: "18:00-22:00", // 6 PM to 10 PM daily
    priority: 9,
    theme: {
      gradient: "from-[#1A2E20] via-[#2D4F37] to-[#16271D]",
      accent: "#86EFAC",
      badgeBg: "bg-[#25422E] text-[#86EFAC]",
      glow: "shadow-[0_0_25px_rgba(134,239,172,0.25)]"
    },
    icon: "Zap",
    badgeText: "⚡ FLASH SALE",
    announcement: "🔥 Evening Flash Sale Live! Extra 10% OFF on AirPods & Powerbanks till 10 PM!"
  },
  {
    id: "morning-express-deal",
    title: "🌅 Morning Early Bird Special (9 AM - 12 PM)",
    subtitle: "Free 25W Fast Charger on all New Smartphone Bookings",
    discountText: "FREE 25W CHARGER",
    discountPercent: 5,
    couponCode: "EARLYBIRD",
    isAd: true,
    adBadge: "🌅 EARLY BIRD AD",
    adHeadline: "MORNING FLAGSHIP PHONE PROMO",
    categories: ["smartphone"],
    applicableProducts: ["p-phone-1", "p-phone-2", "p-phone-3", "p-phone-5"],
    startAt: makeDate(-30),
    endAt: makeDate(365),
    timeWindow: "09:00-12:00", // 9 AM to 12 PM daily
    priority: 8,
    theme: {
      gradient: "from-[#1B3223] via-[#2A4D37] to-[#14261A]",
      accent: "#86EFAC",
      badgeBg: "bg-[#24452F] text-[#86EFAC]",
      glow: "shadow-[0_0_25px_rgba(134,239,172,0.2)]"
    },
    icon: "Sunrise",
    badgeText: "🌅 EARLY BIRD",
    announcement: "🌅 Early Bird Special: Free 25W Fast Charger with smartphone bookings today before 12 PM!"
  },
  {
    id: "weekend-super-deal",
    title: "🎉 Dehradun Weekend Gadget Fest",
    subtitle: "Flat ₹2,000 Off on Certified Laptops & Free Tempered Glass",
    discountText: "FLAT ₹2,000 OFF",
    discountAmount: 2000,
    discountPercent: 8,
    couponCode: "WEEKEND2K",
    isAd: true,
    adBadge: "🎉 WEEKEND AD",
    adHeadline: "WEEKEND LAPTOP & PHONE BONANZA",
    categories: ["preowned-laptop", "preowned-phone"],
    applicableProducts: ["p-lap-1", "p-lap-2", "p-phone-pre-1"],
    daysOfWeek: [0, 6], // Sunday = 0, Saturday = 6
    startAt: makeDate(-30),
    endAt: makeDate(365),
    priority: 8,
    theme: {
      gradient: "from-[#15251B] via-[#2A4B34] to-[#182C1F]",
      accent: "#D4AF37",
      badgeBg: "bg-[#274630] text-[#FDE047]",
      glow: "shadow-[0_0_25px_rgba(250,204,21,0.25)]"
    },
    icon: "Sparkles",
    badgeText: "🎉 WEEKEND SPECIAL",
    announcement: "🎉 Weekend Special: Extra ₹2,000 instant discount on certified pre-owned MacBooks & ThinkPads!"
  },
  {
    id: "repair-dehradun-lab",
    title: "🔧 Express In-Store Repair • Exclusively in Dehradun",
    subtitle: "Walk in to our G.M.S. Road cleanroom lab. 45-minute fixes with 90-day warranty!",
    discountText: "DEHRADUN LAB ONLY",
    discountPercent: 0,
    couponCode: "DEHRADUNLAB",
    isAd: true,
    adBadge: "📍 LAB SPECIAL AD",
    adHeadline: "IN-STORE DEHRADUN REPAIR CLINIC",
    categories: ["repair"],
    startAt: makeDate(-90),
    endAt: makeDate(365),
    priority: 7,
    theme: {
      gradient: "from-[#132217] via-[#223D2A] to-[#17291C]",
      accent: "#86EFAC",
      badgeBg: "bg-[#1E3926] text-[#86EFAC]",
      glow: "shadow-[0_0_25px_rgba(134,239,172,0.2)]"
    },
    icon: "Wrench",
    badgeText: "📍 DEHRADUN EXCLUSIVE",
    announcement: "🔧 Repair available strictly in Dehradun store • 📦 All products delivered All Over India!"
  },
  {
    id: "preowned-clearance",
    title: "💎 Certified Pre-Owned Assurance",
    subtitle: "32-Point Quality Inspected + 6-Month Replacement Warranty + 85%+ Battery Health Guarantee",
    discountText: "UP TO 50% VS NEW",
    discountPercent: 7,
    couponCode: "PREOWNED7",
    isAd: true,
    adBadge: "💎 VERIFIED AD",
    adHeadline: "CERTIFIED PRE-OWNED CLEARANCE",
    categories: ["preowned-phone", "preowned-laptop"],
    applicableProducts: ["p-phone-pre-1", "p-phone-pre-2", "p-phone-pre-3", "p-lap-1", "p-lap-3"],
    startAt: makeDate(-60),
    endAt: makeDate(365),
    priority: 6,
    theme: {
      gradient: "from-[#17291D] via-[#294B34] to-[#142318]",
      accent: "#86EFAC",
      badgeBg: "bg-[#203D2A] text-[#86EFAC]",
      glow: "shadow-[0_0_25px_rgba(134,239,172,0.2)]"
    },
    icon: "ShieldCheck",
    badgeText: "💎 CERTIFIED SAVINGS",
    announcement: "💎 Certified Pre-Owned: Grade-A iPhones & Laptops at up to 50% lower than retail!"
  }
];

// Fallback banner matching user screenshot
export const DEFAULT_OFFER_BANNER = {
  id: "default-festive",
  title: "A season worth celebrating.",
  subtitle: "Original Smartphones, Certified Pre-Owned & Delivery All Over India (Repair Exclusively in Dehradun)",
  discountText: "FESTIVE PRICES",
  couponCode: "CELEBRATE",
  isAd: true,
  adBadge: "📢 FEATURED AD",
  adHeadline: "SEASON CELEBRATION TECH OFFER",
  theme: {
    gradient: "from-[#142318] via-[#24422D] to-[#122016]",
    accent: "#86EFAC",
    badgeBg: "bg-[#1C3624] text-[#86EFAC]",
    glow: "shadow-[0_0_20px_rgba(134,239,172,0.2)]"
  },
  icon: "Award",
  badgeText: "FESTIVE PRICES",
  announcement: "A season worth celebrating. Explore curated festive prices across Dehradun!"
};
