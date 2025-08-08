import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, Phone, Video, MoreVertical } from 'lucide-react';
import { ChatConversation } from '../types';

interface MessagesPageProps {
  onBack: () => void;
  conversations: ChatConversation[];
  onStartChat: (conversation: ChatConversation) => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ onBack, conversations, onStartChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-3 hover:bg-purple-100 rounded-full transition-all duration-200 transform hover:scale-110 hover:shadow-lg"
            >
              <ArrowLeft size={24} className="text-purple-600" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Messages
              </h1>
              <p className="text-gray-600">Manage your conversations</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto h-full">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-purple-50 transition-all duration-200 ${
                    selectedConversation?.id === conversation.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.participantAvatar}
                        alt={conversation.participantName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.participantName}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-400">
                        {conversation.lastMessageTime.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {selectedConversation ? (
              <div className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedConversation.participantAvatar}
                        alt={selectedConversation.participantName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {selectedConversation.participantName}
                        </h3>
                        <p className="text-sm text-green-600">Online now</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-3 hover:bg-purple-100 rounded-full transition-all duration-200">
                        <Phone size={20} className="text-purple-600" />
                      </button>
                      <button className="p-3 hover:bg-purple-100 rounded-full transition-all duration-200">
                        <Video size={20} className="text-purple-600" />
                      </button>
                      <button className="p-3 hover:bg-purple-100 rounded-full transition-all duration-200">
                        <MoreVertical size={20} className="text-purple-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
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
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 border-2 border-gray-200 rounded-2xl px-6 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                    />
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                      <MessageCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;