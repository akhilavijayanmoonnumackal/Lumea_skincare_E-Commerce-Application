import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, ShoppingBag, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local asset imports
import serumsImg from '../../assets/images/serums&oils.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import suncareImg from '../../assets/images/suncare.avif';

export default function SkinQuiz() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Quiz State
  const [skinType, setSkinType] = useState('Combination');
  const [primaryConcern, setPrimaryConcern] = useState('Hydration & Glow');
  const [climate, setClimate] = useState('Humid / Coastal');
  const [routinePreference, setRoutinePreference] = useState('Minimalist (3 steps)');

  const [isCompleted, setIsCompleted] = useState(false);

  const skinTypes = [
    { id: 'Dry', label: 'Dry & Tight', desc: 'Lacks moisture, feels flaky or rough' },
    { id: 'Oily', label: 'Oily & Congested', desc: 'Excess shine, enlarged pores, prone to breakouts' },
    { id: 'Combination', label: 'Combination', desc: 'Oily T-zone, normal to dry cheeks' },
    { id: 'Sensitive', label: 'Sensitive & Reactive', desc: 'Easily reddened, irritated, or prone to stinging' },
  ];

  const concerns = [
    { id: 'Hydration & Glow', label: 'Hydration & Dullness', desc: 'Restore radiance and moisture barriers' },
    { id: 'Acne & Blemishes', label: 'Acne & Blemishes', desc: 'Clear congestion and soothe inflammation' },
    { id: 'Aging & Fine Lines', label: 'Fine Lines & Firmness', desc: 'Boost collagen and smooth skin texture' },
    { id: 'Pigmentation', label: 'Dark Spots & Pigmentation', desc: 'Even out skin tone and fade sun spots' },
  ];

  const climates = [
    { id: 'Humid / Coastal', label: 'Humid & Tropical', desc: 'High moisture, heavy sweating, requires lightweight layers' },
    { id: 'Dry / Desert', label: 'Dry & Arid', desc: 'Low humidity, quick moisture evaporation' },
    { id: 'Temperate / Moderate', label: 'Temperate / Four Seasons', desc: 'Balanced climate with seasonal shifts' },
    { id: 'Urban / Polluted', label: 'Urban & High Pollution', desc: 'Exposed to smog, dust, and daily oxidative stress' },
  ];

  const preferences = [
    { id: 'Minimalist (3 steps)', label: 'Minimalist (3 Steps)', desc: 'Cleanse, Treat, Protect — fast & effective' },
    { id: 'Comprehensive (5 steps)', label: 'Comprehensive Ritual (5 Steps)', desc: 'Double cleanse, essence, serum, cream, SPF' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentStep(1);
    setIsCompleted(false);
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          <span>›</span>
          <span className="text-[#1C382D] font-medium">Skin Routine Quiz</span>
        </div>

        {!isCompleted ? (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] p-8 sm:p-12 shadow-sm space-y-8">
            
            {/* Header & Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C382D] bg-[#F4F1EA] px-3 py-1 rounded-full">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-xs text-gray-400 font-light">
                  {Math.round((currentStep / totalSteps) * 100)}% completed
                </span>
              </div>
              
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#1C382D] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Skin Type */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                    How would you describe your skin type?
                  </h1>
                  <p className="text-xs text-gray-500 font-light">
                    Select the option that best matches how your skin feels most of the day.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skinTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSkinType(type.id)}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${skinType === type.id ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8] hover:border-gray-400 bg-white'}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">{type.label}</span>
                        {skinType === type.id && <Check size={16} className="text-[#1C382D]" />}
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Primary Concern */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                    What is your primary skin concern?
                  </h1>
                  <p className="text-xs text-gray-500 font-light">
                    Choose the main goal you want your custom routine to target.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {concerns.map((con) => (
                    <button
                      key={con.id}
                      onClick={() => setPrimaryConcern(con.id)}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${primaryConcern === con.id ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8] hover:border-gray-400 bg-white'}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">{con.label}</span>
                        {primaryConcern === con.id && <Check size={16} className="text-[#1C382D]" />}
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">{con.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Climate */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                    What environment or climate do you live in?
                  </h1>
                  <p className="text-xs text-gray-500 font-light">
                    Climate impacts how your skin retains moisture and handles active ingredients.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {climates.map((cli) => (
                    <button
                      key={cli.id}
                      onClick={() => setClimate(cli.id)}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${climate === cli.id ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8] hover:border-gray-400 bg-white'}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">{cli.label}</span>
                        {climate === cli.id && <Check size={16} className="text-[#1C382D]" />}
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">{cli.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Routine Preference */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                    How complex do you want your daily routine to be?
                  </h1>
                  <p className="text-xs text-gray-500 font-light">
                    Select your preferred skincare commitment level.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {preferences.map((pref) => (
                    <button
                      key={pref.id}
                      onClick={() => setRoutinePreference(pref.id)}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${routinePreference === pref.id ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8] hover:border-gray-400 bg-white'}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">{pref.label}</span>
                        {routinePreference === pref.id && <Check size={16} className="text-[#1C382D]" />}
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">{pref.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#E5E0D8]">
              {currentStep > 1 ? (
                <button 
                  onClick={handlePrev}
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#1C382D] hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>
              ) : <div />}

              <button 
                onClick={handleNext}
                className="flex items-center space-x-2 bg-[#1C382D] hover:bg-[#152a22] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>{currentStep === totalSteps ? 'See my prescription' : 'Next step'}</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        ) : (
          /* Results Section */
          <div className="bg-white rounded-3xl border border-[#E5E0D8] p-8 sm:p-12 shadow-sm space-y-8 animate-fadeIn">
            
            {/* Result Header */}
            <div className="text-center space-y-3 max-w-lg mx-auto">
              <span className="inline-flex items-center space-x-1.5 bg-[#1C382D] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles size={12} />
                <span>Your Custom Prescription</span>
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                The Balanced Glow Ritual
              </h1>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Tailored for your <span className="font-bold text-[#1C382D]">{skinType}</span> skin targeting <span className="font-bold text-[#1C382D]">{primaryConcern}</span> in a <span className="font-bold text-[#1C382D]">{climate}</span> climate.
              </p>
            </div>

            {/* Routine Steps List */}
            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8]">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#E5E0D8] overflow-hidden flex items-center justify-center p-1 flex-shrink-0">
                    <img src={cleanserImg} alt="Cleanser" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C382D] block mb-0.5">Step 1 · Cleanse</span>
                    <h4 className="text-xs font-bold text-[#1C382D]">Gentle Milk Cleanser</h4>
                    <p className="text-[11px] text-gray-500 font-light">Purifies without stripping natural barrier lipids</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1C382D]">₹1,850</span>
              </div>

              {/* Step 2 */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8]">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#E5E0D8] overflow-hidden flex items-center justify-center p-1 flex-shrink-0">
                    <img src={serumsImg} alt="Serum" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C382D] block mb-0.5">Step 2 · Treat</span>
                    <h4 className="text-xs font-bold text-[#1C382D]">Vitamin C Glow Serum</h4>
                    <p className="text-[11px] text-gray-500 font-light">Brightens tone and boosts antioxidant defenses</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1C382D]">₹2,950</span>
              </div>

              {/* Step 3 */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8]">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#E5E0D8] overflow-hidden flex items-center justify-center p-1 flex-shrink-0">
                    <img src={suncareImg} alt="SPF" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C382D] block mb-0.5">Step 3 · Protect</span>
                    <h4 className="text-xs font-bold text-[#1C382D]">Mineral Daily SPF 50</h4>
                    <p className="text-[11px] text-gray-500 font-light">Weightless broad-spectrum UV defense</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1C382D]">₹2,200</span>
              </div>

            </div>

            {/* Bundle Total & Action */}
            <div className="p-6 rounded-2xl bg-[#F4F1EA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">Complete 3-Step Bundle</span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="font-serif text-2xl font-bold text-[#1C382D]">₹6,200</span>
                  <span className="text-xs text-gray-400 line-through">₹7,000</span>
                  <span className="bg-[#1C382D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Save 12%</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button 
                  onClick={restartQuiz}
                  className="px-4 py-3 rounded-xl border border-[#1C382D] text-[#1C382D] text-xs font-bold hover:bg-white transition-colors flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw size={13} />
                  <span>Retake quiz</span>
                </button>

                <button className="flex-1 sm:flex-none bg-[#1C382D] hover:bg-[#152a22] text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2">
                  <ShoppingBag size={14} />
                  <span>Add routine to bag</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}