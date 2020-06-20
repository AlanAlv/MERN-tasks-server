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

    // Check project exists
    try {
        // Destructure project 
        const { project } = req.query;
        

        const projectExist = await Project.findById(project);
        if (!projectExist) {
            return res.status(404).json({ msg: 'Project not found'})
        }

        // Check project creator
        if (projectExist.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorized'})
        }

        // Get tasks by project
        const tasks = await Task.find({ project }).sort({created: -1});
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

// Update Task
exports.updateTask = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    

    try {
        // Destructure project 
        const { project, name, state} = req.body;

        // Check task exists
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found'})
        }

        const projectExist = await Project.findById(project);

        // Check project creator
        if (projectExist.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorized'})
        }

        // Create object with new info
        const newTask = {};
        newTask.name = name;
        newTask.state = state;

        // Save task
        task = await Task.findOneAndUpdate({_id: req.params.id},
             newTask, { new: true});

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

// Delete Task
exports.deleteTask = async (req, res) => {

    try {
        // Destructure project 
        const { project} = req.query;

        // Check task exists
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found'})
        }

        const projectExist = await Project.findById(project);

        // Check project creator
        if (projectExist.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorized'})
        }

        // Delete task
        await Task.findOneAndRemove({_id: req.params.id});

        res.json({ msg: 'Task deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}
