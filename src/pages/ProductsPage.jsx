import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
  Megaphone,
  Tag
} from 'lucide-react';
import { PRODUCTS_DATA, CATEGORY_DEFINITIONS, BRANDS_LIST } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useActiveOffers } from '../hooks/useActiveOffers';
import { CountdownTimer } from '../components/common/CountdownTimer';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { primaryOffer } = useActiveOffers();

  // Query parameters sync
  const initialCategory = searchParams.get('category') || 'all';
  const initialOs = searchParams.get('os') || 'all';

  // State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedOs, setSelectedOs] = useState(initialOs);
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [priceMax, setPriceMax] = useState(150000);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync category changes with URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const os = searchParams.get('os');
    if (os) setSelectedOs(os);
  }, [searchParams]);

  // Simulate smooth skeleton loader when filter changes
  const handleFilterChange = (setter, value) => {
    setIsLoading(true);
    setter(value);
    setTimeout(() => setIsLoading(false), 200);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('All Brands');
    setSelectedOs('all');
    setSelectedCondition('all');
    setPriceMax(150000);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'preowned') {
          if (!item.category.startsWith('preowned')) return false;
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      // OS filter
      if (selectedOs !== 'all' && item.os && item.os !== selectedOs) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'All Brands' && item.brand !== selectedBrand) {
        return false;
      }

      // Condition filter
      if (selectedCondition !== 'all') {
        if (!item.condition || !item.condition.toLowerCase().includes(selectedCondition.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      if (item.price > priceMax) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const text = `${item.name} ${item.brand} ${item.category} ${item.specs?.join(' ')} ${item.tags?.join(' ')}`.toLowerCase();
        if (!text.includes(searchQuery.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedBrand, selectedOs, selectedCondition, priceMax, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'discount') {
      return list.sort((a, b) => {
        const discA = (a.mrp - a.price) / a.mrp;
        const discB = (b.mrp - b.price) / b.mrp;
        return discB - discA;
      });
    }
    // Default featured
    return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="bg-slate-50 min-h-screen pb-28 lg:pb-20">
      {/* Top Page Header with Boutique Showroom Background Image */}
      <div className="relative text-white py-14 sm:py-16 px-4 border-b border-[#233527] overflow-hidden bg-[#0C160F]">
        {/* Background Showroom Image - High Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Showroom Background"
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.05] saturate-[1.15] scale-105"
          />
          {/* Balanced soft atmospheric overlay for maximum image visibility while keeping text legible */}
          <div className="absolute inset-0 bg-[#0C160F]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C160F]/75 via-[#0C160F]/35 to-[#0C160F]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C160F]/40 via-transparent to-[#0C160F]/65" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4ADE80]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1C3624]/90 text-[#86EFAC] border border-[#2E583A] mb-3 backdrop-blur-md">
              <span>📱</span>
              <span>All 40+ Certified Products</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Full Gadget Catalog
            </h1>
            <p className="text-[#C4D8C8] text-sm mt-1 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Original iPhones, Android flagships, AirPods, certified pre-owned MacBooks, chargers & accessories available at G.M.S. Road, Dehradun.
            </p>
          </div>

          {/* Active Live Discount Ad Pill */}
          {primaryOffer && (
            <div className="bg-[#14261B]/90 border border-[#3E704C] backdrop-blur-xl p-4 rounded-2xl flex items-center gap-3.5 shadow-2xl shrink-0">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 text-[#86EFAC] border border-[#345D3E]">
                <Megaphone className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                    LIVE AD
                  </span>
                  <span className="text-white font-bold">{primaryOffer.discountText}</span>
                </div>
                <p className="text-[11px] text-[#A2BEAA] mt-0.5 line-clamp-1 max-w-xs">{primaryOffer.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <CountdownTimer offer={primaryOffer} size="card" />
                  {primaryOffer.couponCode && (
                    <span className="text-[10px] font-mono text-[#86EFAC] bg-[#183120] px-1.5 py-0.5 rounded border border-[#2D5438]">
                      Code: {primaryOffer.couponCode}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Sort Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, brand, spec..."
              className="w-full text-base sm:text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#274B32] bg-slate-50"
            />
          </div>

          {/* Category Quick Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            {CATEGORY_DEFINITIONS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(setSelectedCategory, cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#182C1E] text-[#86EFAC] shadow-xs font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Grid/List Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 bg-slate-50"
            >
              <Filter className="w-4 h-4 text-[#274B32]" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount %</option>
            </select>

            <div className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-[#274B32]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List View"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-[#274B32]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mobile Filter Slide-Over Bottom Sheet */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center">
              <div
                className="fixed inset-0 bg-[#0E1710]/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative w-full max-h-[85dvh] bg-white rounded-t-3xl shadow-2xl flex flex-col justify-between overflow-hidden z-10 animate-in slide-in-from-bottom-6 duration-200">
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#F8FAF8]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#274B32]" />
                    <h3 className="font-bold text-slate-900 font-heading">Filter Gadgets</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Filter Controls Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-touch">
                  {/* Brand Filter */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                      Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => handleFilterChange(setSelectedBrand, e.target.value)}
                      className="w-full text-base sm:text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
                    >
                      {BRANDS_LIST.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* OS Filter for Smartphones */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                      Operating System
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['all', 'ios', 'android'].map((os) => (
                        <button
                          key={os}
                          onClick={() => handleFilterChange(setSelectedOs, os)}
                          className={`py-2 text-xs font-bold rounded-xl transition-colors uppercase ${
                            selectedOs === os
                              ? 'bg-[#182C1E] text-[#86EFAC]'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {os === 'all' ? 'All' : os}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Second-Hand Condition Grade */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                      Pre-Owned Condition
                    </label>
                    <div className="space-y-2 text-xs">
                      {[
                        { id: 'all', label: 'All Conditions' },
                        { id: 'like new', label: 'Grade A+ (Like New)' },
                        { id: 'excellent', label: 'Grade A (Excellent)' },
                        { id: 'good', label: 'Grade B+ (Good)' },
                      ].map((cond) => (
                        <label key={cond.id} className="flex items-center gap-2.5 text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
                          <input
                            type="radio"
                            name="mobile-condition"
                            checked={selectedCondition === cond.id}
                            onChange={() => handleFilterChange(setSelectedCondition, cond.id)}
                            className="text-[#274B32] focus:ring-[#274B32] w-4 h-4"
                          />
                          <span className="font-medium">{cond.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Max Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-800 uppercase">Max Price</span>
                      <span className="font-bold text-[#274B32] font-heading text-sm">
                        ₹{priceMax.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="160000"
                      step="2500"
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full accent-[#274B32] h-2"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>₹500</span>
                      <span>₹1.6 Lakh</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Filter Sticky Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
                  <button
                    onClick={resetFilters}
                    className="py-3 px-4 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#16271D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    <span>View {filteredProducts.length} Results</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 text-slate-900">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-800 font-heading flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#274B32]" />
                  Filter Products
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#274B32] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => handleFilterChange(setSelectedBrand, e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
                >
                  {BRANDS_LIST.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* OS Filter for Smartphones */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                  Operating System
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['all', 'ios', 'android'].map((os) => (
                    <button
                      key={os}
                      onClick={() => handleFilterChange(setSelectedOs, os)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-colors uppercase ${
                        selectedOs === os
                          ? 'bg-[#182C1E] text-[#86EFAC]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {os === 'all' ? 'All' : os}
                    </button>
                  ))}
                </div>
              </div>

              {/* Second-Hand Condition Grade */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase mb-2">
                  Pre-Owned Condition
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'All Conditions' },
                    { id: 'like new', label: 'Grade A+ (Like New)' },
                    { id: 'excellent', label: 'Grade A (Excellent)' },
                    { id: 'good', label: 'Grade B+ (Good)' },
                  ].map((cond) => (
                    <label key={cond.id} className="flex items-center gap-2 text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        checked={selectedCondition === cond.id}
                        onChange={() => handleFilterChange(setSelectedCondition, cond.id)}
                        className="text-[#274B32] focus:ring-[#274B32]"
                      />
                      <span>{cond.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Max Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-800 uppercase">Max Price</span>
                  <span className="font-bold text-[#274B32] font-heading">
                    ₹{priceMax.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="160000"
                  step="2500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#274B32]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹500</span>
                  <span>₹1.6 Lakh</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid Column */}
          <main className="lg:col-span-9">
            {/* Results count */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
              <span>
                Showing <strong>{displayedProducts.length}</strong> of{' '}
                <strong>{sortedProducts.length}</strong> products matching filters
              </span>
              {(selectedCategory !== 'all' || selectedBrand !== 'All Brands' || searchQuery) && (
                <button onClick={resetFilters} className="text-[#274B32] hover:underline font-semibold">
                  Clear active filters
                </button>
              )}
            </div>

            {/* Skeleton Loading State or Empty State or Product Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse space-y-3">
                    <div className="w-full h-44 bg-[#F4F6F4] rounded-xl" />
                    <div className="w-3/4 h-4 bg-slate-200 rounded" />
                    <div className="w-1/2 h-3 bg-slate-200 rounded" />
                    <div className="w-1/3 h-5 bg-slate-200 rounded mt-4" />
                  </div>
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="font-bold text-lg text-slate-900 font-heading">No matching products found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any items matching your current filters. Try relaxing your price slider or searching for a different brand.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#1A2E20] hover:bg-[#253E2C] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                      : 'space-y-4'
                  }
                >
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Load More Pagination */}
                {visibleCount < sortedProducts.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 9)}
                      className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm shadow-sm transition-all"
                    >
                      Load More Gadgets ({sortedProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
