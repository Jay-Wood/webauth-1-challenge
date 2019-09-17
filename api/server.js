const express = require("express");
const server = express();
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const userRouter = require("../users/userRouter.js");
const dbConfig = require("../database/dbConfig.js");

const sessionConfig = {
    name: "orion", //default is "sid," but do not use for security reasons
    secret: process.env.SESSION_SECRET || "super secret, yo!",
    cookie: {
        maxAge: 1000 * 60 * 120, //time in milliseconds
        secure: false, //true === only send cookie over https; we want this in production, so use process.env...
        httpOnly: true, //if true, JS cannot access the cookie (always set to true)
    },
    resave: false, 
    saveUninitialized: true, //true for GDPR compliance; we can't auto-set cookies
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 30 //clean out expired session data (in milliseconds)
    })
}

server.use(session(sessionConfig));
server.use(express.json());

server.use("/api", userRouter);


server.get("/", (req, res) => {
    res.send("Server is running, yo!")
});

server.get("/logout", (req, res) => {
    const username = req.session.user.username
    if(req.session){
        console.log("req.session: ", req.session)
        req.session.destroy(error => {
            if(error) {
               res.status(500).json({ message: `Error logging out: ${error}` })
            }  else {
                res.status(200).json({ message: `So long, ${username}!`})
            }
        })
    } else {
        res.status(200).json({ message: "Already logged out." })
    }

})

module.exports = server;