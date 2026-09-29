// function Home() {
//     return (
//         <div>
//             <h1>Lumea Skin Care</h1>
//             <p>Welcome to Lumea</p>
//         </div>

//     );
// }

// export default Home;

// C:\PROJECTS_MERN\Lumea-skin care-E-commerce Website\client\src\pages\home\Home.tsx
import { ArrowRight, Star, Leaf } from 'lucide-react';

export default function Home() {
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

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Background Arched Shape container */}
            <div className="relative w-full max-w-lg h-[460px] sm:h-[520px] bg-[#DCE6EE] rounded-t-[280px] rounded-b-[30px] overflow-visible flex items-end justify-center pb-8 shadow-inner">
              
              {/* Product bottles composition (using placeholder/stylized mock arrangement) */}
              <div className="relative w-full h-full flex items-end justify-center px-4">
                
                {/* Background left small tube */}
                <div className="absolute left-6 bottom-16 w-12 h-36 bg-gradient-to-t from-orange-400 to-amber-200 rounded-lg shadow-md transform -rotate-6"></div>
                
                {/* Center tall pump bottle */}
                <div className="z-20 w-24 h-64 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col items-center justify-between p-3 mx-2 mb-2 border border-white">
                  <div className="w-4 h-10 bg-amber-100 rounded-full mt-1"></div>
                  <div className="text-center">
                    <span className="font-serif text-xs font-bold block text-[#1C382D]">Luméa</span>
                    <span className="text-[10px] text-gray-500 block leading-tight mt-1">Barrier Repair Cleanser</span>
                  </div>
                  <div className="w-10 h-2 bg-gray-200 rounded-full mb-1"></div>
                </div>

                {/* Yellow bottle */}
                <div className="z-10 w-16 h-48 bg-yellow-300 rounded-xl shadow-lg flex flex-col items-center justify-between p-2 mx-1 mb-6">
                  <div className="w-3 h-6 bg-white rounded-full mt-1"></div>
                  <div className="text-center">
                    <span className="text-[9px] font-bold block text-[#1C382D]">Vitamin C</span>
                  </div>
                  <div className="w-6 h-1.5 bg-yellow-500 rounded-full mb-1"></div>
                </div>

                {/* Small orange tube */}
                <div className="z-20 w-12 h-32 bg-orange-400 rounded-xl shadow-md flex flex-col items-center justify-between p-2 mx-1 mb-8">
                  <div className="w-2 h-4 bg-white rounded-full"></div>
                  <span className="text-[8px] text-white font-bold">SPF</span>
                </div>

                {/* Right tall pink bottle */}
                <div className="z-10 w-20 h-56 bg-rose-200/90 rounded-2xl shadow-lg flex flex-col items-center justify-between p-3 mx-1 mb-4">
                  <div className="w-4 h-8 bg-white/60 rounded-full mt-1"></div>
                  <div className="text-center">
                    <span className="text-[9px] font-bold block text-[#1C382D]">Glow</span>
                  </div>
                  <div className="w-8 h-2 bg-rose-300 rounded-full mb-1"></div>
                </div>
              </div>

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
    </div>
  );
}