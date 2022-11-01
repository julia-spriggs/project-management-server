const router = require("express").Router();
// const mongoose = require('mongoose');

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

//  POST /api/tasks  -  Creates a new task
router.post('/tasks', (req, res, next) => {
    const { title, description, projectId } = req.body;

    const newTask = {
        title,
        description,
        project: projectId
    };

    Task.create(newTask)
        .then(newTask => {
            return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } });
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json({
            message: "error creating a new project",
            error: err
        }));
});

module.exports = router;