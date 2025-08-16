const express = require('express');
const router = express.Router();
const axios = require('axios');

// AI Echo Route
router.post('/echo', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.AI_SERVICE_URL}/nlp/echo`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'AI Service is unavailable' });
    }
});

// AI Transcribe Route
router.post('/transcribe', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.AI_SERVICE_URL}/voice/transcribe`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'AI Service is unavailable' });
    }
});

module.exports = router;