const express = require("express");

const server = express();

server.use(express.json());

const port = process.env.POT || 5150;

server.get("/", (req, res) => {
    res.send("Server is running, yo!")
});

server.listen(port, () => {
    console.log(`**Server running on port ${port}**`)
})