// C:\PROJECTS_MERN\Lumea-skin care-E-commerce Website\client\src\pages\admin\DashboardPage.tsx
import { ChevronDown, ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp, ShoppingBag, Users, RotateCcw } from 'lucide-react';

export default function DashboardPage() {
  const lowStockItems = [
    { name: 'Mineral Daily SPF 50', sku: 'SKU LUM-2003', left: '6 left', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80' },
    { name: 'Rose Exfoliating Polish', sku: 'SKU LUM-2005', left: '9 left', img: 'https://images.unsplash.com/photo-1608248597359-994b59367e23?w=100&auto=format&fit=crop&q=80' },
    { name: 'The Complete Ritual Kit', sku: 'SKU LUM-2007', left: '11 left', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&auto=format&fit=crop&q=80' },
    { name: 'Barrier Repair Cream', sku: 'SKU LUM-2002', left: '14 left', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Revenue (30d)</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#2D6A4F] flex items-center justify-center">
              <TrendingUp size={15} />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">₹68,41,200</div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium">
            <ArrowUpRight size={14} />
            <span>+12.4% vs last month</span>
          </div>
          <div className="w-full bg-[#EAF3EA] h-2 rounded-full overflow-hidden">
            <div className="bg-[#2D6A4F] h-full w-[75%]" />
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Orders</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#2D6A4F] flex items-center justify-center">
              <ShoppingBag size={15} />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">1,284</div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium">
            <ArrowUpRight size={14} />
            <span>+8.1% vs last month</span>
          </div>
          <div className="w-full bg-[#EAF3EA] h-2 rounded-full overflow-hidden">
            <div className="bg-[#2D6A4F] h-full w-[65%]" />
          </div>
        </div>

        {/* New Customers Card */}
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">New Customers</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#2D6A4F] flex items-center justify-center">
              <Users size={15} />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">412</div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium">
            <ArrowUpRight size={14} />
            <span>+18.9% vs last month</span>
          </div>
          <div className="w-full bg-[#EAF3EA] h-2 rounded-full overflow-hidden">
            <div className="bg-[#2D6A4F] h-full w-[80%]" />
          </div>
        </div>

        {/* Refund Rate Card */}
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Refund Rate</span>
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw size={15} />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">1.8%</div>
          <div className="flex items-center space-x-1 text-[11px] text-rose-700 font-medium">
            <ArrowDownRight size={14} />
            <span>-0.4% vs last month</span>
          </div>
          <div className="w-full bg-rose-50 h-2 rounded-full overflow-hidden">
            <div className="bg-rose-400 h-full w-[30%]" />
          </div>
        </div>
      </div>

      {/* Revenue & Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview Graph Card */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl text-[#1C382D]">Revenue Overview</h3>
            <div className="flex items-center space-x-2 bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-1.5 rounded-xl text-xs text-gray-700 font-medium cursor-pointer hover:border-gray-400 transition-colors">
              <span>Last 12 months</span>
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E5E0D8]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Total Revenue</span>
              <div className="font-serif text-3xl font-bold text-[#1C382D]">₹5,84,90,000</div>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Avg. Order Value</span>
              <div className="font-serif text-3xl font-bold text-[#1C382D]">₹5,450</div>
            </div>
          </div>

          {/* Simulated Bar Chart */}
          <div className="h-44 flex items-end justify-between pt-6 px-2 gap-2">
            {[
              { m: 'J', h: '35%' }, { m: 'F', h: '42%' }, { m: 'M', h: '38%' }, 
              { m: 'A', h: '55%' }, { m: 'M', h: '50%' }, { m: 'J', h: '68%' }, 
              { m: 'J', h: '62%' }, { m: 'A', h: '75%' }, { m: 'S', h: '58%' }, 
              { m: 'O', h: '82%' }, { m: 'N', h: '48%' }, { m: 'D', h: '95%', active: true }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div 
                  style={{ height: bar.h }} 
                  className={`w-full rounded-t-lg transition-all ${bar.active ? 'bg-[#142B22]' : 'bg-[#D6E2DB] group-hover:bg-[#8FA89B]'}`} 
                />
                <span className="text-[10px] text-gray-400 font-medium">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories Breakdown Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col justify-between space-y-6">
          <h3 className="font-serif text-xl text-[#1C382D]">Top Categories</h3>
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center rounded-full border-[16px] border-[#142B22] border-t-[#C58359] border-r-[#8FA89B] border-b-[#E5E0D8]">
            <div className="text-center">
              <span className="font-serif text-2xl font-bold text-[#1C382D] block">1,284</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Orders</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { name: 'Serums & Oils', val: '39%', color: 'bg-[#142B22]' },
              { name: 'Moisturisers', val: '27%', color: 'bg-[#C58359]' },
              { name: 'Cleansers', val: '21%', color: 'bg-[#8FA89B]' },
              { name: 'Sun Care', val: '13%', color: 'bg-[#D6E2DB]' },
            ].map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-gray-600 font-medium">{cat.name}</span>
                </div>
                <span className="font-bold text-[#1C382D]">{cat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alerts Section */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={18} className="text-rose-600" />
            <h3 className="font-serif text-xl text-[#1C382D]">Low Stock Alerts</h3>
          </div>
          <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full font-bold tracking-wider">
            4 ITEMS REQUIRE RESTOCK
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lowStockItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#E5E0D8]">
              <div className="flex items-center space-x-3">
                <img src={item.img} alt={item.name} className="w-11 h-11 rounded-xl object-cover bg-white p-0.5 border border-[#E5E0D8]" />
                <div>
                  <h4 className="text-xs font-bold text-[#1C382D]">{item.name}</h4>
                  <span className="text-[10px] text-gray-400 font-medium">{item.sku}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-white px-2.5 py-1 rounded-xl border border-rose-100 shadow-2xs">
                {item.left}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}