import { Brand, Influencer } from '../types';
import { ChatConversation, ChatMessage, Collaboration } from '../types';

export const mockBrands: Brand[] = [
  {
    id: 'brand-1',
    name: 'GlowUp Cosmetics',
    logo: 'https://images.pexels.com/photos/3685175/pexels-photo-3685175.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: 'Beauty',
    description: 'Premium skincare and makeup brand focused on natural ingredients and sustainable packaging. We create products that enhance natural beauty while caring for the environment.',
    budget: { min: 8, max: 35 },
    targetAudience: ['Women 18-35', 'Beauty Enthusiasts', 'Eco-conscious consumers'],
    campaigns: 28,
    rating: 4.8,
    location: 'Los Angeles, CA',
    website: 'glowupcosmetics.com',
    preferredInfluencerSize: ['Micro', 'Mid-tier'],
    previousCollaborations: ['@beautyguru_sarah', '@skincare_emma', '@makeupwithlivy']
  },
  {
    id: 'brand-2',
    name: 'TechFlow',
    logo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: 'Technology',
    description: 'Innovative tech startup creating smart home devices and IoT solutions. We believe technology should simplify life while being accessible to everyone.',
    budget: { min: 10, max: 50 },
    targetAudience: ['Tech enthusiasts', 'Early adopters', 'Smart home users'],
    campaigns: 8,
    rating: 4.6,
    location: 'San Francisco, CA',
    website: 'techflow.io',
    preferredInfluencerSize: ['Mid-tier', 'Macro'],
    previousCollaborations: ['@techreview_mark', '@gadget_girl', '@smart_home_pro']
  },
  {
    id: 'brand-3',
    name: 'FitLife Nutrition',
    logo: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: 'Fitness',
    description: 'Premium supplement brand dedicated to helping people achieve their fitness goals with science-backed nutrition products.',
    budget: { min: 3, max: 15 },
    targetAudience: ['Fitness enthusiasts', 'Athletes', 'Health-conscious individuals'],
    campaigns: 22,
    rating: 4.7,
    location: 'Austin, TX',
    website: 'fitlife.com',
    preferredInfluencerSize: ['Micro', 'Mid-tier'],
    previousCollaborations: ['@fitness_katie', '@strongman_joe', '@yoga_with_anna']
  },
  {
    id: 'brand-4',
    name: 'Wanderlust Travel',
    logo: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: 'Travel',
    description: 'Boutique travel agency specializing in unique, off-the-beaten-path adventures and sustainable tourism experiences.',
    budget: { min: 15, max: 75 },
    targetAudience: ['Travel enthusiasts', 'Adventure seekers', 'Millennials'],
    campaigns: 12,
    rating: 4.9,
    location: 'Denver, CO',
    website: 'wanderlusttravel.com',
    preferredInfluencerSize: ['Mid-tier', 'Macro'],
    previousCollaborations: ['@travel_diaries', '@backpack_adventures', '@luxury_nomad']
  },
  {
    id: 'brand-5',
    name: 'StyleHub Fashion',
    logo: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: 'Fashion',
    description: 'Contemporary fashion brand creating versatile, sustainable clothing for the modern professional woman.',
    budget: { min: 8, max: 30 },
    targetAudience: ['Professional women', 'Fashion-forward millennials', 'Sustainable fashion advocates'],
    campaigns: 18,
    rating: 4.5,
    location: 'New York, NY',
    website: 'stylehub.com',
    preferredInfluencerSize: ['Micro', 'Mid-tier', 'Macro'],
    previousCollaborations: ['@fashion_forward_fem', '@sustainable_style', '@office_chic']
  },
  {
    id: 'brand-6',
    name: 'GameZone',
    logo: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    industry: 'Gaming',
    description: 'Gaming peripherals company creating high-performance gaming accessories for competitive and casual gamers.',
    budget: { min: 5, max: 20 },
    targetAudience: ['Gamers', 'Esports enthusiasts', 'Tech reviewers'],
    campaigns: 25,
    rating: 4.4,
    location: 'Seattle, WA',
    website: 'gamezone.com',
    preferredInfluencerSize: ['Micro', 'Mid-tier'],
    previousCollaborations: ['@pro_gamer_alex', '@gaming_setup_guru', '@esports_reviews']
  }
];

