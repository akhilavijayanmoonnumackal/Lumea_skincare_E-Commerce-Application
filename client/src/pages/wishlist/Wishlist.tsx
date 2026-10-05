import { useState } from 'react';
import { Heart, Star, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local asset imports
import maskImg from '../../assets/images/clayMask.avif';
import exfoliantImg from '../../assets/images/rose.avif';
import bundleImg from '../../assets/images/barrier.avif';
import niacinamideImg from '../../assets/images/niacinamide.avif';
import serumsImg from '../../assets/images/serums&oils.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import suncareImg from '../../assets/images/suncare.avif';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
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
    },
    {
      id: 5,
      category: "Serum",
      title: "Vitamin C Glow Serum",
      rating: 4.9,
      reviews: 324,
      price: "₹2,950",
      image: serumsImg
    },
    {
      id: 6,
      category: "Cleanser",
      title: "Gentle Milk Cleanser",
      rating: 4.8,
      reviews: 182,
      price: "₹1,850",
      image: cleanserImg
    },
    {
      id: 7,
      category: "Suncare",
      title: "Mineral Daily SPF 50",
      rating: 5.0,
      reviews: 412,
      price: "₹2,200",
      image: suncareImg
    }
  ]);

  const removeItem = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link to="/account" className="hover:underline">My account</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">Wishlist</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                My Wishlist
              </h1>
              <p className="text-xs text-gray-500 font-light mt-1">
                Saved items ready when you are ({wishlistItems.length} products)
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#1C382D] bg-white hover:bg-gray-50 shadow-sm">
                <SlidersHorizontal size={14} />
                <span>Filter</span>
              </button>
              
              <button className="bg-[#1C382D] hover:bg-[#152a22] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-2">
                <ShoppingBag size={14} />
                <span>Move all to bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl border border-[#E5E0D8] p-4 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow">
                
                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-6 left-6 z-10 bg-[#1C382D] text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                
                {/* Remove / Heart button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-rose-600 shadow-sm hover:bg-rose-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <Heart size={14} fill="currentColor" />
                </button>

                {/* Image Container */}
                <div className="w-full h-52 rounded-2xl bg-[#F4F1EA] overflow-hidden mb-4 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-4">
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

                {/* Add to Bag Button */}
                <button className="w-full bg-[#F4F1EA] hover:bg-[#1C382D] hover:text-white text-[#1C382D] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2">
                  <ShoppingBag size={13} />
                  <span>Add to bag</span>
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center mx-auto text-[#1C382D]">
              <Heart size={24} />
            </div>
            <h3 className="font-serif text-2xl text-[#1C382D]">Your wishlist is empty</h3>
            <p className="text-xs text-gray-500 font-light max-w-sm mx-auto">
              Explore our collection of serums, cleansers, and rituals to save your favorite skincare essentials.
            </p>
            <div className="pt-2">
              <Link to="/shop" className="inline-block bg-[#1C382D] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#152a22] transition-colors">
                Explore shop
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}