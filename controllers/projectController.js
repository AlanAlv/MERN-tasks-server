const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Create new project
exports.createProject = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    try {
        // Create new project
        const project = new Project(req.body);

        // Save creator with jwt
        project.creator = req.user.id;

        // Save project
        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Gets all projects from current user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({ created: -1});
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}