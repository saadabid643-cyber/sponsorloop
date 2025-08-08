import React, { useState } from 'react';
import { ArrowLeft, User, Camera, Edit3, Star, MapPin, Globe, Mail, Phone, Instagram, Twitter, Linkedin, Save, X } from 'lucide-react';
import { UserType } from '../types';

interface ProfilePageProps {
  onBack: () => void;
  userType: UserType | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, userType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userType === 'brand' ? 'Your Brand Name' : 'Your Name',
    username: userType === 'brand' ? 'yourbrand' : 'yourusername',
    bio: userType === 'brand' 
      ? 'We create amazing products that inspire and delight our customers worldwide.'
      : 'Content creator passionate about sharing authentic experiences and connecting with amazing brands.',
    location: 'New York, NY',
    website: userType === 'brand' ? 'yourbrand.com' : 'yourwebsite.com',
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    avatar: userType === 'brand' 
      ? 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
      : 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: userType === 'influencer' ? 125000 : undefined,
    engagement: userType === 'influencer' ? 4.2 : undefined,
    campaigns: userType === 'brand' ? 15 : undefined,
    rating: 4.7
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

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
                My Profile
              </h1>
              <p className="text-gray-600">Manage your profile information</p>
            </div>
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Edit3 size={20} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                <X size={20} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Save size={20} />
                <span>Save</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600 relative">
            {isEditing && (
              <button className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200">
                <Camera size={20} />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-8 -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative mb-6 md:mb-0">
                <div className={`w-32 h-32 overflow-hidden border-4 border-white shadow-xl ${
                  userType === 'brand' ? 'rounded-2xl' : 'rounded-full'
                }`}>
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-200">
                    <Camera size={16} />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-purple-300 focus:border-purple-600 outline-none w-full"
                    />
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                      className="text-lg text-gray-600 bg-transparent border-b border-gray-300 focus:border-purple-600 outline-none"
                      placeholder="Username"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
                    <p className="text-lg text-gray-600 mb-2">@{profileData.username}</p>
                    <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-gray-700 font-medium">{profileData.rating}</span>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center space-x-6">
                  {userType === 'influencer' && profileData.followers && (
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatFollowers(profileData.followers)}
                      </div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                  )}
                  {userType === 'influencer' && profileData.engagement && (
                    <div>
                      <div className="text-2xl font-bold text-green-600">{profileData.engagement}%</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                    </div>
                  )}
                  {userType === 'brand' && profileData.campaigns && (
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{profileData.campaigns}</div>
                      <div className="text-sm text-gray-600">Campaigns</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bio</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.location}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.website}
                    onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                ) : (
                  <a href={`https://${profileData.website}`} className="text-purple-600 hover:underline">
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.email}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.phone}</span>
                )}
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h4>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <Instagram size={18} />
                <span>Instagram</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <Twitter size={18} />
                <span>Twitter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;