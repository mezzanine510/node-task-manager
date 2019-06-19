const supertest = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOneId,
        userOne,
        userTwoId,
        userTwo,
        taskOne,
        taskTwo,
        taskThree,
        setupDatabase 
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await supertest(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${ userOne.tokens[ 0 ].token }`)
        .send({
            description: 'Gettin shawty'
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test('Should fetch tasks for userOne', async() => {
    const response = await supertest(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${ userOne.tokens[ 0 ].token }`)
        .send()
        .expect(200)

    // Assert correct number of tasks was pulled
    expect(response.body.length).toEqual(2);
});

test('Should not delete other users tasks', async () => {
    const response = await supertest(app)
        .delete(`/tasks/${ taskOne._id }`)
        .set('Authorization', `Bearer ${ userTwo.tokens[ 0 ].token }`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});