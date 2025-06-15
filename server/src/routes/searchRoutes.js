
const express = require('express');
const searchService = require('../services/searchService');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Global search endpoint
router.get('/global', authMiddleware, async (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Query must be at least 2 characters long' 
      });
    }

    const results = await searchService.globalSearch(query.trim());
    res.json(results);
  } catch (error) {
    console.error('Error performing global search:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Search alumni
router.get('/alumni', authMiddleware, async (req, res) => {
  try {
    const { 
      q: query, 
      page = 1, 
      limit = 20,
      industry,
      location,
      experience_level,
      mentorship_available,
      graduation_year
    } = req.query;

    const filters = {};
    if (industry) filters.industry = industry;
    if (location) filters.location = location;
    if (experience_level) filters.experience_level = experience_level;
    if (mentorship_available) filters.mentorship_available = mentorship_available === 'true';
    if (graduation_year) filters.graduation_year = graduation_year;

    const results = await searchService.searchAlumni(
      query?.trim() || '', 
      filters, 
      parseInt(page), 
      parseInt(limit)
    );

    res.json(results);
  } catch (error) {
    console.error('Error searching alumni:', error);
    res.status(500).json({ error: 'Alumni search failed' });
  }
});

// Search events
router.get('/events', authMiddleware, async (req, res) => {
  try {
    const { 
      q: query, 
      page = 1, 
      limit = 20,
      event_type,
      start_date,
      end_date,
      is_virtual
    } = req.query;

    const filters = {};
    if (event_type) filters.event_type = event_type;
    if (start_date) filters.start_date = start_date;
    if (end_date) filters.end_date = end_date;
    if (is_virtual !== undefined) filters.is_virtual = is_virtual === 'true';

    const results = await searchService.searchEvents(
      query?.trim() || '', 
      filters, 
      parseInt(page), 
      parseInt(limit)
    );

    res.json(results);
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(500).json({ error: 'Events search failed' });
  }
});

// Search forum posts
router.get('/forum', authMiddleware, async (req, res) => {
  try {
    const { 
      q: query, 
      page = 1, 
      limit = 20,
      category_id
    } = req.query;

    const filters = {};
    if (category_id) filters.category_id = category_id;

    const results = await searchService.searchForumPosts(
      query?.trim() || '', 
      filters, 
      parseInt(page), 
      parseInt(limit)
    );

    res.json(results);
  } catch (error) {
    console.error('Error searching forum posts:', error);
    res.status(500).json({ error: 'Forum search failed' });
  }
});

// Get search suggestions
router.get('/suggestions', authMiddleware, async (req, res) => {
  try {
    const { q: query, type = 'all' } = req.query;
    
    if (!query || query.trim().length < 1) {
      return res.json([]);
    }

    const suggestions = await searchService.getSearchSuggestions(query.trim(), type);
    res.json(suggestions);
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

module.exports = router;
