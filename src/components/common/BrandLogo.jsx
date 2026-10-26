import React from 'react';

export const BrandLogo = ({ brand, className = 'w-6 h-6' }) => {
  const norm = (brand || '').toLowerCase().trim();

  // 1. Apple
  if (norm.includes('apple')) {
    return (
      <svg className={className} viewBox="0 0 170 170" fill="currentColor" aria-label="Apple">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.79-11.71-14.25-5.99-9.47-10.74-20.09-14.25-31.86-3.51-11.76-5.26-22.97-5.26-33.62 0-14.6 3.66-26.69 10.98-36.27 7.32-9.59 16.59-14.48 27.81-14.69 4.8 0 10.23 1.34 16.3 4.02 6.07 2.68 10.05 4.08 11.95 4.2 1.5.12 5.61-1.34 12.33-4.38 6.72-3.04 12.42-4.43 17.1-4.17 12.63.63 22.84 5.37 30.63 14.22-10.99 6.64-16.36 15.77-16.12 27.38.25 9.17 3.84 16.92 10.78 23.24 6.94 6.33 15.35 9.94 25.23 10.84-2.22 6.78-4.78 13.29-7.68 19.53zM119.22 33.72c0-7.39 2.67-14.42 8.01-21.09 5.34-6.67 11.98-11.02 19.92-13.06.33 1.09.49 2.19.49 3.3 0 7.29-2.73 14.36-8.2 21.2-5.46 6.84-12.18 11.09-20.15 12.75-.05-1.03-.07-2.07-.07-3.1z" />
      </svg>
    );
  }

  // 2. Google
  if (norm.includes('google')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Google">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    );
  }

  // 3. OnePlus
  if (norm.includes('oneplus')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="OnePlus">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" strokeWidth="2.2" />
        <path d="M9 7.5h2v9H9M9 7.5L7.5 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 12h5M16.5 9.5v5" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 4. Samsung
  if (norm.includes('samsung')) {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-label="Samsung">
        <ellipse cx="16" cy="16" rx="15" ry="8" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-15 16 16)" />
        <text
          x="16"
          y="19"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1"
          fill="currentColor"
        >
          SAMSUNG
        </text>
      </svg>
    );
  }

  // 5. boAt
  if (norm.includes('boat')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="boAt">
        {/* Stylized Sail and Hull for boAt */}
        <path d="M12.5 2.5L5.5 13.5h13L12.5 2.5zm0 3.8l3.8 5.7h-7.6l3.8-5.7zM3 15.5l2.8 5.5h12.4l2.8-5.5H3z" />
      </svg>
    );
  }

  // 6. JBL
  if (norm.includes('jbl')) {
    return (
      <svg className={className} viewBox="0 0 32 20" fill="currentColor" aria-label="JBL">
        <rect x="1" y="1" width="30" height="18" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <text
          x="16"
          y="14.5"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.5"
          fill="currentColor"
        >
          JBL
        </text>
      </svg>
    );
  }

  // 7. Anker
  if (norm.includes('anker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Anker">
        <path d="M12 2a3.5 3.5 0 00-3.5 3.5c0 1.4.8 2.6 2 3.1v1.9H7.5v2h3v5.2A6.5 6.5 0 014.2 13H2a8.5 8.5 0 008.5 8.4V22h3v-.6A8.5 8.5 0 0022 13h-2.2a6.5 6.5 0 01-6.3 4.7v-5.2h3v-2h-3V8.6c1.2-.5 2-1.7 2-3.1A3.5 3.5 0 0012 2zm0 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
      </svg>
    );
  }

  // 8. Spigen
  if (norm.includes('spigen')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="Spigen">
        <path d="M12 2L3.5 6.5v11L12 22l8.5-4.5v-11L12 2z" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14.5 9.5h-3.8a1.7 1.7 0 000 3.4h2.6a1.7 1.7 0 010 3.4H9.5" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. HP
  if (norm.includes('hp')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="HP">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path d="M8.5 16.5l3-9M12.5 16.5l3-9M6.5 12h5M12.5 12h5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Default fallback badge
  return (
    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
      {brand.charAt(0)}
    </span>
  );
};
