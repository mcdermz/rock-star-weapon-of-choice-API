
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('star_weapon').del()
    .then(function () {
      // Inserts seed entries
      return knex('star_weapon').insert([
        {id: 1, star_id: 1, weapon_id: 1},
        {id: 2, star_id: 1, weapon_id: 4},
        {id: 3, star_id: 2, weapon_id: 2},
        {id: 4, star_id: 3, weapon_id: 3},
        {id: 5, star_id: 4, weapon_id: 2}
      ]);
    })
    .then(() =>{
      return knex.raw(
        "SELECT setval('star_weapon_id_seq', (SELECT MAX(id) FROM star_weapon));"
      )
    })
};