export const mockInfluencers: Influencer[] = [
  {
    id: 'influencer-1',
    name: 'Sarah Johnson',
    username: 'beautyguru_sarah',
    avatar: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Beauty', 'Lifestyle'],
    followers: 250000,
    engagement: 4.2,
    location: 'Los Angeles, CA',
    bio: 'Beauty enthusiast sharing skincare tips, makeup tutorials, and lifestyle content. Passionate about clean beauty and sustainable living.',
    rating: 4.8,
    priceRange: { post: 2500, story: 800, reel: 3200 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 35 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 15 },
        { range: '45+', percentage: 5 }
      ],
      genderSplit: { male: 15, female: 82, other: 3 },
      topCountries: [
        { country: 'United States', percentage: 65 },
        { country: 'Canada', percentage: 12 },
        { country: 'United Kingdom', percentage: 8 },
        { country: 'Australia', percentage: 6 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 15420, comments: 234, date: '2024-01-15' },
      { image: 'https://images.pexels.com/photos/3685175/pexels-photo-3685175.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 18750, comments: 312, date: '2024-01-12' },
      { image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 12300, comments: 189, date: '2024-01-10' }
    ],
    collaborationHistory: ['GlowUp Cosmetics', 'Clean Beauty Co', 'Sustainable Skincare']
  },
  {
    id: 'influencer-2',
    name: 'Mark Thompson',
    username: 'techreview_mark',
    avatar: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Tech', 'Reviews'],
    followers: 180000,
    engagement: 5.1,
    location: 'San Francisco, CA',
    bio: 'Tech reviewer and early adopter. I test the latest gadgets and share honest reviews to help you make informed decisions.',
    rating: 4.9,
    priceRange: { post: 1800, story: 600, reel: 2500 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 25 },
        { range: '25-34', percentage: 40 },
        { range: '35-44', percentage: 25 },
        { range: '45+', percentage: 10 }
      ],
      genderSplit: { male: 75, female: 23, other: 2 },
      topCountries: [
        { country: 'United States', percentage: 55 },
        { country: 'India', percentage: 15 },
        { country: 'Germany', percentage: 8 },
        { country: 'Canada', percentage: 7 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 12400, comments: 567, date: '2024-01-14' },
      { image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 16800, comments: 423, date: '2024-01-11' },
      { image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 9200, comments: 234, date: '2024-01-08' }
    ],
    collaborationHistory: ['TechFlow', 'GadgetCorp', 'Innovation Labs']
  },
  {
    id: 'influencer-3',
    name: 'Katie Williams',
    username: 'fitness_katie',
    avatar: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Fitness', 'Health'],
    followers: 320000,
    engagement: 3.8,
    location: 'Austin, TX',
    bio: 'Certified personal trainer and nutrition coach. Helping you build strength, confidence, and healthy habits that last.',
    rating: 4.7,
    priceRange: { post: 3200, story: 1000, reel: 4000 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 30 },
        { range: '25-34', percentage: 50 },
        { range: '35-44', percentage: 15 },
        { range: '45+', percentage: 5 }
      ],
      genderSplit: { male: 35, female: 63, other: 2 },
      topCountries: [
        { country: 'United States', percentage: 70 },
        { country: 'Canada', percentage: 10 },
        { country: 'Australia', percentage: 8 },
        { country: 'United Kingdom', percentage: 5 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 18900, comments: 345, date: '2024-01-16' },
      { image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 21500, comments: 412, date: '2024-01-13' },
      { image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 16700, comments: 298, date: '2024-01-10' }
    ],
    collaborationHistory: ['FitLife Nutrition', 'ActiveWear Pro', 'Wellness Brand']
  },
  {
    id: 'influencer-4',
    name: 'Emma Chen',
    username: 'travel_diaries',
    avatar: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Travel', 'Photography'],
    followers: 450000,
    engagement: 4.5,
    location: 'Denver, CO',
    bio: 'Travel photographer and storyteller. Capturing hidden gems and authentic experiences from around the world.',
    rating: 4.9,
    priceRange: { post: 4500, story: 1500, reel: 5500 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 25 },
        { range: '25-34', percentage: 55 },
        { range: '35-44', percentage: 15 },
        { range: '45+', percentage: 5 }
      ],
      genderSplit: { male: 40, female: 58, other: 2 },
      topCountries: [
        { country: 'United States', percentage: 45 },
        { country: 'Germany', percentage: 12 },
        { country: 'United Kingdom', percentage: 10 },
        { country: 'France', percentage: 8 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 28400, comments: 567, date: '2024-01-15' },
      { image: 'https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 32100, comments: 634, date: '2024-01-12' },
      { image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 24800, comments: 445, date: '2024-01-09' }
    ],
    collaborationHistory: ['Wanderlust Travel', 'Adventure Gear Co', 'Luxury Hotels']
  },
  {
    id: 'influencer-5',
    name: 'Alex Rodriguez',
    username: 'fashion_forward_fem',
    avatar: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Fashion', 'Style'],
    followers: 195000,
    engagement: 4.0,
    location: 'New York, NY',
    bio: 'Fashion stylist and content creator. Sharing accessible style tips and sustainable fashion choices for the modern woman.',
    rating: 4.6,
    priceRange: { post: 1950, story: 650, reel: 2800 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 40 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 12 },
        { range: '45+', percentage: 3 }
      ],
      genderSplit: { male: 10, female: 88, other: 2 },
      topCountries: [
        { country: 'United States', percentage: 60 },
        { country: 'United Kingdom', percentage: 15 },
        { country: 'Canada', percentage: 8 },
        { country: 'Australia', percentage: 6 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 14200, comments: 278, date: '2024-01-16' },
      { image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 17800, comments: 345, date: '2024-01-13' },
      { image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 12900, comments: 234, date: '2024-01-11' }
    ],
    collaborationHistory: ['StyleHub Fashion', 'Trendy Threads', 'Eco Fashion']
  },
  {
    id: 'influencer-6',
    name: 'Jake Gaming',
    username: 'pro_gamer_alex',
    avatar: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Gaming', 'Tech'],
    followers: 380000,
    engagement: 6.2,
    location: 'Seattle, WA',
    bio: 'Professional gamer and content creator. Streaming gameplay, reviewing gear, and sharing tips to level up your gaming.',
    rating: 4.8,
    priceRange: { post: 3800, story: 1200, reel: 4800 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 55 },
        { range: '25-34', percentage: 35 },
        { range: '35-44', percentage: 8 },
        { range: '45+', percentage: 2 }
      ],
      genderSplit: { male: 85, female: 13, other: 2 },
      topCountries: [
        { country: 'United States', percentage: 50 },
        { country: 'Germany', percentage: 12 },
        { country: 'Brazil', percentage: 10 },
        { country: 'United Kingdom', percentage: 8 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 35600, comments: 1245, date: '2024-01-16' },
      { image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 42300, comments: 1567, date: '2024-01-14' },
      { image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 29800, comments: 876, date: '2024-01-11' }
    ],
    collaborationHistory: ['GameZone', 'Elite Gaming Gear', 'Streaming Solutions']
  },
  {
    id: 'influencer-7',
    name: 'Sophia Martinez',
    username: 'food_with_sophia',
    avatar: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Food', 'Lifestyle'],
    followers: 280000,
    engagement: 4.3,
    location: 'Miami, FL',
    bio: 'Food blogger and recipe developer. Sharing easy, delicious recipes and food photography tips for home cooks.',
    rating: 4.7,
    priceRange: { post: 2800, story: 900, reel: 3500 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 20 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 25 },
        { range: '45+', percentage: 10 }
      ],
      genderSplit: { male: 25, female: 73, other: 2 },
      topCountries: [
        { country: 'United States', percentage: 55 },
        { country: 'Mexico', percentage: 15 },
        { country: 'Spain', percentage: 8 },
        { country: 'Canada', percentage: 7 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 19800, comments: 423, date: '2024-01-15' },
      { image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 22400, comments: 567, date: '2024-01-12' },
      { image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 17600, comments: 334, date: '2024-01-09' }
    ],
    collaborationHistory: ['Gourmet Foods Co', 'Kitchen Essentials', 'Organic Ingredients']
  },
  {
    id: 'influencer-8',
    name: 'David Park',
    username: 'lifestyle_david',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    niche: ['Lifestyle', 'Fashion'],
    followers: 165000,
    engagement: 3.9,
    location: 'Chicago, IL',
    bio: 'Lifestyle influencer focusing on men\'s fashion, grooming, and personal development. Living life with intention and style.',
    rating: 4.5,
    priceRange: { post: 1650, story: 550, reel: 2300 },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 30 },
        { range: '25-34', percentage: 50 },
        { range: '35-44', percentage: 15 },
        { range: '45+', percentage: 5 }
      ],
      genderSplit: { male: 60, female: 38, other: 2 },
      topCountries: [
        { country: 'United States', percentage: 65 },
        { country: 'Canada', percentage: 10 },
        { country: 'United Kingdom', percentage: 8 },
        { country: 'Australia', percentage: 5 }
      ]
    },
    recentPosts: [
      { image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 11200, comments: 156, date: '2024-01-16' },
      { image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 13800, comments: 203, date: '2024-01-13' },
      { image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 9800, comments: 134, date: '2024-01-10' }
    ],
    collaborationHistory: ['Men\'s Style Co', 'Grooming Essentials', 'Urban Fashion']
  }
];

