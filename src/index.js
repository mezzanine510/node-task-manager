const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user-router');
const taskRouter = require('./routers/task-router');

const app = express();

const port = process.env.PORT || 8082;


const multer = require('multer');
const upload = multer({
    dest: 'image-uploads',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return callback(new Error('File must be a word document.'));
        };
        
        callback(undefined, true);
        // callback(new Error('File must be a PDF'));
        // callback(undefined, true);
        // callback(undefined, false);
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.send();
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message });
});


// app.use((req, res, next) => {
//     res.status(503).send('Server is currently under maintenance. Please come back later!');
    
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
});