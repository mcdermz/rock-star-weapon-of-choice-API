
exports.up = function(knex, Promise) {
  return knex.schema.createTable('weapons', (table) => {
    table.increments()
    table.string('make').notNullable()
    table.string('model').unique().notNullable()
    table.text('image')
    table.boolean('isActive').defaultTo('true')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('weapons')
};
