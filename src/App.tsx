import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useFirebaseData } from './hooks/useFirebaseData';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ProfileModal from './components/ProfileModal';
import ChatAssistant from './components/ChatAssistant';
import Cart from './components/Cart';
import DirectChat from './components/DirectChat';
import MessagesPage from './components/MessagesPage';
import CollaborationsPage from './components/CollaborationsPage';
import NotificationsPage from './components/NotificationsPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import AIRecommendationPopup from './components/AIRecommendationPopup';
import SmartRecommendationPopup from './components/SmartRecommendationPopup';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import DataDeletionPage from './components/DataDeletionPage';
import LoginModal from './components/LoginModal';
import RegistrationModal from './components/RegistrationModal';
import InstagramSetupModal from './components/InstagramSetupModal';
import { UserType, Brand, Influencer, CartItem, ChatConversation, ChatMessage, PageType } from './types';

function App() {
  const navigate = useNavigate();
  const { user, userProfile, loading: authLoading, error: authError, login, loginWithGoogle, loginWithFacebook, register, logout, updateInstagramInfo } = useAuth();
  const { 
    brands, 
    influencers, 
    collaborations, 
    conversations,
    loading: dataLoading,
    error: dataError,
    fetchBrands,
    fetchInfluencers,
    searchBrands,
    searchInfluencers,
    fetchUserCollaborations,
    fetchUserConversations
  } = useFirebaseData();
  
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProfile, setSelectedProfile] = useState<Brand | Influencer | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDirectChatOpen, setIsDirectChatOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerUserType, setRegisterUserType] = useState<UserType>('influencer');
  const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);
  const [showInstagramSetup, setShowInstagramSetup] = useState(false);
  const [instagramSetupLoading, setInstagramSetupLoading] = useState(false);

  // Get user type from profile
  const userType = userProfile?.userType || null;

  // Load initial data when user logs in
  useEffect(() => {
    if (user && userType) {
      console.log('User logged in with type:', userType);
      // Skip data loading for now to focus on Instagram setup
    }
  }, [user, userType]);

  useEffect(() => {
    const handleOpenMessages = () => setCurrentPage('messages');
    const handleOpenCollaborations = () => setCurrentPage('collaborations');
    const handleOpenNotifications = () => setCurrentPage('notifications');
    const handleOpenProfile = () => setCurrentPage('profile');
    const handleOpenSettings = () => setCurrentPage('settings');
    const handleNavigateHome = () => setCurrentPage('home');
    const handleShowAIRecommendations = () => setShowAIRecommendations(true);
    const handleShowSmartRecommendations = () => setShowSmartRecommendations(true);
    const handleGoogleSignUp = () => handleGoogleLogin();
    const handleFacebookSignUp = () => handleFacebookLogin();
    
    window.addEventListener('openMessages', handleOpenMessages);
    window.addEventListener('openCollaborations', handleOpenCollaborations);
    window.addEventListener('openNotifications', handleOpenNotifications);
    window.addEventListener('openProfile', handleOpenProfile);
    window.addEventListener('openSettings', handleOpenSettings);
    window.addEventListener('navigateHome', handleNavigateHome);
    window.addEventListener('showAIRecommendations', handleShowAIRecommendations);
    window.addEventListener('showSmartRecommendations', handleShowSmartRecommendations);
    window.addEventListener('googleSignUp', handleGoogleSignUp);
    window.addEventListener('facebookSignUp', handleFacebookSignUp);
    
    return () => {
      window.removeEventListener('openMessages', handleOpenMessages);
      window.removeEventListener('openCollaborations', handleOpenCollaborations);
      window.removeEventListener('openNotifications', handleOpenNotifications);
      window.removeEventListener('openProfile', handleOpenProfile);
      window.removeEventListener('openSettings', handleOpenSettings);
      window.removeEventListener('navigateHome', handleNavigateHome);
      window.removeEventListener('showAIRecommendations', handleShowAIRecommendations);
      window.removeEventListener('showSmartRecommendations', handleShowSmartRecommendations);
      window.removeEventListener('googleSignUp', handleGoogleSignUp);
      window.removeEventListener('facebookSignUp', handleFacebookSignUp);
    };
  }, []);

  const handleSelectUserType = async (type: UserType) => {
    if (!user) {
      // If not logged in, show registration modal
      setRegisterUserType(type);
      setShowRegister(true);
      return;
    }
    
    // If logged in, just navigate to dashboard
    setCurrentPage('home');
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowRegister = (type: UserType) => {
    setRegisterUserType(type);
    setShowRegister(true);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setShowLogin(false);
      
      // Show welcome message
      setTimeout(() => {
        alert(`Welcome back! 🎉`);
      }, 500);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Starting Google login process...');
      const result = await loginWithGoogle();
      console.log('Google login result:', result);
      
      setShowLogin(false);
      
      // Always show Instagram setup for Google users
      console.log('Showing Instagram setup modal...');
      setTimeout(() => {
        setShowInstagramSetup(true);
      }, 100);
      
    } catch (error) {
      console.error('Google login failed:', error);
      
      let errorMessage = 'Google login failed. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('Database access denied') || error.message.includes('permissions')) {
          errorMessage = '🚨 Database Error: Please update Firestore security rules in Firebase Console to allow authenticated users. Check the console for details.';
        }
      }
      
      alert(errorMessage);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      console.log('Starting Facebook login process...');
      const result = await loginWithFacebook();
      console.log('Facebook login result:', result);
      
      setShowLogin(false);
      
      // Always show Instagram setup for Facebook users
      console.log('Showing Instagram setup modal...');
      setTimeout(() => {
        setShowInstagramSetup(true);
      }, 100);
      
    } catch (error) {
      console.error('Facebook login failed:', error);
      
      let errorMessage = 'Facebook login failed. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('Database access denied') || error.message.includes('permissions')) {
          errorMessage = '🚨 Database Error: Please update Firestore security rules in Firebase Console to allow authenticated users. Check the console for details.';
        }
      }
      
      alert(errorMessage);
    }
  };
  // Show Firestore rules error prominently
  const showFirestoreRulesError = () => {
    const errorMessage = `
🚨 FIRESTORE SECURITY RULES ERROR

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

The app will NOT work until you fix the rules!
    `;
    
    alert(errorMessage);
  };
  const handleRegister = async (userData: any) => {
    try {
      await register(userData.email, userData.password, registerUserType, userData);
      setShowRegister(false);
      
      // Show welcome message
      setTimeout(() => {
        alert(`Welcome to SponsorLoop! 🎉 Your account has been created successfully.`);
        // Trigger smart recommendations after registration
        setTimeout(() => {
          setShowSmartRecommendations(true);
        }, 2000);
      }, 500);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('home');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Handle search with Firebase
  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      if (userType === 'brand') {
        await searchInfluencers(query, selectedNiche !== 'All' ? selectedNiche : undefined);
      } else {
        await searchBrands(query, selectedNiche !== 'All' ? selectedNiche : undefined);
      }
    } else {
      // Reset to all data
      if (userType === 'brand') {
        await fetchInfluencers();
      } else {
        await fetchBrands();
      }
    }
  };

  // Handle niche change with Firebase
  const handleNicheChange = async (niche: string) => {
    setSelectedNiche(niche);
    
    if (userType === 'brand') {
      await searchInfluencers(searchQuery, niche !== 'All' ? niche : undefined);
    } else {
      await searchBrands(searchQuery, niche !== 'All' ? niche : undefined);
    }
  };

  // Show loading screen while authenticating
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading SponsorLoop...</h2>
          {authError && (
            <div className="mt-4 p-6 bg-red-50 border-2 border-red-300 rounded-xl max-w-lg mx-auto">
              <h3 className="text-lg font-bold text-red-900 mb-2">🚨 Database Error</h3>
              <p className="text-red-700 text-sm">{authError}</p>
              <div className="mt-4 space-y-2">
                <button 
                  onClick={showFirestoreRulesError}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors font-semibold"
                >
                  🔧 Show Fix Instructions
                </button>
                <button 
                  onClick={() => window.location.reload()} 
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                  Retry After Fixing Rules
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleProfileClick = (profile: Brand | Influencer) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  const handleAddToCart = (profile: Brand | Influencer, service: string, price: number) => {
    const newItem: CartItem = {
      id: `${profile.id}-${service}-${Date.now()}`,
      type: 'industry' in profile ? 'brand' : 'influencer',
      profile,
      service,
      price,
      quantity: 1,
    };

    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.profile.id === profile.id && item.service === service
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, newItem];
    });
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleStartChat = (profile: Brand | Influencer) => {
    const conversation: ChatConversation = {
      id: `chat-${profile.id}`,
      participantId: profile.id,
      participantName: profile.name,
      participantAvatar: 'industry' in profile ? (profile as Brand).logo : (profile as Influencer).avatar,
      lastMessage: 'Hi! I\'m interested in collaborating.',
      lastMessageTime: new Date(),
      unreadCount: 0,
      messages: [
        {
          id: '1',
          senderId: 'current-user',
          content: 'Hi! I\'m interested in collaborating with you.',
          timestamp: new Date(),
          type: 'text'
        }
      ]
    };
    
    setCurrentConversation(conversation);
    setIsDirectChatOpen(true);
  };

  const handleSendMessage = (content: string) => {
    if (!currentConversation || !content.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      content: content.trim(),
      timestamp: new Date(),
      type: 'text'
    };
    
    setCurrentConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: content.trim(),
        lastMessageTime: new Date()
      };
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleInstagramSetup = async (instagramData: { username: string; url: string }) => {
    setInstagramSetupLoading(true);
    
    try {
      console.log('🔄 Processing Instagram setup for Cloud Firestore:', instagramData);
      await updateInstagramInfo(instagramData);
      setShowInstagramSetup(false);
      
      // Show success message
      setTimeout(() => {
        console.log('🎉 Instagram setup completed successfully');
        alert(`🎉 Success! Instagram @${instagramData.username} has been connected to your SponsorLoop account and saved to the database!`);
      }, 500);
    } catch (error) {
      console.error('❌ Instagram setup failed:', error);
      alert('❌ Failed to save Instagram info to database. Please try again.');
    } finally {
      setInstagramSetupLoading(false);
    }
  };
  const renderCurrentPage = () => {
    if (!userType) {
      return (
        <Hero 
          onSelectUserType={handleSelectUserType}
          onShowLogin={handleShowLogin}
          onShowRegister={handleShowRegister}
        />
      );
    }

    switch (currentPage) {
      case 'messages':
        return (
          <MessagesPage
            onBack={handleBackToHome}
            conversations={conversations}
            onStartChat={setCurrentConversation}
          />
        );
      case 'collaborations':
        return (
          <CollaborationsPage
            onBack={handleBackToHome}
            collaborations={collaborations}
          />
        );
      case 'notifications':
        return (
          <NotificationsPage
            onBack={handleBackToHome}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onBack={handleBackToHome}
            userType={userType}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            onBack={handleBackToHome}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicyPage
            onBack={handleBackToHome}
          />
        );
      default:
        return (
          <Dashboard
            userType={userType}
            brands={brands}
            influencers={influencers}
            onProfileClick={handleProfileClick}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedNiche={selectedNiche}
            onNicheChange={handleNicheChange}
            onAddToCart={handleAddToCart}
            onStartChat={handleStartChat}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Header 
        userType={userType} 
        onUserTypeChange={handleSelectUserType}
        onToggleChat={toggleChat}
        isChatOpen={isChatOpen}
        onToggleCart={toggleCart}
        cartItemCount={cartItems.length}
        onShowLogin={handleShowLogin}
        onShowRegister={handleShowRegister}
        onLogout={handleLogout}
        currentUser={userProfile}
      />
      
      <Routes>
        <Route path="/privacy" element={
          <PrivacyPolicyPage onBack={() => navigate('/')} />
        } />
        <Route path="/delete-data" element={
          <DataDeletionPage onBack={() => navigate('/')} />
        } />
        <Route path="/*" element={renderCurrentPage()} />
      </Routes>

      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={handleCloseProfile}
          onAddToCart={handleAddToCart}
        />
      )}

      <ChatAssistant
        isOpen={isChatOpen}
        onToggle={toggleChat}
        userType={userType}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <DirectChat
        isOpen={isDirectChatOpen}
        onClose={() => setIsDirectChatOpen(false)}
        conversation={currentConversation}
        onSendMessage={handleSendMessage}
      />

      <AIRecommendationPopup
        isOpen={showAIRecommendations}
        onClose={() => setShowAIRecommendations(false)}
        userType={userType}
        brands={brands}
        influencers={influencers}
        onProfileClick={handleProfileClick}
        onAddToCart={handleAddToCart}
        onStartChat={handleStartChat}
      />

      <SmartRecommendationPopup
        isOpen={showSmartRecommendations}
        onClose={() => setShowSmartRecommendations(false)}
        userType={userType}
        brands={brands}
        influencers={influencers}
        onProfileClick={handleProfileClick}
        onAddToCart={handleAddToCart}
      />

    <LoginModal
      isOpen={showLogin}
      onClose={() => setShowLogin(false)}
      onLogin={(email, password, userType) => handleLogin(email, password)}
      onGoogleLogin={handleGoogleLogin}
      onFacebookLogin={handleFacebookLogin}
      onSwitchToRegister={(userType) => {
        setShowLogin(false);
        handleShowRegister(userType);
      }}
    />

    <RegistrationModal
      isOpen={showRegister}
      onClose={() => setShowRegister(false)}
      userType={registerUserType}
      onRegister={handleRegister}
    />

    <InstagramSetupModal
      isOpen={showInstagramSetup}
      onClose={() => setShowInstagramSetup(false)}
      onSubmit={handleInstagramSetup}
      userType={userProfile?.userType || 'influencer'}
      isLoading={instagramSetupLoading}
    />
    </div>
  );
}

export default App;