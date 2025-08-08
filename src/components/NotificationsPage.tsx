import React, { useState } from 'react';
import { ArrowLeft, Bell, Check, X, Clock, Star, MessageCircle, DollarSign, Users } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'collaboration' | 'payment' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationsPageProps {
  onBack: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'collaboration',
      title: 'New Collaboration Request',
      description: 'GlowUp Cosmetics wants to partner with you for a skincare campaign',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      description: 'Mark Thompson sent you a message about tech review collaboration',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      description: 'You received $2,500 for Instagram post collaboration',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true
    },
    {
      id: '4',
      type: 'system',
      title: 'Profile Verification Complete',
      description: 'Your profile has been successfully verified with a blue checkmark',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'collaboration': return <Users className="w-5 h-5 text-purple-600" />;
      case 'payment': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'system': return <Star className="w-5 h-5 text-orange-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif =>
    filter === 'all' || !notif.read
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                Notifications
              </h1>
              <p className="text-gray-600">Stay updated with your latest activities</p>
            </div>
          </div>
          <button
            onClick={markAllAsRead}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Mark All Read
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Notifications ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                filter === 'unread'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-3xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-200 ${
                !notification.read ? 'border-l-4 border-l-purple-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{notification.description}</p>
                      <p className="text-sm text-gray-500">
                        {notification.timestamp.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <div className={`w-3 h-3 rounded-full ${
                        notification.read ? 'bg-gray-300' : 'bg-purple-500'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Bell size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </h3>
            <p className="text-gray-600">
              {filter === 'unread' 
                ? 'You\'re all caught up!' 
                : 'New notifications will appear here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;