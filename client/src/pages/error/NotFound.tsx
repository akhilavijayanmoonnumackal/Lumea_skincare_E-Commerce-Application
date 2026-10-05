import { Sparkles, Home, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E0D8] shadow-sm">
        
        {/* Brand/Status Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#1C382D]/5 flex items-center justify-center mx-auto text-[#1C382D]">
          <Sparkles size={28} />
        </div>

        {/* Error Code & Heading */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-[#1C382D] bg-[#F4F1EA] px-3 py-1 rounded-full uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
            Page Not Found
          </h1>
          <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xs mx-auto">
            It looks like this page has drifted away. Let's guide you back to your glowing skincare routine.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            to="/"
            className="w-full bg-[#1C382D] hover:bg-[#152a22] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/shop"
            className="w-full bg-white border border-[#E5E0D8] text-[#1C382D] hover:bg-gray-50 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={15} />
            <span>Explore Skincare Shop</span>
          </Link>
        </div>

        {/* Go Back Link */}
        <div className="pt-4 border-t border-[#E5E0D8]">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-[#1C382D] font-light transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Go back to previous page</span>
          </button>
        </div>

      </div>
    </div>
  );
}