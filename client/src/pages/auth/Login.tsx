import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

import spaModelImg from '../../assets/images/login.avif'; 

export default function Login() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('akhila@email.com');
  const [password, setPassword] = useState('••••••••••');
  const [keepSigned, setKeepSigned] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col lg:flex-row">
      
      {/* Left Panel */}
      <div className="lg:w-1/2 relative min-h-[350px] lg:min-h-screen overflow-hidden flex flex-col justify-end p-8 sm:p-12 lg:p-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={spaModelImg} 
            alt="Facial skincare treatment" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Testimonial Quote overlay */}
        <div className="relative z-10 max-w-lg text-white space-y-3">
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight">
            “The only routine my skin has ever stuck with.”
          </blockquote>
          <p className="text-xs sm:text-sm text-gray-300 font-light tracking-wide">
            Priya N. · Luméa member since 2024
          </p>
        </div>
      </div>

      {/* Right Panel: Login / Form Area */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          
          {/* Brand Logo Header */}
          <div className="text-center lg:text-left space-y-1">
            <h1 className="font-serif text-2xl tracking-wider text-[#1C382D]">
              Luméa
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Skincare
            </p>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
              Welcome back
            </h2>
            <p className="text-xs text-gray-500 font-light">
              Log in to track orders, manage subscriptions and earn Glow points.
            </p>
          </div>

          {/* Toggle Pill Navigation */}
          <div className="bg-[#EFECE6] p-1 rounded-full flex items-center space-x-1">
            <button 
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'login' ? 'bg-white text-[#1C382D] shadow-sm' : 'text-gray-500 hover:text-[#1C382D]'
              }`}
            >
              Log in
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'register' ? 'bg-white text-[#1C382D] shadow-sm' : 'text-gray-500 hover:text-[#1C382D]'
              }`}
            >
              Create account
            </button>
          </div>

          {/* Form Fields */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                  <Mail size={16} />
                </span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D8] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                  <Lock size={16} />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#E5E0D8] rounded-2xl pl-11 pr-16 py-3.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-gray-500 hover:text-[#1C382D]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={keepSigned}
                  onChange={() => setKeepSigned(!keepSigned)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]"
                />
                <span className="text-xs text-gray-600 font-light">Keep me signed in</span>
              </label>

              <a href="#" className="text-xs font-bold text-[#1C382D] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#1C382D] hover:bg-[#152a22] text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Log in</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#E5E0D8]"></div>
            <span className="flex-shrink mx-4 text-[11px] text-gray-400 font-light tracking-wide">or continue with</span>
            <div className="flex-grow border-t border-[#E5E0D8]"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl border border-[#E5E0D8] bg-white hover:bg-gray-50 text-xs font-bold text-[#1C382D] transition-colors shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.21 21.37 7.27 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.44 8.14 0 9.99 0 12s.44 3.86 1.2 5.4l4.08-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.21 2.63 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/>
              </svg>
              <span>Google</span>
            </button>

            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl border border-[#E5E0D8] bg-white hover:bg-gray-50 text-xs font-bold text-[#1C382D] transition-colors shadow-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.95 5.75c.57-.69 96-.06 1.18-.75.03-.25.03-.5-.03-.75-1.08.04-2.39.72-3.05 1.45-.55.6-1.03 1.42-.96 2.26 1.21.09 2.41-.58 2.86-2.21z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Footer prompt */}
          <p className="text-center text-xs text-gray-500 font-light pt-2">
            New to Luméa? <Link to="/register" className="text-[#1C382D] font-bold underline">Create an account</Link> and get 10% off your first order.
          </p>

        </div>
      </div>

    </div>
  );
}