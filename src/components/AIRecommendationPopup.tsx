import React, { useState, useEffect } from 'react';
import { X, Sparkles, TrendingUp, Star, Users, MessageCircle, ShoppingCart, Zap, Award } from 'lucide-react';
import { UserType, Brand, Influencer } from '../types';

interface AIRecommendationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  brands: Brand[];
  influencers: Influencer[];
  onProfileClick: (profile: Brand | Influencer) => void;
  onAddToCart: (profile: Brand | Influencer, service: string, price: number) => void;
  onStartChat: (profile: Brand | Influencer) => void;
}

const AIRecommendationPopup: React.FC<AIRecommendationPopupProps> = ({
  isOpen,
  onClose,
  userType,
  brands,
  influencers,
  onProfileClick,
  onAddToCart,
  onStartChat,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [recommendations, setRecommendations] = useState<(Brand | Influencer)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsAnalyzing(true);
      // Simulate AI analysis
      setTimeout(() => {
        const data = userType === 'brand' ? influencers : brands;
        // AI-powered matching logic
        const topMatches = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setRecommendations(topMatches);
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [isOpen, userType, brands, influencers]);

  const getMatchScore = (profile: Brand | Influencer) => {
    // Simulate AI matching score
    return Math.floor(85 + Math.random() * 15);
  };

  const getMatchReason = (profile: Brand | Influencer) => {
    if (userType === 'brand') {
      const influencer = profile as Influencer;
      const reasons = [
        `High engagement rate (${influencer.engagement}%)`,
        `Perfect audience match for your target demographic`,
        `Strong performance in ${influencer.niche[0]} niche`,
        `Excellent collaboration history`,
        `Optimal follower count (${Math.floor(influencer.followers / 1000)}K)`
      ];
      return reasons.slice(0, 2);
    } else {
      const brand = profile as Brand;
      const reasons = [
        `Budget aligns with your rates ($${brand.budget.min}k-${brand.budget.max}k)`,
        `Active in your niche (${brand.industry})`,
        `High collaboration success rate`,
        `Premium brand partnership opportunity`,
        `Excellent brand reputation (${brand.rating}★)`
      ];
      return reasons.slice(0, 2);
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90"></div>
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles size={120} />
          </div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">AI-Powered Recommendations</h2>
                <p className="text-white/90 text-lg">
                  {userType === 'brand' 
                    ? 'Perfect influencers matched to your brand' 
                    : 'Premium brands seeking your expertise'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {isAnalyzing ? (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto flex items-center justify-center animate-pulse">
                  <Sparkles size={32} className="text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Perfect Matches</h3>
              <p className="text-gray-600 mb-6">Our AI is processing thousands of profiles to find your ideal partners...</p>
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Top 3 AI-Selected Matches</h3>
                <p className="text-gray-600">Based on compatibility, performance, and success probability</p>
              </div>

              {recommendations.map((profile, index) => {
                const matchScore = getMatchScore(profile);
                const matchReasons = getMatchReason(profile);
                const isBrand = 'industry' in profile;
                
                return (
                  <div key={profile.id} className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start space-x-6">
                      {/* Rank Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                          'bg-gradient-to-r from-orange-400 to-red-500'
                        }`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 overflow-hidden ${isBrand ? 'rounded-2xl' : 'rounded-full'}`}>
                          <img
                            src={isBrand ? (profile as Brand).logo : (profile as Influencer).avatar}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              {isBrand ? (
                                <>
                                  <span>{(profile as Brand).industry}</span>
                                  <span>${(profile as Brand).budget.min}k-${(profile as Brand).budget.max}k budget</span>
                                </>
                              ) : (
                                <>
                                  <span>{formatFollowers((profile as Influencer).followers)} followers</span>
                                  <span>{(profile as Influencer).engagement}% engagement</span>
                                </>
                              )}
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span>{profile.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Match Score */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{matchScore}%</div>
                            <div className="text-xs text-gray-500">Match Score</div>
                          </div>
                        </div>

                        {/* Match Reasons */}
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Why this is a perfect match:</h5>
                          <ul className="space-y-1">
                            {matchReasons.map((reason, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                <Zap className="w-4 h-4 text-green-500" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button
                            onClick={() => onProfileClick(profile)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => {
                              if (isBrand) {
                                onAddToCart(profile, 'Brand Partnership', (profile as Brand).budget.min * 1000);
                              } else {
                                onAddToCart(profile, 'Instagram Post', (profile as Influencer).priceRange.post);
                              }
                            }}
                            className="flex items-center space-x-2 px-4 py-2 border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-sm"
                          >
                            <ShoppingCart size={16} />
                            <span>Add to Cart</span>
                          </button>
                          <button
                            onClick={() => onStartChat(profile)}
                            className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm"
                          >
                            <MessageCircle size={16} />
                            <span>Chat</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Footer */}
              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Want to see more matches?</p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Explore All Profiles
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationPopup;