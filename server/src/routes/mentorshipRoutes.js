const express = require('express');
const { body, query } = require('express-validator');

const db = require('../config/database');
const { protect, authorize } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @route   POST /api/v1/mentorship/request
 * @desc    Create mentorship request
 * @access  Private (Students)
 */
router.post('/request', protect, [
  body('mentor_id').isUUID().withMessage('Valid mentor ID is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  body('goals').optional().isArray()
], handleValidationErrors, async (req, res) => {
  try {
    const { mentor_id, message, goals } = req.body;

    // Check if mentor exists and is willing to mentor
    const mentor = await db('users')
      .join('alumni_profiles', 'users.id', 'alumni_profiles.user_id')
      .where('users.id', mentor_id)
      .where('users.role', 'alumni')
      .where('alumni_profiles.willing_to_mentor', true)
      .first();

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found or not available for mentorship'
      });
    }

    // Check if request already exists
    const existingRequest = await db('mentorship_requests')
      .where({
        mentee_id: req.user.id,
        mentor_id,
        status: 'pending'
      })
      .first();

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending request with this mentor'
      });
    }

    // Create mentorship request
    const [request] = await db('mentorship_requests')
      .insert({
        mentee_id: req.user.id,
        mentor_id,
        message,
        goals: JSON.stringify(goals || [])
      })
      .returning('*');

    // TODO: Send notification to mentor
    // await createNotification(mentor_id, 'mentorship', 'New mentorship request', message);

    res.status(201).json({
      success: true,
      message: 'Mentorship request sent successfully',
      data: { request }
    });
  } catch (error) {
    console.error('Create mentorship request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/mentorship/requests
 * @desc    Get mentorship requests (sent or received)
 * @access  Private
 */
router.get('/requests', protect, [
  query('type').isIn(['sent', 'received']).withMessage('Type must be either sent or received'),
  query('status').optional().isIn(['pending', 'accepted', 'declined', 'completed']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], handleValidationErrors, async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = db('mentorship_requests')
      .select(
        'mentorship_requests.*',
        'mentee.first_name as mentee_first_name',
        'mentee.last_name as mentee_last_name',
        'mentee.avatar_url as mentee_avatar',
        'mentor.first_name as mentor_first_name',
        'mentor.last_name as mentor_last_name',
        'mentor.avatar_url as mentor_avatar',
        'alumni_profiles.current_role',
        'alumni_profiles.current_company'
      )
      .join('users as mentee', 'mentorship_requests.mentee_id', 'mentee.id')
      .join('users as mentor', 'mentorship_requests.mentor_id', 'mentor.id')
      .leftJoin('alumni_profiles', 'mentor.id', 'alumni_profiles.user_id');

    if (type === 'sent') {
      query = query.where('mentorship_requests.mentee_id', req.user.id);
    } else {
      query = query.where('mentorship_requests.mentor_id', req.user.id);
    }

    if (status) {
      query = query.where('mentorship_requests.status', status);
    }

    const requests = await query
      .orderBy('mentorship_requests.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    // Get total count
    let countQuery = db('mentorship_requests');
    if (type === 'sent') {
      countQuery = countQuery.where('mentee_id', req.user.id);
    } else {
      countQuery = countQuery.where('mentor_id', req.user.id);
    }
    if (status) {
      countQuery = countQuery.where('status', status);
    }

    const [{ count }] = await countQuery.count('* as count');

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(count),
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get mentorship requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   PUT /api/v1/mentorship/requests/:id/respond
 * @desc    Respond to mentorship request (accept/decline)
 * @access  Private (Mentors)
 */
router.put('/requests/:id/respond', protect, [
  body('status').isIn(['accepted', 'declined']).withMessage('Status must be accepted or declined'),
  body('response').optional().trim()
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    // Get the request and verify mentor ownership
    const request = await db('mentorship_requests')
      .where({ id, mentor_id: req.user.id, status: 'pending' })
      .first();

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship request not found or already responded to'
      });
    }

    // Update request
    const [updatedRequest] = await db('mentorship_requests')
      .where({ id })
      .update({
        status,
        mentor_response: response,
        accepted_at: status === 'accepted' ? db.fn.now() : null
      })
      .returning('*');

    // TODO: Send notification to mentee
    // await createNotification(request.mentee_id, 'mentorship', `Mentorship request ${status}`, response);

    res.json({
      success: true,
      message: `Mentorship request ${status} successfully`,
      data: { request: updatedRequest }
    });
  } catch (error) {
    console.error('Respond to mentorship request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/mentorship/sessions
 * @desc    Get mentorship sessions
 * @access  Private
 */
router.get('/sessions', protect, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('status').optional().isIn(['scheduled', 'completed', 'cancelled'])
], handleValidationErrors, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let query = db('mentorship_sessions')
      .select(
        'mentorship_sessions.*',
        'mentorship_requests.mentee_id',
        'mentorship_requests.mentor_id',
        'mentee.first_name as mentee_first_name',
        'mentee.last_name as mentee_last_name',
        'mentor.first_name as mentor_first_name',
        'mentor.last_name as mentor_last_name'
      )
      .join('mentorship_requests', 'mentorship_sessions.mentorship_id', 'mentorship_requests.id')
      .join('users as mentee', 'mentorship_requests.mentee_id', 'mentee.id')
      .join('users as mentor', 'mentorship_requests.mentor_id', 'mentor.id')
      .where(function() {
        this.where('mentorship_requests.mentee_id', req.user.id)
          .orWhere('mentorship_requests.mentor_id', req.user.id);
      });

    if (status) {
      query = query.where('mentorship_sessions.status', status);
    }

    const sessions = await query
      .orderBy('mentorship_sessions.scheduled_at', 'desc')
      .limit(limit)
      .offset(offset);

    res.json({
      success: true,
      data: { sessions }
    });
  } catch (error) {
    console.error('Get mentorship sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/v1/mentorship/sessions
 * @desc    Schedule mentorship session
 * @access  Private
 */
router.post('/sessions', protect, [
  body('mentorship_id').isUUID().withMessage('Valid mentorship ID is required'),
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').optional().trim(),
  body('scheduled_at').isISO8601().withMessage('Valid date is required'),
  body('duration_minutes').optional().isInt({ min: 15, max: 180 })
], handleValidationErrors, async (req, res) => {
  try {
    const { mentorship_id, title, description, scheduled_at, duration_minutes = 60 } = req.body;

    // Verify mentorship exists and user is part of it
    const mentorship = await db('mentorship_requests')
      .where({ id: mentorship_id, status: 'accepted' })
      .where(function() {
        this.where('mentee_id', req.user.id)
          .orWhere('mentor_id', req.user.id);
      })
      .first();

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship not found or not accessible'
      });
    }

    // Create session
    const [session] = await db('mentorship_sessions')
      .insert({
        mentorship_id,
        title,
        description,
        scheduled_at,
        duration_minutes
      })
      .returning('*');

    res.status(201).json({
      success: true,
      message: 'Mentorship session scheduled successfully',
      data: { session }
    });
  } catch (error) {
    console.error('Schedule mentorship session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;