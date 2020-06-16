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

// Update project
exports.updateProject = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    // Destructur project info
    const { name } = req.body;
    const newProject = {};

    if(name) {
        newProject.name = name
    }

    try {

        // Check id
        let project = await Project.findById(req.params.id);

        // Check project exists
        if (!project) {
            return res.status(404).json({msg: 'Project not found'})
        }

        // Check project creator
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorized'})
        }

        // Update
        project = await Project.findByIdAndUpdate({ _id: req.params.id}, 
            {$set:  newProject}, { new: true});

            res.json({ project });


    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}