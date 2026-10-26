import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

export const useStoreStatus = () => {
  const [status, setStatus] = useState({
    isOpen: true,
    statusText: 'Open Now',
    subText: 'Closes at 9:30 PM',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
  });

  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date();
      // Current hours in decimal (e.g. 17.5 for 5:30 PM)
      const currentDecimalHour = now.getHours() + now.getMinutes() / 60;
      const { openHour, closeHour } = SITE_CONFIG.timings;

      if (currentDecimalHour >= openHour && currentDecimalHour < closeHour) {
        setStatus({
          isOpen: true,
          statusText: 'Open Now',
          subText: 'Closes at 9:30 PM • Walk-in or Order Online',
          badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
        });
      } else {
        setStatus({
          isOpen: false,
          statusText: 'Closed Now',
          subText: 'Opens tomorrow at 10:00 AM • WhatsApp 24/7 Active',
          badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
        });
      }
    };

    calculateStatus();
    const interval = setInterval(calculateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return status;
};
