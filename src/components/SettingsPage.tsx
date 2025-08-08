import React, { useState } from 'react';
import { ArrowLeft, Settings, Bell, Shield, Eye, Globe, CreditCard, HelpCircle, LogOut } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    twoFactorAuth: false,
    language: 'en',
    currency: 'USD',
    darkMode: false
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelect = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-3 hover:bg-purple-100 rounded-full transition-all duration-200 transform hover:scale-110 hover:shadow-lg"
          >
            <ArrowLeft size={24} className="text-purple-600" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-600">Manage your account preferences</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Notifications */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                </div>
                <button
                  onClick={() => handleToggle('pushNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.pushNotifications ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-600">Receive promotional and marketing emails</p>
                </div>
                <button
                  onClick={() => handleToggle('marketingEmails')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.marketingEmails ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Profile Visibility</h3>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleSelect('profileVisibility', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="contacts">Contacts Only</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600">Control who can see your profile</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Show Email Address</h3>
                  <p className="text-sm text-gray-600">Display your email on your public profile</p>
                </div>
                <button
                  onClick={() => handleToggle('showEmail')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showEmail ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showEmail ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Show Phone Number</h3>
                  <p className="text-sm text-gray-600">Display your phone number on your public profile</p>
                </div>
                <button
                  onClick={() => handleToggle('showPhone')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.showPhone ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showPhone ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => handleToggle('twoFactorAuth')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-600">Update your account password</p>
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Language</h3>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSelect('language', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Currency</h3>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleSelect('currency', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600">Choose your preferred currency</p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Account</h2>
            </div>
            
            <div className="space-y-4">
              <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Billing & Payments</h3>
                  <p className="text-sm text-gray-600">Manage your payment methods and billing</p>
                </div>
              </button>

              <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Help & Support</h3>
                  <p className="text-sm text-gray-600">Get help or contact support</p>
                </div>
              </button>

              <button className="w-full p-4 bg-red-50 rounded-xl text-left hover:bg-red-100 transition-colors flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-900">Sign Out</h3>
                  <p className="text-sm text-red-600">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;