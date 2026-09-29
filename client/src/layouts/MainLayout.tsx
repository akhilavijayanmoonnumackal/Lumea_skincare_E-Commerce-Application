// import { Outlet } from "react-router-dom";

// function MainLayout() {
//     return (
//         <>
//             <header>
//                 Lumea Header
//             </header>

//             <main>
//                 <Outlet />
//             </main>

//             <footer>
//                 Lumea Footer
//             </footer>
//         </>
//     );
// }

// export default MainLayout;

// C:\PROJECTS_MERN\Lumea-skin care-E-commerce Website\client\src\layouts\MainLayout.tsx
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Leaf, Sparkles } from 'lucide-react';

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E292B] font-sans antialiased selection:bg-[#274639] selection:text-white">
      {/* Announcement Bar */}
      <div className="bg-[#1C382D] text-white text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-6">
        <span className="hidden sm:inline">Free shipping on orders over $50</span>
        <span className="hidden md:inline">•</span>
        <span>30-day happiness guarantee</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden sm:inline">Cruelty-free & dermatologist tested</span>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1C382D] hover:bg-[#E5E0D8]/50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center md:items-start">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1C382D] font-normal">
              Luméa
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#1C382D]/70 font-semibold -mt-1">
              Skincare
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#2C3E35]">
            <Link to="/" className="hover:text-[#1C382D] transition-colors">Shop</Link>
            <Link to="/" className="hover:text-[#1C382D] transition-colors">Bestsellers</Link>
            <Link to="/" className="hover:text-[#1C382D] transition-colors">Skin Concerns</Link>
            <Link to="/" className="hover:text-[#1C382D] transition-colors">Ingredients</Link>
            <Link to="/" className="hover:text-[#1C382D] transition-colors">Journal</Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#1C382D]">
            <button aria-label="Search" className="p-1 hover:opacity-75 transition-opacity">
              <Search size={20} strokeWidth={1.75} />
            </button>
            <button aria-label="Account" className="p-1 hover:opacity-75 transition-opacity hidden sm:block">
              <User size={20} strokeWidth={1.75} />
            </button>
            <button aria-label="Wishlist" className="p-1 hover:opacity-75 transition-opacity hidden sm:block">
              <Heart size={20} strokeWidth={1.75} />
            </button>
            <button aria-label="Cart" className="p-1 relative hover:opacity-75 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 bg-[#1C382D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-[#E5E0D8] shadow-lg py-6 px-6 flex flex-col space-y-4 animate-fadeIn">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Shop</Link>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Bestsellers</Link>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Skin Concerns</Link>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Ingredients</Link>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Journal</Link>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Placeholder */}
      <footer className="bg-[#1C382D] text-[#E5E0D8] py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="font-serif text-xl text-white">Luméa</span>
            <span className="text-xs opacity-75">© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-xs opacity-80">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;