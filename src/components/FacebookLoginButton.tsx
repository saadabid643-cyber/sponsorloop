import React from 'react';
import { Facebook } from 'lucide-react';
import { FACEBOOK_APP_ID } from '../config/firebase';

interface FacebookLoginButtonProps {
  onLogin: () => void;
  isLoading?: boolean;
  text?: string;
  className?: string;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
  isLoading = false,
  text = "Continue with Facebook",
  className = ""
}) => {
  const handleFacebookLogin = () => {
    // Check if Facebook SDK is loaded
    if (typeof window.FB === 'undefined') {
      console.error('Facebook SDK not loaded');
      alert('Facebook SDK not loaded. Please refresh the page and try again.');
      return;
    }

    console.log('Facebook Login initiated with App ID:', FACEBOOK_APP_ID);
    
    // Use Facebook SDK directly for more control
    window.FB.login((response: any) => {
      console.log('Facebook login response:', response);
      
      if (response.authResponse) {
        console.log('Facebook login successful:', response.authResponse);
        // Get user info
        window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo: any) => {
          console.log('Facebook user info:', userInfo);
          onLogin();
        });
      } else {
        console.log('Facebook login cancelled or failed');
      }
    }, { 
      scope: 'email,public_profile',
      return_scopes: true 
    });
  };

  return (
    <button
      onClick={handleFacebookLogin}
      disabled={isLoading}
      className={`w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl hover:shadow-md transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Facebook className="w-5 h-5" />
      <span className="font-medium">{isLoading ? 'Connecting...' : text}</span>
    </button>
  );
};

// Extend Window interface for Facebook SDK
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default FacebookLoginButton;