const db = require('../config/database');

class Alumni {
  /**
   * Create alumni profile
   */
  static async createProfile(userId, profileData) {
    const [profile] = await db('alumni_profiles')
      .insert({
        user_id: userId,
        ...profileData
      })
      .returning('*');
    
    return profile;
  }

  /**
   * Get all alumni with filters
   */
  static async getAll(filters = {}, page = 1, limit = 20) {
    let query = db('users')
      .select(
        'users.id',
        'users.first_name',
        'users.last_name',
        'users.avatar_url',
        'users.bio',
        'alumni_profiles.graduation_year',
        'alumni_profiles.degree',
        'alumni_profiles.current_role',
        'alumni_profiles.current_company',
        'alumni_profiles.industry',
        'alumni_profiles.location',
        'alumni_profiles.expertise_tags',
        'alumni_profiles.willing_to_mentor',
        'alumni_profiles.featured'
      )
      .join('alumni_profiles', 'users.id', 'alumni_profiles.user_id')
      .where('users.role', 'alumni')
      .where('users.is_active', true);

    // Apply filters
    if (filters.graduation_year && filters.graduation_year !== 'all_years') {
      query = query.where('alumni_profiles.graduation_year', filters.graduation_year);
    }

    if (filters.industry && filters.industry !== 'all_industries') {
      query = query.where('alumni_profiles.industry', filters.industry);
    }

    if (filters.location && filters.location !== 'all_locations') {
      query = query.whereILike('alumni_profiles.location', `%${filters.location}%`);
    }

    if (filters.search) {
      query = query.where(function() {
        this.whereILike('users.first_name', `%${filters.search}%`)
          .orWhereILike('users.last_name', `%${filters.search}%`)
          .orWhereILike('alumni_profiles.current_company', `%${filters.search}%`)
          .orWhereILike('alumni_profiles.current_role', `%${filters.search}%`);
      });
    }

    if (filters.willing_to_mentor) {
      query = query.where('alumni_profiles.willing_to_mentor', true);
    }

    // Pagination
    const offset = (page - 1) * limit;
    const alumni = await query
      .orderBy('alumni_profiles.featured', 'desc')
      .orderBy('users.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalQuery = db('users')
      .join('alumni_profiles', 'users.id', 'alumni_profiles.user_id')
      .where('users.role', 'alumni')
      .where('users.is_active', true);

    // Apply same filters for count
    if (filters.graduation_year && filters.graduation_year !== 'all_years') {
      totalQuery.where('alumni_profiles.graduation_year', filters.graduation_year);
    }
    if (filters.industry && filters.industry !== 'all_industries') {
      totalQuery.where('alumni_profiles.industry', filters.industry);
    }
    if (filters.location && filters.location !== 'all_locations') {
      totalQuery.whereILike('alumni_profiles.location', `%${filters.location}%`);
    }
    if (filters.search) {
      totalQuery.where(function() {
        this.whereILike('users.first_name', `%${filters.search}%`)
          .orWhereILike('users.last_name', `%${filters.search}%`)
          .orWhereILike('alumni_profiles.current_company', `%${filters.search}%`)
          .orWhereILike('alumni_profiles.current_role', `%${filters.search}%`);
      });
    }
    if (filters.willing_to_mentor) {
      totalQuery.where('alumni_profiles.willing_to_mentor', true);
    }

    const [{ count }] = await totalQuery.count('* as count');

    return {
      alumni,
      pagination: {
        page,
        limit,
        total: parseInt(count),
        pages: Math.ceil(count / limit)
      }
    };
  }

  /**
   * Get featured alumni
   */
  static async getFeatured() {
    return await db('users')
      .select(
        'users.id',
        'users.first_name',
        'users.last_name',
        'users.avatar_url',
        'users.bio',
        'alumni_profiles.graduation_year',
        'alumni_profiles.degree',
        'alumni_profiles.current_role',
        'alumni_profiles.current_company',
        'alumni_profiles.industry',
        'alumni_profiles.location',
        'alumni_profiles.achievements',
        'alumni_profiles.expertise_tags'
      )
      .join('alumni_profiles', 'users.id', 'alumni_profiles.user_id')
      .where('users.role', 'alumni')
      .where('users.is_active', true)
      .where('alumni_profiles.featured', true)
      .orderBy('users.created_at', 'desc');
  }

  /**
   * Get recommended alumni for a student
   */
  static async getRecommended(studentInterests, limit = 3) {
    // This is a simplified recommendation algorithm
    // In production, you might want to use more sophisticated matching
    return await db('users')
      .select(
        'users.id',
        'users.first_name',
        'users.last_name',
        'users.avatar_url',
        'users.bio',
        'alumni_profiles.graduation_year',
        'alumni_profiles.degree',
        'alumni_profiles.current_role',
        'alumni_profiles.current_company',
        'alumni_profiles.industry',
        'alumni_profiles.location',
        'alumni_profiles.expertise_tags'
      )
      .join('alumni_profiles', 'users.id', 'alumni_profiles.user_id')
      .where('users.role', 'alumni')
      .where('users.is_active', true)
      .where('alumni_profiles.willing_to_mentor', true)
      .limit(limit);
  }

  /**
   * Update alumni profile
   */
  static async updateProfile(userId, updateData) {
    const [profile] = await db('alumni_profiles')
      .where({ user_id: userId })
      .update(updateData)
      .returning('*');
    
    return profile;
  }

  /**
   * Get unique values for filters
   */
  static async getFilterOptions() {
    const graduationYears = await db('alumni_profiles')
      .distinct('graduation_year')
      .orderBy('graduation_year', 'desc');

    const industries = await db('alumni_profiles')
      .distinct('industry')
      .whereNotNull('industry')
      .orderBy('industry');

    const locations = await db('alumni_profiles')
      .distinct('location')
      .whereNotNull('location')
      .orderBy('location');

    return {
      graduation_years: graduationYears.map(row => row.graduation_year),
      industries: industries.map(row => row.industry),
      locations: locations.map(row => row.location)
    };
  }
}

module.exports = Alumni;