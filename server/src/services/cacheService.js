
const Redis = require('redis');

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.init();
  }

  async init() {
    try {
      // Initialize Redis client (fallback to memory cache if Redis not available)
      if (process.env.REDIS_URL) {
        this.client = Redis.createClient({
          url: process.env.REDIS_URL
        });

        this.client.on('error', (err) => {
          console.log('Redis Client Error', err);
          this.isConnected = false;
        });

        this.client.on('connect', () => {
          console.log('✅ Redis connected successfully');
          this.isConnected = true;
        });

        await this.client.connect();
      } else {
        console.log('⚠️ Redis URL not provided, using in-memory cache');
        this.memoryCache = new Map();
        this.isConnected = true;
      }
    } catch (error) {
      console.error('❌ Redis connection failed, falling back to memory cache:', error);
      this.memoryCache = new Map();
      this.isConnected = true;
    }
  }

  async get(key) {
    try {
      if (!this.isConnected) return null;

      if (this.client) {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
      } else {
        const cached = this.memoryCache.get(key);
        if (cached && cached.expiry > Date.now()) {
          return cached.value;
        } else if (cached) {
          this.memoryCache.delete(key);
        }
        return null;
      }
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttlSeconds = 3600) {
    try {
      if (!this.isConnected) return false;

      if (this.client) {
        await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
      } else {
        this.memoryCache.set(key, {
          value,
          expiry: Date.now() + (ttlSeconds * 1000)
        });
      }
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async del(key) {
    try {
      if (!this.isConnected) return false;

      if (this.client) {
        await this.client.del(key);
      } else {
        this.memoryCache.delete(key);
      }
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  async invalidatePattern(pattern) {
    try {
      if (!this.isConnected) return false;

      if (this.client) {
        const keys = await this.client.keys(pattern);
        if (keys.length > 0) {
          await this.client.del(keys);
        }
      } else {
        // For memory cache, manually check each key
        for (const key of this.memoryCache.keys()) {
          if (key.includes(pattern.replace('*', ''))) {
            this.memoryCache.delete(key);
          }
        }
      }
      return true;
    } catch (error) {
      console.error('Cache invalidatePattern error:', error);
      return false;
    }
  }

  generateKey(...parts) {
    return parts.join(':');
  }

  // Predefined cache keys for common operations
  keys = {
    USER_PROFILE: (userId) => this.generateKey('user', 'profile', userId),
    ALUMNI_LIST: (page, filters) => this.generateKey('alumni', 'list', page, JSON.stringify(filters)),
    EVENTS_LIST: (page, filters) => this.generateKey('events', 'list', page, JSON.stringify(filters)),
    MENTORSHIP_MATCHES: (userId) => this.generateKey('mentorship', 'matches', userId),
    FORUM_POSTS: (categoryId, page) => this.generateKey('forum', 'posts', categoryId, page),
    SEARCH_RESULTS: (query, type, page) => this.generateKey('search', type, query, page)
  };
}

module.exports = new CacheService();
