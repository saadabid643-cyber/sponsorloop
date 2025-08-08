import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Paperclip, Smile, Phone, Video } from 'lucide-react';
import { ChatConversation, ChatMessage } from '../types';

interface DirectChatProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: ChatConversation | null;
  onSendMessage: (content: string) => void;
}

const DirectChat: React.FC<DirectChatProps> = ({
  isOpen,
  onClose,
  conversation,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate a response
      if (conversation) {
        const responses = [
          "Thanks for reaching out! I'd love to discuss this collaboration opportunity.",
          "That sounds interesting! When would be a good time to chat more about this?",
          "I'm excited about this partnership possibility. Let me know your thoughts!",
          "Great to hear from you! I'll review this and get back to you soon."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        onSendMessage(randomResponse);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen || !conversation) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={conversation.participantAvatar}
                alt={conversation.participantName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{conversation.participantName}</h3>
              <p className="text-white/80 text-sm">Online now</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 hover:bg-white/20 rounded-full transition-colors duration-200">
              <Phone size={20} />
            </button>
            <button className="p-3 hover:bg-white/20 rounded-full transition-colors duration-200">
              <Video size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                  message.senderId === 'current-user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md'
                    : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.senderId === 'current-user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
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
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex items-center space-x-4">
            <button className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200">
              <Paperclip size={20} />
            </button>
            <button className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200">
              <Smile size={20} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full border-2 border-gray-200 rounded-2xl px-6 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectChat;