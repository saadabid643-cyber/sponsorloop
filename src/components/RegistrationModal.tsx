import React, { useState } from 'react';
import { X, User, Building2, Mail, Lock, Eye, EyeOff, Upload, Camera, MapPin, Globe, Instagram, Twitter, Linkedin } from 'lucide-react';
import { UserType } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  onRegister: (userData: any) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  userType,
  onRegister,
}) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
    
    // Profile Info
    bio: '',
    location: '',
    website: '',
    phone: '',
    
    // Brand Specific
    companyName: '',
    industry: '',
    budgetMin: '',
    budgetMax: '',
    targetAudience: '',
    
    // Influencer Specific
    niche: [],
    followers: '',
    instagramHandle: '',
    twitterHandle: '',
    linkedinHandle: '',
    
    // Media
    profileImage: null as File | null,
    
    // Agreement
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.name) newErrors.name = 'Name is required';
    }

    if (stepNumber === 2) {
      if (!formData.bio) newErrors.bio = 'Bio is required';
      if (!formData.location) newErrors.location = 'Location is required';
      
      if (userType === 'brand') {
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.budgetMin) newErrors.budgetMin = 'Minimum budget is required';
        if (!formData.budgetMax) newErrors.budgetMax = 'Maximum budget is required';
      } else {
        if (!formData.instagramHandle) newErrors.instagramHandle = 'Instagram handle is required';
        if (!formData.followers) newErrors.followers = 'Follower count is required';
        if (formData.niche.length === 0) newErrors.niche = 'At least one niche is required';
      }
    }

    if (stepNumber === 3) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      onRegister(formData);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNicheToggle = (niche: string) => {
    setFormData(prev => ({
      ...prev,
      niche: prev.niche.includes(niche)
        ? prev.niche.filter(n => n !== niche)
        : [...prev.niche, niche]
    }));
  };

  const niches = ['Fashion', 'Beauty', 'Tech', 'Lifestyle', 'Fitness', 'Food', 'Travel', 'Gaming', 'Music', 'Art'];
  const industries = ['Fashion', 'Beauty', 'Technology', 'Food & Beverage', 'Fitness', 'Travel', 'Gaming', 'Entertainment', 'Finance', 'Healthcare'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                {userType === 'brand' ? <Building2 size={24} /> : <User size={24} />}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Join SponsorLoop</h2>
                <p className="text-white/90">
                  {userType === 'brand' ? 'Connect with top creators' : 'Partner with premium brands'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Step {step} of 3</span>
              <span className="text-sm">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h3>
                <p className="text-gray-600">Let's start with the basics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {userType === 'brand' ? 'Company Name' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                      errors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder={userType === 'brand' ? 'Your Company' : 'John Doe'}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ''))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                    placeholder="@sponsorloop.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                        errors.password ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Build Your Profile</h3>
                <p className="text-gray-600">Tell us more about yourself</p>
              </div>

              {/* Profile Image Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.profileImage ? (
                      <img 
                        src={URL.createObjectURL(formData.profileImage)} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                    <Upload size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('profileImage', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-2">Upload your profile photo</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none ${
                    errors.bio ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder={userType === 'brand' 
                    ? 'Tell us about your company and what makes you unique...'
                    : 'Share your story, interests, and what you create...'
                  }
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                        errors.location ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="New York, NY"
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {userType === 'brand' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                        errors.industry ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select your industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Budget (USD) *</label>
                      <input
                        type="number"
                        value={formData.budgetMin}
                        onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                          errors.budgetMin ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="1000"
                      />
                      {errors.budgetMin && <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Budget (USD) *</label>
                      <input
                        type="number"
                        value={formData.budgetMax}
                        onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                          errors.budgetMax ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="10000"
                      />
                      {errors.budgetMax && <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Niches *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {niches.map(niche => (
                        <button
                          key={niche}
                          type="button"
                          onClick={() => handleNicheToggle(niche)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.niche.includes(niche)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {niche}
                        </button>
                      ))}
                    </div>
                    {errors.niche && <p className="text-red-500 text-sm mt-1">{errors.niche}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Handle *</label>
                      <div className="relative">
                        <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={formData.instagramHandle}
                          onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                            errors.instagramHandle ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="@yourusername"
                        />
                      </div>
                      {errors.instagramHandle && <p className="text-red-500 text-sm mt-1">{errors.instagramHandle}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Followers *</label>
                      <input
                        type="number"
                        value={formData.followers}
                        onChange={(e) => handleInputChange('followers', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all ${
                          errors.followers ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="10000"
                      />
                      {errors.followers && <p className="text-red-500 text-sm mt-1">{errors.followers}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost Done!</h3>
                <p className="text-gray-600">Review and confirm your registration</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Account Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type:</span>
                    <span className="font-medium capitalize">{userType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1 w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a> *
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToMarketing}
                    onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                    className="mt-1 w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    I'd like to receive marketing emails about new features and opportunities
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={step === 1 && (!formData.name || !formData.email || !formData.password || !formData.confirmPassword)}
              >
                {step === 1 ? 'Next: Build Profile' : step === 2 ? 'Next: Review & Confirm' : 'Next Step'}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!formData.agreeToTerms}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;