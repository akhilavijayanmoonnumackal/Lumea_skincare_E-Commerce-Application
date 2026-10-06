import { useState } from 'react';
import { Search, Star, CheckCircle, XCircle, AlertCircle, MessageSquare, ThumbsUp, Filter, Trash2 } from 'lucide-react';

export default function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All');

  const reviews = [
    {
      id: 'REV-901',
      customer: 'Ananya Sharma',
      email: 'ananya.s@gmail.com',
      product: 'Vitamin C Glow Serum',
      rating: 5,
      date: 'Oct 5, 2026',
      title: 'Absolute game changer for my morning glow!',
      comment: 'Ive been using this for 3 weeks now and my dark spots have noticeably faded. The texture is lightweight and absorbs instantly without any sticky residue.',
      status: 'Approved',
      helpful: 12,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'REV-902',
      customer: 'Rahul Verma',
      email: 'rahul.v@yahoo.com',
      product: 'Barrier Repair Cream',
      rating: 4,
      date: 'Oct 4, 2026',
      title: 'Very soothing for sensitive skin',
      comment: 'Helped calm down my redness after retinol irritation. Only giving 4 stars because the jar is a bit small for the price, but the formula is stellar.',
      status: 'Approved',
      helpful: 8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'REV-903',
      customer: 'Priya Nair',
      email: 'priya.nair@outlook.com',
      product: 'Mineral Daily SPF 50',
      rating: 5,
      date: 'Oct 3, 2026',
      title: 'No white cast and sits great under makeup!',
      comment: 'Finding a mineral sunscreen that doesnt leave a chalky cast on wheatish skin tone is tough. This one is magic.',
      status: 'Pending',
      helpful: 3,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'REV-904',
      customer: 'Kabir Mehta',
      email: 'kabir.m@gmail.com',
      product: 'Hydrating Gel Cleanser',
      rating: 2,
      date: 'Oct 2, 2026',
      title: 'Left my skin feeling a bit tight',
      comment: 'Expected it to be more hydrating based on the description, but it felt slightly stripping on my dry cheeks.',
      status: 'Flagged',
      helpful: 1,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'REV-905',
      customer: 'Sneha Rao',
      email: 'sneha.rao@gmail.com',
      product: 'Rose Exfoliating Polish',
      rating: 5,
      date: 'Oct 1, 2026',
      title: 'Smells heavenly and gentle texture',
      comment: 'Does not scratch or micro-tear the skin like harsh walnut scrubs. Leaves skin silky smooth!',
      status: 'Approved',
      helpful: 15,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
            <CheckCircle size={12} />
            <span>Approved</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
            <AlertCircle size={12} />
            <span>Pending Approval</span>
          </span>
        );
      case 'Flagged':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
            <XCircle size={12} />
            <span>Flagged</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredReviews = reviews.filter(rev => {
    const matchesTab = statusTab === 'All' || rev.status === statusTab;
    const matchesSearch = rev.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rev.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rev.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Customer Reviews & Ratings</h2>
          <p className="text-xs text-gray-500 font-light">Moderate customer feedback, approve testimonials, and monitor product satisfaction.</p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Average Store Rating</span>
            <Star size={16} className="fill-amber-400 text-amber-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">4.8 / 5.0</div>
          <span className="text-[11px] text-emerald-700 font-medium">Based on 1,420+ verified reviews</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Pending Moderation</span>
            <AlertCircle size={16} className="text-amber-600" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">12</div>
          <span className="text-[11px] text-amber-700 font-medium">Requires admin approval</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Satisfaction Rate</span>
            <MessageSquare size={16} className="text-[#2D6A4F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">96%</div>
          <span className="text-[11px] text-emerald-700 font-medium">4 & 5 star ratings ratio</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Approved', 'Pending', 'Flagged'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${statusTab === tab ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews, product, or customer..."
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>
          <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-[#F7F5F0] flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Filter size={15} />
          </button>
        </div>
      </div>

      {/* Reviews List / Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#E5E0D8]">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((rev, idx) => (
              <div key={idx} className="p-6 hover:bg-[#FAFAFA] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <img src={rev.avatar} alt={rev.customer} className="w-9 h-9 rounded-full object-cover border border-[#E5E0D8]" />
                      <div>
                        <div className="font-bold text-[#1C382D] text-xs">{rev.customer}</div>
                        <div className="text-[11px] text-gray-400 font-light">{rev.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500 font-medium bg-[#F7F5F0] px-3 py-1 rounded-full border border-[#E5E0D8]">
                        Product: <strong className="text-[#1C382D]">{rev.product}</strong>
                      </span>
                      {getStatusBadge(rev.status)}
                    </div>
                  </div>

                  <div className="space-y-1 pl-12">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <span className="font-bold text-[#1C382D] text-xs ml-1">"{rev.title}"</span>
                      <span className="text-[11px] text-gray-400 font-light">• {rev.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-light leading-relaxed max-w-3xl">
                      {rev.comment}
                    </p>
                    <div className="flex items-center space-x-4 pt-1 text-[11px] text-gray-400">
                      <span className="flex items-center space-x-1">
                        <ThumbsUp size={12} />
                        <span>{rev.helpful} users found this helpful</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 pt-4 md:pt-0 border-t md:border-t-0 border-[#E5E0D8]">
                  {rev.status !== 'Approved' && (
                    <button title="Approve Review" className="px-3 py-1.5 rounded-full bg-[#EAF3EA] text-[#2D6A4F] hover:bg-[#d8edd8] text-xs font-bold transition-colors flex items-center space-x-1">
                      <CheckCircle size={13} />
                      <span>Approve</span>
                    </button>
                  )}
                  {rev.status !== 'Flagged' && (
                    <button title="Flag Review" className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center space-x-1">
                      <XCircle size={13} />
                      <span>Flag</span>
                    </button>
                  )}
                  <button title="Delete Review" className="w-8 h-8 rounded-full border border-rose-100 bg-white flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400 font-light text-xs">
              No reviews found matching your filter.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredReviews.length}</strong> of <strong className="text-[#1C382D] font-bold">{reviews.length}</strong> reviews</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}