
exports.up = function(knex, Promise) {
  return knex.schema.createTable('star_weapon', (table) => {
    table.increments()
    table.integer('star_id').notNullable()
    table.integer('weapon_id').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('star_weapon')
};
