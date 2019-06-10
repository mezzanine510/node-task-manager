const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const taskRouter = express.Router();

//*** TASKS ***//

// create task
taskRouter.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } 
    catch (e) {
        res.status(400).send(e);
    }
});

// get task list
// GET /tasks?completed=true gets only completed tasks
// GET /tasks?limit=10&skip=20 limits query to 10 items per page and skips past the 20th item (starts at page 3, or the 21st item)
taskRouter.get('/tasks', auth, async (req, res) => {
    const match = {}
    const limit = req.query.limit;
    const skip = req.query.skip;

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    try {
        // alternative method without using model refs
        // const tasks = await Task.find({ owner: req.user._id });
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip)
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks);
    } 
    catch (e) {
        res.status(500).send(e);
    }
});

// get task by id
taskRouter.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            res.status(404).send();
        }

        res.status(200).send(task);
    } 
    catch (e) {
        res.status(500).send(e);
    }
});

// update task
taskRouter.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'description', 'completed' ];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();

        return res.send(task);
    }
    catch (e) {
        res.status(500).send(e);
    }
});

// delete task
taskRouter.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } 
    catch (e) {
        res.status(500).send(e);
    }
});

module.exports = taskRouter;