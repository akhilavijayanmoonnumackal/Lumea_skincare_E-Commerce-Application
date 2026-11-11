import { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/adminAuthApi';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await adminLogin({ email, password });

      if (res.success) {
        const user = 'user' in res.data && res.data.user ? res.data.user : res.data;
        const userRole = user.adminUserType || user.role;

        if (userRole !== 'admin' && userRole !== 'superadmin') {
          setError('Access denied. Administrator privilages required.');
          setIsLoading(false);
          return;
        }

        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        localStorage.setItem('userInfo', JSON.stringify(user));
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid admin credentials.');
      }
    } catch (err: unknown) {
      console.error('Admin login error:', err);
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  }

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
            {isLoading ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' />
                <span>Verifying Credentials....</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Security Footer Notice */}
        <div className="pt-2 border-t border-[#E5E0D8] flex items-center justify-center space-x-2 text-[11px] text-gray-400 font-light">
          <ShieldCheck size={14} className="text-[#2D6A4F]" />
          <span>Encrypted Administrator Session</span>
        </div>
      </div>
    </div>
  );
}