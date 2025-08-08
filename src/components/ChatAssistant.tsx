import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Minimize2, MessageCircle } from 'lucide-react';
import { UserType } from '../types';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  userType: UserType | null;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onToggle, userType }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message based on user type
      const welcomeMessage: Message = {
        id: '1',
        type: 'assistant',
        content: userType === 'brand' 
          ? "Hi! I'm your AI assistant. I can help you find the perfect influencers for your campaigns. What type of collaboration are you looking for?"
          : userType === 'influencer'
          ? "Hello! I'm here to help you discover amazing brand partnership opportunities. What kind of collaborations interest you?"
          : "Welcome to SponsorLoop! I can help you navigate our platform and find the perfect matches. How can I assist you today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userType, messages.length]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Trigger AI recommendations for certain keywords
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('match') || lowerMessage.includes('find')) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('showSmartRecommendations'));
      }, 2000);
    }
    
    if (userType === 'brand') {
      if (lowerMessage.includes('makeup') || lowerMessage.includes('beauty')) {
        return "Perfect! For makeup and beauty campaigns, I recommend influencers with:\n\n• High female audience (70%+)\n• Beauty/Fashion niche expertise\n• Strong engagement rates (3%+)\n• Target age demographic 18-35\n• Authentic content style\n\n🤖 **AI Analysis Complete!** I'm opening your personalized recommendations now with the top 3 perfect matches based on your requirements. These creators have been selected using advanced matching algorithms!";
      } else if (lowerMessage.includes('budget')) {
        return "I can help optimize your influencer budget! Here are current market rates:\n\n💰 **Pricing Tiers:**\n• Micro (10K-100K): $100-$1,000 per post\n• Mid-tier (100K-500K): $1,000-$5,000 per post\n• Macro (500K-1M): $5,000-$15,000 per post\n• Mega (1M+): $15,000+ per post\n\n📊 **Pro Tip:** Mid-tier influencers often provide the best ROI with higher engagement rates!\n\nWhat's your campaign budget? I'll find the perfect creators within your range.";
      } else if (lowerMessage.includes('engagement')) {
        return "Engagement rate is the key to campaign success! Here's the breakdown:\n\n🔥 **Engagement Benchmarks:**\n• Excellent: 5%+ (Premium tier)\n• Good: 3-5% (High performing)\n• Average: 1-3% (Standard)\n• Below 1%: Avoid\n\n✨ **Quality Indicators:**\n• Authentic comments vs generic ones\n• Story engagement rates\n• Save-to-like ratios\n\nI can show you verified high-engagement creators in your niche. Ready to see the top performers?";
      }
      
      return "Welcome to SponsorLoop! I'm your AI matchmaking assistant. Here's how I can help you find perfect influencer partners:\n\n🎯 **Smart Matching:**\n• Find creators by niche, location & audience\n• Analyze engagement rates & demographics\n• Budget-optimized recommendations\n• ROI predictions & success metrics\n\n🤝 **Collaboration Support:**\n• Negotiation guidance\n• Contract templates\n• Campaign performance tracking\n\n💡 **Try saying:** \"Find me recommendations\" or \"Suggest matches\" to see AI-powered suggestions!\n\nWhat type of collaboration are you planning?";
    } else if (userType === 'influencer') {
      if (lowerMessage.includes('brand') || lowerMessage.includes('partnership')) {
        return "Exciting! I can help you discover premium brand partnerships. Based on your profile analysis:\n\n🎯 **Perfect Matches:**\n• Fashion brands seeking lifestyle creators\n• Tech companies wanting authentic reviews\n• Beauty brands targeting your demographic\n• Fitness brands looking for health advocates\n\n💼 **Partnership Types:**\n• Sponsored posts & stories\n• Long-term brand ambassadorships\n• Product collaborations\n• Event partnerships\n\n🤖 **AI Analysis Complete!** Opening your personalized brand recommendations now with premium opportunities matched to your profile!";
      } else if (lowerMessage.includes('rate') || lowerMessage.includes('pricing')) {
        return "Smart pricing strategy is crucial for your success! Here are current market rates:\n\n💰 **Industry Benchmarks:**\n• Instagram Post: $10-100 per 1K followers\n• Instagram Story: $5-25 per 1K followers\n• Instagram Reel: $15-150 per 1K followers\n• Long-form content: Premium rates\n\n📈 **Rate Multipliers:**\n• High engagement (+20-50%)\n• Niche expertise (+30-100%)\n• Exclusive partnerships (+50-200%)\n\nBased on your metrics, I can suggest personalized rates. Want a custom pricing strategy?";
      }
      
      return "Welcome to your creator success hub! I'm here to accelerate your influencer journey:\n\n🚀 **Growth Opportunities:**\n• Premium brand partnerships\n• Rate optimization strategies\n• Content performance insights\n• Audience expansion tactics\n\n💡 **Creator Tools:**\n• Portfolio optimization\n• Pitch template library\n• Negotiation best practices\n• Industry trend alerts\n\n💡 **Try saying:** \"Recommend brands\" or \"Find partnerships\" to see AI-powered brand matches!\n\nReady to level up your creator business?";
    }
    
    return "Welcome to SponsorLoop - where meaningful partnerships begin! 🎉\n\nI'm your AI-powered matchmaking assistant, ready to help you:\n\n✨ **For Everyone:**\n• Discover perfect collaboration matches\n• Navigate partnership negotiations\n• Optimize campaign performance\n• Access industry insights\n\n🎯 **Getting Started:**\nTell me if you're a brand or creator, and I'll personalize your experience with tailored recommendations!\n\n💡 **Try saying:** \"Show me recommendations\" to see AI-powered matches!\n\nWhat brings you to SponsorLoop today?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-40 will-change-transform animate-pulse"
      >
        <MessageCircle size={24} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs opacity-90">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openSettings'))}
                className="hover:underline"
              >
                Settings
              </button>
            </p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <Minimize2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-900 rounded-bl-md'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-white/70' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;