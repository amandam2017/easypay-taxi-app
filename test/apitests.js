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
const db = pgp(config);
// const db = pgp(DATABASE_URL);
API(app, db);
describe('The EASY_PAY_TAXI API TESTS', function () {
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
                destination: "Cape Town"
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
                firstname: 'zena',
                card_number: '12334 2345 6543',
                exp_month : 'July',
                exp_year: '2023',
                cvv: '234'
            });
        //const users = response.body.data;
        const paythis= response.body.message;
        assert.deepStrictEqual('payment made', paythis);
    });
    // added tests 15 August
    // it('should be able to allow a driver to make a trip', async () => {
    //     const response = await supertest(app)
    //         .post('/api/trips')
    //         .send({
    //             route_id: '1',
    //              taxi_id:'1',
    //              passenger_count:'15',
    //              taxi_price:25,
    //              total_fare:'350'
    //         });
    //     //const this_trip = response.body.data;
    //     const this_trip= response.body.message;
    //     assert.deepStrictEqual('trip is taken', this_trip);
    // });
    // it('should be able to allow a taxi owner to register his taxis', async () => {
    //     const response = await supertest(app)
    //         .post(`/api/registeredtaxis`)
    //         .send({
    //             reg_number:'CY 101010',
    //              qty: '15',
    //              owner_id: '3',
    //         });
    //     const registered = response.body.data;
    //     assert.deepStrictEqual({
          
    //     "reg_number": "CY 101010",
    //       "qty": 15,
    //       "owner_id": 3
    //     }, registered);
    // });
    // it('should be able to link driver to a taxi', async () => {
    //     const response = await supertest(app)
    //         .post(`/api/linkdrivers`)
    //         .send({
    //             user_id:'4',
    //              taxi_id:'1'
    //         });
    //     const linkdrivers= response.body.message;
    //     assert.deepStrictEqual('Allocated taxi to driver :-)', linkdrivers);
    // });
    after(() => {
        db.$pool.end();
    });
}).timeout(5000)