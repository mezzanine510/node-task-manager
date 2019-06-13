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
    await supertest(app).post('/users').send({
        name: 'Nahuel',
        email: 'me@bee.gee',
        password: 'rawrg123'
    }).expect(201);
});

test('Should login existing user', async () => {
    await supertest(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
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
        .expect(200)
});

test('Should not delete account for unauthenticated user', async () => {
    await supertest(app)
        .delete('/users/me')
        .send()
        .expect(401)
});