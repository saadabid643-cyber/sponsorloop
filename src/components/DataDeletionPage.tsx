import React, { useState } from 'react';
import { ArrowLeft, Trash2, AlertTriangle, Shield, CheckCircle, Mail, Clock, Database, User, Instagram, Facebook } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface DataDeletionPageProps {
  onBack: () => void;
}

const DataDeletionPage: React.FC<DataDeletionPageProps> = ({ onBack }) => {
  const { user, userProfile, logout } = useAuth();
  const [selectedDeletionType, setSelectedDeletionType] = useState<'account' | 'specific' | 'request'>('account');
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const dataTypes = [
    { id: 'profile', name: 'Profile Information', description: 'Name, email, bio, profile picture' },
    { id: 'social', name: 'Social Media Data', description: 'Instagram/Facebook connected data and metrics' },
    { id: 'collaborations', name: 'Collaboration History', description: 'Past partnerships and campaign data' },
    { id: 'messages', name: 'Messages & Communications', description: 'Chat history and conversations' },
    { id: 'analytics', name: 'Analytics Data', description: 'Usage statistics and performance metrics' },
    { id: 'payment', name: 'Payment Information', description: 'Billing history and payment methods' }
  ];

  const handleDataTypeToggle = (dataType: string) => {
    setSelectedDataTypes(prev =>
      prev.includes(dataType)
        ? prev.filter(type => type !== dataType)
        : [...prev, dataType]
    );
  };

  const handleAccountDeletion = async () => {
    if (confirmationText !== 'DELETE MY ACCOUNT') {
      alert('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate account deletion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would call your backend API
      console.log('Account deletion initiated for user:', user?.uid);
      
      alert('Your account deletion request has been processed. You will be logged out and your data will be permanently deleted within 30 days.');
      
      // Logout user
      await logout();
      
    } catch (error) {
      console.error('Account deletion error:', error);
      alert('Failed to process account deletion. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDataDeletionRequest = async () => {
    if (!reason.trim()) {
      alert('Please provide a reason for your data deletion request');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call to submit deletion request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const requestData = {
        userId: user?.uid,
        userEmail: user?.email,
        deletionType: selectedDeletionType,
        dataTypes: selectedDataTypes,
        reason: reason,
        timestamp: new Date().toISOString()
      };
      
      console.log('Data deletion request submitted:', requestData);
      
      setRequestSubmitted(true);
      
    } catch (error) {
      console.error('Data deletion request error:', error);
      alert('Failed to submit deletion request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (requestSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Your data deletion request has been received and will be processed within 30 days. 
              You will receive a confirmation email once the deletion is complete.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-lg mx-auto mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• We'll review your request within 5 business days</li>
                <li>• You'll receive an email confirmation</li>
                <li>• Data deletion will be completed within 30 days</li>
                <li>• Final confirmation will be sent to your email</li>
              </ul>
            </div>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Return to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Delete Your Data
            </h1>
            <p className="text-gray-600">Manage and delete your personal information</p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-2">Important Notice</h2>
              <p className="text-red-800 mb-4">
                Data deletion is permanent and cannot be undone. Please review your options carefully before proceeding.
              </p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Deleted data cannot be recovered</li>
                <li>• Active collaborations may be affected</li>
                <li>• Some data may be retained for legal compliance (up to 7 years)</li>
                <li>• Account deletion will log you out immediately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current User Info */}
        {user && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <User className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Account Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-900">{user.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Account Type:</span>
                <span className="ml-2 text-gray-900 capitalize">{userProfile?.userType || 'User'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Member Since:</span>
                <span className="ml-2 text-gray-900">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">User ID:</span>
                <span className="ml-2 text-gray-900 font-mono text-xs">{user.uid}</span>
              </div>
            </div>
          </div>
        )}

        {/* Deletion Options */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Deletion Options</h2>
          </div>

          <div className="space-y-4">
            {/* Complete Account Deletion */}
            <div className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
              selectedDeletionType === 'account' 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-200 hover:border-red-200 hover:bg-red-25'
            }`} onClick={() => setSelectedDeletionType('account')}>
              <div className="flex items-start space-x-4">
                <input
                  type="radio"
                  checked={selectedDeletionType === 'account'}
                  onChange={() => setSelectedDeletionType('account')}
                  className="mt-1 w-4 h-4 text-red-600"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Entire Account</h3>
                  <p className="text-gray-600 mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>Immediate</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Database size={14} />
                      <span>All Data</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specific Data Deletion */}
            <div className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
              selectedDeletionType === 'specific' 
                ? 'border-orange-300 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-25'
            }`} onClick={() => setSelectedDeletionType('specific')}>
              <div className="flex items-start space-x-4">
                <input
                  type="radio"
                  checked={selectedDeletionType === 'specific'}
                  onChange={() => setSelectedDeletionType('specific')}
                  className="mt-1 w-4 h-4 text-orange-600"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Specific Data</h3>
                  <p className="text-gray-600 mb-3">
                    Choose specific types of data to delete while keeping your account active.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>5-7 days</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Database size={14} />
                      <span>Selected Data</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Manual Request */}
            <div className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
              selectedDeletionType === 'request' 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-25'
            }`} onClick={() => setSelectedDeletionType('request')}>
              <div className="flex items-start space-x-4">
                <input
                  type="radio"
                  checked={selectedDeletionType === 'request'}
                  onChange={() => setSelectedDeletionType('request')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Deletion Request</h3>
                  <p className="text-gray-600 mb-3">
                    Submit a manual request for data deletion. Our team will review and process your request.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>Up to 30 days</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Mail size={14} />
                      <span>Email Confirmation</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specific Data Selection */}
        {selectedDeletionType === 'specific' && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Select Data to Delete</h3>
            <div className="space-y-4">
              {dataTypes.map((dataType) => (
                <div key={dataType.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedDataTypes.includes(dataType.id)}
                    onChange={() => handleDataTypeToggle(dataType.id)}
                    className="mt-1 w-4 h-4 text-orange-600"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{dataType.name}</h4>
                    <p className="text-sm text-gray-600">{dataType.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reason for Deletion */}
        {(selectedDeletionType === 'specific' || selectedDeletionType === 'request') && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reason for Deletion</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain why you want to delete this data (optional but helpful for improving our service)"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Account Deletion Confirmation */}
        {selectedDeletionType === 'account' && (
          <div className="bg-white rounded-3xl shadow-xl border border-red-200 p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">Confirm Account Deletion</h3>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-red-900 mb-3">This will permanently delete:</h4>
              <ul className="space-y-2 text-sm text-red-800">
                <li className="flex items-center space-x-2">
                  <User size={16} />
                  <span>Your profile and account information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Instagram size={16} />
                  <span>Connected social media data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Database size={16} />
                  <span>All collaboration history and messages</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield size={16} />
                  <span>Analytics and usage data</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type "DELETE MY ACCOUNT" to confirm:
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="DELETE MY ACCOUNT"
                className="w-full p-4 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-mono"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>

          {selectedDeletionType === 'account' ? (
            <button
              onClick={handleAccountDeletion}
              disabled={isSubmitting || confirmationText !== 'DELETE MY ACCOUNT'}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Deleting Account...</span>
                </div>
              ) : (
                'Delete My Account'
              )}
            </button>
          ) : (
            <button
              onClick={handleDataDeletionRequest}
              disabled={isSubmitting || (selectedDeletionType === 'specific' && selectedDataTypes.length === 0)}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting Request...</span>
                </div>
              ) : (
                'Submit Deletion Request'
              )}
            </button>
          )}
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gray-50 rounded-3xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            If you have questions about data deletion or need assistance, please contact our support team:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-700">Email:</span>
              <a href="mailto:saadabid643@gmail.com" className="ml-2 text-purple-600 hover:underline">
                saadabid643@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium text-gray-700">Response Time:</span>
              <span className="ml-2 text-gray-600">Within 5 business days</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDeletionPage;