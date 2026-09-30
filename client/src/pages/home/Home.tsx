import { ArrowRight, Star, Leaf, Truck, ShieldCheck, RotateCcw, Droplets, Sun, ArrowLeft } from 'lucide-react';
import heroProductImg from '../../assets/images/homebanner.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import serumsImg from '../../assets/images/serums&oils.avif';
import moisturiserImg from '../../assets/images/moisturisers.avif';
import suncareImg from '../../assets/images/suncare.avif';
import IncredientImg from '../../assets/images/ingredient.avif';

export default function Home() {
  const categories = [
    {
      title: "Cleansers",
      count: "18 products",
      image: cleanserImg,
      link: "#cleansers"
    },
    {
      title: "Serums & Oils",
      count: "24 products",
      image: serumsImg,
      link: "#serums"
    },
    {
      title: "Moisturisers",
      count: "16 products",
      image: moisturiserImg,
      link: "#moisturisers"
    },
    {
      title: "Sun Care",
      count: "9 products",
      image: suncareImg,
      link: "#suncare"
    }
  ];

  const routineSteps = [
    {
      step: "1",
      title: "Cleanse",
      description: "A pH-balanced milk that lifts SPF and grime without stripping.",
      product: "Gentle Milk Cleanser",
      link: "#cleanse"
    },
    {
      step: "2",
      title: "Treat",
      description: "Targeted actives for brightness, texture and even tone.",
      product: "Vitamin C Glow Serum",
      link: "#treat"
    },
    {
      step: "3",
      title: "Hydrate",
      description: "Ceramides and squalane to lock the good stuff in.",
      product: "Barrier Repair Cream",
      link: "#hydrate"
    },
    {
      step: "4",
      title: "Protect",
      description: "Weightless mineral SPF 50 — the non-negotiable last step.",
      product: "Mineral Daily SPF 50",
      link: "#protect"
    }
  ];

  const testimonials = [
    {
      quote: "My hyperpigmentation faded in six weeks. I've repurchased the serum three times and converted two friends.",
      name: "Priya N.",
      role: "Verified buyer · Combination skin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Finally an SPF that doesn't pill under makeup or leave a white cast on deeper skin tones.",
      name: "Amara O.",
      role: "Verified buyer · Oily skin",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "The barrier cream calmed my retinol flare-ups overnight. Texture is luxurious but never greasy.",
      name: "Sofia M.",
      role: "Verified buyer · Sensitive skin",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Breadcrumb info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-xs text-[#1C382D]/60 flex items-center space-x-2">
        <span>01 · Home</span>
        <span>/</span>
        <span className="text-[#1C382D] font-medium">Landing</span>
      </div>

      {/* Hero Section Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest text-[#B85D36] uppercase mb-4">
              <span>NEW</span>
              <span>·</span>
              <span>THE BARRIER EDIT</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C382D] leading-[1.1] tracking-tight mb-6">
              Skin that feels like <span className="italic font-normal text-[#B85D36]">itself</span> again.
            </h1>

            {/* Description */}
            <p className="text-[#2C3E35]/80 text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-light">
              Minimal routines built on clinically-proven actives — formulated for real skin, real budgets and real mornings.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-12">
              <a
                href="#shop"
                className="inline-flex items-center justify-center space-x-3 bg-[#1C382D] text-white px-7 py-4 rounded-full text-sm font-medium hover:bg-[#274639] transition-all shadow-sm group"
              >
                <span>Shop bestsellers</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#quiz"
                className="inline-flex items-center justify-center bg-transparent border border-[#1C382D]/30 text-[#1C382D] px-7 py-4 rounded-full text-sm font-medium hover:border-[#1C382D] transition-colors"
              >
                Take the skin quiz
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E5E0D8] w-full max-w-lg">
              <div>
                <div className="font-serif text-xl sm:text-2xl text-[#1C382D] font-normal">4.9/5</div>
                <div className="text-xs text-[#2C3E35]/70 mt-0.5">12,480 reviews</div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl text-[#1C382D] font-normal">96%</div>
                <div className="text-xs text-[#2C3E35]/70 mt-0.5">Saw smoother skin</div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl text-[#1C382D] font-normal">100%</div>
                <div className="text-xs text-[#2C3E35]/70 mt-0.5">Cruelty-free</div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase Column using your actual .avif image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Container holding the image and floating badges */}
            <div className="relative w-full max-w-lg">
              
              {/* Main Product Image (.avif) */}
              <img 
                src={heroProductImg}
                alt="Luméa Skincare Bestsellers"
                className="w-full h-auto object-cover rounded-t-[280px] rounded-b-[30px] shadow-sm"
              />

              {/* Floating Badge 1: Clean at Luméa */}
              <div className="absolute top-8 left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-gray-100 animate-bounce-slow">
                <div className="w-8 h-8 rounded-full bg-[#1C382D]/10 flex items-center justify-center text-[#1C382D]">
                  <Leaf size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C382D]">Clean at Luméa</p>
                  <p className="text-[10px] text-gray-500">1,400+ ingredients banned</p>
                </div>
              </div>

              {/* Floating Badge 2: Bestseller Vitamin C Glow Serum */}
              <div className="absolute bottom-6 right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Star size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">Bestseller</p>
                  <p className="text-xs font-bold text-[#1C382D]">Vitamin C Glow Serum · $46</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <section className="w-full py-12 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Trust Feature Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 mb-16 border-y border-[#E5E0D8] text-xs text-[#1C382D]">
            <div className="flex items-center space-x-3">
              <Truck size={20} className="text-[#B85D36] shrink-0" />
              <div>
                <span className="font-bold">Free delivery</span>
                <span className="text-gray-500 ml-1.5">On all orders over $50</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 md:justify-center">
              <ShieldCheck size={20} className="text-[#B85D36] shrink-0" />
              <div>
                <span className="font-bold">Clean formulas</span>
                <span className="text-gray-500 ml-1.5">No parabens or sulphates</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 md:justify-end">
              <RotateCcw size={20} className="text-[#B85D36] shrink-0" />
              <div>
                <span className="font-bold">30-day returns</span>
                <span className="text-gray-500 ml-1.5">Love it or your money back</span>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#B85D36] uppercase mb-1 block">
                SHOP BY CATEGORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                Build your ritual
              </h2>
            </div>
            <a 
              href="#all-categories" 
              className="text-xs font-semibold text-[#1C382D] underline underline-offset-4 hover:text-[#B85D36] transition-colors mt-2 sm:mt-0"
            >
              View all categories
            </a>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <a 
                key={idx}
                href={cat.link}
                className="group relative h-[420px] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-end p-6 transition-all duration-300 hover:shadow-md"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                {/* Card Content */}
                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white font-normal mb-0.5">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light">
                      {cat.count}
                    </p>
                  </div>

                  {/* Arrow Button Circle */}
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1C382D] transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-sm bg-[#F9F8F6]">
                <img 
                  src={IncredientImg}
                  alt="Ingredient Spotlight Makeup Brush and Powder" 
                  className="w-full h-[480px] object-cover"
                />
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-[10px] font-bold tracking-widest text-[#B85D36] uppercase mb-2 block">
                INGREDIENT SPOTLIGHT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C382D] leading-[1.15] mb-4">
                Everything in. Nothing you don't need.
              </h2>
              <p className="text-sm sm:text-base text-[#2C3E35]/80 font-light mb-8 leading-relaxed">
                Every formula lists the full percentage of each active, so you always know exactly what you're putting on your skin.
              </p>

              {/* Ingredient List Items */}
              <div className="w-full space-y-4 mb-10">
                
                {/* Item 1 */}
                <div className="flex items-start space-x-4 p-4 rounded-2xl border border-[#E5E0D8]/60 bg-[#FAFAFA]/50">
                  <div className="w-10 h-10 rounded-full bg-[#1C382D]/5 flex items-center justify-center text-[#1C382D] shrink-0 mt-0.5">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1C382D] mb-0.5">Hyaluronic Acid 2%</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">Multi-weight molecules draw moisture into every layer of skin.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start space-x-4 p-4 rounded-2xl border border-[#E5E0D8]/60 bg-[#FAFAFA]/50">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-[#B85D36] shrink-0 mt-0.5">
                    <Sun size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1C382D] mb-0.5">Encapsulated Vitamin C</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">A stabilised 15% form that brightens without the sting.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start space-x-4 p-4 rounded-2xl border border-[#E5E0D8]/60 bg-[#FAFAFA]/50">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Leaf size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1C382D] mb-0.5">Centella Asiatica</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">Calms redness and strengthens a compromised barrier.</p>
                  </div>
                </div>

              </div>

              {/* CTA Button */}
              <a
                href="#ingredients"
                className="inline-flex items-center justify-center bg-[#1C382D] text-white px-7 py-4 rounded-full text-sm font-medium hover:bg-[#274639] transition-all shadow-sm"
              >
                Explore the ingredient index
              </a>

            </div>

          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Header */}
          <span className="text-[10px] font-bold tracking-widest text-[#B85D36] uppercase mb-2 block">
            THE FOUR-STEP METHOD
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C382D] mb-3">
            A routine that takes 90 seconds
          </h2>
          <p className="text-sm sm:text-base text-[#2C3E35]/80 font-light mb-12">
            No 12-step regimens. Just four products, morning and night.
          </p>

          {/* 4 Steps Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-12">
            {routineSteps.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E5E0D8]/70 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#1C382D] text-white flex items-center justify-center text-xs font-bold mb-6">
                    {item.step}
                  </div>
                  
                  <h3 className="font-serif text-2xl text-[#1C382D] mb-2 font-normal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                {/* Product Link */}
                <a 
                  href={item.link}
                  className="inline-flex items-center text-xs font-semibold text-[#1C382D] hover:text-[#B85D36] transition-colors group"
                >
                  <span className="mr-1.5 group-hover:translate-x-0.5 transition-transform">→</span>
                  <span>{item.product}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Bundle CTA Button */}
          <div>
            <a
              href="#bundle"
              className="inline-flex items-center justify-center bg-[#1C382D] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#274639] transition-all shadow-sm space-x-2"
            >
              <span>Shop the full routine — $120</span>
              <span className="line-through text-white/60 text-xs">$152</span>
            </a>
          </div>

        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Navigation Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#B85D36] uppercase mb-2 block">
                REAL RESULTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C382D]">
                What your skin twin says
              </h2>
            </div>
            
            {/* Arrow Buttons */}
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button className="w-11 h-11 rounded-full bg-[#F5F2EB] hover:bg-[#E5E0D8] flex items-center justify-center text-[#1C382D] transition-colors">
                <ArrowLeft size={18} />
              </button>
              <button className="w-11 h-11 rounded-full bg-[#F5F2EB] hover:bg-[#E5E0D8] flex items-center justify-center text-[#1C382D] transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Testimonials Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-3xl border border-[#E5E0D8]/70 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center space-x-1 text-[#B85D36] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm sm:text-base text-[#1C382D] font-light leading-relaxed mb-8">
                    "{review.quote}"
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-[#1C382D]">{review.name}</h3>
                    <p className="text-[11px] text-gray-500 font-light">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    
    </div>

    
  );
}