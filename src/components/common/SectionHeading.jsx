import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  dark = true,
  children
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-10 max-w-3xl ${alignClass}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 border shadow-xs ${dark ? 'bg-[#172B1F]/90 text-[#86EFAC] border-[#2D5239] backdrop-blur-md' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-[#4ADE80]' : 'bg-emerald-600'} animate-pulse`}></span>
          <span>{badge}</span>
        </div>
      )}

      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-tight ${dark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]' : 'text-[#16271D]'}`}>
        {title}{' '}
        {highlight && (
          <span className={`font-editorial italic font-normal underline decoration-wavy ${dark ? 'text-[#86EFAC] decoration-[#86EFAC]/40' : 'text-emerald-700 decoration-emerald-300'}`}>
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base leading-relaxed ${dark ? 'text-[#C5D8C9] drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]' : 'text-[#526657]'}`}>
          {subtitle}
        </p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
