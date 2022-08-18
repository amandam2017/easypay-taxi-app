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
const db1 = pgp(config);
// const db1 = pgp(DATABASE_URL);
API(app, db1);
describe('The EASY_PAY_TAXI DATABASE TESTS', function () {
    before(async function () {
        this.timeout(5000);
        //await db1.none(`delete from users`);
        //await db1.none(`delete from drivers`);
       // await db1.none(`delete from taxi_data`);
        //  await db1.none(commandText)
    });
    it('should have a test method', async () => {
        const response = await supertest(app)
            .get('/api/test')
            .expect(200);
        assert.deepStrictEqual({ name: 'tshifhiwa' }, response.body);
    });
     it('you should create users table in the database', async () => {
        const result = await db1.one('select count(*) from users')
        assert.ok(result.count);
    });
    it('you should create a routes table in the database', async () => {
        const result = await db1.one('select count(*) from routes')
        assert.ok(result.count);
    });
    it('you should create a taxi_data table in the database', async () => {
        const result = await db1.one('select count(*) from taxi_data')
        assert.ok(result.count);
    });
    it('you should create a card_payment table in the database', async () => {
        const result = await db1.one('select count(*) from card_payment')
        assert.ok(result.count);
    });
    it('you should create a payment_receipt table in the database', async () => {
        const result = await db1.one('select count(*) from payment_receipt')
        assert.ok(result.count);
    });
    it('you should create a drivers table in the database', async () => {
        const result = await db1.one('select count(*) from drivers')
        assert.ok(result.count);
    });
    it('you should create a taxi_trips table in the database', async () => {
        const result = await db1.one('select count(*) from taxi_trips')
        assert.ok(result.count);
    });
    after(() => {
        db1.$pool.end();
    });
}).timeout(5000)