const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

/* GET weapons listing. */
router.get('/', weaponsIndex)
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

  db.raw(`select weapons.make, weapons.model, json_agg((rock_stars.name, rock_stars.image)) as stars from rock_stars inner join star_weapon on rock_stars.id = star_weapon.star_id inner join weapons on weapon_id = weapons.id where weapons.id = ${id} group by weapons.id;`)
  .then(response => {
    res.json(response.rows[0])
  })
  .catch(err => {
    next(err)
  })
}

module.exports = router
