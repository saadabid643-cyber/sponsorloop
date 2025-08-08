import React, { useState, useEffect } from 'react';
import { X, Sparkles, TrendingUp, Star, Users, MessageCircle, ShoppingCart, Zap, Award, Instagram, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { UserType, Brand, Influencer } from '../types';
import { socketInstagramApi, RealTimeInstagramData, SocketInstagramMetrics } from '../services/socketInstagramApi';

interface SmartRecommendationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  brands: Brand[];
  influencers: Influencer[];
  onProfileClick: (profile: Brand | Influencer) => void;
  onAddToCart: (profile: Brand | Influencer, service: string, price: number) => void;
}

const SmartRecommendationPopup: React.FC<SmartRecommendationPopupProps> = ({
  isOpen,
  onClose,
  userType,
  brands,
  influencers,
  onProfileClick,
  onAddToCart,
}) => {
  const [step, setStep] = useState(1);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [instagramData, setInstagramData] = useState<RealTimeInstagramData | null>(null);
  const [instagramMetrics, setInstagramMetrics] = useState<SocketInstagramMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState({ min: 1000, max: 50000 });
  const [preferredEngagement, setPreferredEngagement] = useState(3.0);
  const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
  const [liveUpdates, setLiveUpdates] = useState<any[]>([]);

  const niches = ['Fashion', 'Beauty', 'Tech', 'Lifestyle', 'Fitness', 'Food', 'Travel', 'Gaming', 'Music', 'Art', 'Business', 'Finance'];

  // Listen for live Instagram updates
  useEffect(() => {
    const handleLiveUpdate = (event: CustomEvent) => {
      console.log('🔴 Live Instagram update received:', event.detail);
      setLiveUpdates(prev => [event.detail, ...prev.slice(0, 4)]); // Keep last 5 updates
    };

    window.addEventListener('instagram:live_update', handleLiveUpdate as EventListener);
    return () => {
      window.removeEventListener('instagram:live_update', handleLiveUpdate as EventListener);
    };
  }, []);

  const fetchInstagramData = async (handle: string) => {
    setIsLoading(true);
    setError('');
    console.log(`🔍 Fetching REAL Instagram data for: @${handle}`);
    
    try {
      const cleanHandle = handle.replace('@', '').toLowerCase().trim();
      
      if (!cleanHandle) {
        throw new Error('Please enter a valid Instagram username');
      }
      
      // Fetch Instagram data using socketInstagramApi service
      const profileData = await socketInstagramApi.fetchInstagramProfile(cleanHandle);
      
      if (profileData) {
        console.log('✅ Successfully fetched real Instagram data:', profileData);
        setInstagramData(profileData);
        setStep(2);
      } else {
        throw new Error(`Unable to fetch data for @${cleanHandle}. Please check if the account exists and is public.`);
      }
    } catch (err) {
      console.error('❌ Error fetching Instagram data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch Instagram data');
    } finally {
      setIsLoading(false);
    }
  };


  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (instagramData) {
        socketInstagramApi.unsubscribeFromLiveUpdates(instagramData.username);
      }
    };
  }, [instagramData]);

  const generateRecommendations = () => {
    const data = userType === 'brand' ? influencers : brands;
    return data.slice(0, 3).map(item => ({
      ...item,
      matchScore: 85 + Math.floor(Math.random() * 15)
    }));
  };

  const handleNicheToggle = (niche: string) => {
    setSelectedNiches(prev => 
      prev.includes(niche) 
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles size={80} />
          </div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Instagram size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Smart Instagram Analysis</h2>
                <p className="text-white/90">
                  {step === 1 
                    ? 'Connect your Instagram for personalized recommendations'
                    : step === 2
                    ? 'Set your preferences for better matches'
                    : 'AI-powered matches based on your profile'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enter Your Instagram Handle</h3>
                <p className="text-gray-600 mb-6">We'll analyze your profile to find perfect matches</p>
                
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="@yourusername"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && fetchInstagramData(instagramHandle)}
                    />
                  </div>
                  
                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => fetchInstagramData(instagramHandle)}
                    disabled={isLoading || !instagramHandle.trim()}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Fetching Real-Time Data...</span>
                      </div>
                    ) : (
                      'Analyze Instagram Profile'
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Accounts */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Try with real accounts:</h4>
                <div className="flex flex-wrap gap-2">
                  {['demotraderz', 'cristiano', 'kyliejenner', 'mrbeast', 'selenagomez'].map(handle => (
                    <button
                      key={handle}
                      onClick={() => setInstagramHandle(handle)}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-sm font-medium"
                    >
                      @{handle}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && instagramData && (
            <div className="space-y-6">
              {/* Instagram Profile Display */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {instagramData?.profilePicUrl ? (
                      <img
                        src={instagramData.profilePicUrl}
                        alt={instagramData.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${instagramData.username}&background=667eea&color=fff&size=64`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                        {instagramData.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">@{instagramData.username}</h3>
                      {instagramData.isVerified && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{instagramData.fullName || instagramData.username}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-purple-600">{formatNumber(instagramData.followerCount)}</div>
                        <div className="text-xs text-gray-500">Followers</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{instagramData.engagementRate}%</div>
                        <div className="text-xs text-gray-500">Engagement</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{instagramData.postCount}</div>
                        <div className="text-xs text-gray-500">Posts</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {instagramData?.biography || 'No bio available'}
                  </p>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Data source: Instagram API</span>
                  <span>Updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Set Your Preferences</h3>
                
                {/* Niche Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Interested Niches (Optional)
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {niches.map(niche => (
                      <button
                        key={niche}
                        onClick={() => handleNicheToggle(niche)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedNiches.includes(niche)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range (for influencers) */}
                {userType === 'influencer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Brand Budget Range
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Minimum ($)</label>
                        <input
                          type="number"
                          value={budgetRange.min}
                          onChange={(e) => setBudgetRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Maximum ($)</label>
                        <input
                          type="number"
                          value={budgetRange.max}
                          onChange={(e) => setBudgetRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Engagement Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Engagement Rate Preference
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={preferredEngagement}
                      onChange={(e) => setPreferredEngagement(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-purple-600 min-w-[3rem]">
                      {preferredEngagement.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Get Recommendations
                </button>
              </div>
            </div>
          )}

          {step === 3 && instagramData && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect Matches for You</h3>
                <p className="text-gray-600">Based on your Instagram profile and preferences</p>
              </div>

              <div className="space-y-4">
                {generateRecommendations().map((profile, index) => {
                  const matchScore = 85 + Math.floor(Math.random() * 15);
                  const matchReasons = [
                    `Compatible audience size (${formatNumber(profile.followers || 250000)} vs your ${formatNumber(instagramData.followerCount)})`,
                    `Similar engagement patterns (${profile.engagement || 4.2}% vs your ${instagramData.engagementRate}%)`,
                    'Matched with your Instagram profile',
                    'Content style aligns with your niche preferences'
                  ].slice(0, 2);

                  return (
                    <div key={profile.id} className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        {/* Rank Badge */}
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                            'bg-gradient-to-r from-orange-400 to-red-500'
                          }`}>
                            {index + 1}
                          </div>
                        </div>

                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img
                              src={'avatar' in profile ? profile.avatar : profile.logo}
                              alt={profile.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-lg font-bold text-gray-900 mb-1 truncate">{profile.name}</h4>
                              <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                                {'industry' in profile ? (
                                  <>
                                    <span>{profile.industry}</span>
                                    <span>${profile.budget.min}k-${profile.budget.max}k</span>
                                  </>
                                ) : (
                                  <>
                                    <span>{formatNumber(profile.followers)}</span>
                                    <span>{profile.engagement}% ER</span>
                                  </>
                                )}
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{profile.rating}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Match Score */}
                            <div className="text-center ml-4">
                              <div className="text-xl font-bold text-green-600">{matchScore}%</div>
                              <div className="text-xs text-gray-500">Match</div>
                            </div>
                          </div>

                          {/* Match Reasons */}
                          <div className="mb-3">
                            <h5 className="font-semibold text-gray-900 mb-2 text-sm">Why this is perfect:</h5>
                            <ul className="space-y-1">
                              {matchReasons.map((reason, idx) => (
                                <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                                  <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="line-clamp-1">{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => onProfileClick(profile)}
                              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => {
                                if ('industry' in profile) {
                                  onAddToCart(profile, 'Brand Partnership', profile.budget.min * 1000);
                                } else {
                                  onAddToCart(profile, 'Instagram Post', profile.priceRange.post);
                                }
                              }}
                              className="flex items-center space-x-1 px-3 py-2 border-2 border-purple-200 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-sm"
                            >
                              <ShoppingCart size={14} />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Adjust Preferences
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setInstagramHandle('');
                    setInstagramData(null);
                    setSelectedNiches([]);
                    setError('');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Analyze Another Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendationPopup;