# SponsorLoop Backend API Structure Plan

## Technology Stack Recommendation

### Core Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with Helmet, CORS, Rate Limiting
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3 or Cloudinary for images
- **Real-time**: Socket.io for live updates
- **Caching**: Redis for session management and caching

### External APIs
- **Instagram**: Instagram Basic Display API + Web Scraping fallback
- **Payments**: Stripe for payment processing
- **Email**: SendGrid or AWS SES for notifications
- **Image Processing**: Sharp for image optimization

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('brand', 'influencer')),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Brands Table
```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  industry VARCHAR(100) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  location VARCHAR(255),
  budget_min INTEGER,
  budget_max INTEGER,
  target_audience JSONB,
  preferred_influencer_sizes JSONB,
  rating DECIMAL(3,2) DEFAULT 0,
  campaigns_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Influencers Table
```sql
CREATE TABLE influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location VARCHAR(255),
  niches JSONB,
  followers INTEGER DEFAULT 0,
  engagement_rate DECIMAL(4,2) DEFAULT 0,
  instagram_handle VARCHAR(100),
  instagram_data JSONB,
  price_post INTEGER,
  price_story INTEGER,
  price_reel INTEGER,
  rating DECIMAL(3,2) DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Collaborations Table
```sql
CREATE TABLE collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES influencers(id) ON DELETE CASCADE,
  service VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  budget INTEGER NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  deliverables JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints Structure

### Authentication Endpoints
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Refresh JWT token
POST   /api/auth/forgot-password   # Password reset request
POST   /api/auth/reset-password    # Password reset confirmation
GET    /api/auth/verify-email      # Email verification
```

### User Management
```
GET    /api/users/profile          # Get current user profile
PUT    /api/users/profile          # Update user profile
DELETE /api/users/account          # Delete user account
POST   /api/users/upload-avatar    # Upload profile picture
```

### Brands Endpoints
```
GET    /api/brands                 # Get all brands (with filters)
GET    /api/brands/:id             # Get specific brand
POST   /api/brands                 # Create brand profile (brand users only)
PUT    /api/brands/:id             # Update brand profile
DELETE /api/brands/:id             # Delete brand profile
GET    /api/brands/search          # Search brands with filters
```

### Influencers Endpoints
```
GET    /api/influencers            # Get all influencers (with filters)
GET    /api/influencers/:id        # Get specific influencer
POST   /api/influencers            # Create influencer profile
PUT    /api/influencers/:id        # Update influencer profile
DELETE /api/influencers/:id        # Delete influencer profile
GET    /api/influencers/search     # Search influencers with filters
POST   /api/influencers/sync-instagram  # Sync Instagram data
```

### Instagram Integration
```
POST   /api/instagram/analyze      # Analyze Instagram profile
GET    /api/instagram/profile/:username  # Get Instagram profile data
POST   /api/instagram/subscribe    # Subscribe to live updates
DELETE /api/instagram/unsubscribe  # Unsubscribe from updates
GET    /api/instagram/metrics/:username  # Get detailed metrics
```

### Collaborations
```
GET    /api/collaborations         # Get user's collaborations
POST   /api/collaborations         # Create collaboration request
GET    /api/collaborations/:id     # Get specific collaboration
PUT    /api/collaborations/:id     # Update collaboration
DELETE /api/collaborations/:id     # Cancel collaboration
POST   /api/collaborations/:id/accept    # Accept collaboration
POST   /api/collaborations/:id/complete  # Mark as completed
```

### Messages/Chat
```
GET    /api/conversations          # Get user's conversations
POST   /api/conversations          # Start new conversation
GET    /api/conversations/:id      # Get conversation messages
POST   /api/conversations/:id/messages  # Send message
PUT    /api/conversations/:id/read # Mark conversation as read
```

### Notifications
```
GET    /api/notifications          # Get user notifications
PUT    /api/notifications/:id/read # Mark notification as read
PUT    /api/notifications/read-all # Mark all as read
DELETE /api/notifications/:id     # Delete notification
```

### Cart/Orders (Future)
```
GET    /api/cart                   # Get cart items
POST   /api/cart/add               # Add item to cart
PUT    /api/cart/:id               # Update cart item
DELETE /api/cart/:id               # Remove from cart
POST   /api/cart/checkout          # Process checkout
```

### Analytics & Recommendations
```
GET    /api/analytics/dashboard    # Get dashboard analytics
POST   /api/recommendations        # Get AI recommendations
GET    /api/analytics/performance  # Get performance metrics
```

## Middleware Structure

