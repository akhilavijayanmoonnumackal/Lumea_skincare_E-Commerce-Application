import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Leaf, Star, Mail, ArrowRight } from 'lucide-react';

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
              Lum<span className='text-[#BE6E4C]'>é</span>a
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
      <footer className="w-full bg-[#16241E] text-white pt-16 pb-8 border-t border-[#274639]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
            
            {/* Col 1: Brand & Info */}
            <div className="lg:col-span-4 flex flex-col items-start">
              <div className="mb-4">
                <span className="font-serif text-2xl tracking-wide text-white">Luméa</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-white/70 font-sans mt-0.5">Skincare</span>
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed max-w-xs mb-8">
                Clean, clinically-backed skincare formulated in small batches with biodegradable packaging.
              </p>

              {/* Social / Circular Icons */}
              <div className="flex items-center space-x-3">
                <a href="#mail" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors">
                  <Mail size={16} />
                </a>
                <a href="#heart" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors">
                  <Heart size={16} />
                </a>
                <a href="#leaf" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors">
                  <Leaf size={16} />
                </a>
                <a href="#star" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors">
                  <Star size={16} />
                </a>
              </div>
            </div>

            {/* Col 2: Shop Links */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Shop</h3>
              <ul className="space-y-2.5 text-xs font-light text-white/70">
                <li><Link to="/#cleansers" className="hover:text-white transition-colors">Cleansers</Link></li>
                <li><Link to="/#serums" className="hover:text-white transition-colors">Serums</Link></li>
                <li><Link to="/#moisturisers" className="hover:text-white transition-colors">Moisturisers</Link></li>
                <li><Link to="/#suncare" className="hover:text-white transition-colors">Sun Care</Link></li>
                <li><Link to="/#bundles" className="hover:text-white transition-colors">Bundles</Link></li>
                <li><Link to="/#gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
              </ul>
            </div>

            {/* Col 3: Help Links */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Help</h3>
              <ul className="space-y-2.5 text-xs font-light text-white/70">
                <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/quiz" className="hover:text-white transition-colors">Skin Quiz</Link></li>
              </ul>
            </div>

            {/* Col 4: About Links */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">About</h3>
              <ul className="space-y-2.5 text-xs font-light text-white/70">
                <li><Link to="/story" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/ingredients" className="hover:text-white transition-colors">Ingredients Index</Link></li>
                <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
                <li><Link to="/journal" className="hover:text-white transition-colors">Journal</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Col 5: Stay in the Glow Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-2">Stay in the glow</h3>
              <p className="text-xs text-white/70 font-light mb-4">Skin tips + 10% off your first order.</p>
              
              <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-transparent border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/60 pr-10"
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 w-7 h-7 rounded-full bg-[#B85D36] hover:bg-[#a5522f] flex items-center justify-center text-white transition-colors"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Footer Row: Copyright, Payment Badges & Legal links */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/60 space-y-4 md:space-y-0">
            <div>
              <p>© 2026 Luméa Skincare. All rights reserved.</p>
            </div>

            {/* Payment Method Badges */}
            <div className="flex items-center space-x-2">
              {['VISA', 'MC', 'AMEX', 'PayPal', 'UPI', 'Apple Pay'].map((badge, idx) => (
                <span 
                  key={idx} 
                  className="border border-white/15 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-mono text-white/70"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <span>·</span>
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
              <span>·</span>
              <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default MainLayout;