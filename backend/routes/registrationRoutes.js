const express = require('express');
const { registerForEvent } = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, registerForEvent);

module.exports = router;
