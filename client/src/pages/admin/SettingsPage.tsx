// C:\PROJECTS_MERN\Lumea-skin care-E-commerce Website\client\src\pages\admin\SettingsPage.tsx
import { useState } from 'react';
import { Store, CreditCard, Truck, Bell, Shield, Save, CheckCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [savedMessage, setSavedMessage] = useState(false);

  // Form states
  const [storeName, setStoreName] = useState('Luméa Skincare');
  const [storeEmail, setStoreEmail] = useState('support@lumeaskin.com');
  const [currency, setCurrency] = useState('INR (₹)');
  const [taxRate, setTaxRate] = useState('18');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('999');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Admin Settings</h2>
          <p className="text-xs text-gray-500 font-light">Manage e-commerce store preferences, payment gateways, shipping rules, and administrator credentials.</p>
        </div>
        {savedMessage && (
          <div className="flex items-center space-x-2 bg-[#EAF3EA] text-[#2D6A4F] px-4 py-2 rounded-full text-xs font-bold border border-emerald-200 animate-fade-in">
            <CheckCircle size={14} />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-white p-2 rounded-3xl border border-[#E5E0D8] shadow-sm flex items-center space-x-1 overflow-x-auto">
        {[
          { name: 'General', icon: Store },
          { name: 'Payments', icon: CreditCard },
          { name: 'Shipping', icon: Truck },
          { name: 'Notifications', icon: Bell },
          { name: 'Security', icon: Shield },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.name 
                  ? 'bg-[#1C382D] text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-[#F7F5F0]'
              }`}
            >
              <IconComponent size={15} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Content Card */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === 'General' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif text-lg text-[#1C382D]">General Store Details</h3>
                <p className="text-xs text-gray-400 font-light mt-0.5">Basic information about your skincare brand displayed across invoices and storefront.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Store Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Customer Support Email</label>
                  <input
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Store Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  >
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>AED (د.إ)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Default Tax Rate (%)</label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C382D]">Store Bio / Tagline</label>
                <textarea
                  rows={3}
                  defaultValue="Pure, botanical, dermatologist-tested skincare formulations designed to elevate your daily ritual."
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl p-4 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                />
              </div>
            </div>
          )}

          {activeTab === 'Payments' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif text-lg text-[#1C382D]">Payment Gateway Integrations</h3>
                <p className="text-xs text-gray-400 font-light mt-0.5">Configure how customers pay for their orders on checkout.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#F7F5F0] rounded-2xl border border-[#E5E0D8]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E0D8] flex items-center font-bold text-[#1C382D] text-xs justify-center">RZP</div>
                    <div>
                      <div className="font-bold text-xs text-[#1C382D]">Razorpay Gateway</div>
                      <div className="text-[11px] text-gray-400 font-light">Credit/Debit Cards, UPI, Netbanking, Wallets</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D6A4F]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F7F5F0] rounded-2xl border border-[#E5E0D8]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E0D8] flex items-center font-bold text-[#1C382D] text-xs justify-center">COD</div>
                    <div>
                      <div className="font-bold text-xs text-[#1C382D]">Cash on Delivery (COD)</div>
                      <div className="text-[11px] text-gray-400 font-light">Pay upon physical door delivery</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D6A4F]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F7F5F0] rounded-2xl border border-[#E5E0D8]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E0D8] flex items-center font-bold text-[#1C382D] text-xs justify-center">STR</div>
                    <div>
                      <div className="font-bold text-xs text-[#1C382D]">Stripe (International Cards)</div>
                      <div className="text-[11px] text-gray-400 font-light">Global credit card processor</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D6A4F]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Shipping' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif text-lg text-[#1C382D]">Shipping & Fulfillment Rules</h3>
                <p className="text-xs text-gray-400 font-light mt-0.5">Set delivery fees and free shipping order thresholds.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Free Shipping Order Threshold (₹)</label>
                  <input
                    type="number"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Standard Shipping Flat Rate (₹)</label>
                  <input
                    type="number"
                    defaultValue="99"
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C382D]">Preferred Courier Partner</label>
                <select
                  defaultValue="Shiprocket Express"
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                >
                  <option>Shiprocket Express</option>
                  <option>Blue Dart Air</option>
                  <option>Delhivery Surface</option>
                  <option>FedEx Domestic</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif text-lg text-[#1C382D]">Admin Alert Preferences</h3>
                <p className="text-xs text-gray-400 font-light mt-0.5">Control which notifications trigger emails or dashboard alerts.</p>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'New Customer Order Notifications', desc: 'Receive instant alerts whenever an order is successfully placed.', defaultChecked: true },
                  { title: 'Low Stock Level Warnings', desc: 'Get alerted when product stock falls below minimum safety thresholds.', defaultChecked: true },
                  { title: 'New Customer Product Reviews', desc: 'Notify when reviews require admin moderation.', defaultChecked: true },
                  { title: 'Weekly Business Summary Report', desc: 'Automated email summary of weekly sales and revenue.', defaultChecked: false }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-[#F7F5F0] rounded-2xl border border-[#E5E0D8]">
                    <div className="space-y-0.5">
                      <div className="font-bold text-xs text-[#1C382D]">{item.title}</div>
                      <div className="text-[11px] text-gray-400 font-light">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D6A4F]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-serif text-lg text-[#1C382D]">Admin Security & Credentials</h3>
                <p className="text-xs text-gray-400 font-light mt-0.5">Update your administrator password and security credentials.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Current Admin Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1C382D]">New Password</label>
                    <input
                      type="password"
                      placeholder="At least 8 characters"
                      className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1C382D]">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Repeat new password"
                      className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Action Button */}
          <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-end">
            <button
              type="submit"
              className="bg-[#1C382D] hover:bg-[#152a22] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm"
            >
              <Save size={15} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}