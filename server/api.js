const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const taxis = require('./taxi_data');

// console.log(taxis);

const api = (app, db) => {

    app.get('/api/users', async function (req, res) {

        let users = [];
        users = await db.many('select * from users');
        res.json(
            { data: users }
        )
    });
    app.post('/api/signup', async function (req, res) {

        try {
            const { name, surname, username, password, role } = req.body
            const user = await db.oneOrNone('select * from users where username = $1', [username])
            if (user !== null) {
                res.json({
                    message: 'User already exist please login with the username and password',
                    status: 401
                })
            } else {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(password, salt, async function (err, hash) {
                        await db.none('insert into users (name, surname, username, password, role) values ($1, $2, $3, $4, $5)', [name, surname, username, hash, role]);
                    })

                });

                res.json({
                    message: 'user registered',
                    data: user
                })
            }

        } catch (error) {
            console.log(error);

        }

    });
    app.post('/api/login', async function (req, res, next) {

        try {
            const { username, password } = req.body;
            console.log(username, password);
            const theUser = await db.oneOrNone(`select * from users where username = $1`, [username]);
            console.log(theUser)
            if (theUser == null) {
                res.json({
                    message: 'User does not exist',
                    status: 401
                })
            }
            const decrypt = bcrypt.compare(password, theUser.password)
            if (!decrypt) {
                return Error('wrong password')

            }

            const token = jwt.sign({
                username: theUser.username
            }, process.env.SECRET_TOKEN);
            res.json({
                data: theUser, token,
                message: `${username} is logged in`
            });

        } catch (error) {
            console.log(error);
        }

    });

    app.post('/api/taxis', async function (req, res) {
        try {
            const {user_destination, user_departure} = req.body;
            // console.log(user_destination);

            const destination_taxis = taxis.filter(taxi => {
                // console.log(taxis);
                return taxi.destination === user_destination && taxi.departure === user_departure

            });
            console.log(req.body);
            console.log(destination_taxis);
            res.json({
                data: destination_taxis
            });

        } catch (error) {
            console.log(error);

        }
    });
}

module.exports = api;