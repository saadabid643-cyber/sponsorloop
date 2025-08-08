import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, DollarSign, User, Building2, CheckCircle, Clock, XCircle, Play } from 'lucide-react';
import { Collaboration } from '../types';

interface CollaborationsPageProps {
  onBack: () => void;
  collaborations: Collaboration[];
}

const CollaborationsPage: React.FC<CollaborationsPageProps> = ({ onBack, collaborations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCollaborations = collaborations.filter(collab => {
    const matchesSearch = collab.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collab.influencerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || collab.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'active': return <Play className="w-5 h-5 text-green-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
                Collaborations
              </h1>
              <p className="text-gray-600">Track your partnerships and campaigns</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search collaborations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 min-w-[180px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {collaborations.filter(c => c.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Play className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {collaborations.filter(c => c.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {collaborations.filter(c => c.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ${collaborations.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collaborations List */}
        <div className="space-y-6">
          {filteredCollaborations.map((collaboration) => (
            <div key={collaboration.id} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-200">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={collaboration.brandLogo}
                        alt={collaboration.brandName}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <Building2 className="w-6 h-6 text-gray-400" />
                      <img
                        src={collaboration.influencerAvatar}
                        alt={collaboration.influencerName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {collaboration.brandName} × {collaboration.influencerName}
                      </h3>
                      <p className="text-gray-600">{collaboration.service}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(collaboration.status)}`}>
                    {getStatusIcon(collaboration.status)}
                    <span className="font-medium capitalize">{collaboration.status}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{collaboration.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-semibold text-gray-900">${collaboration.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-semibold text-gray-900">{collaboration.startDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  {collaboration.endDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">End Date</p>
                        <p className="font-semibold text-gray-900">{collaboration.endDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button className="px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-200">
                    View Details
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCollaborations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <CheckCircle size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No collaborations found</h3>
            <p className="text-gray-600">Start your first collaboration to see it here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationsPage;