
const cacheService = require('../services/cacheService');

// Cache response middleware
const cacheResponse = (keyGenerator, ttl = 300) => {
  return async (req, res, next) => {
    try {
      // Generate cache key based on request
      const cacheKey = typeof keyGenerator === 'function' 
        ? keyGenerator(req) 
        : keyGenerator;
      
      // Try to get cached response
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      // Store original res.json method
      const originalJson = res.json;
      
      // Override res.json to cache the response
      res.json = function(data) {
        // Cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cacheService.set(cacheKey, data, ttl).catch(err => {
            console.error('Cache set error:', err);
          });
        }
        
        // Call original json method
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

// Cache invalidation middleware
const invalidateCache = (patterns) => {
  return async (req, res, next) => {
    // Store original response methods
    const originalJson = res.json;
    const originalSend = res.send;

    const invalidatePatterns = async () => {
      try {
        const patternsToInvalidate = typeof patterns === 'function' 
          ? patterns(req) 
          : patterns;

        for (const pattern of patternsToInvalidate) {
          await cacheService.invalidatePattern(pattern);
        }
      } catch (error) {
        console.error('Cache invalidation error:', error);
      }
    };

    // Override response methods to invalidate cache on successful responses
    res.json = function(data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        invalidatePatterns();
      }
      return originalJson.call(this, data);
    };

    res.send = function(data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        invalidatePatterns();
      }
      return originalSend.call(this, data);
    };

    next();
  };
};

module.exports = {
  cacheResponse,
  invalidateCache
};
