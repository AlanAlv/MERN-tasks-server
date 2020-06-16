// Routes to authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// api/tasks

// Creates task
router.post('/', 
    auth,
    [
        check('name', 'Task name is required').not().isEmpty(),
        check('project', 'Project name is required').not().isEmpty()
    ],
    taskController.createTask
);

// Get all tasks by project
router.get('/', 
    auth,
    taskController.getTasks
);


// Updates task by id
router.put('/:id', 
    auth,
    taskController.updateTask
);

/*
// Deletes task by id
router.delete('/:id', 
    auth,
    taskController.deleteTask
);
 */

module.exports = router;