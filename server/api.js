const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const taxis = require('./taxi_data');
const api = (app, db) => {
    const getUsers = async () => await db.manyOrNone('select * from users')
    app.get('/api/test', function (req, res) {
        res.json({
            name: 'tshifhiwa'
        });
    });
    app.get('/api/users', async function (req, res) {
        let users = [];
        users = await db.manyOrNone('select * from users');
        res.json(
            { data: users }
        )
    });
    app.post('/api/signup', async function (req, res) {
        try {
            const { name, surname, username, password, role } = req.body
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt)
            const user = await db.oneOrNone('select * from users where username = $1', [username])
            // await db.oneOrNone(`update users set role='driver' where username = $1`, [username])
            if (user == null) {
                await db.none('insert into users (name, surname, username, password, role) values ($1, $2, $3, $4, $5)', [name, surname, username, hash, role]);
                res.json({
                    message: 'user successfully registered',
                    // data: user
                })
            }
            else {
                res.json({
                    message: 'User already exist please login with the username and password',
                    status: 401
                })
            }
        } catch (error) {
            console.log(error);
        }
    });

    const authanticateToken = (req, res, next) => {
        // inside this function we want to get the token that is generated/sent to us and to verify if this is the correct user.
        const authHeader = req.headers['authorization']
        // console.log({authHeader});
        const token = authHeader && authHeader.split(" ")[1]
        // if theres no token tell me
        if (token === null) return res.sendStatus(401)
        // if there is then verify if its the correct user using id if not return the error
        jwt.verify(token, process.env.SECRET_TOKEN, (err, username) => {
            // console.log(err);
            if (err) return res.sendStatus(403)
            console.log('show error' + err);

            req.username = username
            console.log(username);
            next()
        })

    }

    app.post('/api/login', async function (req, res, next) {
        try {
            const { username, password } = req.body;
            const theUser = await db.oneOrNone(`select * from users where username = $1`, [username]);

            if (theUser == null) {
                res.json({
                    message: 'User does not exist please sign up below',
                    status: 401
                })
            }
            if (theUser !== null) {
                const decrypt = bcrypt.compare(password, theUser.password)
                if (!decrypt) {
                    res.json({
                        message: 'Wrong password',
                        status: 402
                    })
                } else {
                    const token = jwt.sign({
                        username: theUser.username
                    }, process.env.SECRET_TOKEN);
                    res.json({
                        data: theUser, token,
                        role: theUser.role,
                        message: `${username}`
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    });


    app.post('/api/taxis', async function (req, res) {
        try {
            const { departure, destination } = req.body;

            const taxis = await db.manyOrNone(`select * from routes`);

            const destination_taxis = taxis.filter(taxi => {
                return taxi.departure === departure && taxi.destination === destination
            });
            const price = await db.oneOrNone(`select price from routes WHERE departure = $1 AND destination = $2`, [departure, destination])
            res.json({
                data: destination_taxis, price
            });
        } catch (error) {
            console.log(error);
        }
    });
    app.get('/api/routes', async function (req, res) {

        const routes = await db.manyOrNone(`select * from routes`);

        if (!routes) {
            res.json({
                message: 'No routes for that destination',
                status: 401
            })
        } else {
            res.json({
                data: routes,
                message: `there are ${routes.length} available routes`
            });
        }
    });
    // app.get('/api/routes/:id', async function (req, res) {

    //     const {departure, destination, price} = req.params;

    //     const selectedRoute = await db.manyOrNone(`select departure,destination from routes`, [id]);

    //      {
    //         res.json({
    //            data: selectedRoute,
    //         });
    //     }
    // });
    app.post('/api/owner', async function (req, res) {
        try {
            const { reg_number, qty, owner_id } = req.body;
            await db.none('insert into taxi_data( reg_number,qty,owner_id) values($1,$2,$3)', [reg_number, qty, owner_id]);
            res.json({
                status: 'success'
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.post('/api/driver', async function (req, res) {
        try {
            const { no_of_cashpaid_passenger } = req.body
            const { departure, destination } = req.body;
            const Routes = await db.manyOrNone(`select departure, destination from routes WHERE departure = $1 AND destination = $2`, [departure, destination])
            const TaxiData = await db.manyOrNone(`select reg_number, qty from taxi_data`)
            const trips = await db.manyOrNone(`select price,count, total_fare, trips_taken from routes WHERE departure = $1 AND destination = $2`, [departure, destination])
            const price = await db.oneOrNone(`select price from routes WHERE departure = $1 AND destination = $2`, [departure, destination])
            console.log('money ' + price);
            console.log('routes' + Routes);
            console.log('taxidata:' + TaxiData);
            res.json({
                status: 'success',
                data: Routes, TaxiData, price,trips
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });
    app.post('/api/card_payments', async function (req, res) {
        const { firstname, card_number, exp_month, exp_year, cvv } = req.body;
        try {
await db.none('insert into card_payment(firstname,card_number ,exp_month,exp_year, cvv) values ($1, $2,$3,$4,$5)', [firstname, card_number, exp_month, exp_year, cvv]);
 //const paycard = await db.manyOrNone(`select * from card_payment`);
            res.json({
                message: 'payment made',
                status: 'success',
                //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     data:paycard
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }


    });
}
module.exports = api;