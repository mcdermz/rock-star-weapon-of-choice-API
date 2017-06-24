const db = require('../db/knex.js')

function findById(entity1, id, res, next){
  const entitySelect = (entity1 === 'rock_stars') ?
    `${entity1}.id, ${entity1}.name, ${entity1}.image` :
    `${entity1}.id, ${entity1}.make, ${entity1}.model, ${entity1}.image`
  const entity2 = (entity1 === 'rock_stars') ? 'weapons' : 'rock_stars'
  const errorSubject = (entity1 === 'rock_stars') ? 'Rock Star' : 'Weapon'

  db.raw(`SELECT ${entitySelect}, JSON_AGG(${entity2}) AS ${entity2} FROM ${entity2} INNER JOIN star_weapon ON ${entity2}.id = star_weapon.${entity2}_id INNER JOIN ${entity1} ON ${entity1}_id = ${entity1}.id WHERE ${entity1}.id = ${id} GROUP BY ${entity1}.id;`)
  .then(response => {
    (response.rowCount > 0) ?
      res.json(response.rows[0]) :
      res.send(`No ${errorSubject} with that ID exists!`)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = { findById }
