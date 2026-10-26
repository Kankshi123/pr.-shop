import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const Global3DBackground = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);

  // Full page height continuous scroll listener
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
      const winHeight = window.innerHeight || 800;
      const maxScroll = Math.max(docHeight - winHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      setScrollProgress(progress);
      setWindowHeight(winHeight);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    const handleResize = () => {
      updateScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial measurement
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Subtle interactive 3D mouse perspective on desktop (disabled on touch devices)
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mouseTicking = false;
    const handleMouseMove = (e) => {
      if (!mouseTicking) {
        window.requestAnimationFrame(() => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          // Very gentle micro-shift (+/- 12px) for refined 3D depth
          const dx = ((e.clientX - centerX) / centerX) * 12;
          const dy = ((e.clientY - centerY) / centerY) * 12;
          setMouseOffset({ x: dx, y: dy });
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Travel distance: 34% of screen height throughout the full page scroll
  const travelDistance = windowHeight * 0.34;
  // Only display 3D background on landing page
  if (!isHomePage) return null;

  const currentY = -scrollProgress * travelDistance;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0C160F]"
    >
      {/* 3D Moving Showroom Canvas - Moves continuously all the way to the bottom of the page */}
      <div
        className="absolute -top-[12vh] -left-[5vw] w-[110vw] h-[148vh] transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${currentY + mouseOffset.y}px, 0) scale(1.04)`,
        }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Boutique Mobile Showroom Interior"
          className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08] saturate-[1.12]"
          loading="eager"
        />
      </div>

      {/* Cinematic Studio Forest Vignette Overlays - subtle and non-blocking */}
      {/* 1. Left-side gentle contrast ramp for clean text reading */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C160F]/60 via-[#0C160F]/20 via-50% to-[#0C160F]/25 pointer-events-none" />

      {/* 2. Soft top and bottom page boundary blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C160F]/30 via-transparent to-[#0C160F]/50 pointer-events-none" />

      {/* 3. Subtle ambient glow accents */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#4ADE80]/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[600px] h-[600px] bg-[#86EFAC]/8 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
};
