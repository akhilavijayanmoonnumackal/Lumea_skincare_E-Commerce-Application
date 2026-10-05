import { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkincareGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      id: 0,
      category: 'Routine & Layering',
      question: 'What is the correct order to apply my Luméa skincare products?',
      answer: 'Always apply your products from the thinnest consistency to the thickest. General rule: Cleanse ➔ Toner / Essence ➔ Water-based Serums (like Vitamin C Glow Serum) ➔ Moisturizers ➔ Mineral Sunscreen (AM) or Face Oils (PM).'
    },
    {
      id: 1,
      category: 'Safety & Usage',
      question: 'How do I perform a patch test for new active ingredients?',
      answer: 'Apply a small coin-sized amount of the product to the inner forearm or behind your ear. Keep the area dry and do not wash it off for 24 to 48 hours. If you notice any redness, burning, or itching, discontinue use immediately.'
    },
    {
      id: 2,
      category: 'Sustainability',
      question: 'How can I recycle my empty Luméa glass bottles?',
      answer: 'All Luméa glass dropper bottles and amber jars are 100% recyclable. Simply rinse out any leftover residue with warm water, separate the rubber dropper bulb from the glass pipette, and drop them into your local glass recycling bin.'
    },
    {
      id: 3,
      category: 'Storage & Shelf Life',
      question: 'How should I store my Vitamin C Glow Serum?',
      answer: 'Store your Vitamin C serum in a cool, dry place away from direct sunlight. Because Vitamin C is a potent antioxidant sensitive to UV and heat, keeping it in a vanity drawer or refrigerator helps preserve its potency for up to 6 months after opening.'
    }
  ];

  const filteredArticles = articles.filter(art => 
    art.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">Skincare Guide & FAQ</span>
          </div>

          <span className="inline-flex items-center space-x-1.5 bg-[#1C382D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <BookOpen size={12} />
            <span>Expert Knowledge Base</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C382D]">
            Skincare Guide & Common Questions
          </h1>
          <p className="text-xs text-gray-500 font-light max-w-lg mx-auto">
            Everything you need to know about product layer ordering, patch testing, bottle recycling, and glowing skin routines.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Search questions (e.g. patch test, Vitamin C)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E5E0D8] rounded-2xl px-5 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D] shadow-sm"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => {
              const isOpen = openFaq === art.id;
              return (
                <div 
                  key={art.id} 
                  className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : art.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#1C382D] bg-[#F4F1EA] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {art.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#1C382D]">{art.question}</h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-transform ${isOpen ? 'rotate-180 bg-[#1C382D] text-white' : ''}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs text-gray-600 font-light leading-relaxed border-t border-[#E5E0D8] bg-[#FDFBF7]/50 animate-fadeIn">
                      {art.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-12 text-center space-y-3">
              <h3 className="font-serif text-2xl text-[#1C382D]">No articles found</h3>
              <p className="text-xs text-gray-500 font-light">
                Try searching for another keyword like "layer", "recycling", or "sunscreen".
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}