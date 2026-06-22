const express = require('express');
const { parseJob } = require('../controllers/ai');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Only logged-in users can call the AI endpoint (prevents abuse of your key)
router.post('/parse-job', protect, parseJob);

module.exports = router;
