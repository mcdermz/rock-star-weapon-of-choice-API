
exports.up = function(knex, Promise) {
  return knex.schema.createTable('weapons', (table) => {
    table.increments()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.text('image')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('weapons')
};
