import { useState } from 'react';
import { 
  Package, 
  Heart, 
  Repeat, 
  MapPin, 
  Sparkles, 
  User as UserIcon, 
  Settings as SettingsIcon, 
  LogOut,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Local asset imports
import profileAvatarImg from '../../assets/images/profile.jpg';
import serumsImg from '../../assets/images/serums&oils.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import suncareImg from '../../assets/images/suncare.avif';
import maskImg from '../../assets/images/clayMask.avif';
import exfoliantImg from '../../assets/images/rose.avif';
import bundleImg from '../../assets/images/barrier.avif';
import niacinamideImg from '../../assets/images/niacinamide.avif';

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'subscriptions' | 'addresses' | 'rewards' | 'profile' | 'settings'>('orders');

  const orders = [
    {
      id: "#LUM-20486",
      date: "Placed 24 Sep 2026",
      itemsCount: "2 items",
      status: "Out for delivery",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      total: "₹10,500",
      images: [serumsImg, cleanserImg]
    },
    {
      id: "#LUM-20115",
      date: "Placed 02 Sep 2026",
      itemsCount: "3 items",
      status: "Delivered",
      statusColor: "bg-gray-100 text-gray-700 border-gray-200",
      total: "₹8,150",
      images: [suncareImg, cleanserImg, serumsImg]
    },
    {
      id: "#LUM-19874",
      date: "Placed 11 Aug 2026",
      itemsCount: "1 items",
      status: "Processing refund",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      total: "₹2,850",
      images: [exfoliantImg]
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      category: "Mask",
      title: "Clay Detox Mask",
      rating: 4.9,
      reviews: 131,
      price: "₹2,150",
      image: maskImg
    },
    {
      id: 2,
      category: "Exfoliant",
      title: "Rose Exfoliating Polish",
      rating: 4.8,
      reviews: 98,
      price: "₹2,850",
      oldPrice: "₹3,500",
      badge: "20% OFF",
      image: exfoliantImg
    },
    {
      id: 3,
      category: "Bundle",
      title: "The Complete Ritual Kit",
      rating: 5.0,
      reviews: 57,
      price: "₹9,950",
      oldPrice: "₹15,200",
      badge: "SAVE 35%",
      image: bundleImg
    },
    {
      id: 4,
      category: "Serum",
      title: "Niacinamide 10% Booster",
      rating: 4.9,
      reviews: 210,
      price: "₹2,400",
      image: niacinamideImg
    }
  ];

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Greeting */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">My account</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
            Hi Akhila,
          </h1>
        </div>

        {/* Top Summary Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Glow Points Widget */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Glow Points</span>
              <div className="text-3xl font-serif font-bold text-[#1C382D] mb-1">1,240</div>
              <p className="text-xs text-gray-500 font-light">260 pts to your next $15 reward</p>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-6">
              <div className="bg-[#1C382D] w-[82%] h-full rounded-full" />
            </div>
          </div>

          {/* Next Subscription Widget */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Next Subscription</span>
              <div className="text-2xl font-serif font-bold text-[#1C382D] mb-1">12 Oct</div>
              <p className="text-xs text-gray-500 font-light">Vitamin C Glow Serum - 30 ml</p>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <button className="px-4 py-2 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#1C382D] hover:bg-gray-50 transition-colors">
                Skip
              </button>
              <button className="px-4 py-2 rounded-xl bg-[#1C382D] text-white text-xs font-bold hover:bg-[#152a22] transition-colors">
                Edit
              </button>
            </div>
          </div>

          {/* Saved Address Widget */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Saved Address</span>
                <span className="text-xs font-bold text-[#1C382D] bg-[#F4F1EA] px-2 py-0.5 rounded-md">Home</span>
              </div>
              <div className="text-sm font-bold text-[#1C382D] mb-1">Kochi</div>
              <p className="text-xs text-gray-500 font-light leading-relaxed">42 Marine Drive, Flat 7B<br />Kochi, Kerala 682031</p>
            </div>
            <div className="mt-4">
              <a href="#" className="text-xs font-bold text-[#1C382D] underline hover:text-gray-700">
                Manage addresses
              </a>
            </div>
          </div>

        </div>

        {/* Main Content Layout: Sidebar + Details Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm">
            
            {/* User Mini Card */}
            <div className="flex items-center space-x-3 p-3 mb-4 bg-[#FDFBF7] rounded-2xl border border-[#E5E0D8]/60">
              <img src={profileAvatarImg} alt="Akhila Vijayan" className="w-10 h-10 rounded-full object-cover" />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-[#1C382D] truncate">Akhila Vijayan</h4>
                <span className="text-[10px] text-gray-400">Glow member · 1,240 pts</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'orders' ? 'bg-[#1C382D] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Package size={16} />
                <span>Orders</span>
              </button>

              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'wishlist' ? 'bg-[#1C382D] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Heart size={16} />
                <span>Wishlist</span>
              </button>

              <button 
                onClick={() => setActiveTab('subscriptions')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'subscriptions' ? 'bg-[#1C382D] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Repeat size={16} />
                <span>Subscriptions</span>
              </button>

              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'addresses' ? 'bg-[#1C382D] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <MapPin size={16} />
                <span>Addresses</span>
              </button>

              <button 
                onClick={() => setActiveTab('rewards')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'rewards' ? 'bg-[#1C382D] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Sparkles size={16} />
                <span>Glow rewards</span>
              </button>

              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'profile' ? 'bg-[#1C382D] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <UserIcon size={16} />
                <span>Profile</span>
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'settings' ? 'bg-[#1C382D] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <SettingsIcon size={16} />
                <span>Settings</span>
              </button>

              <div className="pt-2 border-t border-[#E5E0D8]">
                <Link to="/login" className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all">
                  <LogOut size={16} />
                  <span>Log out</span>
                </Link>
              </div>
            </nav>

          </div>

          {/* Right Main Panel */}
          <div className="lg:col-span-9 space-y-10">
            
            {/* Order History Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E0D8]">
                <h2 className="font-serif text-2xl text-[#1C382D]">Order history</h2>
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#1C382D] bg-[#FDFBF7]">
                  <span>All orders</span>
                  <span>▾</span>
                </button>
              </div>

              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="p-5 rounded-2xl border border-[#E5E0D8] bg-[#FDFBF7]/50 hover:bg-white transition-all space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-bold text-[#1C382D]">{order.id}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-light">{order.date} · {order.itemsCount}</span>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-[#1C382D] block">{order.total}</span>
                        <span className="text-[10px] text-gray-400">Total paid</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E5E0D8]/60">
                      <div className="flex items-center space-x-2">
                        {order.images.map((img, idx) => (
                          <div key={idx} className="w-10 h-10 rounded-xl bg-white border border-[#E5E0D8] overflow-hidden flex items-center justify-center p-1">
                            <img src={img} alt="Product" className="w-full h-full object-cover rounded-lg" />
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 rounded-xl border border-[#1C382D] text-[#1C382D] text-xs font-bold hover:bg-[#1C382D] hover:text-white transition-colors">
                          Track order
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-[#1C382D] text-white text-xs font-bold hover:bg-[#152a22] transition-colors">
                          Buy again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Wishlist Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E0D8]">
                <h2 className="font-serif text-2xl text-[#1C382D]">Your wishlist</h2>
                <Link to="#" className="text-xs font-bold text-[#1C382D] underline hover:text-gray-700">
                  View all (7)
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="group bg-[#FDFBF7] rounded-2xl border border-[#E5E0D8] p-3 flex flex-col justify-between relative">
                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-5 left-5 z-10 bg-[#1C382D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Heart button */}
                    <button className="absolute top-5 right-5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1C382D] shadow-sm hover:bg-white">
                      <Heart size={13} fill="#1C382D" />
                    </button>

                    {/* Image */}
                    <div className="w-full h-40 rounded-xl bg-white overflow-hidden mb-3 flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Details */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">{item.category}</span>
                      <h4 className="text-xs font-bold text-[#1C382D] truncate">{item.title}</h4>
                      
                      <div className="flex items-center space-x-1 text-[10px] text-amber-500">
                        <Star size={11} fill="currentColor" />
                        <span className="font-bold text-[#1C382D]">{item.rating}</span>
                        <span className="text-gray-400">({item.reviews})</span>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-xs font-bold text-[#1C382D]">{item.price}</span>
                        {item.oldPrice && (
                          <span className="text-[11px] text-gray-400 line-through">{item.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}