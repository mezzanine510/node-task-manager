const express = require('express');
const Task = require('../models/task');

const taskRouter = express.Router();

//*** TASKS ***//

// create a task
taskRouter.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// get task list
taskRouter.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({});
        res.status(200).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// get task by id
taskRouter.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            res.status(404).send();
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

// update task
taskRouter.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'description', 'completed' ];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' })
    }

    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();

        if (!task) {
            return res.status(404).send();
        }
        
        return res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

// delete task
taskRouter.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    
    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = taskRouter;