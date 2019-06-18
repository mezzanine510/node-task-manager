const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Papi',
    email: 'papi@chulo.com',
    password: '12what123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should signup a new user', async () => {
    const response = await supertest(app).post('/users').send({
        name: 'Nahuel',
        email: 'me@bee.gee',
        password: 'rawrg123'
    }).expect(201);

    // Asserts that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: { 
            name:'Nahuel',
            email: 'me@bee.gee'
        },
        token: user.tokens[ 0 ].token
    });

    expect(user.password).not.toBe('777Brargs!!!');
});

test('Should login existing user', async () => {
    const response = await supertest(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);

    // Asserts that tokens match
    expect(response.body.token).toBe(user.tokens[ 1 ].token);
});

test('Should not login nonexistent user', async() => {
    await supertest(app).post('/users/login').send({
        email: 'blargg@poop.dadjokes',
        password: 'LADDIE432'
    }).expect(400);
});

test('Should get profile for user', async () => {
    await supertest(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[ 0 ].token }`)
        .send()
        .expect(200);
});

test('Should not get profile for unathenticated user', async () => {
    await supertest(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete account for user', async () => {
    await supertest(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[ 0 ].token }`)
        .send()
        .expect(200);

    // Assert that user was deleted - returns null
    const user = await User.findById(userOne._id);
    expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
    await supertest(app)
        .delete('/users/me')
        .send()
        .expect(401)
});