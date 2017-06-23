
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rock_stars').del()
    .then(() => {
      // Inserts seed entries
      return knex('rock_stars').insert([
        {id: 1, name: 'Jimmy Page', image: 'http://www.stryder.de/pics/page_dragon2.jpg'},
        {id: 2, name: 'Stevie Ray Vaughan', image: 'http://thebluesmobile.com/wp-content/uploads/2014/07/stevierayvaughanfeatured.jpg'},
        {id: 3, name: 'Eddie Van Halen', image: 'http://ultimateclassicrock.com/files/2013/01/Eddie-Van-Halen.jpg'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('rock_stars_id_seq', (SELECT MAX(id) FROM rock_stars));"
      )
    })
};
