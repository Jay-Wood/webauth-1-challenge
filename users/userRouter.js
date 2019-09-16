const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Users = require("./userModel.js");

//add validateUser, 
router.get("/users", (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
})

router.post("/register", (req, res) => {
    let { username, password } = req.body
    let hashedPword = bcrypt.hashSync(password, 12)

    Users.add({username, password: hashedPword})
        .then(user => [
            res.status(201).json(user)
        ])
        .catch(err => {
            res.status(500).json(err)
        })
})


router.post("/login", (req, res) => {
    let { username, password } = req.body;
    console.log("req.body", req.body )
    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${username}!` })
            } 
            else {
                res.status(401).json({ message: "Invalid credentials" })
            }

        })
        .catch(err => {
            res.status(500).json(error)
        })
})





//Validation Middleware:

function validateUser(req, res, next) {


}

module.exports = router;