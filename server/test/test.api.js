const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const API = require('../api');
const { default: axios } = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://amanda:@262632@localhost:5432/',
	// max: 30,
	//ssl:{ rejectUnauthorized : false}
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
		const commandText = fs.readFileSync('./sql/data.sql', 'utf-8');
		 await db.none(commandText)
	});


	it('should have a test method', async () => {

		const response = await supertest(app)
			.get('/api/test')
			.expect(200);

		assert.deepStrictEqual({ name: 'tshifhiwa' }, response.body);

	});

	// it('should be able to find all users', async () => {
	// 	const response = await supertest(app)
	// 		.get('/api/users')
	// 		.expect(200);

	// 	const users = response.body.data;
	// 	assert.equal(5, users.length);

	// });
     it('should be able to signup a user', async () => {
		const response = await supertest(app)
			.post('/api/signup')
			.send({name:'tshifhiwa',
     surname:'matombo',
      username:'tshifhiwa', password:'@1234', role:'passenger'});

	 	const signup = response.body.data;
	 	assert.deepStrictEqual('user is signed in' ,signup);

	 });
	
	
	// it('should be able to find a user that is logged in by username and password', async () => {
	// 	// change the code statement below

	// 	const response = await supertest(app)
	// 		.get('/api/login?username={$username}&hashedpassword={$hashedpassword}')
	// 		.expect(200);

	// 	const user = response.body.data;
	// 	assert.equal(1, user);

	// });

	after(() => {
		db.$pool.end();
	});
});