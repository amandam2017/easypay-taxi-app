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
	// ssl:{ rejectUnauthorized : false}
};
const pgp = PgPromise({});
const db = pgp(config);
// const db = pgp(DATABASE_URL);
API(app, db);
describe('The EASY_PAY_TAXI API', function () {
    before(async function () {
        this.timeout(5000);
        await db.none(`delete from users`);
        await db.none(`delete from drivers`);
        await db.none(`delete from taxi_data`);
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
        assert.equal(0, users.length);
        assert.deepEqual([], users);
    });
    it('should be able to signup a user', async () => {
        const response = await supertest(app)
            .post('/api/signup')
            .send({
                name: 'tshifhiwa',
                surname: 'matombo',
                username: 'tshifhiwa',
                password: '@1234',
                role: 'passenger'
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
                username: 'hlomla',
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
                password: '@1234',
            });
        const login = response.body.message;
        assert.deepStrictEqual('tshifhiwa', login);
    });

    it('you should create a routes table in the database', async () => {
        const result = await db.one('select count(*) from routes')
        assert.ok(result.count);
    });
    it('you should create a taxi_data table in the database', async () => {
        const result = await db.one('select count(*) from taxi_data')
        assert.ok(result.count);
    });
    it('you should create a card_payment table in the database', async () => {
        const result = await db.one('select count(*) from card_payment')
        assert.ok(result.count);
    });
    //-------------API tests-----------------------//
    it('you should be able to find all the Kuilsriver departure routes', async () => {
        const result = await db.one('select count(*) from routes where departure = $1', 'Kuilsriver');
        assert.equal(0, result.count);
    });
    it('you should be able to find all the cape town destination routes', async () => {
        const result = await db.one('select count(*) from routes where destination = $1', 'CapeTown');
        assert.equal(0, result.count);
    });
    it('you should be able to see when there are no taxis in that route', async () => {
        const response = await supertest(app)
            .post('/api/taxis')
            .send({
                departure: "khayelitsha",
                destination: "khayelitsha"
            });
        const destination_taxis = response.body.data;
        const taxis = response.body.message;
        assert.deepStrictEqual([], destination_taxis, taxis);
    });
    it('you should be able to get all the taxis in that route', async () => {
        const response = await supertest(app)
            .post('/api/taxis')
            .send({
                departure: "Stellenbosch",
                destination: "Cape Town"
            });
        const destination_taxis = response.body.data;
        const thisprice = response.body.data;
        assert.deepStrictEqual(0, destination_taxis.length);
    });
it('should be able to allow user to make payment', async () => {
        const response = await supertest(app)
            .post('/api/card_payments')
            .send({
                firstname: 'tshifhiwa',
                card_number: '12334 2345 6543',
                exp_month : 'July',
                exp_year: '2023',
                cvv: '234'
            });
        //const users = response.body.data;
        const paythis= response.body.message;
        assert.deepStrictEqual('payment made', paythis);
    });
    after(() => {
        db.$pool.end();
    });
}).timeout(5000)