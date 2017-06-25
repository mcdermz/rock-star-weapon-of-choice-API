const db = require('../db/knex.js')

function findAll(entity, res, next) {
  db(entity)
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    next(err)
  })
}

function findById(entity1, id, res, next) {
  console.log(id);
  const entitySelect = (entity1 === 'rock_stars') ?
    `${entity1}.name, ${entity1}.image` :
    `${entity1}.make, ${entity1}.model, ${entity1}.image`
  const entity2 = (entity1 === 'rock_stars') ? 'weapons' : 'rock_stars'
  const errorSubject = (entity1 === 'rock_stars') ? 'Rock Star' : 'Weapon'

  db.raw(`
  SELECT ${entity1}.id, ${entitySelect}, JSON_AGG(${entity2}) AS ${entity2}
  FROM ${entity2}
  INNER JOIN star_weapon ON ${entity2}.id = star_weapon.${entity2}_id
  INNER JOIN ${entity1} ON ${entity1}_id = ${entity1}.id
  WHERE ${entity1}.id = ${id}
  GROUP BY ${entity1}.id;`)
  .then(response => {
    (response.rowCount > 0) ?
      res.json(response.rows[0]) :
      res.send(`Either no ${errorSubject} with that ID exists, or it does not have any associations!`)
  })
  .catch(err => {
    next(err)
  })
}

function postEntity(entity, dataObj, next) {
  return db(entity).insert(dataObj, 'id')
  .then(response => {
    return response
  })
  .catch(err => {
    next(err)
  })
}

function editEntity(entity, dataObj, res, next) {
  const {id, image, name, make, model} = dataObj
  const entityObj = {
    'rock_stars': {image, name},
    'weapons': {image, make, model}
  }

  db(entity).where('id', id)
  .update(entityObj[entity], 'id')
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = { findAll, findById, postEntity, editEntity }
