const supertest = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'Papi',
    email: 'papi@chulo.com',
    password: '12what123'
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