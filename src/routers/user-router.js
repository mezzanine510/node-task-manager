const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Image must be a jpg or png.'));
        };
        
        callback(undefined, true);
        // callback(new Error('File must be a PDF'));
        // callback(undefined, true);
        // callback(undefined, false);
    }
});

const router = express.Router();

// create a user
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } 
    catch (e) {
        res.status(400).send(e);
    }
});

// login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();
        res.send();
    } 
    catch (e) {
        res.status(500).send(e);
    }
});

// logout of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.send();
    }
    catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

// get user profile when authenticated
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// update user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'name', 'email', 'password', 'age' ];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates.' });
    }

    try {
        // const user = await User.findById(_id)

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        res.send(req.user);
    }
    catch (e) {
        res.status(500).send();
    }
});

// delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);

        // old method not necessary since auth handles user
        // const user = await User.findByIdAndDelete(req.user._id);
        // if (!user) {
        //     return res.status(404).send();
        // }
    }
    catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;