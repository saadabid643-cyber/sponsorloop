import React from 'react';
import { MessageCircle, User, Building2, Search, Bell, ShoppingCart, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';

interface HeaderProps {
  userType: UserType | null;
  onUserTypeChange: (type: UserType) => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  onToggleCart: () => void;
  cartItemCount: number;
  onShowLogin?: () => void;
  onShowRegister?: (userType: UserType) => void;
  onLogout?: () => void;
  currentUser?: any;
}

const Header: React.FC<HeaderProps> = ({ 
  userType, 
  onUserTypeChange, 
  onToggleChat, 
  isChatOpen, 
  onToggleCart, 
  cartItemCount,
  onShowLogin,
  onShowRegister,
  onLogout,
  currentUser
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateHome'));
              if (window.location.pathname !== '/') {
                window.location.href = '/';
              }
            }}
            className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            <img
              src="/SPONSORLOOP LOGO.png"
              alt="SponsorLoop"
              className="w-8 h-8 sm:w-12 sm:h-12 object-contain hover:drop-shadow-lg transition-all duration-200"
            />
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SponsorLoop
            </span>
          </button>

          {/* Navigation */}
          {userType && (
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Navigation Menu - Hidden on mobile */}
              <nav className="hidden lg:flex items-center space-x-1 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('navigateHome'))}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:bg-white hover:shadow-sm text-gray-600 hover:text-purple-600"
                >
                  Home
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openMessages'))}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:bg-white hover:shadow-sm text-gray-600 hover:text-purple-600"
                >
                  Messages
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openCollaborations'))}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:bg-white hover:shadow-sm text-gray-600 hover:text-purple-600"
                >
                  Collaborations
                </button>
              </nav>

              {/* User Type Toggle - Compact on mobile */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-0.5 sm:p-1">
                <button
                  onClick={() => onUserTypeChange('brand')}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-75 ease-out ${
                    userType === 'brand'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <Building2 size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Brands</span>
                </button>
                <button
                  onClick={() => onUserTypeChange('influencer')}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-75 ease-out ${
                    userType === 'influencer'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <User size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Influencers</span>
                </button>
              </div>

              {/* Action Buttons - Compact on mobile */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openNotifications'))}
                className="p-1.5 sm:p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200"
              >
                <Bell size={18} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={onToggleCart}
                className="relative p-1.5 sm:p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200"
              >
                <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={onToggleChat}
                className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                  isChatOpen
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          )}

          {/* Auth Buttons for Non-Logged In Users */}
          {!currentUser && (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => onShowLogin?.()}
                className="flex items-center space-x-1 px-2 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:text-purple-600 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 hover:bg-purple-50"
              >
                <LogIn size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
              <button
                onClick={() => onShowRegister?.('influencer')}
                className="flex items-center space-x-1 px-3 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg transition-all duration-200"
              >
                <UserPlus size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Join</span>
              </button>
            </div>
          )}

          {/* User Menu for Logged In Users */}
          {currentUser && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <img
                  src={currentUser.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
                  alt={currentUser.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-xs sm:text-sm font-medium text-gray-700">{currentUser.name}</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;