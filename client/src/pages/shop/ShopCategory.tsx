import { useState, useEffect } from "react";
import { Star, ChevronDown, Grid, X, SlidersHorizontal, Heart, ChevronLeft, ChevronRight, Loader2, ShoppingBag, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProducts, type CategoryObject, type Product } from '../../api/productApi';
import { useAuth } from "../../context/useAuth";

export default function ShopCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category'); 

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [maxPrice, setMaxPrice] = useState<number>(5500);
  const [sortBy] = useState('Most loved');
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const selectedCategory = categoryParam || 'all';

  // Fetch products from backend database on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (res.success && Array.isArray(res.data)) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load products from backend:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getCategoryName = (cat: string | CategoryObject): string => {
    if (typeof cat === 'string') return cat;
    if (cat !== null && typeof cat === 'object') {
      return cat.name || cat.slug || '';
    }
    return '';
  };

  // Filter products based on selected category & price
  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price <= maxPrice;
    if (selectedCategory === 'all' || !selectedCategory) {
      return matchesPrice;
    }

    let catStr = "";
    if (typeof product.category === 'string') {
      catStr = product.category;
    } else if (product.category !== null && typeof product.category === 'object') {
      if ('name' in product.category && typeof product.category.name === 'string') {
        catStr = product.category.name;
      } else if ('slug' in product.category && typeof product.category.slug === 'string') {
        catStr = product.category.slug;
      }
    }
    const normalizedCat = selectedCategory.toLowerCase().replace(/s$/, ''); 
    const productCat = catStr.toLowerCase();
    return matchesPrice && productCat.includes(normalizedCat);
  });

  const handleCategorySelect = (catName: string) => {
    if (catName === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catName.toLowerCase() });
    }
  };

  const handleAddToCart = (productId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setAddingId(productId);

    setTimeout(() => {
      setAddingId(null);
      setAddedId(productId);

      setTimeout(() => {
        setAddedId(null);
      }, 2000);
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#1C382D]" size={36} />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#1C382D]/60 flex items-center space-x-2 mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Shop</span>
          <span>/</span>
          <span className="text-[#1C382D] font-medium capitalize">
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </span>
        </div>

        {/* Header Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E0D8] pb-8 mb-8">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C382D] mb-3 capitalize">
              {selectedCategory === 'all' ? 'All Skincare Products' : selectedCategory}
            </h1>
            <p className="text-sm text-[#2C3E35]/80 font-light max-w-xl">
              Clean, clinically backed formulations tailored from our database to support your skincare ritual.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="inline-flex items-center space-x-2 text-xs bg-[#F5F2EB] border border-[#E5E0D8] text-[#1C382D] px-4 py-2 rounded-full font-medium">
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
            
            <button 
              onClick={() => handleCategorySelect('all')}
              className="text-xs text-gray-500 underline underline-offset-2 hover:text-[#1C382D] mr-4"
            >
              Clear filter
            </button>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1.5 bg-[#1C382D] text-white text-xs px-3 py-1.5 rounded-full capitalize">
                <span>{selectedCategory}</span>
                <X size={12} className="cursor-pointer" onClick={() => handleCategorySelect('all')} />
              </span>
            )}
          </div>

          <div className="flex items-center justify-between lg:justify-end space-x-4">
            <span className="text-xs text-gray-500 font-light">Showing <strong>{filteredProducts.length}</strong> products</span>
            
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

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-8 pr-4">
            <div className="border-b border-[#E5E0D8] pb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C382D] mb-4">Category</h3>
              <div className="space-y-3 text-xs text-[#2C3E35]">
                <button 
                  onClick={() => handleCategorySelect('all')}
                  className={`block text-left w-full ${selectedCategory === 'all' ? 'font-bold text-[#1C382D]' : 'text-gray-600'}`}
                >
                  All Products
                </button>
                {['Cleansers', 'Serums', 'Moisturiser', 'Sun Care', 'Mask', 'Bundle'].map((cat, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleCategorySelect(cat)}
                    className={`block text-left w-full capitalize ${selectedCategory.toLowerCase().includes(cat.toLowerCase()) ? 'font-bold text-[#1C382D]' : 'text-gray-600 hover:text-[#1C382D]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-[#E5E0D8] pb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C382D] mb-4">Max Price</h3>
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
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
                <p className="text-sm text-gray-500 mb-2">No products found in this category.</p>
                <button 
                  onClick={() => handleCategorySelect('all')}
                  className="text-xs font-bold text-[#BE6E4C] underline"
                >
                  View all products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E5E0D8]/60 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
                  >
                    <div className="relative bg-[#F4F1EA] h-72 overflow-hidden flex items-center justify-center">
                      {product.badge && (
                        <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          product.badgeType === 'dark' ? 'bg-[#1C382D] text-white' : 'bg-[#B85D36] text-white'
                        }`}>
                          {product.badge}
                        </span>
                      )}

                      <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#1C382D] transition-colors shadow-sm">
                        <Heart size={15} />
                      </button>

                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#B85D36] uppercase mb-1 block">
                          {getCategoryName(product.category)}
                        </span>
                        <h3 className="font-serif text-lg text-[#1C382D] font-normal mb-2">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center space-x-1.5 mb-3">
                          <div className="flex text-amber-500">
                            {[...Array(product.rating || 5)].map((_, i) => (
                              <Star key={i} size={12} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-[11px] text-gray-400">({product.reviews || 0})</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1C382D]">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.oldPrice && (
                            <span className="text-[10px] text-gray-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                          onClick={() => handleAddToCart(product._id)}
                          disabled={addingId === product._id}
                          className={`px-3.5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 flex items-center space-x-1.5 shadow-sm ${
                            addedId === product._id
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#F4F1EA] text-[#1C382D] hover:bg-[#1C382D] hover:text-white'
                          }`}
                        >
                          {addingId === product._id ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : addedId === product._id ? (
                            <>
                              <Check size={14} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={13} />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-12">
              <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-400 hover:border-[#1C382D] hover:text-[#1C382D] transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#1C382D] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                1
              </button>
              <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-xs font-medium text-[#1C382D] hover:border-[#1C382D] transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}