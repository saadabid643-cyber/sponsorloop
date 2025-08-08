export type UserType = 'brand' | 'influencer';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  targetAudience: string[];
  campaigns: number;
  rating: number;
  location: string;
  website: string;
  preferredInfluencerSize: string[];
  previousCollaborations: string[];
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  niche: string[];
  followers: number;
  engagement: number;
  location: string;
  bio: string;
  rating: number;
  priceRange: {
    post: number;
    story: number;
    reel: number;
  };
  demographics: {
    ageGroups: { range: string; percentage: number }[];
    genderSplit: { male: number; female: number; other: number };
    topCountries: { country: string; percentage: number }[];
  };
  recentPosts: {
    image: string;
    likes: number;
    comments: number;
    date: string;
  }[];
  collaborationHistory: string[];
}

export interface CartItem {
  id: string;
  type: 'influencer' | 'brand';
  profile: Brand | Influencer;
  service: string;
  price: number;
  quantity: number;
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export interface InstagramData {
  followers: number;
  engagement: number;
  posts: number;
  verified: boolean;
  bio: string;
  profilePic: string;
  recentPosts: {
    likes: number;
    comments: number;
    date: string;
    engagementRate?: string;
  }[];
  lastUpdated?: string;
  dataSource?: string;
}

export type PageType = 'home' | 'messages' | 'collaborations' | 'profile';

export type PageType = 'home' | 'messages' | 'collaborations' | 'profile' | 'notifications' | 'settings';

export interface Collaboration {
  id: string;
  brandId: string;
  influencerId: string;
  brandName: string;
  influencerName: string;
  brandLogo: string;
  influencerAvatar: string;
  service: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  budget: number;
  startDate: Date;
  endDate?: Date;
  description: string;
}