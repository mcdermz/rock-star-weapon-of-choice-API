
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rock_stars', (table) => {
    table.increments()
    table.string('name').unique().notNullable()
    table.text('image')
    table.boolean('isActive').defaultTo('true')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rock_stars')
};
