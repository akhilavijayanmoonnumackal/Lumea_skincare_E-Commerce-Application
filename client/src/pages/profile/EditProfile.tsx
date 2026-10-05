import { useState } from 'react';
import { Mail, Phone, Check, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

import profileAvatarImg from '../../assets/images/profile.jpg';

export default function EditProfile() {
  const [firstName, setFirstName] = useState('Akhila');
  const [lastName, setLastName] = useState('Vijayan');
  const [email, setEmail] = useState('akhila.vijayan@email.com');
  const [phone, setPhone] = useState('+971 50 123 4567');
  
  const [skinType, setSkinType] = useState('Combination');
  const [primaryConcern, setPrimaryConcern] = useState('Hydration & Glow');

  const [marketingEmails, setMarketingEmails] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [routineReminders, setRoutineReminders] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link to="/account" className="hover:underline">My account</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">Profile Settings</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                Personal Profile
              </h1>
              <p className="text-xs text-gray-500 font-light mt-1">
                Manage your account credentials, skin profile preferences, and communication channels.
              </p>
            </div>
          </div>
        </div>

        {/* Saved Toast Alert */}
        {isSaved && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3 animate-fadeIn">
            <Check size={18} className="text-emerald-600" />
            <span className="text-xs font-bold">Your profile changes have been successfully saved.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Section 1: Avatar & Basic Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-6">
            <h2 className="font-serif text-xl text-[#1C382D] pb-3 border-b border-[#E5E0D8]">
              Personal Information
            </h2>

            {/* Avatar Row */}
            <div className="flex items-center space-x-4">
              <img src={profileAvatarImg} alt="Akhila Vijayan" className="w-16 h-16 rounded-full object-cover border border-[#E5E0D8]" />
              <div>
                <button type="button" className="px-4 py-2 rounded-xl border border-[#1C382D] text-[#1C382D] text-xs font-bold hover:bg-[#1C382D] hover:text-white transition-colors">
                  Change photo
                </button>
                <p className="text-[10px] text-gray-400 mt-1">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                  First name
                </label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl px-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                  Last name
                </label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl px-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <Mail size={15} />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                  Phone number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <Phone size={15} />
                  </span>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Skin Profile Preferences */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
              <h2 className="font-serif text-xl text-[#1C382D]">
                Skin Profile Preferences
              </h2>
              <Link to="/quiz" className="text-xs font-bold text-[#1C382D] underline hover:text-gray-700">
                Retake full skin quiz
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Skin Type Selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                  Registered Skin Type
                </label>
                <select 
                  value={skinType}
                  onChange={(e) => setSkinType(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl px-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                >
                  <option value="Dry">Dry & Tight</option>
                  <option value="Oily">Oily & Congested</option>
                  <option value="Combination">Combination</option>
                  <option value="Sensitive">Sensitive & Reactive</option>
                </select>
              </div>

              {/* Primary Concern Selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">
                  Primary Skin Concern
                </label>
                <select 
                  value={primaryConcern}
                  onChange={(e) => setPrimaryConcern(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-2xl px-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                >
                  <option value="Hydration & Glow">Hydration & Dullness</option>
                  <option value="Acne & Blemishes">Acne & Blemishes</option>
                  <option value="Aging & Fine Lines">Fine Lines & Firmness</option>
                  <option value="Pigmentation">Dark Spots & Pigmentation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Email Notification Settings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-6">
            <h2 className="font-serif text-xl text-[#1C382D] pb-3 border-b border-[#E5E0D8]">
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#1C382D] block">Order & Shipping Updates</span>
                  <span className="text-[11px] text-gray-500 font-light">Receive real-time tracking, delivery status, and invoice copies via email.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={orderUpdates}
                  onChange={() => setOrderUpdates(!orderUpdates)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#1C382D] block">Exclusive Offers & Glow Rewards</span>
                  <span className="text-[11px] text-gray-500 font-light">Get early access to sales, seasonal bundles, and bonus point notifications.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={marketingEmails}
                  onChange={() => setMarketingEmails(!marketingEmails)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#1C382D] block">Routine Check-in Reminders</span>
                  <span className="text-[11px] text-gray-500 font-light">Gentle reminders when your active skincare bottles are estimated to run out.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={routineReminders}
                  onChange={() => setRoutineReminders(!routineReminders)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-2">
            <Link 
              to="/account"
              className="px-6 py-3.5 rounded-full border border-[#E5E0D8] text-xs font-bold text-[#1C382D] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>

            <button 
              type="submit"
              className="bg-[#1C382D] hover:bg-[#152a22] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-2"
            >
              <Save size={14} />
              <span>Save changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}