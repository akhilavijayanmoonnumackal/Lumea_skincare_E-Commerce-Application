import { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, FolderTree, Star, 
  Boxes, Bell, Settings, Search, Plus, RefreshCw 
} from 'lucide-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/admin/orders')) return 'Orders';
    if (path.includes('/admin/products')) return 'Products';
    if (path.includes('/admin/subscriptions')) return 'Subscriptions';
    return 'Dashboard';
  };

  const [activeNav, setActiveNav] = useState(getActiveTab());

  const handleNavClick = (name: string, route: string) => {
    setActiveNav(name);
    navigate(route);
  };

  return (
    <div className="flex min-h-screen bg-[#F7F5F0] text-[#1C382D] font-sans antialiased">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#142B22] text-[#E5E0D8] flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div>
          <div className="p-6 border-b border-white/10">
            <span className="font-serif text-2xl tracking-wide text-white block">Lum<span className='text-[#BE6E4C]'>é</span>a</span>
            <span className="text-[10px] tracking-widest uppercase text-[#8FA89B] font-medium">Admin Control Center</span>
          </div>

          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8FA89B] px-3 font-bold">Main</span>
              {[
                { name: 'Dashboard', icon: LayoutDashboard, route: '/admin/dashboard' },
                { name: 'Orders', icon: ShoppingBag, route: '/admin/orders' },
                { name: 'Products', icon: Package, route: '/admin/products' },
                { name: 'Subscriptions', icon: RefreshCw, route: '/admin/subscriptions' },
                { name: 'Customers', icon: Users, route: '/admin/customers' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name, item.route)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${isActive ? 'bg-[#1C382D] text-white shadow-sm' : 'text-[#A3B8AD] hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8FA89B] px-3 font-bold">Catalogue</span>
              {[
                { name: 'Categories', icon: FolderTree, route: '/admin/categories' },
                { name: 'Reviews', icon: Star, route: '/admin/reviews' },
                { name: 'Inventory', icon: Boxes, route: '/admin/inventory' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name, item.route)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${isActive ? 'bg-[#1C382D] text-white shadow-sm' : 'text-[#A3B8AD] hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8FA89B] px-3 font-bold">System</span>
              {[
                { name: 'Notifications', icon: Bell, route: '/admin/notifications' },
                { name: 'Settings', icon: Settings, route: '/admin/settings' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name, item.route)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${isActive ? 'bg-[#1C382D] text-white shadow-sm' : 'text-[#A3B8AD] hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 m-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Plan: Growth</span>
            <span className="text-[10px] text-[#8FA89B]">48%</span>
          </div>
          <p className="text-[11px] text-[#A3B8AD] font-light">2,400 / 5,000 orders used this month</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#C58359] h-full w-[48%]" />
          </div>
        </div>
      </aside>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-[#E5E0D8] px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-[#1C382D]">Good morning, Admin</h1>
            <p className="text-xs text-gray-500 font-light">Here's what's happening with your store today.</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, products..."
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
              />
            </div>

            <button className="w-10 h-10 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
              <Bell size={16} />
            </button>

            <button className="bg-[#1C382D] hover:bg-[#152a22] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm">
              <Plus size={14} />
              <span>Add product</span>
            </button>

            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Admin" 
              className="w-10 h-10 rounded-full object-cover border border-[#E5E0D8]" 
            />
          </div>
        </header>

        <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}