### Authentication Middleware
```javascript
// middleware/auth.js
const authenticateToken = (req, res, next) => {
  // Verify JWT token
  // Attach user to request object
};

const requireRole = (roles) => (req, res, next) => {
  // Check if user has required role
};
```

### Validation Middleware
```javascript
// middleware/validation.js
const validateRegistration = (req, res, next) => {
  // Validate registration data
};

const validateProfile = (req, res, next) => {
  // Validate profile updates
};
```

### Rate Limiting
```javascript
// middleware/rateLimiting.js
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const instagramLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10 // limit Instagram API calls
});
```

## Service Layer Structure

### Instagram Service
```javascript
// services/instagramService.js
class InstagramService {
  async fetchProfile(username) {
    // Try Instagram API first
    // Fallback to web scraping
    // Cache results in Redis
  }

  async subscribeToLiveUpdates(username) {
    // Set up Socket.io live updates
  }

  async getMetrics(username) {
    // Get detailed analytics
  }
}
```

### Recommendation Service
```javascript
// services/recommendationService.js
class RecommendationService {
  async getMatches(userId, preferences) {
    // AI-powered matching algorithm
    // Consider engagement rates, audience overlap, etc.
  }

  async calculateMatchScore(profile1, profile2) {
    // Calculate compatibility score
  }
}
```

### Notification Service
```javascript
// services/notificationService.js
class NotificationService {
  async sendEmail(to, template, data) {
    // Send email notifications
  }

  async createNotification(userId, type, data) {
    // Create in-app notification
  }

  async sendPushNotification(userId, message) {
    // Send push notification
  }
}
```

## Socket.io Events Structure

### Client to Server Events
```javascript
// Instagram real-time updates
'instagram:fetch:profile'
'instagram:subscribe:live'
'instagram:unsubscribe:live'

// Chat events
'chat:join_room'
'chat:send_message'
'chat:typing'
'chat:stop_typing'

// Collaboration events
'collaboration:status_update'
'collaboration:new_request'
```

### Server to Client Events
```javascript
// Instagram updates
'instagram:profile:data'
'instagram:live_update'
'instagram:metrics:data'
'instagram:error'

// Chat events
'chat:new_message'
'chat:user_typing'
'chat:user_online'
'chat:user_offline'

// Notifications
'notification:new'
'collaboration:update'
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/sponsorloop
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Instagram API
INSTAGRAM_CLIENT_ID=your-instagram-client-id
INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=sponsorloop-uploads
AWS_REGION=us-east-1

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@sponsorloop.com

# Stripe (Future)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App Config
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## API Response Format

### Success Response
```javascript
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Email already exists"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Pagination Response
```javascript
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Security Considerations

### Authentication & Authorization
- JWT tokens with short expiration (15 minutes)
- Refresh tokens stored securely
- Role-based access control
- Email verification required
- Password strength requirements

### Data Protection
- Input validation and sanitization
- SQL injection prevention (using Prisma)
- XSS protection
- CSRF protection
- Rate limiting on all endpoints
- Helmet.js for security headers

### Instagram API Security
- API key rotation
- Request signing
- Rate limit compliance
- Data caching to reduce API calls
- Fallback mechanisms

## Deployment Strategy

### Development
```bash
# Local development with Docker Compose
docker-compose up -d  # PostgreSQL + Redis
npm run dev          # Start development server
```

### Production Options
1. **Railway/Render**: Easy deployment with PostgreSQL addon
2. **AWS**: ECS + RDS + ElastiCache
3. **DigitalOcean**: App Platform + Managed Database
4. **Heroku**: Dyno + PostgreSQL + Redis addons

## Integration with Frontend

### API Client Setup
```javascript
// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('accessToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      // Handle token refresh
      await this.refreshToken();
      return this.request(endpoint, options);
    }
    
    return response.json();
  }

  // Auth methods
  async login(email, password, userType) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, userType }),
    });
  }

  // Brand methods
  async getBrands(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/brands?${params}`);
  }

  // Influencer methods
  async getInfluencers(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/influencers?${params}`);
  }

  // Instagram methods
  async analyzeInstagram(username) {
    return this.request('/instagram/analyze', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
  }
}

export const apiService = new ApiService();
```

## Next Steps

1. **Set up the backend project structure**
2. **Implement authentication system first**
3. **Create database migrations**
4. **Build core API endpoints**
5. **Integrate Instagram API**
6. **Add Socket.io for real-time features**
7. **Implement recommendation algorithm**
8. **Add comprehensive testing**
9. **Set up CI/CD pipeline**
10. **Deploy to production**

This structure provides a solid foundation that aligns perfectly with your current frontend implementation while being scalable and maintainable.