export const mockCollaborations: Collaboration[] = [
  {
    id: 'collab-1',
    brandId: 'brand-1',
    influencerId: 'influencer-1',
    brandName: 'GlowUp Cosmetics',
    influencerName: 'Sarah Johnson',
    brandLogo: 'https://images.pexels.com/photos/3685175/pexels-photo-3685175.jpeg?auto=compress&cs=tinysrgb&w=400',
    influencerAvatar: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400',
    service: 'Instagram Post + Story',
    status: 'active',
    budget: 3500,
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-02-10'),
    description: 'Skincare routine showcase featuring our new vitamin C serum line. Content includes before/after photos and honest review.'
  },
  {
    id: 'collab-2',
    brandId: 'brand-2',
    influencerId: 'influencer-2',
    brandName: 'TechFlow',
    influencerName: 'Mark Thompson',
    brandLogo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    influencerAvatar: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    service: 'Product Review Video',
    status: 'completed',
    budget: 5000,
    startDate: new Date('2023-12-15'),
    endDate: new Date('2024-01-15'),
    description: 'Comprehensive review of our smart home automation system, including setup tutorial and feature demonstration.'
  },
  {
    id: 'collab-3',
    brandId: 'brand-3',
    influencerId: 'influencer-3',
    brandName: 'FitLife Nutrition',
    influencerName: 'Katie Williams',
    brandLogo: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    influencerAvatar: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
    service: 'Workout Series Sponsorship',
    status: 'pending',
    budget: 2500,
    startDate: new Date('2024-02-01'),
    description: '4-week workout series featuring our protein supplements. Includes workout videos and nutrition tips.'
  },
  {
    id: 'collab-4',
    brandId: 'brand-4',
    influencerId: 'influencer-4',
    brandName: 'Wanderlust Travel',
    influencerName: 'Emma Chen',
    brandLogo: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400',
    influencerAvatar: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400',
    service: 'Travel Documentation',
    status: 'active',
    budget: 8000,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-20'),
    description: 'Document a 2-week adventure tour through Southeast Asia, including daily vlogs and photography.'
  },
  {
    id: 'collab-5',
    brandId: 'brand-5',
    influencerId: 'influencer-5',
    brandName: 'StyleHub Fashion',
    influencerName: 'Alex Rodriguez',
    brandLogo: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    influencerAvatar: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    service: 'Fashion Lookbook',
    status: 'completed',
    budget: 3200,
    startDate: new Date('2023-11-01'),
    endDate: new Date('2023-12-01'),
    description: 'Create a professional lookbook showcasing our fall collection with styling tips and outfit combinations.'
  },
  {
    id: 'collab-6',
    brandId: 'brand-6',
    influencerId: 'influencer-6',
    brandName: 'GameZone',
    influencerName: 'Jake Gaming',
    brandLogo: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    influencerAvatar: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    service: 'Gaming Gear Review',
    status: 'cancelled',
    budget: 1800,
    startDate: new Date('2024-01-05'),
    description: 'Review and showcase our new gaming mouse and keyboard set during live streaming sessions.'
  }
];

