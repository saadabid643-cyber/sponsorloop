import React from 'react';
import { Sparkles } from 'lucide-react';
import SearchFilters from './SearchFilters';
import BrandCard from './BrandCard';
import InfluencerCard from './InfluencerCard';
import { UserType, Brand, Influencer, CartItem } from '../types';

interface DashboardProps {
  userType: UserType;
  brands: Brand[];
  influencers: Influencer[];
  onProfileClick: (profile: Brand | Influencer) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedNiche: string;
  onNicheChange: (niche: string) => void;
  onAddToCart: (profile: Brand | Influencer, service: string, price: number) => void;
  onStartChat: (profile: Brand | Influencer) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  userType,
  brands,
  influencers,
  onProfileClick,
  searchQuery,
  onSearchChange,
  selectedNiche,
  onNicheChange,
  onAddToCart,
  onStartChat,
}) => {
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.niche.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesNiche = selectedNiche === 'All' || influencer.niche.includes(selectedNiche);
    
    return matchesSearch && matchesNiche;
  });

  const displayData = userType === 'brand' ? filteredInfluencers : filteredBrands;
  const title = userType === 'brand' ? 'Discover Influencers' : 'Explore Brands';
  const subtitle = userType === 'brand' 
    ? 'Find the perfect creators for your campaigns with AI-powered matching' 
    : 'Connect with premium brands seeking authentic partnerships';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 bg-gradient-to-br from-slate-50/50 via-white/50 to-purple-50/50 min-h-screen">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{title}</h1>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('showSmartRecommendations'))}
            className="w-full sm:w-auto flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Sparkles size={16} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Smart Recommendations</span>
          </button>
        </div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl">{subtitle}</p>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedNiche={selectedNiche}
        onNicheChange={onNicheChange}
        userType={userType}
      />

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {displayData.map((item) => (
          <div key={item.id} onClick={() => onProfileClick(item)}>
            {userType === 'brand' ? (
              <InfluencerCard 
                influencer={item as Influencer} 
                onAddToCart={(influencer, service, price) => onAddToCart(influencer, service, price)}
                onStartChat={onStartChat}
              />
            ) : (
              <BrandCard 
                brand={item as Brand} 
                onAddToCart={(brand, service, price) => onAddToCart(brand, service, price)}
                onStartChat={onStartChat}
              />
            )}
          </div>
        ))}
      </div>

      {displayData.length === 0 && (
        <div className="text-center py-8 sm:py-12 md:py-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 md:p-12 max-w-md mx-auto">
            <div className="text-gray-400 mb-3 sm:mb-4">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                onSearchChange('');
                onNicheChange('All');
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;