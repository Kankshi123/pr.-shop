# 📱 Prateeksha Mobile Gallery – Premium Retail Web Application

> **Pitch-Ready Production Demo Website** built for **Prateeksha Mobile Gallery**, G.M.S. Road, Dehradun.
> Designed to amaze the store owner with real-time dynamic promotions, live countdown clocks, WhatsApp enquiry cart integration, and a dedicated doorstep repair booking engine.

---

## 🚀 Quick Start (Running Locally)

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Open in your browser (usually http://localhost:5173)
```

To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 🌟 Key Highlights & Client Pitch Features

1. **⚡ Dynamic Time-Based Offer Engine (`/src/data/offers.js` & `useActiveOffers`)**:
   - Offers automatically trigger based on the time of day, day of the week, or calendar date range.
   - **Morning Early Bird Deal** (9:00 AM – 12:00 PM): Free 25W Fast Charger with smartphone bookings.
   - **Evening Flash Sale** (6:00 PM – 10:00 PM): Extra 10% OFF on audio, AirPods, and phone cases.
   - **Weekend Super Deal** (Saturday & Sunday): Flat ₹2,000 instant discount on certified pre-owned MacBooks & ThinkPads.
   - **Festive Mega Celebration**: Grand festival savings auto-calculated relative to current date.
   - **Real-Time Countdown Clocks (HH:MM:SS)** ticking every single second across banners, cards, and product modals.
   - **Client Pitch Demo Mode**: Click the floating **"Client Pitch Demo"** pill at the bottom-left of the screen to simulate Morning, Evening, Weekend, or Festive time without changing your computer's clock!

2. **🛍️ 40+ Pre-Configured Gadgets (`/src/data/products.js`)**:
   - Master catalog of 40+ items spanning:
     - **Smartphones**: Apple iPhone 15, 15 Pro Max, Samsung Galaxy S24 Ultra, OnePlus 12, Google Pixel 8a, Nothing Phone (2a), Vivo V30 Pro, Xiaomi 14, etc.
     - **Accessories**: Apple AirPods Pro 2, Anker 65W GaN Chargers, JBL Flip 6, Galaxy Watch 6, Spigen MagSafe covers, 9H privacy tempered glass.
     - **Certified Pre-Owned Phones**: Grade A+ / Grade A certified iPhones and Samsung Galaxy phones with battery health indicators (e.g. 92%) and 6-month store warranty.
     - **Certified Pre-Owned Laptops**: Apple MacBook Air M1, MacBook Pro 14 M1 Pro, Lenovo ThinkPad T14, Dell Latitude, and Asus ROG Zephyrus gaming laptop.
   - Fully neutral SVG device illustrations with sleek mockups (no copyright infringements).

3. **🛵 Dehradun-Exclusive Doorstep Repair with Free Pick & Drop**:
   - Strict notice: **Available ONLY in Dehradun**.
   - 3-step visual workflow (Book -> Free Doorstep Pickup -> Repaired in 4 Hours).
   - Locality selector covering G.M.S. Road, Rajpur Road, Ballupur, Clement Town, Jakhan, Premnagar, etc.
   - Repair booking form that generates an instant, pre-filled WhatsApp dispatch ticket.

4. **💬 WhatsApp Enquiry Cart & Single-Click Product Enquiries**:
   - Direct WhatsApp integration with deep links (`https://wa.me/919999999999?text=...`).
   - "Enquiry Cart" allows customers to select multiple gadgets, input optional notes, and compile everything into a single formatted quote request on WhatsApp.
   - Wishlist drawer with fallback local storage persistence.

5. **🕒 Computed Live Store Hours**:
   - Checks local time (10:00 AM – 9:30 PM, Open 7 Days).
   - Displays real-time **"Open Now"** (emerald glow) or **"Closed Now"** (amber status).

---

## 🛠️ How to Customize Data

### 1. Update Store Contact Info & Address
Open [`/src/config/site.js`](file:///c:/Users/varsh/pr.%20shop/src/config/site.js):
```javascript
export const SITE_CONFIG = {
  name: "Prateeksha Mobile Gallery",
  phone: "+91 99999 99999",
  whatsappNumber: "919999999999", // Change to client's 10-digit WhatsApp number (with 91 prefix)
  address: {
    full: "Shop No. 4, Ground Floor, Opp. Reliance Digital, G.M.S. Road, Dehradun",
    // ...
  },
  timings: {
    openHour: 10,   // 10:00 AM
    closeHour: 21.5 // 9:30 PM
  }
};
```

### 2. Add or Edit Products
Open [`/src/data/products.js`](file:///c:/Users/varsh/pr.%20shop/src/data/products.js):
```javascript
{
  id: "my-new-product",
  name: "Apple iPhone 16",
  brand: "Apple",
  category: "smartphone", // smartphone | accessory | preowned-phone | preowned-laptop
  os: "ios",              // ios | android
  price: 79999,
  mrp: 89900,
  specs: ["128GB Storage", "A18 Chip", "Camera Control Button"],
  stock: 10,
  featured: true,
  deliveryDays: "Same-Day in Dehradun / 2-3 Days Pan India"
}
```

### 3. Add or Modify Time-Based Offers
Open [`/src/data/offers.js`](file:///c:/Users/varsh/pr.%20shop/src/data/offers.js):
```javascript
{
  id: "afternoon-special",
  title: "⚡ Afternoon Audio Delight",
  subtitle: "Flat 15% off on all Bluetooth Speakers",
  discountText: "15% OFF",
  discountPercent: 15,
  categories: ["accessory"],
  timeWindow: "14:00-17:00", // Daily between 2 PM and 5 PM
  priority: 8,
  // ...
}
```

### 4. Customizing Theme Colors
All colors are defined as CSS tokens in [`src/index.css`](file:///c:/Users/varsh/pr.%20shop/src/index.css):
```css
:root {
  --midnight: #0B1020;
  --indigo: #4F46E5;
  --cyan: #22D3EE;
  --offer: #FF6B35;
  --bg-light: #F8FAFC;
  --text: #0F172A;
  --muted: #64748B;
  --success: #10B981;
}
```

---

## 📁 Project Architecture

```
pr. shop/
├── public/                 # Static assets & favicon
├── src/
│   ├── config/
│   │   └── site.js         # Site configuration, phone numbers & timings
│   ├── context/
│   │   └── StoreContext.jsx# Wishlist, Enquiry Cart & WhatsApp compiler
│   ├── data/
│   │   ├── offers.js       # Dynamic time-window rules & flash sale data
│   │   └── products.js     # Master catalog (40+ items with specs & pricing)
│   ├── hooks/
│   │   ├── useActiveOffers.jsx # 30s interval clock + demo simulator
│   │   └── useStoreStatus.js   # Live Open/Closed store indicator
│   ├── components/
│   │   ├── common/         # Navbar, Footer, ProductCard, Modal, Drawers, DemoMode
│   │   └── home/           # Hero, Carousel, Categories, Repair, Delivery, Testimonials
│   ├── pages/
│   │   ├── HomePage.jsx    # Flagship landing page
│   │   ├── ProductsPage.jsx# 40+ products catalog with multi-facet filters
│   │   ├── RepairPage.jsx  # Dehradun doorstep repair guide & booking
│   │   ├── OffersPage.jsx  # Live promotions & pitch simulation hub
│   │   └── ContactPage.jsx # GMS Road showroom guide & maps
│   ├── index.css           # Design tokens, typography & animations
│   ├── App.jsx             # Main Router & Provider wiring
│   └── main.jsx            # Application root
├── index.html              # SEO metadata, OpenGraph tags & Google Fonts
├── vite.config.js          # Vite + TailwindCSS config
└── package.json            # React 19, Framer Motion, Lucide React, React Router
```

---

## 🎯 Pitch Tips for the Client Meeting

1. **Start on the Homepage**: Highlight the clean modern dark hero, glowing ambient particles, and instant trust badges emphasizing **"G.M.S. Road, Dehradun"**.
2. **Demonstrate the Offer Simulator**: Open the small pill at the bottom-left ("Client Pitch Demo"). Switch between **Morning Deal**, **Evening Flash Sale**, and **Weekend Special** to show the client how their website automatically promotes the right deals without any manual work.
3. **Showcase the Doorstep Repair Section**: Emphasize how this creates a unique selling proposition against Amazon/Flipkart by offering **Free Same-Day Pick & Drop across Dehradun** with direct WhatsApp dispatch.
4. **Demonstrate the WhatsApp Enquiry Cart**: Add 2-3 products to the enquiry list and click **"Send Enquiry on WhatsApp"** to show how leads arrive formatted directly on the owner's phone.
