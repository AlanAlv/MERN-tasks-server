// Routes to authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// api/auth

// Login
router.post('/', 
    authController.authenticateUser
);

// Get authenticated user
router.get('/', 
    auth,
    authController.authenticatedUser
);

module.exports = router;