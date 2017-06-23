
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rock_stars', (table) => {
    table.increments()
    table.string('name').notNullable()
    table.text('image')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rock_stars')
};
