// Routes to authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');

// Creates projects
// api/projects
router.post('/', 
    projectController.createProject
);

module.exports = router;