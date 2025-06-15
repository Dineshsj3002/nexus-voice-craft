
const db = require('../config/database');
const cacheService = require('./cacheService');

class SearchService {
  async searchAlumni(query, filters = {}, page = 1, limit = 20) {
    try {
      const cacheKey = cacheService.keys.SEARCH_RESULTS(query, 'alumni', page);
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;

      const offset = (page - 1) * limit;
      let dbQuery = db('alumni_profiles as ap')
        .join('users as u', 'ap.user_id', 'u.id')
        .select(
          'ap.*',
          'u.username',
          'u.full_name',
          'u.email',
          'u.avatar_url',
          'u.is_online'
        );

      // Text search across multiple fields
      if (query) {
        dbQuery = dbQuery.where(function() {
          this.whereRaw('LOWER(u.full_name) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(ap.company) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(ap.position) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(ap.industry) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(ap.location) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(ap.skills::text) LIKE ?', [`%${query.toLowerCase()}%`]);
        });
      }

      // Apply filters
      if (filters.industry) {
        dbQuery = dbQuery.where('ap.industry', filters.industry);
      }
      if (filters.location) {
        dbQuery = dbQuery.whereRaw('LOWER(ap.location) LIKE ?', [`%${filters.location.toLowerCase()}%`]);
      }
      if (filters.experience_level) {
        dbQuery = dbQuery.where('ap.experience_level', filters.experience_level);
      }
      if (filters.mentorship_available) {
        dbQuery = dbQuery.where('ap.mentorship_available', true);
      }
      if (filters.graduation_year) {
        dbQuery = dbQuery.where('ap.graduation_year', filters.graduation_year);
      }

      // Get total count
      const totalQuery = dbQuery.clone();
      const totalResult = await totalQuery.count('ap.id as count').first();
      const total = parseInt(totalResult.count);

      // Get paginated results
      const results = await dbQuery
        .orderBy('u.full_name')
        .limit(limit)
        .offset(offset);

      const searchResults = {
        results,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        query,
        filters
      };

      // Cache results for 5 minutes
      await cacheService.set(cacheKey, searchResults, 300);
      
      return searchResults;
    } catch (error) {
      console.error('Error searching alumni:', error);
      throw error;
    }
  }

  async searchEvents(query, filters = {}, page = 1, limit = 20) {
    try {
      const cacheKey = cacheService.keys.SEARCH_RESULTS(query, 'events', page);
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;

      const offset = (page - 1) * limit;
      let dbQuery = db('events');

      // Text search
      if (query) {
        dbQuery = dbQuery.where(function() {
          this.whereRaw('LOWER(title) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(description) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(location) LIKE ?', [`%${query.toLowerCase()}%`]);
        });
      }

      // Apply filters
      if (filters.event_type) {
        dbQuery = dbQuery.where('event_type', filters.event_type);
      }
      if (filters.start_date) {
        dbQuery = dbQuery.where('start_date', '>=', filters.start_date);
      }
      if (filters.end_date) {
        dbQuery = dbQuery.where('end_date', '<=', filters.end_date);
      }
      if (filters.is_virtual !== undefined) {
        dbQuery = dbQuery.where('is_virtual', filters.is_virtual);
      }

      // Get total count
      const totalQuery = dbQuery.clone();
      const totalResult = await totalQuery.count('id as count').first();
      const total = parseInt(totalResult.count);

      // Get paginated results with registration count
      const results = await dbQuery
        .leftJoin('event_registrations as er', 'events.id', 'er.event_id')
        .select('events.*')
        .count('er.id as registration_count')
        .groupBy('events.id')
        .orderBy('events.start_date')
        .limit(limit)
        .offset(offset);

      const searchResults = {
        results,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        query,
        filters
      };

      // Cache results for 5 minutes
      await cacheService.set(cacheKey, searchResults, 300);
      
      return searchResults;
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  }

  async globalSearch(query, page = 1, limit = 20) {
    try {
      const cacheKey = cacheService.keys.SEARCH_RESULTS(query, 'global', page);
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached;

      const [alumniResults, eventResults, forumResults] = await Promise.all([
        this.searchAlumni(query, {}, 1, 5),
        this.searchEvents(query, {}, 1, 5),
        this.searchForumPosts(query, {}, 1, 5)
      ]);

      const globalResults = {
        alumni: alumniResults.results,
        events: eventResults.results,
        forum_posts: forumResults.results,
        query,
        timestamp: new Date()
      };

      // Cache results for 2 minutes
      await cacheService.set(cacheKey, globalResults, 120);
      
      return globalResults;
    } catch (error) {
      console.error('Error performing global search:', error);
      throw error;
    }
  }

  async searchForumPosts(query, filters = {}, page = 1, limit = 20) {
    try {
      const offset = (page - 1) * limit;
      let dbQuery = db('forum_posts as fp')
        .join('users as u', 'fp.author_id', 'u.id')
        .leftJoin('forum_categories as fc', 'fp.category_id', 'fc.id')
        .select(
          'fp.*',
          'u.username',
          'u.full_name',
          'u.avatar_url',
          'fc.name as category_name'
        );

      // Text search
      if (query) {
        dbQuery = dbQuery.where(function() {
          this.whereRaw('LOWER(fp.title) LIKE ?', [`%${query.toLowerCase()}%`])
            .orWhereRaw('LOWER(fp.content) LIKE ?', [`%${query.toLowerCase()}%`]);
        });
      }

      // Apply filters
      if (filters.category_id) {
        dbQuery = dbQuery.where('fp.category_id', filters.category_id);
      }

      // Get total count
      const totalQuery = dbQuery.clone();
      const totalResult = await totalQuery.count('fp.id as count').first();
      const total = parseInt(totalResult.count);

      // Get paginated results
      const results = await dbQuery
        .orderBy('fp.created_at', 'desc')
        .limit(limit)
        .offset(offset);

      return {
        results,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        query,
        filters
      };
    } catch (error) {
      console.error('Error searching forum posts:', error);
      throw error;
    }
  }

  async getSearchSuggestions(query, type = 'all') {
    try {
      const suggestions = [];

      if (type === 'all' || type === 'alumni') {
        // Get popular companies and skills
        const companies = await db('alumni_profiles')
          .select('company')
          .whereRaw('LOWER(company) LIKE ?', [`%${query.toLowerCase()}%`])
          .groupBy('company')
          .orderByRaw('COUNT(*) DESC')
          .limit(5);

        suggestions.push(...companies.map(c => ({ text: c.company, type: 'company' })));
      }

      if (type === 'all' || type === 'events') {
        // Get event types
        const eventTypes = await db('events')
          .select('event_type')
          .whereRaw('LOWER(event_type) LIKE ?', [`%${query.toLowerCase()}%`])
          .groupBy('event_type')
          .orderByRaw('COUNT(*) DESC')
          .limit(3);

        suggestions.push(...eventTypes.map(et => ({ text: et.event_type, type: 'event_type' })));
      }

      return suggestions.slice(0, 10);
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      return [];
    }
  }
}

module.exports = new SearchService();
