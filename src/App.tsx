import React, { useState, useEffect } from 'react';
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
import { UserType, Brand, Influencer, CartItem, ChatConversation, ChatMessage, PageType } from './types';
import { mockBrands, mockInfluencers, mockConversations, mockCollaborations } from './data/mockData';

function App() {
  const [userType, setUserType] = useState<UserType | null>(null);
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);

  useEffect(() => {
    const handleOpenMessages = () => setCurrentPage('messages');
    const handleOpenCollaborations = () => setCurrentPage('collaborations');
    const handleOpenNotifications = () => setCurrentPage('notifications');
    const handleOpenProfile = () => setCurrentPage('profile');
    const handleOpenSettings = () => setCurrentPage('settings');
    const handleNavigateHome = () => setCurrentPage('home');
    const handleShowAIRecommendations = () => setShowAIRecommendations(true);
    const handleShowSmartRecommendations = () => setShowSmartRecommendations(true);
    
    window.addEventListener('openMessages', handleOpenMessages);
    window.addEventListener('openCollaborations', handleOpenCollaborations);
    window.addEventListener('openNotifications', handleOpenNotifications);
    window.addEventListener('openProfile', handleOpenProfile);
    window.addEventListener('openSettings', handleOpenSettings);
    window.addEventListener('navigateHome', handleNavigateHome);
    window.addEventListener('showAIRecommendations', handleShowAIRecommendations);
    window.addEventListener('showSmartRecommendations', handleShowSmartRecommendations);
    
    return () => {
      window.removeEventListener('openMessages', handleOpenMessages);
      window.removeEventListener('openCollaborations', handleOpenCollaborations);
      window.removeEventListener('openNotifications', handleOpenNotifications);
      window.removeEventListener('openProfile', handleOpenProfile);
      window.removeEventListener('openSettings', handleOpenSettings);
      window.removeEventListener('navigateHome', handleNavigateHome);
      window.removeEventListener('showAIRecommendations', handleShowAIRecommendations);
      window.removeEventListener('showSmartRecommendations', handleShowSmartRecommendations);
    };
  }, []);

  const handleSelectUserType = (type: UserType) => {
    setUserType(type);
    setCurrentPage('home');
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowRegister = (type: UserType) => {
    setRegisterUserType(type);
    setShowRegister(true);
  };

  const handleLogin = (email: string, password: string, userType: UserType) => {
    // Simulate login - in real app, this would call your API
    const userData = {
      id: 'user-' + Date.now(),
      email,
      userType,
      name: userType === 'brand' ? 'Demo Brand' : 'Demo Creator',
      avatar: userType === 'brand' 
        ? 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
        : 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    setCurrentUser(userData);
    setUserType(userType);
    setShowLogin(false);
    
    // Show welcome message
    setTimeout(() => {
      alert(`Welcome back, ${userData.name}! 🎉`);
    }, 500);
  };

  const handleRegister = (userData: any) => {
    // Simulate registration - in real app, this would call your API
    const newUser = {
      id: 'user-' + Date.now(),
      ...userData,
      avatar: userData.profileImage 
        ? URL.createObjectURL(userData.profileImage)
        : (registerUserType === 'brand' 
          ? 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
          : 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
        )
    };
    
    setCurrentUser(newUser);
    setUserType(registerUserType);
    setShowRegister(false);
    
    // Show welcome message
    setTimeout(() => {
      alert(`Welcome to SponsorLoop, ${newUser.name}! 🎉 Your account has been created successfully.`);
      // Trigger AI recommendations after registration
      // Trigger smart recommendations after registration
      setTimeout(() => {
        setShowSmartRecommendations(true);
      }, 2000);
    }, 500);
  };

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

  const renderCurrentPage = () => {
    if (!userType) {
      return <Hero onSelectUserType={handleSelectUserType} />;
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
            conversations={mockConversations}
            onStartChat={setCurrentConversation}
          />
        );
      case 'collaborations':
        return (
          <CollaborationsPage
            onBack={handleBackToHome}
            collaborations={mockCollaborations}
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
            brands={mockBrands}
            influencers={mockInfluencers}
            onProfileClick={handleProfileClick}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedNiche={selectedNiche}
            onNicheChange={setSelectedNiche}
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
        brands={mockBrands}
        influencers={mockInfluencers}
        onProfileClick={handleProfileClick}
        onAddToCart={handleAddToCart}
        onStartChat={handleStartChat}
      />

      <SmartRecommendationPopup
        isOpen={showSmartRecommendations}
        onClose={() => setShowSmartRecommendations(false)}
        userType={userType}
        brands={mockBrands}
        influencers={mockInfluencers}
        onProfileClick={handleProfileClick}
        onAddToCart={handleAddToCart}
      />

    <LoginModal
      isOpen={showLogin}
      onClose={() => setShowLogin(false)}
      onLogin={handleLogin}
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
    </div>
  );
}

export default App;