import React, { useState, useEffect } from 'react';
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
import LoginModal from './components/LoginModal';
import RegistrationModal from './components/RegistrationModal';
import InstagramSetupModal from './components/InstagramSetupModal';
import { UserType, Brand, Influencer, CartItem, ChatConversation, ChatMessage, PageType } from './types';

function App() {
  const { user, userProfile, loading: authLoading, error: authError, login, loginWithGoogle, register, logout, updateInstagramInfo } = useAuth();
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
      // Load brands and influencers with error handling
      fetchBrands().catch(error => {
        console.error('Failed to fetch brands:', error);
      });
      fetchInfluencers().catch(error => {
        console.error('Failed to fetch influencers:', error);
      });
      
      // Load user-specific data with error handling
      fetchUserCollaborations(user.uid).catch(error => {
        console.error('Failed to fetch collaborations:', error);
      });
      fetchUserConversations(user.uid).catch(error => {
        console.error('Failed to fetch conversations:', error);
      });
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
    
    window.addEventListener('openMessages', handleOpenMessages);
    window.addEventListener('openCollaborations', handleOpenCollaborations);
    window.addEventListener('openNotifications', handleOpenNotifications);
    window.addEventListener('openProfile', handleOpenProfile);
    window.addEventListener('openSettings', handleOpenSettings);
    window.addEventListener('navigateHome', handleNavigateHome);
    window.addEventListener('showAIRecommendations', handleShowAIRecommendations);
    window.addEventListener('showSmartRecommendations', handleShowSmartRecommendations);
    window.addEventListener('googleSignUp', handleGoogleSignUp);
    
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
      await loginWithGoogle();
      setShowLogin(false);
      
      // Show welcome message and Instagram setup
      setTimeout(() => {
        alert(`Welcome to SponsorLoop! 🎉`);
        // Show Instagram setup modal for new Google users
        setShowInstagramSetup(true);
      }, 500);
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed. Please try again.');
    }
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
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl max-w-md mx-auto">
              <p className="text-red-700 text-sm">{authError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
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
      await updateInstagramInfo(instagramData);
      setShowInstagramSetup(false);
      
      // Show success message
      setTimeout(() => {
        alert(`Instagram connected successfully! @${instagramData.username} 🎉`);
      }, 500);
    } catch (error) {
      console.error('Instagram setup failed:', error);
      alert('Failed to connect Instagram. Please try again.');
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
      
      {renderCurrentPage()}

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