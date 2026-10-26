import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Smartphone, Headphones, Laptop, RotateCcw } from 'lucide-react';
import { PRODUCTS_DATA } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import { ProductImage } from './ProductImage';

export const QuickSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { setQuickViewProduct } = useStore();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS_DATA.filter((p) => {
        const text = `${p.name} ${p.brand} ${p.category} ${p.tags?.join(' ')} ${p.specs?.join(' ')}`.toLowerCase();
        return text.includes(query.toLowerCase());
      }).slice(0, 6)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-6 sm:p-6 sm:pt-20">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#0E1710]/80 backdrop-blur-md" onClick={onClose} />

      {/* Search Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DCE6DE] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-5 flex items-center gap-2.5 sm:gap-3 border-b border-slate-100 bg-[#F8FAF8]">
          <Search className="w-5 h-5 text-[#244A30] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, AirPods, MacBooks, chargers..."
            className="flex-1 bg-transparent text-base text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear query" className="text-slate-400 hover:text-slate-600 p-1.5">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 text-slate-700 text-xs font-semibold hover:bg-slate-300 transition-colors"
          >
            <span className="hidden sm:inline">ESC</span>
            <span className="sm:hidden">Close</span>
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[65dvh] sm:max-h-96 overflow-y-auto scroll-touch p-3 sm:p-4">
          {query.trim() === '' ? (
            <div className="py-6 px-2 text-center text-slate-500">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['iPhone 15', 'AirPods Pro', 'MacBook M1', 'Samsung S24', 'Pre-Owned Phone', 'Store Repair'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#284E33]/10 hover:text-[#284E33] text-xs text-slate-600 transition-colors font-medium"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <p className="text-sm font-bold text-slate-700">No matching products found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for &ldquo;Apple&rdquo;, &ldquo;Samsung&rdquo;, &ldquo;AirPods&rdquo;, or &ldquo;Pre-Owned&rdquo;
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Matching Products ({filtered.length})
              </p>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setQuickViewProduct(item);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#F4F6F4] border border-transparent hover:border-[#DCE6DE] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F4F6F4] border border-[#E2EBE4] overflow-hidden shrink-0 p-1">
                    <ProductImage src={item.image} alt={item.name} category={item.category} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#274B32] uppercase">{item.brand}</span>
                      {item.condition && (
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                          {item.condition}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#274B32] line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs font-extrabold text-slate-900 mt-0.5">
                      ₹{item.price.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-slate-400 line-through font-normal">
                        ₹{item.mrp.toLocaleString('en-IN')}
                      </span>
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
