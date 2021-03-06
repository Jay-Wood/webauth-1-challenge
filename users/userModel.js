const db = require("../database/dbConfig.js");

module.exports = {
    getUsers,
    findById,
    add,
    findBy
}

function getUsers() {
    return db("users")
}

function add(user) {
    return db("users")
        .insert(user)
        .then(id => {
            return(findById(id))
        });
}

function findById(id) {
    return db("users")
        .where("id", id)
        .first();
}

function findBy(filter) {
    return db("users").where(filter)
}