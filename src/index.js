const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user-router');
const taskRouter = require('./routers/task-router');

const app = express();

const port = process.env.PORT || 8082;

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled.');
//     }
//     else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Server is currently under maintenance. Please come back later!');
    
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
});

const pet = {
    name: 'Hal 9000'
}

console.log(JSON.stringify(pet));