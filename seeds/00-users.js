
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Bob', password: "password1"},
        {id: 2, username: 'Dick', password: "password2"},
        {id: 3, username: 'Harry', password: "password3"}
      ]);
    });
};
