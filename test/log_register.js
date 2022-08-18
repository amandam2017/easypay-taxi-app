const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()
const API = require('../server/api');
const { default: axios } = require('axios');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const config = {
    connectionString: process.env.DATABASE_URL || 'postgres://amanda:@262632@localhost:5432/easy_pay_taxi ',
    // max: 30,
    ssl:{ rejectUnauthorized : false}
};
const pgp = PgPromise({});
const db2 = pgp(config);
// const db = pgp(DATABASE_URL);
API(app, db2);
describe('The EASY_PAY_TAXI API', function () {
    before(async function () {
        this.timeout(5000);
        //await db.none(`delete from users`);
        //await db.none(`delete from drivers`);
       // await db.none(`delete from taxi_data`);
        //  await db.none(commandText)
    });
    it('should have a test method', async () => {
        const response = await supertest(app)
            .get('/api/test')
            .expect(200);
        assert.deepStrictEqual({ name: 'tshifhiwa' }, response.body);
    });
    it('should be able to find all users', async () => {
        const response = await supertest(app)
            .get('/api/users')
            .expect(200);
        const users = response.body.data;
        assert.equal(18, users.length);
        // assert.deepEqual([], users);
    });
    it('should be able to signup a user', async () => {
        const response = await supertest(app)
            .post('/api/signup')
            .send({
                name: 'tshifhiwa',
                surname: 'matombo',
                username: 'tshifhiwa',
                password: '1234',
                role: 'Driver'
            });
        const responseUsers = await supertest(app)
            .get('/api/users')
            .expect(200);
        // console.log(responseUsers.body.data, 'after adding new user');
        const users = response.body.data;
        const signup = response.body.message;
        assert.deepStrictEqual('user successfully registered', signup);
    });
    it('should be return error message does not exist', async () => {
        const response = await supertest(app)
            .post('/api/login')
            .send({
                username: 'lizy',
                password: 'pass',
            });
        const login = response.body.message;
        assert.deepStrictEqual('User does not exist please sign up below', login);
        
    });
    it('should be able to find a user that is logged in by username and password', async () => {
        const response = await supertest(app)
            .post('/api/login')
            .send({
                username: 'tshifhiwa',
                password: '1234',
            });
        const login = response.body.message;
        assert.deepStrictEqual('tshifhiwa', login);
    });
    after(() => {
        db2.$pool.end();
    });
}).timeout(5000)