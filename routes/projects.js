// Routes to authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

// Creates projects
// api/projects
router.post('/', 
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.createProject
);

router.get('/', 
    auth,
    projectController.createProject
);


module.exports = router;