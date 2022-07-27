const app = require('../app');
const request  = require('supertest');

test('Should get all users in the database',async()=>{
    await request(app).get('/api/v1/users').expect(200)
})

test('Should create a new user',async()=>{
    await request(app).post('/api/v1/users').send({
        username:'TestUser',
        password: '188832009'
    }).expect(200)
})

test('Should not create a new user without a username',async()=>{
    await request(app).post('/api/v1/users').send({
        password: '1888320095'
    }).expect(500)
})