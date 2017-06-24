
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('star_weapon').del()
    .then(function () {
      // Inserts seed entries
      return knex('star_weapon').insert([
        {id: 1, rock_stars_id: 1, weapons_id: 1},
        {id: 2, rock_stars_id: 1, weapons_id: 4},
        {id: 3, rock_stars_id: 2, weapons_id: 2},
        {id: 4, rock_stars_id: 3, weapons_id: 3},
        {id: 5, rock_stars_id: 4, weapons_id: 2}
      ]);
    })
    .then(() =>{
      return knex.raw(
        "SELECT setval('star_weapon_id_seq', (SELECT MAX(id) FROM star_weapon));"
      )
    })
};
