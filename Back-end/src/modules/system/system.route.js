const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy',
        data: {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        }
    });
});

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Taallam LMS API',
        data: {
            version: 'v1',
            endpoints: [
                '/api/v1/health',
                '/api/v1/auth',
                '/api/v1/course',
                '/api/v1/chat'
            ]
        }
    });
});

module.exports = router;