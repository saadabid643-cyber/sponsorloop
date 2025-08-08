import React from 'react';
import { ArrowRight, Sparkles, Users, TrendingUp, LogIn, UserPlus } from 'lucide-react';
import { UserType } from '../types';

interface HeroProps {
  onSelectUserType: (type: UserType) => void;
  onShowLogin: () => void;
  onShowRegister: (userType: UserType) => void;
}

const Hero: React.FC<HeroProps> = ({ onSelectUserType, onShowLogin, onShowRegister }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Top Banner */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 shadow-lg">
          <Sparkles size={20} className="text-purple-600" />
          <span className="text-lg font-semibold text-purple-600">AI-Powered Marketplace</span>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect. Collaborate. Grow.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of creators and brands building authentic partnerships
          </p>
        </div>

        {/* Side by Side Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Brand Option */}
          <div 
            onClick={() => onSelectUserType('brand')}
            className="group relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-out will-change-transform"
          >
            {/* Background Image */}
            <div className="relative h-80 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Business handshake" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-150 ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-purple-600/40 to-transparent"></div>
              
              {/* Hover Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-out bg-purple-600/20 backdrop-blur-sm">
                <div className="text-center text-white p-6">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold">
                      "Find the perfect creators for your campaigns"
                    </p>
                    <button
                      onClick={() => onShowRegister('brand')}
                      className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Start Free Trial
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 justify-center mt-4">
                    <span className="font-medium">Or browse creators</span>
                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform duration-75 ease-out" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">I'm a Brand</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Connect with top creators and grow your brand through authentic partnerships and data-driven campaigns.
              </p>
              
              {/* Features */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>AI-powered influencer matching</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Campaign performance analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Budget optimization tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Influencer Option */}
          <div 
            onClick={() => onSelectUserType('influencer')}
            className="group relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-out will-change-transform"
          >
            {/* Background Image */}
            <div className="relative h-80 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Content creator with camera" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-150 ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-blue-600/40 to-transparent"></div>
              
              {/* Hover Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-out bg-blue-600/20 backdrop-blur-sm">
                <div className="text-center text-white p-6">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold">
                      "Discover premium brand partnerships"
                    </p>
                    <button
                      onClick={() => onShowRegister('influencer')}
                      className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Join Free
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 justify-center mt-4">
                    <span className="font-medium">Or explore brands</span>
                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform duration-75 ease-out" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">I'm an Influencer</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Discover amazing brand partnerships and monetize your content with premium collaboration opportunities.
              </p>
              
              {/* Features */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Smart brand recommendations</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Rate optimization guidance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Portfolio showcase tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">25K+</div>
              <div className="text-xs text-gray-600">Brands</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-pink-600">150K+</div>
              <div className="text-xs text-gray-600">Influencers</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">500K+</div>
              <div className="text-xs text-gray-600">Collaborations</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">98%</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;