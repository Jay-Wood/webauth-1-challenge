const server = require("./api/server.js");

const port = process.env.POT || 5150;

server.listen(port, () => {
    console.log(`**Server running on port ${port}**`)
})


