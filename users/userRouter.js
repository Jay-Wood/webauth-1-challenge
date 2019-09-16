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





//Validation Middleware:

function validateUser(req, res, next) {


}

module.exports = router;