import { useState } from 'react';
import { Award, Sparkles, Gift, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RewardTier {
  id: string;
  title: string;
  pointsCost: number;
  description: string;
  type: 'discount' | 'product' | 'experience';
  available: boolean;
}

interface PointTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'redeemed';
}

export default function GlowRewards() {
  const [activeTab, setActiveTab] = useState<'tiers' | 'history'>('tiers');
  const [redeemedAlert, setRedeemedAlert] = useState<string | null>(null);

  const currentPoints = 840;
  const currentTier = "Glow Insider (Tier II)";
  const nextTierPoints = 1500;

  const rewards: RewardTier[] = [
    {
      id: 'r1',
      title: '₹1,250 Off Your Next Order',
      pointsCost: 500,
      description: 'Apply instantly at checkout on any purchase above ₹3,000.',
      type: 'discount',
      available: currentPoints >= 500,
    },
    {
      id: 'r2',
      title: 'Free Full-Size Vitamin C Serum',
      pointsCost: 1200,
      description: 'Our bestselling antioxidant brightening serum delivered free.',
      type: 'product',
      available: currentPoints >= 1200,
    },
    {
      id: 'r3',
      title: 'Exclusive Skincare Masterclass',
      pointsCost: 800,
      description: 'Live virtual masterclass with Luméa lead formulation chemists.',
      type: 'experience',
      available: currentPoints >= 800,
    },
    {
      id: 'r4',
      title: '₹2,500 Off Entire Order',
      pointsCost: 1000,
      description: 'High-value voucher valid across all skin routines and bundles.',
      type: 'discount',
      available: currentPoints >= 1000,
    }
  ];

  const transactions: PointTransaction[] = [
    {
      id: 't1',
      date: 'Oct 2, 2026',
      description: 'Purchase #LM-8924 (Mineral Daily SPF 50)',
      points: +220,
      type: 'earned',
    },
    {
      id: 't2',
      date: 'Sep 15, 2026',
      description: 'Redeemed: ₹500 Off Voucher',
      points: -300,
      type: 'redeemed',
    },
    {
      id: 't3',
      date: 'Aug 28, 2026',
      description: 'Completed Skin Routine Quiz',
      points: +100,
      type: 'earned',
    },
    {
      id: 't4',
      date: 'Aug 10, 2026',
      description: 'Welcome Bonus & Profile Setup',
      points: +500,
      type: 'earned',
    }
  ];

  const handleRedeem = (reward: RewardTier) => {
    if (!reward.available) return;
    setRedeemedAlert(`Successfully redeemed: ${reward.title}! Check your email for code.`);
    setTimeout(() => setRedeemedAlert(null), 4000);
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          <span>›</span>
          <span className="text-[#1C382D] font-medium">Glow Rewards Hub</span>
        </div>

        {/* Success Alert */}
        {redeemedAlert && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3 animate-fadeIn shadow-sm">
            <Sparkles size={18} className="text-emerald-600 flex-shrink-0" />
            <span className="text-xs font-bold">{redeemedAlert}</span>
          </div>
        )}

        {/* Hero Balance Card */}
        <div className="bg-[#1C382D] text-[#FDFBF7] p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-sm mb-8">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 text-[#FDFBF7] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                <Award size={12} />
                <span>{currentTier}</span>
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl">Glow Rewards Club</h1>
              <p className="text-xs text-gray-300 font-light max-w-md">
                Earn points with every purchase, quiz completion, and review. Redeem for exclusive discounts, free full-size products, and expert masterclasses.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center md:items-end justify-center min-w-[200px]">
              <span className="text-[10px] uppercase tracking-wider text-gray-300 font-bold">Available Balance</span>
              <div className="flex items-baseline space-x-1.5 my-1">
                <span className="font-serif text-4xl font-bold text-white">{currentPoints}</span>
                <span className="text-xs text-gray-300 font-light">points</span>
              </div>
              <span className="text-[10px] text-gray-300 font-light mt-1">
                {nextTierPoints - currentPoints} pts to Tier III (Elite)
              </span>
            </div>
          </div>
        </div>

        {/* How It Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1C382D]/5 flex items-center justify-center text-[#1C382D]">
              <Zap size={18} />
            </div>
            <h3 className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">1. Earn 10 Pts per ₹100</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Every skincare order earns points automatically credited upon shipping.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1C382D]/5 flex items-center justify-center text-[#1C382D]">
              <Star size={18} />
            </div>
            <h3 className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">2. Bonus Activities</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Earn 100 points for taking the skin quiz and 150 points for verified product reviews.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#1C382D]/5 flex items-center justify-center text-[#1C382D]">
              <Gift size={18} />
            </div>
            <h3 className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">3. Redeem & Save</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Exchange your points instantly for cash vouchers, full-size serums, or perks.
            </p>
          </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex items-center space-x-2 border-b border-[#E5E0D8] mb-8">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${activeTab === 'tiers' ? 'border-[#1C382D] text-[#1C382D]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            Reward Redemption Tiers
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${activeTab === 'history' ? 'border-[#1C382D] text-[#1C382D]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            Points History
          </button>
        </div>

        {/* Tab 1: Reward Tiers Grid */}
        {activeTab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white p-6 rounded-3xl border border-[#E5E0D8] flex flex-col justify-between shadow-sm space-y-6">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#1C382D] bg-[#F4F1EA] px-3 py-1 rounded-full uppercase tracking-wider">
                      {reward.type}
                    </span>
                    <span className="text-xs font-bold text-[#1C382D] bg-[#1C382D]/5 px-3 py-1 rounded-full">
                      {reward.pointsCost} Points
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-xl text-[#1C382D]">{reward.title}</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{reward.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    {reward.available ? 'Ready to redeem' : `Need ${reward.pointsCost - currentPoints} more pts`}
                  </span>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!reward.available}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm ${reward.available ? 'bg-[#1C382D] hover:bg-[#152a22] text-white cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    Redeem reward
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Points History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-sm animate-fadeIn">
            <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#1C382D]">Ledger History</h3>
              <span className="text-xs text-gray-400 font-light">Showing past earned and redeemed activities</span>
            </div>

            <div className="divide-y divide-[#E5E0D8]">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#1C382D]">{tx.description}</h4>
                    <span className="text-[10px] text-gray-400 font-light">{tx.date}</span>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${tx.type === 'earned' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                    {tx.type === 'earned' ? `+${tx.points} pts` : `${tx.points} pts`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}