import { useState } from 'react';
import { 
  Star, 
  Heart, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Droplets,
  Sun
} from 'lucide-react';

import vitamincImg from '../../assets/images/vitaminc.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import moisturiserImg from '../../assets/images/moisturisers.avif';
import suncareImg from '../../assets/images/suncare.avif';
import tonerImg from '../../assets/images/hydrating.avif';

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(vitamincImg);
  const [selectedSize, setSelectedSize] = useState('30 ml');
  const [purchaseOption, setPurchaseOption] = useState<'onetime' | 'subscribe'>('subscribe');
  const [quantity, setQuantity] = useState(1);
  //const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'howtouse' | 'shipping'>('description');
  
  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    ingredients: false,
    howtouse: false,
    shipping: false
  });

  const toggleAccordion = (key: keyof typeof openAccordions) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const images = [
    vitamincImg,
    cleanserImg,
    moisturiserImg,
    suncareImg
  ];

  const relatedProducts = [
    {
      id: 1,
      title: "Gentle Milk Cleanser",
      category: "CLEANSER",
      badge: "BESTSELLER",
      rating: 5,
      reviews: 214,
      price: 1850,
      image: cleanserImg
    },
    {
      id: 2,
      title: "Barrier Repair Cream",
      category: "MOISTURISER",
      badge: null,
      rating: 5,
      reviews: 108,
      price: 2600,
      image: moisturiserImg
    },
    {
      id: 3,
      title: "Mineral Daily SPF 50",
      category: "SUN CARE",
      badge: "NEW",
      rating: 5,
      reviews: 96,
      price: 2200,
      image: suncareImg
    },
    {
      id: 4,
      title: "Hydrating Essence Toner",
      category: "TONER",
      badge: null,
      rating: 4,
      reviews: 245,
      price: 1650,
      image: tonerImg
    }
  ];

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#1C382D]/60 flex items-center space-x-2 mb-8">
          <span>Home</span>
          <span>/</span>
          <span>Shop</span>
          <span>/</span>
          <span>Serums & Oils</span>
          <span>/</span>
          <span className="text-[#1C382D] font-medium">Vitamin C Glow Serum</span>
        </div>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 order-2 md:order-1">
              {images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-[#1C382D]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="relative flex-1 bg-[#F4F1EA] rounded-3xl overflow-hidden h-[450px] sm:h-[550px] order-1 md:order-2 flex items-center justify-center">
              <span className="absolute top-4 left-4 z-10 bg-[#B85D36] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                30% OFF
              </span>
              <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#1C382D] shadow-sm">
                <Heart size={16} />
              </button>
              <img src={selectedImage} alt="Vitamin C Glow Serum" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="lg:col-span-5 flex flex-col">
            
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-[#1C382D] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">BESTSELLER</span>
              <span className="text-xs text-[#B85D36] font-bold uppercase tracking-wider">SERUMS</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D] mb-3">
              Vitamin C Glow Serum
            </h1>

            {/* Ratings & Repurchase Rate */}
            <div className="flex items-center space-x-3 mb-4 text-xs">
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-[#1C382D]">4.9</span>
              <span className="text-gray-400">· 402 reviews</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#1C382D] font-medium">96% would repurchase</span>
            </div>

            {/* Description quote */}
            <p className="text-sm text-[#2C3E35]/80 font-light leading-relaxed mb-6">
              A stabilised 15% vitamin C serum with ferulic acid that brightens dullness, and evens tone — without the sting of traditional formulas.
            </p>

            {/* Pricing */}
            <div className="flex items-baseline space-x-3 mb-6 pb-6 border-b border-[#E5E0D8]">
              <span className="text-2xl font-bold text-[#1C382D]">₹3,450</span>
              <span className="text-base text-gray-400 line-through">₹4,950</span>
              <span className="text-xs bg-[#B85D36]/10 text-[#B85D36] font-bold px-2 py-1 rounded">Save ₹1,500</span>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C382D]">Size</label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: '15 ml', price: '₹1,950' },
                  { size: '30 ml', price: '₹3,450 · Best value', badge: true },
                  { size: '50 ml', price: '₹5,100' }
                ].map((item) => (
                  <button
                    key={item.size}
                    onClick={() => setSelectedSize(item.size)}
                    className={`py-3 px-3 rounded-xl border text-left flex flex-col justify-center transition-all ${
                      selectedSize === item.size 
                        ? 'border-[#1C382D] bg-[#1C382D]/5 shadow-sm' 
                        : 'border-[#E5E0D8] bg-white hover:border-gray-400'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#1C382D]">{item.size}</span>
                    <span className="text-[10px] text-gray-500 mt-0.5">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1C382D] block">Purchase Option</label>
              
              {/* One-time purchase */}
              <div 
                onClick={() => setPurchaseOption('onetime')}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  purchaseOption === 'onetime' ? 'border-[#1C382D] bg-white shadow-sm' : 'border-[#E5E0D8] bg-white/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseOption === 'onetime' ? 'border-[#1C382D]' : 'border-gray-300'}`}>
                    {purchaseOption === 'onetime' && <div className="w-2 h-2 rounded-full bg-[#1C382D]" />}
                  </div>
                  <span className="text-xs font-medium text-[#1C382D]">One-time purchase</span>
                </div>
                <span className="text-xs font-bold text-[#1C382D]">₹3,450</span>
              </div>

              {/* Subscribe & save */}
              <div 
                onClick={() => setPurchaseOption('subscribe')}
                className={`p-4 rounded-xl border cursor-pointer flex flex-col transition-all ${
                  purchaseOption === 'subscribe' ? 'border-[#1C382D] bg-white shadow-sm ring-1 ring-[#1C382D]' : 'border-[#E5E0D8] bg-white/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${purchaseOption === 'subscribe' ? 'border-[#1C382D]' : 'border-gray-300'}`}>
                      {purchaseOption === 'subscribe' && <div className="w-2 h-2 rounded-full bg-[#1C382D]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1C382D]">Subscribe & save 15%</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1C382D]">₹2,932</span>
                </div>
                <p className="text-[11px] text-gray-500 pl-7 mt-1 font-light">
                  Delivered every 8 weeks · pause or cancel anytime
                </p>
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center border border-[#E5E0D8] rounded-full px-4 py-3 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[#1C382D]"
                >
                  <Minus size={14} />
                </button>
                <span className="mx-4 text-xs font-bold text-[#1C382D]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[#1C382D]"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button className="flex-1 bg-[#1C382D] hover:bg-[#152a22] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2">
                <span>Add to bag — ₹{(purchaseOption === 'subscribe' ? 2932 : 3450) * quantity}</span>
              </button>
            </div>

            {/* Buy it now button */}
            <button className="w-full bg-[#B85D36] hover:bg-[#a5522f] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm mb-6">
              Buy it now
            </button>

            {/* Perks list */}
            <div className="space-y-2.5 text-xs text-gray-600 font-light border-t border-[#E5E0D8] pt-6">
              <div className="flex items-center space-x-2.5">
                <Truck size={15} className="text-[#1C382D]" />
                <span>Free carbon-neutral delivery over ₹1,500 — arrives in 2–4 days</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <RefreshCw size={15} className="text-[#1C382D]" />
                <span>Subscribe & save 15% — skip or cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <ShieldCheck size={15} className="text-[#1C382D]" />
                <span>30-day happiness guarantee, no questions asked</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="mt-8 border-t border-[#E5E0D8]">
              
              {/* Description */}
              <div className="border-b border-[#E5E0D8] py-4">
                <button 
                  onClick={() => toggleAccordion('description')} 
                  className="w-full flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#1C382D]"
                >
                  <span>Description</span>
                  {openAccordions.description ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions.description && (
                  <p className="text-xs text-gray-600 font-light mt-3 leading-relaxed">
                    A stabilised 15% L-ascorbic acid serum buffered with ferulic acid and vitamin E. Clinically shown to visibly fade dark spots in 4 weeks while protecting against daily environmental stress.
                  </p>
                )}
              </div>

              {/* Full ingredient list */}
              <div className="border-b border-[#E5E0D8] py-4">
                <button 
                  onClick={() => toggleAccordion('ingredients')} 
                  className="w-full flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#1C382D]"
                >
                  <span>Full ingredient list</span>
                  {openAccordions.ingredients ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions.ingredients && (
                  <p className="text-xs text-gray-600 font-light mt-3 leading-relaxed">
                    Aqua/Water/Eau, 15% L-Ascorbic Acid, Glycerin, Ferulic Acid, Tocopherol (Vitamin E), Sodium Hyaluronate, Camellia Sinensis Leaf Extract, Phenoxyethanol.
                  </p>
                )}
              </div>

              {/* How to use */}
              <div className="border-b border-[#E5E0D8] py-4">
                <button 
                  onClick={() => toggleAccordion('howtouse')} 
                  className="w-full flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#1C382D]"
                >
                  <span>How to use</span>
                  {openAccordions.howtouse ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions.howtouse && (
                  <p className="text-xs text-gray-600 font-light mt-3 leading-relaxed">
                    Apply 4–5 drops every morning to clean, dry skin. Gently press into face and neck until fully absorbed. Follow with your favorite moisturiser and SPF.
                  </p>
                )}
              </div>

              {/* Shipping & returns */}
              <div className="border-b border-[#E5E0D8] py-4">
                <button 
                  onClick={() => toggleAccordion('shipping')} 
                  className="w-full flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-[#1C382D]"
                >
                  <span>Shipping & returns</span>
                  {openAccordions.shipping ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordions.shipping && (
                  <p className="text-xs text-gray-600 font-light mt-3 leading-relaxed">
                    Orders ship within 24 hours. We offer hassle-free returns within 30 days of purchase for a full refund.
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Feature Highlights Banner */}
        <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F4F1EA] p-8 rounded-3xl">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1C382D] mb-3 shadow-sm">
              <Sparkles size={18} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-1">Brightens</h4>
            <p className="text-xs text-gray-600 font-light">−58% dark spots in 4 wks</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1C382D] mb-3 shadow-sm">
              <Droplets size={18} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-1">Hydrates</h4>
            <p className="text-xs text-gray-600 font-light">Boosts vitamin F barrier</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1C382D] mb-3 shadow-sm">
              <Sun size={18} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-1">Protects</h4>
            <p className="text-xs text-gray-600 font-light">Self-oxidant shield</p>
          </div>
        </div>

        {/* Clinical Study Badge Box */}
        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 mb-16 flex items-center space-x-4">
          <img src={cleanserImg} alt="Clinical trial" className="w-14 h-14 rounded-full object-cover" />
          <div>
            <h4 className="text-xs font-bold text-[#1C382D] uppercase tracking-wider mb-1">Clinically tested on 120 volunteers.</h4>
            <p className="text-xs text-gray-500 font-light">8-week independent study, all Fitzpatrick skin types. Full results in the Clinical tab.</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-[#E5E0D8] pt-12 pb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="flex space-x-6 border-b border-[#E5E0D8] pb-4">
              <button className="text-xs font-bold text-[#1C382D] border-b-2 border-[#1C382D] pb-1">Reviews (402)</button>
              <button className="text-xs text-gray-400 hover:text-[#1C382D]">Clinical results</button>
              <button className="text-xs text-gray-400 hover:text-[#1C382D]">Questions (28)</button>
            </div>
            <button className="mt-4 md:mt-0 bg-white border border-[#1C382D] text-[#1C382D] px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#1C382D] hover:text-white transition-colors">
              Write a review
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-10">
            <div className="lg:col-span-4 bg-[#F4F1EA] p-6 rounded-2xl">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-4xl font-serif text-[#1C382D]">4.9</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (<Star key={i} size={14} fill="currentColor" />))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-6 font-light">Based on 402 verified reviews</p>

              {/* Rating Bars */}
              <div className="space-y-2 text-xs text-gray-600">
                {[
                  { stars: 5, count: 330, width: '85%' },
                  { stars: 4, count: 68, width: '20%' },
                  { stars: 3, count: 16, width: '5%' },
                  { stars: 2, count: 4, width: '2%' },
                  { stars: 1, count: 0, width: '0%' }
                ].map(r => (
                  <div key={r.stars} className="flex items-center space-x-3">
                    <span>{r.stars}</span>
                    <Star size={10} fill="currentColor" className="text-amber-500" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1C382D]" style={{ width: r.width }}></div>
                    </div>
                    <span className="w-8 text-right text-gray-400">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Cards */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-[#1C382D] text-white text-xs flex items-center justify-center font-bold">PN</span>
                    <div>
                      <h5 className="text-xs font-bold text-[#1C382D]">Priya N.</h5>
                      <span className="text-[10px] text-gray-400">Verified buyer · Combination · 2 weeks ago</span>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (<Star key={i} size={12} fill="currentColor" />))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 font-light italic">
                  "Six weeks in and the dark spots on my cheeks have genuinely faded. No stinging even though I have reactive skin."
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-[#B85D36] text-white text-xs flex items-center justify-center font-bold">HL</span>
                    <div>
                      <h5 className="text-xs font-bold text-[#1C382D]">Hannah L.</h5>
                      <span className="text-[10px] text-gray-400">Verified buyer · Dry · 1 month ago</span>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (<Star key={i} size={12} fill="currentColor" />))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 font-light italic">
                  "Absorbs in seconds and layers beautifully under SPF. The glass bottle with the pump is a nice touch."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pairs Well With Section */}
        <div className="border-t border-[#E5E0D8] pt-12 pb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B85D36] mb-1 block">Completes the routine</span>
              <h2 className="font-serif text-3xl text-[#1C382D]">Pairs well with</h2>
            </div>
            <button className="text-xs font-bold text-[#1C382D] underline underline-offset-4">View all</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(prod => (
              <div key={prod.id} className="bg-white rounded-2xl overflow-hidden border border-[#E5E0D8] flex flex-col justify-between group">
                <div className="relative bg-[#F4F1EA] h-60 overflow-hidden flex items-center justify-center">
                  {prod.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-[#1C382D] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                      {prod.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#1C382D]">
                    <Heart size={13} />
                  </button>
                  <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#B85D36] uppercase mb-1 block">{prod.category}</span>
                    <h3 className="font-serif text-sm text-[#1C382D] mb-2">{prod.title}</h3>
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (<Star key={i} size={11} fill="currentColor" />))}
                      </div>
                      <span className="text-[10px] text-gray-400">({prod.reviews})</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1C382D] pt-2 border-t border-gray-100">₹{prod.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}