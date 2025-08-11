import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Brand, Influencer, Collaboration, ChatConversation, ChatMessage } from '../types';

class FirebaseDataService {
  // Brands Collection
  async getBrands(limitCount: number = 20, lastDoc?: DocumentSnapshot): Promise<{ brands: Brand[], lastDoc?: DocumentSnapshot }> {
    try {
      let q = query(
        collection(db, 'users'),
        where('userType', '==', 'brand'),
        orderBy('rating', 'desc'),
        limit(limitCount)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const brands: Brand[] = [];
      let lastDocument: DocumentSnapshot | undefined;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        brands.push({
          id: doc.id,
          name: data.companyName || data.name,
          logo: data.avatar || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          industry: data.industry,
          description: data.bio,
          budget: {
            min: data.budgetMin || 1,
            max: data.budgetMax || 10
          },
          targetAudience: data.targetAudience || [],
          campaigns: data.campaigns || 0,
          rating: data.rating || 5.0,
          location: data.location || '',
          website: data.website || '',
          preferredInfluencerSize: data.preferredInfluencerSizes || [],
          previousCollaborations: []
        });
        lastDocument = doc;
      });

      return { brands, lastDoc: lastDocument };
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  }

  // Influencers Collection
  async getInfluencers(limitCount: number = 20, lastDoc?: DocumentSnapshot): Promise<{ influencers: Influencer[], lastDoc?: DocumentSnapshot }> {
    try {
      let q = query(
        collection(db, 'users'),
        where('userType', '==', 'influencer'),
        orderBy('rating', 'desc'),
        limit(limitCount)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const influencers: Influencer[] = [];
      let lastDocument: DocumentSnapshot | undefined;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        influencers.push({
          id: doc.id,
          name: data.name,
          username: data.username,
          avatar: data.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          niche: data.niche || ['Lifestyle'],
          followers: data.followers || 0,
          engagement: data.engagement || 3.5,
          location: data.location || '',
          bio: data.bio || '',
          rating: data.rating || 5.0,
          priceRange: data.priceRange || { post: 100, story: 50, reel: 150 },
          demographics: {
            ageGroups: [
              { range: '18-24', percentage: 35 },
              { range: '25-34', percentage: 45 },
              { range: '35-44', percentage: 15 },
              { range: '45+', percentage: 5 }
            ],
            genderSplit: { male: 40, female: 58, other: 2 },
            topCountries: [
              { country: 'United States', percentage: 60 },
              { country: 'Canada', percentage: 15 },
              { country: 'United Kingdom', percentage: 10 }
            ]
          },
          recentPosts: [],
          collaborationHistory: []
        });
        lastDocument = doc;
      });

      return { influencers, lastDoc: lastDocument };
    } catch (error) {
      console.error('Error fetching influencers:', error);
      throw error;
    }
  }

  // Search brands by industry or name
  async searchBrands(searchTerm: string, industry?: string): Promise<Brand[]> {
    try {
      let q = query(collection(db, 'users'), where('userType', '==', 'brand'));
      
      if (industry && industry !== 'All') {
        q = query(q, where('industry', '==', industry));
      }

      const querySnapshot = await getDocs(q);
      const brands: Brand[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const brand = {
          id: doc.id,
          name: data.companyName || data.name,
          logo: data.avatar || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          industry: data.industry,
          description: data.bio,
          budget: {
            min: data.budgetMin || 1,
            max: data.budgetMax || 10
          },
          targetAudience: data.targetAudience || [],
          campaigns: data.campaigns || 0,
          rating: data.rating || 5.0,
          location: data.location || '',
          website: data.website || '',
          preferredInfluencerSize: data.preferredInfluencerSizes || [],
          previousCollaborations: []
        };

        // Filter by search term
        if (!searchTerm || 
            brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.industry.toLowerCase().includes(searchTerm.toLowerCase())) {
          brands.push(brand);
        }
      });

      return brands;
    } catch (error) {
      console.error('Error searching brands:', error);
      throw error;
    }
  }

  // Search influencers by niche or name
  async searchInfluencers(searchTerm: string, niche?: string): Promise<Influencer[]> {
    try {
      let q = query(collection(db, 'users'), where('userType', '==', 'influencer'));

      const querySnapshot = await getDocs(q);
      const influencers: Influencer[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const influencer = {
          id: doc.id,
          name: data.name,
          username: data.username,
          avatar: data.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          niche: data.niche || ['Lifestyle'],
          followers: data.followers || 0,
          engagement: data.engagement || 3.5,
          location: data.location || '',
          bio: data.bio || '',
          rating: data.rating || 5.0,
          priceRange: data.priceRange || { post: 100, story: 50, reel: 150 },
          demographics: {
            ageGroups: [
              { range: '18-24', percentage: 35 },
              { range: '25-34', percentage: 45 },
              { range: '35-44', percentage: 15 },
              { range: '45+', percentage: 5 }
            ],
            genderSplit: { male: 40, female: 58, other: 2 },
            topCountries: [
              { country: 'United States', percentage: 60 },
              { country: 'Canada', percentage: 15 },
              { country: 'United Kingdom', percentage: 10 }
            ]
          },
          recentPosts: [],
          collaborationHistory: []
        };

        // Filter by search term and niche
        const matchesSearch = !searchTerm || 
          influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          influencer.niche.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesNiche = !niche || niche === 'All' || influencer.niche.includes(niche);

        if (matchesSearch && matchesNiche) {
          influencers.push(influencer);
        }
      });

      return influencers;
    } catch (error) {
      console.error('Error searching influencers:', error);
      throw error;
    }
  }

  // Collaborations
  async createCollaboration(collaboration: Omit<Collaboration, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'collaborations'), {
        ...collaboration,
        startDate: Timestamp.fromDate(collaboration.startDate),
        endDate: collaboration.endDate ? Timestamp.fromDate(collaboration.endDate) : null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating collaboration:', error);
      throw error;
    }
  }

  async getUserCollaborations(userId: string): Promise<Collaboration[]> {
    try {
      const q = query(
        collection(db, 'collaborations'),
        where('brandId', '==', userId)
      );
      
      const q2 = query(
        collection(db, 'collaborations'),
        where('influencerId', '==', userId)
      );

      const [brandCollabs, influencerCollabs] = await Promise.all([
        getDocs(q),
        getDocs(q2)
      ]);

      const collaborations: Collaboration[] = [];

      [...brandCollabs.docs, ...influencerCollabs.docs].forEach((doc) => {
        const data = doc.data();
        collaborations.push({
          id: doc.id,
          brandId: data.brandId,
          influencerId: data.influencerId,
          brandName: data.brandName,
          influencerName: data.influencerName,
          brandLogo: data.brandLogo,
          influencerAvatar: data.influencerAvatar,
          service: data.service,
          status: data.status,
          budget: data.budget,
          startDate: data.startDate?.toDate() || new Date(),
          endDate: data.endDate?.toDate(),
          description: data.description
        });
      });

      return collaborations;
    } catch (error) {
      console.error('Error fetching collaborations:', error);
      throw error;
    }
  }

  // Messages
  async createConversation(conversation: Omit<ChatConversation, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'conversations'), {
        ...conversation,
        lastMessageTime: Timestamp.fromDate(conversation.lastMessageTime),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  async getUserConversations(userId: string): Promise<ChatConversation[]> {
    try {
      const q = query(
        collection(db, 'conversations'),
        where('participantId', '==', userId),
        orderBy('lastMessageTime', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const conversations: ChatConversation[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        conversations.push({
          id: doc.id,
          participantId: data.participantId,
          participantName: data.participantName,
          participantAvatar: data.participantAvatar,
          lastMessage: data.lastMessage,
          lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
          unreadCount: data.unreadCount || 0,
          messages: data.messages || []
        });
      });

      return conversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  }
}

export const firebaseData = new FirebaseDataService();