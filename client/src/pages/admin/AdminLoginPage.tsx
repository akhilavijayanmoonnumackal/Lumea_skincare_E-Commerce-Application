import { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fillDemoCredentials = () => {
    setEmail('admin@lumeaskin.com');
    setPassword('admin123');
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication check
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@lumeaskin.com' && password === 'admin123') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Use the demo button below for quick access.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5E0D8] shadow-sm p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#1C382D] text-white rounded-2xl mx-auto flex items-center justify-center font-serif text-xl font-bold shadow-sm">
            L
          </div>
          <h1 className="font-serif text-2xl text-[#1C382D]">Lum<span className='text-[#BE6E4C]'>é</span>a Admin Portal</h1>
          <p className="text-xs text-gray-500 font-light">Secure backend management system for orders, inventory, and analytics.</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-2xl text-xs">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1C382D]">Admin Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lumeaskin.com"
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1C382D]">Password</label>
              {/* <a href="#" className="text-[11px] text-[#C58359] hover:underline font-medium">Forgot password?</a> */}
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" defaultChecked className="rounded border-[#E5E0D8] text-[#1C382D] focus:ring-[#1C382D]" />
              <label htmlFor="remember" className="text-xs text-gray-600 font-light cursor-pointer">Remember device</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1C382D] hover:bg-[#152a22] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-sm disabled:opacity-70 mt-2"
          >
            <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}</span>
            {!isLoading && <ArrowRight size={15} />}
          </button>
        </form>

        {/* Quick Demo Credentials Helper */}
        {/* <div className="bg-[#F7F5F0] border border-[#E5E0D8] p-4 rounded-2xl space-y-2 text-center">
          <div className="text-[11px] text-gray-500 font-medium">Testing out the dashboard?</div>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-2 bg-white border border-[#E5E0D8] hover:border-[#1C382D] text-[#1C382D] rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
          >
            <Sparkles size={14} className="text-[#C58359]" />
            <span>Fill Demo Admin Credentials</span>
          </button>
        </div> */}

        {/* Security Footer Notice */}
        <div className="pt-2 border-t border-[#E5E0D8] flex items-center justify-center space-x-2 text-[11px] text-gray-400 font-light">
          <ShieldCheck size={14} className="text-[#2D6A4F]" />
          <span>Encrypted Administrator Session</span>
        </div>
      </div>
    </div>
  );
}