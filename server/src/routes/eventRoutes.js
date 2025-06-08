const express = require('express');
const { body, query } = require('express-validator');

const db = require('../config/database');
const { protect, authorize, optionalAuth } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

const router = express.Router();

/**
 * @route   GET /api/v1/events
 * @desc    Get all events with filters
 * @access  Public
 */
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('type').optional().isString(),
  query('featured').optional().isBoolean(),
  query('upcoming').optional().isBoolean()
], handleValidationErrors, async (req, res) => {
  try {
    const { page = 1, limit = 20, type, featured, upcoming } = req.query;
    const offset = (page - 1) * limit;

    let query = db('events')
      .select(
        'events.*',
        'organizer.first_name as organizer_first_name',
        'organizer.last_name as organizer_last_name'
      )
      .leftJoin('users as organizer', 'events.organizer_id', 'organizer.id')
      .where('events.status', 'published');

    // Apply filters
    if (type) {
      query = query.where('events.type', type);
    }

    if (featured === 'true') {
      query = query.where('events.featured', true);
    }

    if (upcoming === 'true') {
      query = query.where('events.start_date', '>', new Date());
    }

    const events = await query
      .orderBy('events.featured', 'desc')
      .orderBy('events.start_date', 'asc')
      .limit(limit)
      .offset(offset);

    // Get registration counts and user registration status
    for (let event of events) {
      const [{ count }] = await db('event_registrations')
        .where('event_id', event.id)
        .where('status', 'registered')
        .count('* as count');
      
      event.registered_count = parseInt(count);
      event.spots_left = event.max_attendees ? event.max_attendees - event.registered_count : null;

      // Check if current user is registered
      if (req.user) {
        const registration = await db('event_registrations')
          .where({ event_id: event.id, user_id: req.user.id })
          .first();
        event.user_registered = !!registration;
        event.registration_status = registration?.status;
      }
    }

    res.json({
      success: true,
      data: { events }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/events/:id
 * @desc    Get specific event
 * @access  Public
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const event = await db('events')
      .select(
        'events.*',
        'organizer.first_name as organizer_first_name',
        'organizer.last_name as organizer_last_name',
        'organizer.avatar_url as organizer_avatar'
      )
      .leftJoin('users as organizer', 'events.organizer_id', 'organizer.id')
      .where('events.id', id)
      .where('events.status', 'published')
      .first();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Get registration count
    const [{ count }] = await db('event_registrations')
      .where('event_id', event.id)
      .where('status', 'registered')
      .count('* as count');
    
    event.registered_count = parseInt(count);
    event.spots_left = event.max_attendees ? event.max_attendees - event.registered_count : null;

    // Check if current user is registered
    if (req.user) {
      const registration = await db('event_registrations')
        .where({ event_id: event.id, user_id: req.user.id })
        .first();
      event.user_registered = !!registration;
      event.registration_status = registration?.status;
    }

    res.json({
      success: true,
      data: { event }
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/v1/events
 * @desc    Create new event
 * @access  Private (Alumni/Admin)
 */
router.post('/', protect, authorize('alumni', 'admin'), [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').optional().trim(),
  body('type').isIn(['workshop', 'networking', 'panel', 'program', 'mentoring', 'career_fair', 'hackathon', 'competition']).withMessage('Invalid event type'),
  body('start_date').isISO8601().withMessage('Valid start date is required'),
  body('end_date').optional().isISO8601().withMessage('Valid end date required'),
  body('location').optional().trim(),
  body('is_virtual').optional().isBoolean(),
  body('max_attendees').optional().isInt({ min: 1 }),
  body('price').optional().isDecimal({ decimal_digits: '0,2' })
], handleValidationErrors, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer_id: req.user.id,
      status: 'published'
    };

    const [event] = await db('events')
      .insert(eventData)
      .returning('*');

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { event }
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   POST /api/v1/events/:id/register
 * @desc    Register for event
 * @access  Private
 */
router.post('/:id/register', protect, [
  body('dietary_requirements').optional().trim(),
  body('additional_info').optional().trim()
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const { dietary_requirements, additional_info } = req.body;

    // Check if event exists and is open for registration
    const event = await db('events')
      .where({ id, status: 'published' })
      .where('start_date', '>', new Date())
      .first();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found or registration closed'
      });
    }

    // Check if already registered
    const existingRegistration = await db('event_registrations')
      .where({ event_id: id, user_id: req.user.id })
      .first();

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }

    // Check capacity
    if (event.max_attendees) {
      const [{ count }] = await db('event_registrations')
        .where('event_id', id)
        .where('status', 'registered')
        .count('* as count');

      if (parseInt(count) >= event.max_attendees) {
        return res.status(400).json({
          success: false,
          message: 'Event is full'
        });
      }
    }

    // Create registration
    const [registration] = await db('event_registrations')
      .insert({
        event_id: id,
        user_id: req.user.id,
        dietary_requirements,
        additional_info
      })
      .returning('*');

    // Update event attendee count
    await db('events')
      .where({ id })
      .increment('current_attendees', 1);

    res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      data: { registration }
    });
  } catch (error) {
    console.error('Register for event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   DELETE /api/v1/events/:id/register
 * @desc    Cancel event registration
 * @access  Private
 */
router.delete('/:id/register', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await db('event_registrations')
      .where({ event_id: id, user_id: req.user.id, status: 'registered' })
      .first();

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Update registration status
    await db('event_registrations')
      .where({ id: registration.id })
      .update({ status: 'cancelled' });

    // Update event attendee count
    await db('events')
      .where({ id })
      .decrement('current_attendees', 1);

    res.json({
      success: true,
      message: 'Event registration cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel event registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

/**
 * @route   GET /api/v1/events/:id/registrations
 * @desc    Get event registrations (for organizers)
 * @access  Private
 */
router.get('/:id/registrations', protect, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is the organizer or admin
    const event = await db('events')
      .where({ id })
      .first();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.organizer_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view registrations'
      });
    }

    const registrations = await db('event_registrations')
      .select(
        'event_registrations.*',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.avatar_url'
      )
      .join('users', 'event_registrations.user_id', 'users.id')
      .where('event_registrations.event_id', id)
      .orderBy('event_registrations.registered_at', 'desc');

    res.json({
      success: true,
      data: { registrations }
    });
  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;