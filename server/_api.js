const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { default: Routes } = require('../client/routes');
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
            const taxi_id = await db.oneOrNone(`select taxi_id from routes WHERE departure = $1 AND destination = $2`, [departure, destination])

            
            res.json({
                data: destination_taxis, price, taxi_id
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

    // *****************15/08/22*********************
    app.post(`/api/trips`, async (req, res)=>{
        
        try {
            const { route_id, taxi_id, passenger_count, taxi_price, total_fare} = req.body;
            const this_trip  = await db.oneOrNone('insert into taxi_trips (route_id, taxi_id, passenger_count, taxi_price, total_fare) values($1,$2,$3,$4,$5) returning *',[route_id, taxi_id,passenger_count,taxi_price,total_fare]);
            // console.log(this_trip);

            res.status(200)
            .json({
                message:'trip is taken',
                data:this_trip
            })
            
        } catch (error) {
            res.status(500)
            .json({
                message: error.message
            })
        }
           
    })

    app.post(`/api/registeredtaxis`, async (req, res)=>{

        const {reg_number, qty, owner_id} = req.body
        const registered = await db.oneOrNone('insert into taxi_data (reg_number, qty, owner_id) values($1,$2,$3) returning *',[reg_number,qty,owner_id]);
        // console.log(registered);
        res.json({
            data:registered
        })

    })

    app.post(`/api/linkdrivers`, async (req, res)=>{
        
        try {
            const { user_id, taxi_id } = req.body;
            const sql = 'insert into drivers (user_id, taxi_id) values($1, $2)';
            await db.none(sql, [user_id, taxi_id]);
            res.status(200)
            .json({
                message: 'Allocated taxi to driver :-)'
            })
            
        } catch (error) {
            res.status(500)
            .json({
                message: error.message
            })
        }
        
    })

    app.post(`/api/board`, async(req, res)=>{
        try {
            const { user_id, taxi_code} = req.body;


        // const bording_status = await db.oneOrNone(`select user_ id`)
            
        } catch (error) {
            
        }
    })

    const getPassengersByID = async (id) => await
            db.oneOrNone(`select * from users
            where role = 'Passenger' and id = $1`,[id]);
            
            // const getPassengersByID = async (id) => await
            // db.oneOrNone(`select * from taxi_trips_payment
            // join users on taxi_trips_payment.user_id = users.id where role = 'Passenger' and id = $1`, [id])
            

    app.post(`/api/trip_payment/:id`, async (req, res)=>{
        
        try {
        const {id} = req.params
        const passenger = await getPassengersByID(id)
        console.log(passenger);
            const { user_id, amount, taxi_trips_id} = req.body;

            console.log(amount);
            
            await db.none(`insert into taxi_trips_payment (user_id, amount, taxi_trips_id, status) values($1,$2,$3,'paid')`,[user_id, amount, taxi_trips_id])
            // const {passenger_payment} = (`select * from taxi_trips_payment where user_id = $1`,[id]);
            // console.log(passenger_payment);

            res.json({
                message: 'paid'
                // data: passenger_payment
            })
        } catch (error) {
            res.status(500)
            .json({
                message: error.message
            })
        }
        
    })
   
    const getTaxiOwnerById = async (id) =>  {
        const user = await db.oneOrNone(`select * from users where role = 'Owner' AND id = $1`, [id]);
        return user;
    }

    const getUserById = async (id) =>  {
        const user = await db.oneOrNone(`select * from users where id = $1`, [id]);
        return user;
    }

    
    const getDriversByTaxiId = async (id) => await
        db.oneOrNone(`select * from drivers 
            join users on drivers.user_id = users.id 
            JOIN taxi_data on drivers.taxi_id = taxi_data.id
            where taxi_id = $1`, [id])

            const getDriversByUserId = async (id) => await
            db.oneOrNone(`select * from drivers 
            join users on drivers.user_id = users.id 
            JOIN taxi_data on drivers.taxi_id = taxi_data.id
            where user_id = $1`, [id])

    // const getDriversByTaxiId = async (id) => await db.oneOrNone('select * from drivers join users on drivers.user_id = users.id where taxi_id = $1', [id])
        

    const getTaxisByOwnerId = async (id) =>  {
        const taxis = await db.manyOrNone(`select * from taxi_data where owner_id = $1`, [id]);
        return taxis; 
    }

    const getDriversByOwnerId = async (id) =>  {
        const taxis = await getTaxisByOwnerId(id);
        if(!taxis){
            return []
        }
        const driversResults = taxis.map(async (taxi) => {
            const driver = await getDriversByTaxiId(taxi.id);

            
            return {
                ...driver,
                taxi
            }
        });
        
        const drivers = await Promise.all(driversResults);
        // console.log(drivers);
        return drivers;
    }
    
    app.get('/api/owner/:id', async (req, res) => {

        const { id } = req.params; // user id

        // list of taxis and drivers connected to driver
        const owner = await getTaxiOwnerById(id);
        const taxis = await getTaxisByOwnerId(id);
        const drivers = await getDriversByOwnerId(id)


        res.status(200)
            .json({
                data: owner,taxis,drivers
               
            })

    })

    // ------------
    app.post('/api/driver', async (req, res)=> {
        try {
            const { no_of_cashpaid_passenger } = req.body
            const { departure, destination } = req.body;
            const trips = await db.manyOrNone(`select price,taxi_id from routes WHERE departure = $1 AND destination = $2`, [departure, destination])
            const price = await db.oneOrNone(`select price from routes WHERE departure = $1 AND destination = $2`, [departure, destination])
            // console.log('money ' + price);
            res.json({
                status: 'success',
                data: price,trips
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    })
    
    // trying to get passengers by id
    const passenger = async(id)=>{
        const passenger_reciept = await db.manyOrNone('select * from taxi_trips where taxi_id = $1', [id])
        return passenger_reciept
    }
    
    app.get('/api/payment_reciept/:id', async (req, res)=>{
        const { id } = req.params
        const reciept = await passenger(id)

        res.status(200)
            .json({
                data: reciept
               
            })
        
    })


app.post('/api/card_payments', async function (req, res) {
    
    const { firstname, card_number, exp_month, exp_year, cvv} = req.body;
    try {
    const record_payment = await db.none('insert into card_payment(firstname,card_number ,exp_month,exp_year, cvv) values ($1,$2,$3,$4,$5)', [firstname, card_number, exp_month, exp_year, cvv]);
    console.log(record_payment);
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

     // -----------------THIS----------------

    app.get('/api/driver/:id', async (req, res) => {
        const { id } = req.params
        const drivers = await (id)
        const route = await db.oneOrNone('select * from routes where taxi_id = $1', [drivers.taxi_id])
        console.log(route);
        // console.log(drivers);
        drivers.route_id = route.id
        drivers.route = route

        res.json({
            data: drivers
        })
    })

    // --------------END----------------

    // *****************16/08/22*****************
    app.get('/api/drivertrip/:id', async (req, res)=>{
        const {id} = req.params
        // const drivers = await getDriversByTaxiId(id)
        // console.log(drivers);
        const amount_per_trip = await db.manyOrNone(`select * from taxi_trips where taxi_id = $1`,[id]);
        // console.log(amount_per_trip);

        res.json({
            driversTrips: amount_per_trip
        })
    })

    
    app.delete('/api/delete/:id', async(req, res)=>{
        try {
            const {id} = req.params
        // const drivers = await getDriversByTaxiId(id)

        await db.one(`delete from taxi_data where id = $1`, [id])

        res.json({
            status: success,
            message: 'removed taxi'
        })
            
        } catch (err) {
            res.json({
                status: 'success',
                error : err.stack
            })
            
        }
    })

    // app.delete('/api/removetaxi/:id', async function (req, res) {

	// 	try {
	// 		const { id } = req.params;
    //         const drivers = await getDriversByTaxiId(id)

	// 		db.one('delete from taxi_data where reg_number = $1', [drivers.id])

	// 		res.json({
	// 			status: 'success'
	// 		})
	// 	} catch (err) {
	// 		res.json({
	// 			status: 'success',
	// 			error : err.stack
	// 		})
	// 	}
	// });
    // ENDS HERE

    // Chifhi's api for ratings
    // RATING FOR A DRIVER
    app.post(`/api/ratings`, async (req, res) => {
        try {
            const { rating, comments, drivers_id } = req.body;
            await db.none (`insert into reviews(rating,comments ,drivers_id) values ($1, $2,$3) returning *`,[rating, comments, drivers_id]);
            const reviews = await db.manyOrNone(`select * from reviews`)
            console.log(reviews);
            // const seeReviews = await db.oneOrNone('select * from reviews where rating =$1 ,comments=$2,drivers_id=$3', [rating, comments, drivers_id])
            // if (seeReviews == null) {
            //     await db.none(reviews, [rating, comments, drivers_id]);
            // }
            // else {
            //     res.json({
            //         message: 'User already exist please login with the username and password',
            //         status: 401
            //     })}
            res.json({
                status: 'success',
                data: reviews
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.get('/api/getAllRatings', async function (req, res) {
        const rates = await db.manyOrNone(`select * from reviews`);
        if (!rates) {
            res.json({
                message: 'there is no rates',
                status: 401
            })
        } else {
            res.json({
                data: rates,
                message: `there are ${rates.length} available`
            });
        }
    });

    app.post(`/api/route_que`, async (req, res)=>{
        
    try {
        const { status } = req.body;
        console.log(status);

        // const {default_taxi_status} = await db.oneOrNone(`insert into taxi trips (status) values($1)`,[status])
        
        const {default_taxi_status} = await db.none(`UPDATE taxi_trips SET status = $1 WHERE taxi_id = taxi_id`,[status])
        const view_taxi_status = await db.manyOrNone(`select * from taxi_trips`)
        console.log(view_taxi_status);

        res.json({
            message: 'Joined que'
        })
    } catch (error) {
        res.status(500)
        .json({
            message: error.message
        })
    }
    
})


}
module.exports = api;