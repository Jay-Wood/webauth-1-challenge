const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const session = require("express-session");

const Users = require("./userModel.js");
const validator = require("../auth/restrictedMidWare.js");

// console.log("v", validator)
//add validateUser, 
router.get("/users", validator, (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
})

router.post("/register", (req, res) => {
    let { username, password } = req.body
    let hashedPword = bcrypt.hashSync(password, 12)

    Users.add({username, password: hashedPword})
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                console.log(req.session.user)
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${username}!` })
            } 
            else {
                res.status(401).json({ message: "Invalid credentials" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Could not login: ${err}` })
        })
})

//Validation Middleware:
function validateUser(req, res, next) {
    const { username, password } = req.headers;
    
    if(username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    next()
                } else {
                    res.status(401).json({message: "Invalid credentials."})
                }
            })
    } else {
        res.status(400).json({ message: "No creds provided." })
    }
}

module.exports = router;