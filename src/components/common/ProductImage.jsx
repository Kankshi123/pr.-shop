import React, { useState } from 'react';
import { Smartphone, Headphones, Laptop, RotateCcw, Zap } from 'lucide-react';

export const ProductImage = ({
  src,
  alt = 'Product image',
  category = 'smartphone',
  className = '',
  imageClassName = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback icon based on category if image fails
  const getFallbackIcon = () => {
    if (category === 'preowned-laptop') return Laptop;
    if (category === 'accessory') return Headphones;
    if (category === 'preowned-phone') return RotateCcw;
    return Smartphone;
  };

  const FallbackIcon = getFallbackIcon();

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center bg-[#F4F6F4] overflow-hidden ${className}`}
    >
      {/* Subtle off-white gradient highlight */}
      <div className="absolute inset-0 bg-radial from-white via-transparent to-transparent opacity-80 pointer-events-none" />

      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-500 select-none ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-[#5D7264]">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-[#DCE6DE] flex items-center justify-center mb-2">
            <FallbackIcon className="w-8 h-8 text-[#285034]" />
          </div>
          <span className="text-[11px] font-semibold text-[#486250] text-center line-clamp-1">{alt}</span>
        </div>
      )}
    </div>
  );
};
