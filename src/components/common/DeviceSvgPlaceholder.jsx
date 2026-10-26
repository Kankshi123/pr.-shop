import React from 'react';

export const DeviceSvgPlaceholder = ({ category, name = '', brand = '', os = 'android', className = '' }) => {
  // Select style based on category
  const isLaptop = category === 'preowned-laptop';
  const isAudio = name.toLowerCase().includes('airpod') || name.toLowerCase().includes('bud') || name.toLowerCase().includes('speaker') || name.toLowerCase().includes('jbl') || name.toLowerCase().includes('headphone');
  const isWatch = name.toLowerCase().includes('watch');
  const isChargerOrCable = name.toLowerCase().includes('charger') || name.toLowerCase().includes('cable') || name.toLowerCase().includes('power') || name.toLowerCase().includes('mount') || name.toLowerCase().includes('glass');
  const isApple = brand.toLowerCase() === 'apple' || os === 'ios';

  if (isLaptop) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden ${className}`}>
        {/* Glow */}
        <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent opacity-80" />
        
        {/* Laptop Illustration */}
        <div className="relative w-48 h-36 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          {/* Lid / Screen */}
          <div className="w-40 h-26 rounded-t-xl bg-slate-800 border-2 border-slate-700/80 p-1.5 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div className="w-full h-full rounded-lg bg-gradient-to-tr from-slate-950 via-indigo-950/80 to-slate-900 flex flex-col items-center justify-center relative">
              {/* Wallpaper graphic */}
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 blur-md absolute -top-4 -right-4" />
              <div className="w-14 h-14 rounded-full bg-indigo-500/20 blur-md absolute -bottom-4 -left-4" />
              <span className="text-[10px] font-mono tracking-widest text-cyan-400/90 font-bold z-10">RETINA DISPLAY</span>
              <span className="text-[9px] text-slate-400 mt-1 font-medium">{brand} Certified</span>
            </div>
            {/* Top camera bezel */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-700" />
          </div>
          {/* Keyboard Deck & Notch */}
          <div className="w-48 h-3.5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-lg shadow-xl relative flex justify-center">
            <div className="w-10 h-1 bg-slate-800/80 rounded-b-md" />
          </div>
          {/* Base bottom footers */}
          <div className="w-44 h-1 bg-slate-900/60 rounded-full blur-[1px] mt-0.5" />
        </div>
      </div>
    );
  }

  if (isAudio) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent" />
        
        <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          {/* Case / Earbuds graphic */}
          <div className="w-28 h-32 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 p-3 shadow-2xl flex flex-col items-center justify-between relative">
            <div className="w-16 h-1 rounded-full bg-slate-700/60" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-cyan-500/10 to-transparent flex items-center justify-center border border-cyan-500/20">
              <span className="text-2xl">🎧</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">{brand} Hi-Fi</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isWatch) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden ${className}`}>
        <div className="relative flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          {/* Strap Top */}
          <div className="w-14 h-6 bg-slate-800 rounded-t-lg border-t border-x border-slate-700" />
          {/* Watch Face */}
          <div className="w-28 h-28 rounded-full bg-slate-950 border-4 border-slate-700/90 shadow-2xl flex flex-col items-center justify-center relative p-2">
            <div className="w-full h-full rounded-full border border-cyan-500/30 flex flex-col items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40">
              <span className="text-xs font-mono font-bold text-white tracking-wider">10:42</span>
              <div className="flex items-center gap-1 text-[9px] text-rose-400 mt-1">
                <span>❤️</span> <span>72 bpm</span>
              </div>
            </div>
            {/* Crown button */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-2 h-4 rounded-r-md bg-slate-600 border border-slate-500" />
          </div>
          {/* Strap Bottom */}
          <div className="w-14 h-6 bg-slate-800 rounded-b-lg border-b border-x border-slate-700" />
        </div>
      </div>
    );
  }

  if (isChargerOrCable) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden ${className}`}>
        <div className="relative flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-3 shadow-xl flex flex-col items-center justify-center gap-2">
            <span className="text-3xl">⚡</span>
            <div className="w-12 h-2.5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
              <div className="w-6 h-1 rounded-full bg-cyan-400" />
            </div>
            <span className="text-[9px] font-mono text-cyan-300 font-semibold uppercase">{brand} POWER</span>
          </div>
        </div>
      </div>
    );
  }

  // Default: Smartphone (iPhone or Android Flagship)
  return (
    <div className={`relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden ${className}`}>
      {/* Background glow orb */}
      <div className={`absolute inset-0 bg-radial ${isApple ? 'from-indigo-500/15' : 'from-cyan-500/15'} via-transparent to-transparent`} />

      {/* Modern Phone Mockup */}
      <div className="relative w-28 h-44 rounded-[28px] bg-slate-950 border-[3px] border-slate-700/90 shadow-2xl p-1 flex flex-col justify-between overflow-hidden group-hover:scale-105 transition-transform duration-500">
        {/* Dynamic Island or Punch Hole */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
          {isApple ? (
            <div className="w-8 h-2 rounded-full bg-black border border-slate-800/80 flex items-center justify-between px-1">
              <div className="w-1 h-1 rounded-full bg-slate-800" />
              <div className="w-1 h-1 rounded-full bg-slate-900" />
            </div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-black border border-slate-800" />
          )}
        </div>

        {/* Screen Display */}
        <div className="w-full h-full rounded-[22px] bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/70 p-2 flex flex-col justify-between relative overflow-hidden">
          {/* Wallpaper waves */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-indigo-500/20 blur-lg" />
          <div className="absolute -left-6 top-6 w-20 h-20 rounded-full bg-cyan-500/15 blur-lg" />

          {/* Top Status */}
          <div className="flex justify-between items-center text-[7px] text-slate-400 px-1 pt-1 z-10">
            <span>5G</span>
            <span>100%</span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
            <span className="text-[11px] font-bold text-white tracking-wider font-heading">{brand}</span>
            <span className="text-[8px] text-cyan-400 font-mono mt-0.5">OLED DISPLAY</span>
          </div>

          {/* Bottom Bar */}
          <div className="w-10 h-1 bg-white/40 rounded-full mx-auto mb-1 z-10" />
        </div>
      </div>
    </div>
  );
};
