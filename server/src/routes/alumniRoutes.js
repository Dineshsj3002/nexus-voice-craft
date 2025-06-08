const express = require('express');
const { body, query } = require('express-validator');

const Alumni = require('../models/Alumni');
const { protect, authorize, optionalAuth } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @route   GET /api/v1/alumni
 * @desc    Get all alumni with filters
 * @access  Public
 */
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('graduation_year').optional().isString(),
  query('industry').optional().isString(),
  query('location').optional().isString(),
  query('search').optional().isString(),
  query('willing_to_mentor').optional().isBoolean()
], handleValidationErrors, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      graduation_year,
      industry,
      location,
      search,
      willing_to_mentor
    } = req.query;

    const filters = {
      graduation_year,
      industry,
      location,
      search,
      willing_to_mentor: willing_to_mentor === 'true'
    };

    const result = await Alumni.getAll(filters, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get alumni error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/alumni/featured
 * @desc    Get featured alumni
 * @access  Public
 */
router.get('/featured', async (req, res) => {
  try {
    const alumni = await Alumni.getFeatured();

    res.json({
      success: true,
      data: { alumni }
    });
  } catch (error) {
    console.error('Get featured alumni error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/alumni/recommended
 * @desc    Get recommended alumni for current user
 * @access  Private
 */
router.get('/recommended', protect, [
  query('limit').optional().isInt({ min: 1, max: 10 }).withMessage('Limit must be between 1 and 10')
], handleValidationErrors, async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    
    // TODO: Implement proper recommendation algorithm based on user interests
    const studentInterests = []; // Get from user profile
    const alumni = await Alumni.getRecommended(studentInterests, parseInt(limit));

    res.json({
      success: true,
      data: { alumni }
    });
  } catch (error) {
    console.error('Get recommended alumni error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/alumni/filters
 * @desc    Get filter options for alumni search
 * @access  Public
 */
router.get('/filters', async (req, res) => {
  try {
    const filterOptions = await Alumni.getFilterOptions();

    res.json({
      success: true,
      data: filterOptions
    });
  } catch (error) {
    console.error('Get filter options error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/v1/alumni/profile
 * @desc    Create alumni profile
 * @access  Private (Alumni only)
 */
router.post('/profile', protect, authorize('alumni'), [
  body('graduation_year').isLength({ min: 4, max: 4 }).withMessage('Graduation year must be 4 digits'),
  body('degree').trim().isLength({ min: 1 }).withMessage('Degree is required'),
  body('current_role').optional().trim(),
  body('current_company').optional().trim(),
  body('industry').optional().trim(),
  body('location').optional().trim(),
  body('linkedin_url').optional().isURL().withMessage('LinkedIn URL must be valid'),
  body('expertise_tags').optional().isArray(),
  body('willing_to_mentor').optional().isBoolean()
], handleValidationErrors, async (req, res) => {
  try {
    const profileData = req.body;
    const profile = await Alumni.createProfile(req.user.id, profileData);

    res.status(201).json({
      success: true,
      message: 'Alumni profile created successfully',
      data: { profile }
    });
  } catch (error) {
    console.error('Create alumni profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   PUT /api/v1/alumni/profile
 * @desc    Update alumni profile
 * @access  Private (Alumni only)
 */
router.put('/profile', protect, authorize('alumni'), [
  body('graduation_year').optional().isLength({ min: 4, max: 4 }).withMessage('Graduation year must be 4 digits'),
  body('degree').optional().trim().isLength({ min: 1 }).withMessage('Degree cannot be empty'),
  body('current_role').optional().trim(),
  body('current_company').optional().trim(),
  body('industry').optional().trim(),
  body('location').optional().trim(),
  body('linkedin_url').optional().isURL().withMessage('LinkedIn URL must be valid'),
  body('expertise_tags').optional().isArray(),
  body('willing_to_mentor').optional().isBoolean(),
  body('privacy_settings').optional().isObject()
], handleValidationErrors, async (req, res) => {
  try {
    const updateData = req.body;
    const profile = await Alumni.updateProfile(req.user.id, updateData);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Alumni profile not found'
      });
    }

    res.json({
      success: true,
      message: 'Alumni profile updated successfully',
      data: { profile }
    });
  } catch (error) {
    console.error('Update alumni profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/alumni/:id
 * @desc    Get specific alumni profile
 * @access  Public
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const alumni = await db('users')
      .select(
        'users.id',
        'users.first_name',
        'users.last_name',
        'users.avatar_url',
        'users.bio',
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
        'alumni_profiles.previous_roles',
        'alumni_profiles.willing_to_mentor'
      )
      .join('alumni_profiles', 'users.id', 'alumni_profiles.user_id')
      .where('users.id', id)
      .where('users.role', 'alumni')
      .where('users.is_active', true)
      .first();

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found'
      });
    }

    res.json({
      success: true,
      data: { alumni }
    });
  } catch (error) {
    console.error('Get alumni profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;