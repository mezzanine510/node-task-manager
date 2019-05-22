// CRUD - create read update delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    // db.collection('tasks').deleteOne({
    //     _id: new ObjectID('5ce3180e80473e00f0bf1dea')
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('users').deleteMany({
    //     age: 34
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // });
    
    // db.collection('users').updateOne({
    //         _id: new ObjectID('5ce310c17c13350094ccaabe')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // });

    

    
    


    // db.collection('tasks').findOne({ _id: new ObjectID('5ce3180e80473e00f0bf1dea') }, (error, task) =>{
    //     if (error) {
    //         return console.log('Unable to fetch task.');
    //     }

    //     console.log(task);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('Unable to find tasks');
    //     }
        
    //     console.log(tasks);
    // });

    // db.collection('users').findOne({ _id: new ObjectID('5ce312d17fdfcc00a2906700') }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch user');
    //     }

    //     console.log(user);
    // });

    // db.collection('users').find({ age: 34 }).toArray((error, users) => {
    //     console.log(users);
    // });

    // db.collection('users').find({ age: 34 }).count((error, users) => {
    //     console.log(users);
    // });

    // db.collection('users').insertOne({
    //     name: 'Nahuel',
    //     age: 34
    // }, (error, result) => {
    //     if (error) {
    //         console.log('Unable to insert user');
    //         return;
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'I gotta do this.',
    //         completed: false
    //     },
    //     {
    //         description: 'I am doing this',
    //         completed: true
    //     },
    //     {
    //         description: 'Get down and dirty',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log('Unable to insert tasks.');
    //         return;
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Bushano',
    //         age: 9
    //     },
    //     {
    //         name: 'Rawradin',
    //         age: 5044
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log('Unable to insert documents');
    //         return;
    //     }

    //     console.log(result.ops);
    // });
});

