const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Create a new user
   */
  static async create(userData) {
    const { password, ...otherData } = userData;
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 12);
    
    const [user] = await db('users')
      .insert({
        ...otherData,
        password_hash: passwordHash
      })
      .returning(['id', 'email', 'first_name', 'last_name', 'role', 'created_at']);
    
    return user;
  }

  /**
   * Find user by email
   */
  static async findByEmail(email) {
    return await db('users')
      .where({ email })
      .first();
  }

  /**
   * Find user by ID
   */
  static async findById(id) {
    return await db('users')
      .select('id', 'email', 'first_name', 'last_name', 'role', 'phone', 'avatar_url', 'bio', 'is_active', 'created_at')
      .where({ id })
      .first();
  }

  /**
   * Update user
   */
  static async update(id, updateData) {
    const [user] = await db('users')
      .where({ id })
      .update(updateData)
      .returning(['id', 'email', 'first_name', 'last_name', 'role', 'updated_at']);
    
    return user;
  }

  /**
   * Verify password
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Update password
   */
  static async updatePassword(id, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUNDS) || 12);
    
    await db('users')
      .where({ id })
      .update({
        password_hash: passwordHash,
        password_reset_token: null,
        password_reset_expires: null
      });
  }

  /**
   * Get user with alumni profile
   */
  static async findWithAlumniProfile(id) {
    const user = await db('users')
      .select(
        'users.id',
        'users.email',
        'users.first_name',
        'users.last_name',
        'users.role',
        'users.phone',
        'users.avatar_url',
        'users.bio',
        'users.created_at',
        'alumni_profiles.graduation_year',
        'alumni_profiles.degree',
        'alumni_profiles.department',
        'alumni_profiles.current_role',
        'alumni_profiles.current_company',
        'alumni_profiles.industry',
        'alumni_profiles.location',
        'alumni_profiles.linkedin_url',
        'alumni_profiles.expertise_tags',
        'alumni_profiles.achievements',
        'alumni_profiles.willing_to_mentor',
        'alumni_profiles.privacy_settings'
      )
      .leftJoin('alumni_profiles', 'users.id', 'alumni_profiles.user_id')
      .where('users.id', id)
      .first();

    return user;
  }

  /**
   * Update last login
   */
  static async updateLastLogin(id) {
    await db('users')
      .where({ id })
      .update({ last_login: db.fn.now() });
  }
}

module.exports = User;