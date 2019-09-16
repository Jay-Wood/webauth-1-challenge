const express = require("express");
//import Routers
const server = express();
const userRouter = require("../users/userRouter.js");

server.use(express.json());
server.use("/api", userRouter)
//add Routers


server.get("/", (req, res) => {
    res.send("Server is running, yo!")
});

module.exports = server;