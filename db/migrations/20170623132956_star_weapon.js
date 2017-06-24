
exports.up = function(knex, Promise) {
  return knex.schema.createTable('star_weapon', (table) => {
    table.increments()
    table.integer('rock_stars_id').notNullable()
    table.integer('weapons_id').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('star_weapon')
};