export const mockConversations: ChatConversation[] = [
  {
    id: 'conv-1',
    participantId: 'brand-1',
    participantName: 'GlowUp Cosmetics',
    participantAvatar: 'https://images.pexels.com/photos/3685175/pexels-photo-3685175.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Hi! We\'d love to collaborate on a skincare campaign.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 2,
    messages: [
      {
        id: 'msg-1',
        senderId: 'brand-1',
        content: 'Hi! We\'d love to collaborate on a skincare campaign.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'text'
      },
      {
        id: 'msg-2',
        senderId: 'current-user',
        content: 'That sounds amazing! I\'d love to hear more details.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        type: 'text'
      }
    ]
  },
  {
    id: 'conv-2',
    participantId: 'influencer-2',
    participantName: 'Mark Thompson',
    participantAvatar: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Thanks for reaching out! When can we schedule a call?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    messages: [
      {
        id: 'msg-3',
        senderId: 'current-user',
        content: 'Hi Mark! I saw your tech reviews and would love to discuss a partnership.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        type: 'text'
      },
      {
        id: 'msg-4',
        senderId: 'influencer-2',
        content: 'Thanks for reaching out! When can we schedule a call?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'text'
      }
    ]
  },
  {
    id: 'conv-3',
    participantId: 'brand-4',
    participantName: 'Wanderlust Travel',
    participantAvatar: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'We have an exciting travel campaign opportunity!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 1,
    messages: [
      {
        id: 'msg-5',
        senderId: 'brand-4',
        content: 'We have an exciting travel campaign opportunity!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        type: 'text'
      }
    ]
  }
];