import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { OFFERS_DATA, DEFAULT_OFFER_BANNER } from '../data/offers';

const OfferContext = createContext(null);

export const SIMULATION_MODES = {
  REAL: 'real',
  MORNING: 'morning',     // 10:30 AM (Morning Early Bird)
  EVENING: 'evening',     // 19:45 (Evening Flash Sale 6-10 PM)
  WEEKEND: 'weekend',     // Saturday 16:00 (Weekend Special)
  FESTIVE: 'festive',     // Festive Mega Sale
};

export const OfferProvider = ({ children }) => {
  const [simulationMode, setSimulationMode] = useState(() => {
    // Check URL param ?demo=1 or stored preference
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const demoParam = params.get('demo');
      if (demoParam && SIMULATION_MODES[demoParam.toUpperCase()]) {
        return SIMULATION_MODES[demoParam.toUpperCase()];
      }
      return localStorage.getItem('pmg_demo_time_mode') || SIMULATION_MODES.REAL;
    }
    return SIMULATION_MODES.REAL;
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Listen to storage or param changes
  const changeSimulationMode = (mode) => {
    setSimulationMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pmg_demo_time_mode', mode);
    }
  };

  // Clock tick every second for smooth live countdown timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute effective date based on simulation mode
  const effectiveDate = useMemo(() => {
    const d = new Date(currentTime);
    if (simulationMode === SIMULATION_MODES.MORNING) {
      // Force 10:45 AM on a Wednesday
      d.setHours(10, 45, currentTime.getSeconds(), 0);
      d.setDate(d.getDate() - (d.getDay() === 0 || d.getDay() === 6 ? 2 : 0));
    } else if (simulationMode === SIMULATION_MODES.EVENING) {
      // Force 19:30 (7:30 PM) on a weekday
      d.setHours(19, 30, currentTime.getSeconds(), 0);
      d.setDate(d.getDate() - (d.getDay() === 0 || d.getDay() === 6 ? 2 : 0));
    } else if (simulationMode === SIMULATION_MODES.WEEKEND) {
      // Force Saturday 15:30
      const day = d.getDay();
      const diff = 6 - day;
      d.setDate(d.getDate() + diff);
      d.setHours(15, 30, currentTime.getSeconds(), 0);
    } else if (simulationMode === SIMULATION_MODES.FESTIVE) {
      d.setHours(14, 20, currentTime.getSeconds(), 0);
    }
    return d;
  }, [currentTime, simulationMode]);

  // Check if an offer is currently live
  const isOfferLive = useCallback((offer, checkDate) => {
    if (simulationMode === SIMULATION_MODES.FESTIVE && offer.id === 'festive-mega-sale') {
      return true;
    }
    if (simulationMode === SIMULATION_MODES.MORNING && offer.id === 'morning-express-deal') {
      return true;
    }
    if (simulationMode === SIMULATION_MODES.EVENING && offer.id === 'evening-flash-sale') {
      return true;
    }
    if (simulationMode === SIMULATION_MODES.WEEKEND && offer.id === 'weekend-super-deal') {
      return true;
    }

    const start = offer.startAt ? new Date(offer.startAt) : null;
    const end = offer.endAt ? new Date(offer.endAt) : null;

    if (start && checkDate < start) return false;
    if (end && checkDate > end) return false;

    // Days of week check
    if (offer.daysOfWeek && Array.isArray(offer.daysOfWeek)) {
      const currentDay = checkDate.getDay();
      if (!offer.daysOfWeek.includes(currentDay)) return false;
    }

    // Time window check (format "HH:MM-HH:MM")
    if (offer.timeWindow) {
      const [startStr, endStr] = offer.timeWindow.split('-');
      const [startH, startM] = startStr.split(':').map(Number);
      const [endH, endM] = endStr.split(':').map(Number);

      const curH = checkDate.getHours();
      const curM = checkDate.getMinutes();
      const curMinutes = curH * 60 + curM;
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      if (curMinutes < startMinutes || curMinutes >= endMinutes) {
        return false;
      }
    }

    return true;
  }, [simulationMode]);

  // Filter and sort active offers
  const activeOffers = useMemo(() => {
    const list = OFFERS_DATA.filter((offer) => isOfferLive(offer, effectiveDate));
    return list.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }, [effectiveDate, isOfferLive]);

  // Top banner offer (highest priority live offer or fallback)
  const primaryOffer = useMemo(() => {
    return activeOffers.length > 0 ? activeOffers[0] : DEFAULT_OFFER_BANNER;
  }, [activeOffers]);

  // Calculate remaining seconds for an offer
  const getOfferTimeRemaining = useCallback((offer) => {
    if (!offer) return { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };

    if (offer.timeWindow) {
      const [, endStr] = offer.timeWindow.split('-');
      const [endH, endM] = endStr.split(':').map(Number);
      const nowH = effectiveDate.getHours();
      const nowM = effectiveDate.getMinutes();
      const nowS = effectiveDate.getSeconds();

      const totalTargetSeconds = (endH * 3600) + (endM * 60);
      const currentTotalSeconds = (nowH * 3600) + (nowM * 60) + nowS;
      let remaining = totalTargetSeconds - currentTotalSeconds;
      if (remaining < 0) remaining = 0;

      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;
      return { hours, minutes, seconds, totalSeconds: remaining };
    }

    if (offer.endAt) {
      const end = new Date(offer.endAt).getTime();
      const diff = Math.max(0, Math.floor((end - effectiveDate.getTime()) / 1000));
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;
      return { hours, minutes, seconds, totalSeconds: diff };
    }

    // Default 4 hours ticking demo timer
    const defaultSecs = 14400 - ((effectiveDate.getMinutes() * 60 + effectiveDate.getSeconds()) % 14400);
    return {
      hours: Math.floor(defaultSecs / 3600),
      minutes: Math.floor((defaultSecs % 3600) / 60),
      seconds: defaultSecs % 60,
      totalSeconds: defaultSecs
    };
  }, [effectiveDate]);

  // Compute pricing with active offers applied
  const getProductPricing = useCallback((product) => {
    if (!product) return { price: 0, mrp: 0, hasDiscount: false, activeOffer: null };

    // Find first active offer that matches this product or its category
    const matchingOffer = activeOffers.find((offer) => {
      if (offer.applicableProducts && offer.applicableProducts.includes(product.id)) {
        return true;
      }
      if (offer.categories && offer.categories.includes(product.category)) {
        return true;
      }
      return false;
    });

    if (!matchingOffer) {
      return {
        effectivePrice: product.price,
        originalPrice: product.mrp,
        hasDiscount: false,
        activeOffer: null,
        discountText: null,
        savings: product.mrp - product.price
      };
    }

    let discountPrice = product.price;
    if (matchingOffer.discountPercent) {
      discountPrice = Math.round(product.price * (1 - matchingOffer.discountPercent / 100));
    } else if (matchingOffer.discountAmount) {
      discountPrice = Math.max(1, product.price - matchingOffer.discountAmount);
    }

    return {
      effectivePrice: discountPrice,
      originalPrice: product.mrp,
      regularPrice: product.price,
      hasDiscount: true,
      activeOffer: matchingOffer,
      discountText: matchingOffer.discountText,
      savings: product.mrp - discountPrice
    };
  }, [activeOffers]);

  return (
    <OfferContext.Provider
      value={{
        activeOffers,
        primaryOffer,
        effectiveDate,
        simulationMode,
        setSimulationMode: changeSimulationMode,
        getOfferTimeRemaining,
        getProductPricing,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useActiveOffers = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useActiveOffers must be used within an OfferProvider');
  }
  return context;
};
