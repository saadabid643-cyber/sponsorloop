import React from 'react';
import { Search, Filter, MapPin, DollarSign, Sparkles, TrendingUp, Users } from 'lucide-react';
import { UserType } from '../types';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedNiche: string;
  onNicheChange: (niche: string) => void;
  userType: UserType;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedNiche,
  onNicheChange,
  userType,
}) => {
  const niches = ['All', 'Fashion', 'Beauty', 'Tech', 'Lifestyle', 'Fitness', 'Food', 'Travel', 'Gaming'];
  const industries = ['All', 'Fashion', 'Beauty', 'Technology', 'Food & Beverage', 'Fitness', 'Travel', 'Gaming'];

  const filterOptions = userType === 'brand' ? niches : industries;

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Background Visual Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-pink-100/30 to-blue-100/40 rounded-3xl"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-6 left-12 w-20 h-20 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute top-12 right-16 w-16 h-16 bg-gradient-to-br from-blue-300/25 to-purple-300/25 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-8 left-1/4 w-12 h-12 bg-gradient-to-br from-pink-300/15 to-purple-300/15 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-20 w-8 h-8 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-12 right-1/3 w-14 h-14 bg-gradient-to-br from-violet-300/18 to-pink-300/18 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Floating Icons */}
      <div className="absolute top-8 left-1/5 text-purple-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <Sparkles size={22} />
      </div>
      <div className="absolute bottom-10 right-1/5 text-pink-400/30 animate-bounce" style={{ animationDelay: '1.5s' }}>
        <TrendingUp size={20} />
      </div>
      <div className="absolute top-1/2 right-12 text-blue-400/30 animate-bounce" style={{ animationDelay: '2.5s' }}>
        <Users size={18} />
      </div>
      <div className="absolute top-16 right-1/4 text-indigo-400/25 animate-bounce" style={{ animationDelay: '3.5s' }}>
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-16 left-1/6 text-violet-400/30 animate-bounce" style={{ animationDelay: '4s' }}>
        <TrendingUp size={14} />
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Subtle Wave Pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-200/15 to-transparent rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-gradient-to-tl from-pink-200/15 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white/85 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {userType === 'brand' ? 'Find Your Perfect Creator' : 'Discover Amazing Brands'}
          </h2>
          <p className="text-gray-600">
            {userType === 'brand' 
              ? 'Search through thousands of verified influencers' 
              : 'Connect with premium brands seeking partnerships'
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Enhanced Search */}
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" size={20} />
            <input
              type="text"
              placeholder={`Search ${userType === 'brand' ? 'influencers' : 'brands'}...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="relative w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-purple-300 hover:shadow-lg"
            />
          </div>

          {/* Enhanced Category Filter */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <select
              value={selectedNiche}
              onChange={(e) => onNicheChange(e.target.value)}
              className="relative appearance-none bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-6 py-3 pr-12 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 min-w-[180px] hover:border-purple-300 hover:shadow-lg cursor-pointer"
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? `All ${userType === 'brand' ? 'Niches' : 'Industries'}` : option}
                </option>
              ))}
            </select>
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-purple-500 transition-colors duration-200" size={18} />
          </div>

          {/* Enhanced Additional Filters */}
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 transition-all duration-300 hover:shadow-lg transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <MapPin size={18} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Location</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-300 transition-all duration-300 hover:shadow-lg transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <DollarSign size={18} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Budget</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;