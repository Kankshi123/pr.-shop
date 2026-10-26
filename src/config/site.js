/**
 * Site Configuration for Prateeksha Mobile Gallery
 * Easily edit store contact, timings, addresses, and delivery settings here.
 */

export const SITE_CONFIG = {
  name: "Prateeksha Mobile Gallery",
  shortName: "PMG Dehradun",
  tagline: "Dehradun's Premier Mobile Store & Certified Pre-Owned Lounge",
  subtagline: "Authentic Smartphones, Premium Accessories & Pan-India Insured Delivery • Certified Device Repair Strictly in Dehradun.",
  
  // Contact & Social
  phone: "+91 99999 99999",
  phoneRaw: "+919999999999",
  whatsappNumber: "919999999999", // 10-digit Indian number with 91 prefix (no plus or spaces for wa.me)
  whatsappDisplay: "+91 99999 99999",
  email: "support@prateekshamobile.com",
  
  // Location
  address: {
    line1: "Shop No. 4, Ground Floor, Opp. Reliance Digital",
    line2: "Near Ballupur Chowk, G.M.S. Road",
    city: "Dehradun",
    state: "Uttarakhand",
    pincode: "248001",
    full: "Shop No. 4, Opp. Reliance Digital, Near Ballupur Chowk, G.M.S. Road, Dehradun, Uttarakhand - 248001",
    landmark: "G.M.S. Road, 200m from Ballupur Chowk",
  },

  // Map Embed (Interactive Google Map centered on G.M.S. Road, Dehradun)
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13774.791552835265!2d78.012356!3d30.329241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929f0e13768f5%3A0xc07c5770058da6f!2sGMS%20Road%2C%20Dehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=G.M.S.+Road+Dehradun+Uttarakhand",

  // Business Timings (10:00 AM - 9:30 PM, Monday - Sunday)
  timings: {
    openHour: 10, // 10 AM
    closeHour: 21.5, // 9:30 PM
    displayText: "10:00 AM – 9:30 PM (Open All 7 Days)",
    days: "Monday - Sunday",
  },

  // Trust Badges
  stats: [
    { value: "12,500+", label: "Happy Customers", icon: "Users" },
    { value: "1,200+", label: "Gadgets & Accessories", icon: "Smartphone" },
    { value: "9+ Years", label: "Trusted Store in Dehradun", icon: "ShieldCheck" },
    { value: "4.9 ★", label: "Google Store Rating", icon: "Star" },
  ],

  // Dehradun Localities Served for In-Store Repair (Dehradun Exclusive)
  repairDehradunAreas: [
    "G.M.S. Road", "Ballupur", "Rajpur Road", "Chakrata Road", "Premnagar", 
    "Vasant Vihar", "Clement Town", "Jakhan", "Subhash Nagar", "Karanpur", 
    "Dalanwala", "Sahastradhara Road", "Patel Nagar", "ISBT Area"
  ],

  // Social Links
  socials: {
    instagram: "https://instagram.com/prateekshamobilegallery",
    facebook: "https://facebook.com/prateekshamobilegallery",
    youtube: "https://youtube.com/@prateekshamobilegallery",
    googleReviews: "https://g.page/r/prateekshamobilegallery/review",
  },

  // WhatsApp Message Generator Helpers
  createWhatsAppLink: (message) => {
    return `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
  }
};
