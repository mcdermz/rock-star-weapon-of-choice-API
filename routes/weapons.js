const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

/* GET weapons listing. */
router.get('/', weaponsIndex)
router.post('/', weaponsPost)
router.get('/:id', weaponsShow)

function weaponsIndex(req, res, next) {
  db('weapons')
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    next(err)
  })
}

function weaponsShow(req, res, next) {
  const id = req.params.id

  db.raw(`SELECT weapons.make, weapons.model, weapons.image, JSON_AGG(rock_stars) AS rock_stars FROM rock_stars INNER JOIN star_weapon ON rock_stars.id = star_weapon.star_id INNER JOIN weapons ON weapon_id = weapons.id WHERE weapons.id = ${id} GROUP BY weapons.id;`)
  .then(response => {
    (response.rowCount > 0) ?
      res.json(response.rows[0]) :
      res.send('No weapon with that ID exists!')
  })
  .catch(err => {
    next(err)
  })
}

function weaponsPost(req, res, next){
  const { make, model, image } = req.body
  db('weapons').insert({ make, model, image }, 'id')
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = router
