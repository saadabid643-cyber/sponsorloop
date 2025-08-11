import React from 'react';
import { MessageCircle, User, Building2, Search, Bell, ShoppingCart, LogIn, UserPlus } from 'lucide-react';
import { UserType } from '../types';

interface HeaderProps {
  userType: UserType | null;
  onUserTypeChange: (type: UserType) => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  onToggleCart: () => void;
  cartItemCount: number;
  onShowLogin: () => void;
  onShowRegister: (userType: UserType) => void;
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
  onLogout,
  currentUser
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateHome'));
              // Also handle direct navigation for better UX
              if (window.location.pathname !== '/') {
                window.location.href = '/';
              }
            }}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer transform hover:scale-105 transition-transform"
          >
            <img 
              src="/SPONSORLOOP LOGO.png" 
              alt="SponsorLoop" 
              className="w-12 h-12 object-contain hover:drop-shadow-lg transition-all duration-200"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SponsorLoop
            </span>
          </button>

          {/* Navigation */}
          {userType && (
            <div className="flex items-center space-x-4">
              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('navigateHome'))}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white hover:shadow-sm text-gray-600 hover:text-purple-600"
                >
                  Home
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openMessages'))}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white hover:shadow-sm text-gray-600 hover:text-purple-600"
                >
                  Messages
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openCollaborations'))}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white hover:shadow-sm text-gray-600 hover:text-purple-600"
                >
                  Collaborations
                </button>
              </nav>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => onUserTypeChange('brand')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-75 ease-out ${
                    userType === 'brand'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <Building2 size={16} />
                  <span>Brands</span>
                </button>
                <button
                  onClick={() => onUserTypeChange('influencer')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-75 ease-out ${
                    userType === 'influencer'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <User size={16} />
                  <span>Influencers</span>
                </button>
              </div>

              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openNotifications'))}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Bell size={20} />
              </button>

              <button
                onClick={onToggleCart}
                className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={onToggleChat}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isChatOpen
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 hover:shadow-lg transform hover:scale-110'
                }`}
              >
                <MessageCircle size={20} />
              </button>
            </div>
          )}

          {/* Auth Buttons for Non-Logged In Users */}
          {!currentUser && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onShowLogin}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 rounded-xl font-medium transition-all duration-200 hover:bg-purple-50"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => onShowRegister('influencer')}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <UserPlus size={18} />
                <span>Join Free</span>
              </button>
            </div>
          )}

          {/* User Menu for Logged In Users */}
          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
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