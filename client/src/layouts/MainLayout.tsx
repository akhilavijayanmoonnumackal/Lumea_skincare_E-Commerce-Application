import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Leaf, Star, Mail, ArrowRight, LogOut, ShieldAlert, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/useAuth.js';
import { getCategories, type Category } from '../api/categoryApi';

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCats();
  }, []);

  const handleLogout = () => {
    logout();
    setAccountDropdownOpen(false);
    navigate('/login');
  };

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
            
            {/* Shop Dropdown Menu */}
            <div 
              className="relative py-6"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button 
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#1C382D] transition-colors py-1 focus:outline-none"
              >
                <span>Shop</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Shop Categories Dropdown Card */}
              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl shadow-xl py-3 z-50 animate-fadeIn">
                  <div className="px-4 py-1.5 border-b border-[#E5E0D8] mb-1">
                    <p className="text-[10px] uppercase tracking-widest text-[#BE6E4C] font-bold">
                      Categories
                    </p>
                  </div>

                  <Link 
                    to="/shop" 
                    onClick={() => setShopDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-bold text-[#1C382D] hover:bg-[#E5E0D8]/40 transition-colors"
                  >
                    Shop All Products
                  </Link>

                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/shop?category=${cat.slug || cat.name.toLowerCase()}`}
                      onClick={() => setShopDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-[#2C3E35] hover:bg-[#E5E0D8]/40 hover:text-[#1C382D] transition-colors capitalize"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/quiz" className="hover:text-[#1C382D] transition-colors">Skin Quiz</Link>
            <Link to="/rewards" className="hover:text-[#1C382D] transition-colors">Glow Rewards</Link>
            <Link to="/support/guide" className="hover:text-[#1C382D] transition-colors">Skincare Guide</Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#1C382D]">
            <button aria-label="Search" className="p-1 hover:opacity-75 transition-opacity">
              <Search size={20} strokeWidth={1.75} />
            </button>

            {/* Account Icon & Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <button 
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  aria-label="Account Menu" 
                  className="p-1 hover:opacity-75 transition-opacity flex items-center gap-1.5"
                >
                  <User size={20} strokeWidth={1.75} />
                  <span className="hidden lg:inline text-xs font-medium text-[#1C382D]">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <Link to="/login" aria-label="Login" className="p-1 hover:opacity-75 transition-opacity hidden sm:block">
                  <User size={20} strokeWidth={1.75} />
                </Link>
              )}

              {/* Logged In User Dropdown Menu */}
              {isAuthenticated && accountDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl shadow-lg py-2 z-50 text-xs font-medium"
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#E5E0D8]">
                    <p className="font-semibold text-[#1C382D]">{user?.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                  </div>

                  <Link 
                    to="/account" 
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-[#E5E0D8]/40 text-[#2C3E35] transition-colors"
                  >
                    Account Dashboard
                  </Link>
                  <Link 
                    to="/account/order-history" 
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-[#E5E0D8]/40 text-[#2C3E35] transition-colors"
                  >
                    Order History
                  </Link>
                  <Link 
                    to="/account/profile" 
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-[#E5E0D8]/40 text-[#2C3E35] transition-colors"
                  >
                    Profile Settings
                  </Link>

                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin/dashboard" 
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center gap-1.5 px-4 py-2 text-[#BE6E4C] hover:bg-[#E5E0D8]/40 transition-colors border-t border-[#E5E0D8]"
                    >
                      <ShieldAlert size={14} /> Admin Portal
                    </Link>
                  )}

                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-1.5 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors border-t border-[#E5E0D8]"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link to="/wishlist" aria-label="Wishlist" className="p-1 hover:opacity-75 transition-opacity hidden sm:block">
              <Heart size={20} strokeWidth={1.75} />
            </Link>

            {/* Cart Link */}
            <Link to="/cart" aria-label="Cart" className="p-1 relative hover:opacity-75 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 bg-[#1C382D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-[#E5E0D8] shadow-lg py-6 px-6 flex flex-col space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <p className="text-xs uppercase font-bold text-[#BE6E4C]">Shop Categories</p>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-[#1C382D]">Shop All</Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/shop?category=${cat.slug || cat.name.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-gray-600 font-light pl-3 capitalize"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link to="/quiz" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Skin Quiz</Link>
            <Link to="/rewards" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Glow Rewards</Link>
            <Link to="/support/guide" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Skincare Guide</Link>
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Wishlist</Link>

            {isAuthenticated ? (
              <>
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">My Account</Link>
                <button 
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="text-left text-lg font-medium text-red-600"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-[#1C382D]">Log In / Sign Up</Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#16241E] text-white pt-16 pb-8 border-t border-[#274639]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
            
            {/* Col 1: Brand & Info */}
            <div className="lg:col-span-4 flex flex-col items-start">
              <div className="mb-4">
                <span className="font-serif text-2xl tracking-wide text-white">Lum<span className='text-[#BE6E4C]'>é</span>a</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-white/70 font-sans mt-0.5">Skincare</span>
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed max-w-xs mb-8">
                Clean, clinically-backed skincare formulated in small batches with biodegradable packaging.
              </p>

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

            {/* Col 2: Shop Links Dynamic */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Shop</h3>
              <ul className="space-y-2.5 text-xs font-light text-white/70">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat._id}>
                    <Link to={`/shop?category=${cat.slug || cat.name.toLowerCase()}`} className="hover:text-white transition-colors capitalize">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Help Links */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Help</h3>
              <ul className="space-y-2.5 text-xs font-light text-white/70">
                <li><Link to="/account/order-history" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><Link to="/support/guide" className="hover:text-white transition-colors">Skincare Guide</Link></li>
                <li><Link to="/quiz" className="hover:text-white transition-colors">Skin Quiz</Link></li>
              </ul>
            </div>

            {/* Col 4: Account / Quick Access */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Account</h3>
              <ul className="space-y-2.5 text-xs font-light text-white/70">
                <li><Link to="/account" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
                <li><Link to="/rewards" className="hover:text-white transition-colors">Glow Rewards</Link></li>
              </ul>
            </div>

            {/* Col 5: Newsletter */}
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

          {/* Bottom Footer Row */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/60 space-y-4 md:space-y-0">
            <div>
              <p>© 2026 Lum<span className='text-[#BE6E4C]'>é</span>a Skincare. All rights reserved.</p>
            </div>

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