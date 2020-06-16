// Routes to authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

// api/projects

// Creates projects
router.post('/', 
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.createProject
);

// Get all projects
router.get('/', 
    auth,
    projectController.getProjects
);

// Updates project by id
router.put('/:id', 
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.updateProject
);

module.exports = router;