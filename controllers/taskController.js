const Task = require('../models/Task');
const Project = require('../models/Project');

const { validationResult } = require('express-validator');

// Creates new task
exports.createTask = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    

    // Check project exists
    try {
        // Destructure project 
        const { project } = req.body;
        

        const projectExist = await Project.findById(project);
        if (!projectExist) {
            return res.status(404).json({ msg: 'Project not found'})
        }

        // Check project creator
        if (projectExist.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorized'})
        }

        // Create task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

// Get Tasks by project
exports.getTasks = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    

    // Check project exists
    try {
        // Destructure project 
        const { project } = req.body;
        

        const projectExist = await Project.findById(project);
        if (!projectExist) {
            return res.status(404).json({ msg: 'Project not found'})
        }

        // Check project creator
        if (projectExist.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorized'})
        }

        // Get tasks by project
        const tasks = await Task.find({ project });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}
