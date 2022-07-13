const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const api = (app, db) => {
    app.post('/api/signup', async function(req, res){

    const {name, surname, username, password, role} = req.body
    const user = await db.oneOrNone('select * from users where username = $1', [username])
    if(user !== null){
        res.json({
            message: 'User already exist please login with the username and password',
            status: 401
        })
    }else{
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
        
    // }
})

}

module.exports = api;