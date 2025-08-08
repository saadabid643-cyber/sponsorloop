import React from 'react';
import { Star, MapPin, Users, TrendingUp, Instagram, ShoppingCart, MessageCircle, Zap, Award } from 'lucide-react';
import { Influencer } from '../types';

interface InfluencerCardProps {
  influencer: Influencer;
  onAddToCart?: (influencer: Influencer, service: string, price: number) => void;
  onStartChat?: (influencer: Influencer) => void;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer, onAddToCart, onStartChat }) => {
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const getBadges = () => {
    const badges = [];
    if (influencer.rating >= 4.8) {
      badges.push({ icon: Award, text: 'Top Creator', color: 'bg-purple-600' });
    }
    if (influencer.engagement >= 5.0) {
      badges.push({ icon: Zap, text: 'High Engagement', color: 'bg-green-600' });
    }
    if (influencer.followers >= 300000) {
      badges.push({ icon: Users, text: 'Popular', color: 'bg-blue-600' });
    }
    return badges.slice(0, 2); // Show max 2 badges
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer will-change-transform hover:border-purple-300">
      {/* Main Image Container */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={influencer.avatar} 
          alt={influencer.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {getBadges().map((badge, index) => (
            <div key={index} className={`flex items-center space-x-2 ${badge.color} text-white px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm`}>
              <badge.icon size={14} />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Instagram Icon */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
          <Instagram className="w-4 h-4 text-white" />
        </div>

        {/* UGC Badge (bottom left) */}
        <div className="absolute bottom-20 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>UGC</span>
        </div>

        {/* Creator Info (bottom overlay) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold mb-1">{influencer.name}</h3>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{influencer.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${influencer.priceRange.post}</div>
              <div className="text-xs opacity-80">per post</div>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span className="font-medium">{formatFollowers(influencer.followers)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">{influencer.engagement}% ER</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 opacity-80">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{influencer.location.split(',')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{influencer.bio}</p>

        {/* Niche Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {influencer.niche.slice(0, 3).map((niche, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
            >
              {niche}
            </span>
          ))}
          {influencer.niche.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{influencer.niche.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(influencer, 'Instagram Post', influencer.priceRange.post);
            }}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartChat?.(influencer);
            }}
            className="px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;