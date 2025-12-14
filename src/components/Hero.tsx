import React from 'react';
import { ArrowRight, Sparkles, Users, TrendingUp, LogIn, UserPlus } from 'lucide-react';
import { UserType } from '../types';

interface HeroProps {
  onSelectUserType: (type: UserType) => void;
  onShowLogin: () => void;
  onShowRegister: (userType: UserType) => void;
}

const Hero: React.FC<HeroProps> = ({ onSelectUserType, onShowLogin, onShowRegister }) => {
  const showFirestoreRulesError = () => {
    const errorMessage = `🚨 FIRESTORE SECURITY RULES ERROR

Your database is blocking all access. To fix this:

1. Go to: https://console.firebase.google.com/project/sponsorloop-b0321
2. Click "Firestore Database" → "Rules"  
3. Replace ALL rules with:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

4. Click "Publish"
5. Wait 2 minutes, then refresh this page

The app will NOT work until you fix the rules!`;
    
    alert(errorMessage);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 py-16 sm:py-20">
      {/* Firestore Rules Warning Banner */}
      <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-30 px-3 w-full max-w-md">
        <div className="bg-red-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg animate-pulse">
          <button
            onClick={showFirestoreRulesError}
            className="flex items-center space-x-1 sm:space-x-2 hover:underline text-xs sm:text-base"
          >
            <span className="text-base sm:text-lg">🚨</span>
            <span className="font-semibold">DB Rules - Fix Now</span>
          </button>
        </div>
      </div>

      {/* Top Banner */}
      <div className="absolute top-12 sm:top-16 left-1/2 transform -translate-x-1/2 z-20 px-3">
        <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-white/90 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-purple-200 shadow-lg">
          <Sparkles size={16} className="text-purple-600 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-lg font-semibold text-purple-600">AI-Powered Marketplace</span>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-0">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            Connect. Collaborate. Grow.
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
            Join thousands of creators and brands building authentic partnerships
          </p>
        </div>

        {/* Side by Side Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          
          {/* Brand Option */}
          <div
            onClick={() => onSelectUserType('brand')}
            className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-out will-change-transform"
          >
            {/* Background Image */}
            <div className="relative h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Business handshake" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-150 ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 via-purple-600/40 to-transparent"></div>
              
              {/* Hover Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-out bg-purple-600/20 backdrop-blur-sm">
                <div className="text-center text-white p-3 sm:p-4 md:p-6">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <p className="text-sm sm:text-base md:text-lg font-semibold px-2">
                      "Find the perfect creators for your campaigns"
                    </p>
                    <button
                      onClick={() => onShowRegister('brand')}
                      className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-purple-600 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Start Free Trial
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 justify-center mt-2 sm:mt-3 md:mt-4">
                    <span className="font-medium text-xs sm:text-sm md:text-base">Or browse creators</span>
                    <ArrowRight size={16} className="sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-75 ease-out" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Users size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">I'm a Brand</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Connect with top creators and grow your brand through authentic partnerships and data-driven campaigns.
              </p>

              {/* Features */}
              <div className="mt-4 sm:mt-5 md:mt-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  <span>AI-powered influencer matching</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  <span>Campaign performance analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                  <span>Budget optimization tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Influencer Option */}
          <div
            onClick={() => onSelectUserType('influencer')}
            className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-out will-change-transform"
          >
            {/* Background Image */}
            <div className="relative h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Content creator with camera" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-150 ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-blue-600/40 to-transparent"></div>
              
              {/* Hover Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-out bg-blue-600/20 backdrop-blur-sm">
                <div className="text-center text-white p-3 sm:p-4 md:p-6">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <p className="text-sm sm:text-base md:text-lg font-semibold px-2">
                      "Discover premium brand partnerships"
                    </p>
                    <button
                      onClick={() => onShowRegister('influencer')}
                      className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-blue-600 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Join Free
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 justify-center mt-2 sm:mt-3 md:mt-4">
                    <span className="font-medium text-xs sm:text-sm md:text-base">Or explore brands</span>
                    <ArrowRight size={16} className="sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-75 ease-out" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <TrendingUp size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">I'm an Influencer</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                Discover amazing brand partnerships and monetize your content with premium collaboration opportunities.
              </p>

              {/* Features */}
              <div className="mt-4 sm:mt-5 md:mt-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
                  <span>Smart brand recommendations</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
                  <span>Rate optimization guidance</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
                  <span>Portfolio showcase tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full px-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8">
          <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-purple-600">25K+</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Brands</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-pink-600">150K+</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Influencers</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-blue-600">500K+</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Collaborations</div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-bold text-green-600">98%</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;