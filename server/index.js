const PgPromise = require("pg-promise");
const express = require('express');
const fs = require('fs');
require('dotenv').config();

const pg = require("pg");
const Pool = pg.Pool;

const API = require('./api');
const axios  = require("axios");

const app = express();

// THE CORES ARE ADDED FOR HEROKU AND THEY ARE USED ON ALL MY ROUTES
const cors = require('cors');
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "https://amandam2017.github.io/easypay-taxi-app/");
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
  });

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
// cores code ends here

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});

const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://amanda:@262632@localhost:5432/easy_pay_taxi ',
	ssl:{ rejectUnauthorized : false}
 };
 console.log(DATABASE_URL);
 
 const db = pgp(config);

API(app, db);

const PORT = process.env.PORT || 2000;

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});