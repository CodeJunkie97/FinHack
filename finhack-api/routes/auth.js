const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require("../config/dbconfig")

//REGISTER
router.post("/register", (req, res) => {
    const {email, name, password} = req.body;
    console.log(password);
    const hash = bcrypt.hashSync(password, 10);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('Login')
        .returning('email')
        .then(loginEmail => {
            return trx('Users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err =>res.status(400).json('unable to register'))
})

//Login
router.post('/signin', (req, res) => {
    db.select('email', 'hash').from('Login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid){
            return db.select('*').from("Users")
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
            res.json()
        }else{
            res.status(400).json("wrong credentials")
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

module.exports = router;