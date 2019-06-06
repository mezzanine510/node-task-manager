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
taskRouter.get('/tasks', auth, async (req, res) => {
    try {
        // alternative method without using model refs
        // const tasks = await Task.find({ owner: req.user._id });
        await req.user.populate('tasks').execPopulate();
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
        const task = await Task.findOne( { _id, owner: req.user._id })

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