const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

/* GET stars listing. */
router.get('/', rockStarsIndex)
router.get('/:id', rockStarsShow)

function rockStarsIndex(req, res, next) {
  db('rock_stars')
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    next(err)
  })
}

function rockStarsShow(req, res, next) {
  const id = req.params.id

  db.raw(`select rock_stars.name, json_agg((weapons.make, weapons.model)) as weapons from weapons inner join star_weapon on weapons.id = star_weapon.weapon_id inner join rock_stars on star_id = rock_stars.id where rock_stars.id = ${id} group by rock_stars.name;`)
  .then(response => {
    res.json(response.rows[0])
  })
  .catch(err => {
    next(err)
  })
}

module.exports = router;
