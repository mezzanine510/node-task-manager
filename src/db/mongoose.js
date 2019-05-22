const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

// Users
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`The password can't include the word "${value}"`);
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    }
});

const me = new User({
    name: 'Bushanote  ',
    email: 'poopanote@rawr.com',
    password: 'passWoRd'
});

// me.save().then((result, reject) => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// });


// Tasks
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const myTask = new Task({
    description: 'be berry friendlies',
    completed: true
});

myTask.save().then((result, reject) => {
    console.log(myTask);
}).catch((error) => {
    console.log('Error!', error);
});