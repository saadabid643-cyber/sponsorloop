import React from 'react';
import { X, Star, MapPin, Users, TrendingUp, Globe, Mail, Instagram, DollarSign, Calendar } from 'lucide-react';
import { Brand, Influencer } from '../types';

interface ProfileModalProps {
  profile: Brand | Influencer;
  onClose: () => void;
  onAddToCart?: (profile: Brand | Influencer, service: string, price: number) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose, onAddToCart }) => {
  const isBrand = 'industry' in profile;
  const brand = profile as Brand;
  const influencer = profile as Influencer;

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 overflow-hidden ${
                isBrand ? 'rounded-2xl' : 'rounded-full'
              }`}>
                <img 
                  src={isBrand ? brand.logo : influencer.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                {isBrand ? (
                  <p className="text-gray-600">{brand.industry}</p>
                ) : (
                  <p className="text-gray-600">@{influencer.username}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium text-gray-700">{profile.rating}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Description/Bio */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {isBrand ? 'About' : 'Bio'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {isBrand ? brand.description : influencer.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isBrand ? (
              <>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Campaigns</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{brand.campaigns}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Budget</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${brand.budget.min}k - ${brand.budget.max}k
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Location</span>
                  </div>
                  <p className="text-lg font-semibold text-blue-600">{brand.location}</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Followers</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatFollowers(influencer.followers)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Engagement</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{influencer.engagement}%</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Location</span>
                  </div>
                  <p className="text-lg font-semibold text-purple-600">{influencer.location}</p>
                </div>
              </>
            )}
          </div>

          {/* Specific Content Based on Type */}
          {isBrand ? (
            <div className="space-y-6">
              {/* Target Audience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Audience</h3>
                <div className="flex flex-wrap gap-2">
                  {brand.targetAudience.map((audience, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred Influencer Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferred Influencer Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {brand.preferredInfluencerSize.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Previous Collaborations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Previous Collaborations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {brand.previousCollaborations.map((collab, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{collab}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Demographics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Demographics</h3>
                
                {/* Gender Split */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Gender Distribution</h4>
                  <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="bg-pink-400" 
                        style={{ width: `${influencer.demographics.genderSplit.female}%` }}
                      ></div>
                      <div 
                        className="bg-blue-400" 
                        style={{ width: `${influencer.demographics.genderSplit.male}%` }}
                      ></div>
                      <div 
                        className="bg-purple-400" 
                        style={{ width: `${influencer.demographics.genderSplit.other}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Female: {influencer.demographics.genderSplit.female}%</span>
                    <span>Male: {influencer.demographics.genderSplit.male}%</span>
                    <span>Other: {influencer.demographics.genderSplit.other}%</span>
                  </div>
                </div>

                {/* Age Groups */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Age Groups</h4>
                  <div className="space-y-2">
                    {influencer.demographics.ageGroups.map((age, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{age.range}</span>
                        <span className="text-purple-600 font-semibold">{age.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Countries */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Top Countries</h4>
                  <div className="space-y-2">
                    {influencer.demographics.topCountries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{country.country}</span>
                        <span className="text-blue-600 font-semibold">{country.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Instagram Post</h4>
                    <p className="text-2xl font-bold text-green-600">${influencer.priceRange.post}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Instagram Story</h4>
                    <p className="text-2xl font-bold text-blue-600">${influencer.priceRange.story}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Instagram Reel</h4>
                    <p className="text-2xl font-bold text-purple-600">${influencer.priceRange.reel}</p>
                  </div>
                </div>
              </div>

              {/* Recent Posts Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {influencer.recentPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{post.date}</span>
                        <Instagram className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                            <span>{post.likes.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span>{post.comments}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Niches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {influencer.niche.map((niche, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                    >
                      {niche}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Actions */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAddToCart) {
                    if (isBrand) {
                      const brand = profile as Brand;
                      onAddToCart(brand, 'Brand Partnership', brand.budget.min * 1000);
                    } else {
                      const influencer = profile as Influencer;
                      onAddToCart(influencer, 'Collaboration Package', influencer.priceRange.post);
                    }
                  }
                  onClose();
                  alert(`Partnership request sent to ${profile.name}!`);
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {isBrand ? 'Partner With Us' : 'Start Collaboration'}
              </button>
              <button 
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openMessages'));
                  }, 100);
                }}
                className="flex-1 border-2 border-purple-300 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Send Message
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openProfile'));
                  }, 100);
                }}
                className="flex-1 px-6 py-3 border-2 border-blue-300 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;