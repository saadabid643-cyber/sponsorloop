import React, { useState } from 'react';
import { X, Instagram, User, AlertCircle, CheckCircle } from 'lucide-react';

interface InstagramSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (instagramData: { username: string; url: string }) => void;
  userType: 'brand' | 'influencer';
  isLoading?: boolean;
}

const InstagramSetupModal: React.FC<InstagramSetupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userType,
  isLoading = false
}) => {
  const [instagramInput, setInstagramInput] = useState('');
  const [error, setError] = useState('');

  const extractUsername = (input: string): string => {
    // Remove whitespace
    const cleaned = input.trim();
    
    // If it's a URL, extract username
    if (cleaned.includes('instagram.com/')) {
      const match = cleaned.match(/instagram\.com\/([^/?]+)/);
      return match ? match[1] : '';
    }
    
    // If it starts with @, remove it
    if (cleaned.startsWith('@')) {
      return cleaned.substring(1);
    }
    
    // Otherwise, assume it's already a username
    return cleaned;
  };

  const validateInstagram = (input: string): boolean => {
    const username = extractUsername(input);
    
    // Instagram username rules
    const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
    return instagramRegex.test(username) && username.length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!instagramInput.trim()) {
      setError('Instagram username is required');
      return;
    }
    
    if (!validateInstagram(instagramInput)) {
      setError('Please enter a valid Instagram username or URL');
      return;
    }
    
    const username = extractUsername(instagramInput);
    const url = `https://instagram.com/${username}`;
    
    onSubmit({ username, url });
  };

  const handleInputChange = (value: string) => {
    setInstagramInput(value);
    if (error) setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Instagram size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Connect Instagram</h2>
                <p className="text-white/90">Complete your profile setup</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {userType === 'brand' ? 'Connect Your Brand Instagram' : 'Connect Your Instagram'}
            </h3>
            <p className="text-gray-600">
              {userType === 'brand' 
                ? 'Help creators find and connect with your brand'
                : 'Showcase your content and connect with brands'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Username or URL *
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={instagramInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all ${
                    error ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="@yourusername or instagram.com/yourusername"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="mt-2 flex items-center space-x-2 text-red-600">
                  <AlertCircle size={16} />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              {/* Preview */}
              {instagramInput && !error && validateInstagram(instagramInput) && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle size={16} />
                    <p className="text-sm">
                      Profile: <span className="font-medium">@{extractUsername(instagramInput)}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Examples */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• @yourusername</p>
                <p>• yourusername</p>
                <p>• https://instagram.com/yourusername</p>
                <p>• instagram.com/yourusername</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Why connect Instagram?</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {userType === 'brand' ? (
                  <>
                    <li>• Creators can discover your brand</li>
                    <li>• Showcase your brand aesthetic</li>
                    <li>• Build trust with authentic content</li>
                  </>
                ) : (
                  <>
                    <li>• Get discovered by premium brands</li>
                    <li>• Showcase your content portfolio</li>
                    <li>• Unlock collaboration opportunities</li>
                  </>
                )}
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading || !instagramInput.trim() || !!error}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                'Complete Setup'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isLoading}
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramSetupModal;