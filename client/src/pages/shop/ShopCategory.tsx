import { useState } from "react";
import { Star, ChevronDown, Grid, X, SlidersHorizontal, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

import cleanserImg from '../../assets/images/cleansers.avif';
import vitaminCImg from '../../assets/images/vitaminc.avif';
import barrierImg from '../../assets/images/barrier.avif';
import mineralImg from '../../assets/images/mineral.avif';
import clayMaskImg from '../../assets/images/clayMask.avif';
import roseImg from '../../assets/images/rose.avif'; 
import hydratingImg from '../../assets/images/hydrating.avif'; 
import ritualKitImg from '../../assets/images/ritualKit.avif';
import niacinamideImg from '../../assets/images/niacinamide.avif';

export default function ShopCategory() {
  //const [selectedCategories, setSelectedCategories] = useState<string[]>(['Serums & Oils']);
  //const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>(['Combination']);
  const [maxPrice, setMaxPrice] = useState<number>(5500);
  const [sortBy] = useState('Most loved');

  const products = [
    {
      id: 1,
      title: "Gentle Milk Cleanser",
      category: "CLEANSER",
      badge: "BESTSELLER",
      badgeType: "dark",
      rating: 5,
      reviews: 214,
      price: 1850,
      image: cleanserImg,
      link: "#"
    },
    {
      id: 2,
      title: "Vitamin C Glow Serum",
      category: "SERUM",
      badge: "30% OFF",
      badgeType: "tag",
      rating: 5,
      reviews: 402,
      price: 3200,
      oldPrice: 4500,
      image: vitaminCImg,
      link: "#"
    },
    {
      id: 3,
      title: "Barrier Repair Cream",
      category: "MOISTURISER",
      badge: null,
      rating: 5,
      reviews: 108,
      price: 2600,
      image: barrierImg,
      link: "#"
    },
    {
      id: 4,
      title: "Mineral Daily SPF 50",
      category: "SUN CARE",
      badge: "NEW",
      badgeType: "dark",
      rating: 5,
      reviews: 96,
      price: 2200,
      image: mineralImg,
      link: "#"
    },
    {
      id: 5,
      title: "Clay Detox Mask",
      category: "MASK",
      badge: null,
      rating: 5,
      reviews: 121,
      price: 1950,
      image: clayMaskImg,
      link: "#"
    },
    {
      id: 6,
      title: "Rose Exfoliating Polish",
      category: "EXFOLIANT",
      badge: "30% OFF",
      badgeType: "tag",
      rating: 5,
      reviews: 89,
      price: 2400,
      oldPrice: 3400,
      image: roseImg,
      link: "#"
    },
    {
      id: 7,
      title: "Hydrating Essence Toner",
      category: "TONER",
      badge: null,
      rating: 4,
      reviews: 245,
      price: 1650,
      image: hydratingImg,
      link: "#"
    },
    {
      id: 8,
      title: "The Complete Ritual Kit",
      category: "BUNDLE",
      badge: "SAVE 21%",
      badgeType: "tag",
      rating: 5,
      reviews: 57,
      price: 7800,
      oldPrice: 9900,
      image: ritualKitImg,
      link: "#"
    },
    {
      id: 9,
      title: "Niacinamide 10% Booster",
      category: "SERUM",
      badge: null,
      rating: 5,
      reviews: 210,
      price: 2100,
      image: niacinamideImg,
      link: "#"
    }
  ];

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#1C382D]/60 flex items-center space-x-2 mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Shop</span>
          <span>/</span>
          <span className="text-[#1C382D] font-medium">Serums & Oils</span>
        </div>

        {/* Header Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E0D8] pb-8 mb-8">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C382D] mb-3">
              Serums & Oils
            </h1>
            <p className="text-sm text-[#2C3E35]/80 font-light max-w-xl">
              High-potency actives in lightweight bases — the step that does the heavy lifting in your routine.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="inline-flex items-center space-x-2 text-xs bg-[#F5F2EB] border border-[#E5E0D8] text-[#1C382D] px-4 py-2 rounded-full font-medium hover:bg-[#E5E0D8] transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#1C382D]"></span>
              <span>Clean formulas only</span>
            </button>
          </div>
        </div>

        {/* Active Filters & Sort Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#1C382D] mr-2">
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </div>
            
            <button className="text-xs text-gray-500 underline underline-offset-2 hover:text-[#1C382D] mr-4">
              Clear all
            </button>

            {/* Filter tags */}
            <span className="inline-flex items-center space-x-1.5 bg-[#1C382D] text-white text-xs px-3 py-1.5 rounded-full">
              <span>Serums & Oils</span>
              <X size={12} className="cursor-pointer" />
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-[#1C382D] text-white text-xs px-3 py-1.5 rounded-full">
              <span>Combination</span>
              <X size={12} className="cursor-pointer" />
            </span>
            <span className="inline-flex items-center space-x-1.5 bg-[#1C382D] text-white text-xs px-3 py-1.5 rounded-full">
              <span>₹1,200 – ₹{maxPrice.toLocaleString('en-IN')}</span>
              <X size={12} className="cursor-pointer" />
            </span>
          </div>

          <div className="flex items-center justify-between lg:justify-end space-x-4">
            <span className="text-xs text-gray-500 font-light">Showing <strong>9</strong> of 24 products</span>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button className="flex items-center space-x-2 bg-white border border-[#E5E0D8] px-4 py-2 rounded-lg text-xs text-[#1C382D] font-medium shadow-sm">
                  <span>Sort: {sortBy}</span>
                  <ChevronDown size={14} />
                </button>
              </div>
              <button className="w-9 h-9 bg-white border border-[#E5E0D8] rounded-lg flex items-center justify-center text-[#1C382D] shadow-sm">
                <Grid size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-8 pr-4">
            
            {/* Category Filter */}
            <div className="border-b border-[#E5E0D8] pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C382D]">Category</h3>
                <span className="text-xs text-gray-400">−</span>
              </div>
              <div className="space-y-3 text-xs text-[#2C3E35]">
                {[
                  { name: "Cleansers", count: "18" },
                  { name: "Serums & Oils", count: "24", checked: true },
                  { name: "Moisturisers", count: "16" },
                  { name: "Masks", count: "11" },
                  { name: "Sun Care", count: "9" },
                  { name: "Bundles", count: "6" }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        defaultChecked={item.checked}
                        className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]" 
                      />
                      <span className={item.checked ? "font-semibold text-[#1C382D]" : "text-gray-600 group-hover:text-[#1C382D]"}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-400 text-[11px]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-b border-[#E5E0D8] pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C382D]">Price</h3>
                <span className="text-xs text-gray-400">−</span>
              </div>
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="1000" 
                  max="10000" 
                  step="500"
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1C382D] cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>₹1,000</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Skin Type Filter */}
            <div className="border-b border-[#E5E0D8] pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C382D]">Skin Type</h3>
                <span className="text-xs text-gray-400">−</span>
              </div>
              <div className="space-y-3 text-xs text-[#2C3E35]">
                {[
                  { name: "Dry", count: "22" },
                  { name: "Oily", count: "19" },
                  { name: "Combination", count: "31", checked: true },
                  { name: "Sensitive", count: "14" }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        defaultChecked={item.checked}
                        className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]" 
                      />
                      <span className={item.checked ? "font-semibold text-[#1C382D]" : "text-gray-600 group-hover:text-[#1C382D]"}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-400 text-[11px]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Concern Filter */}
            <div className="border-b border-[#E5E0D8] pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C382D]">Concern</h3>
                <span className="text-xs text-gray-400">−</span>
              </div>
              <div className="space-y-3 text-xs text-[#2C3E35]">
                {[
                  { name: "Dullness", count: "18" },
                  { name: "Acne & blemishes", count: "12" },
                  { name: "Fine lines", count: "15" },
                  { name: "Redness", count: "8" }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]" />
                      <span className="text-gray-600 group-hover:text-[#1C382D]">{item.name}</span>
                    </div>
                    <span className="text-gray-400 text-[11px]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C382D]">Rating</h3>
                <span className="text-xs text-gray-400">−</span>
              </div>
              <div className="space-y-3 text-xs text-[#2C3E35]">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]" />
                    <span className="font-semibold text-[#1C382D]">4 stars & up</span>
                  </div>
                  <span className="text-gray-400 text-[11px]">42</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]" />
                    <span className="text-gray-600">3 stars & up</span>
                  </div>
                  <span className="text-gray-400 text-[11px]">55</span>
                </label>
              </div>
            </div>

          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5E0D8]/60 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
                >
                  <div className="relative bg-[#F4F1EA] h-72 overflow-hidden flex items-center justify-center">
                    
                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        product.badgeType === 'dark' 
                          ? 'bg-[#1C382D] text-white' 
                          : 'bg-[#B85D36] text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Quick Add Button on Hover for item 2 */}
                    {product.id === 2 && (
                      <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-full bg-white/95 backdrop-blur-md text-[#1C382D] py-3 rounded-full text-xs font-bold shadow-lg hover:bg-white transition-colors">
                          Quick add
                        </button>
                      </div>
                    )}

                    {/* Favorite Heart Button */}
                    <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#1C382D] transition-colors shadow-sm">
                      <Heart size={15} />
                    </button>

                    {/* Product Image */}
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-[#B85D36] uppercase mb-1 block">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#1C382D] font-normal mb-2">
                        {product.title}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-1.5 mb-3">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-400">({product.reviews})</span>
                      </div>
                    </div>

                    {/* Price in INR */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                      <span className="text-sm font-bold text-[#1C382D]">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-12">
              <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-400 hover:border-[#1C382D] hover:text-[#1C382D] transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#1C382D] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                1
              </button>
              <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-xs font-medium text-[#1C382D] hover:border-[#1C382D] transition-colors">
                2
              </button>
              <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-xs font-medium text-[#1C382D] hover:border-[#1C382D] transition-colors">
                3
              </button>
              <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-[#1C382D] hover:border-[#1C382D] transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}