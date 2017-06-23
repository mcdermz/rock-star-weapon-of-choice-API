
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('weapons').del()
    .then(() => {
      // Inserts seed entries
      return knex('weapons').insert([
        {id: 1, make: 'Gibson', model: 'Les Paul', image: 'http://images.gibson.com.s3.amazonaws.com/Products/Electric-Guitars/2015/Les-Paul-Standard/LPS15H3CH1_MAIN_HERO_01.jpg'},
        {id: 2, make: 'Fender', model: 'Stratocaster', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mbwkZ8kJuJYq-P3AvSjMvm29e4OBUiTNzUHdkzNEt_JOsrKsgA'},
        {id: 3, make: 'EVH', model: 'Frankenstrat', image: 'http://www.theguitarlearner.com/wp-content/uploads/2013/10/FenderFrankenstrat-Big.jpg'},
        {id: 4, make: 'Martin', model: 'D-28', image: 'http://www.dreamguitars.com/products/martin/martin_d-28_243764/images/full.jpg'}
      ]);
    })
    .then(() =>{
      return knex.raw(
        "SELECT setval('weapons_id_seq', (SELECT MAX(id) FROM weapons));"
      )
    })
};
