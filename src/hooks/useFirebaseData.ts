import { useState, useEffect } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { firebaseData } from '../services/firebaseData';
import { Brand, Influencer, Collaboration, ChatConversation } from '../types';

export const useFirebaseData = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch brands
  const fetchBrands = async (limitCount: number = 20, lastDoc?: DocumentSnapshot) => {
    try {
      setLoading(true);
      const result = await firebaseData.getBrands(limitCount, lastDoc);
      if (lastDoc) {
        setBrands(prev => [...prev, ...result.brands]);
      } else {
        setBrands(result.brands);
      }
      return result.lastDoc;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching brands');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch influencers
  const fetchInfluencers = async (limitCount: number = 20, lastDoc?: DocumentSnapshot) => {
    try {
      setLoading(true);
      const result = await firebaseData.getInfluencers(limitCount, lastDoc);
      if (lastDoc) {
        setInfluencers(prev => [...prev, ...result.influencers]);
      } else {
        setInfluencers(result.influencers);
      }
      return result.lastDoc;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching influencers');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search brands
  const searchBrands = async (searchTerm: string, industry?: string) => {
    try {
      setLoading(true);
      const results = await firebaseData.searchBrands(searchTerm, industry);
      setBrands(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching brands');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search influencers
  const searchInfluencers = async (searchTerm: string, niche?: string) => {
    try {
      setLoading(true);
      const results = await firebaseData.searchInfluencers(searchTerm, niche);
      setInfluencers(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching influencers');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch user collaborations
  const fetchUserCollaborations = async (userId: string) => {
    try {
      const results = await firebaseData.getUserCollaborations(userId);
      setCollaborations(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching collaborations');
      throw err;
    }
  };

  // Fetch user conversations
  const fetchUserConversations = async (userId: string) => {
    try {
      const results = await firebaseData.getUserConversations(userId);
      setConversations(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching conversations');
      throw err;
    }
  };

  // Create collaboration
  const createCollaboration = async (collaboration: Omit<Collaboration, 'id'>) => {
    try {
      const id = await firebaseData.createCollaboration(collaboration);
      // Refresh collaborations
      if (collaboration.brandId || collaboration.influencerId) {
        await fetchUserCollaborations(collaboration.brandId || collaboration.influencerId);
      }
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating collaboration');
      throw err;
    }
  };

  return {
    brands,
    influencers,
    collaborations,
    conversations,
    loading,
    error,
    fetchBrands,
    fetchInfluencers,
    searchBrands,
    searchInfluencers,
    fetchUserCollaborations,
    fetchUserConversations,
    createCollaboration
  };
};