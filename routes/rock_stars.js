const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

/* GET stars listing. */
router.get('/', rockStarsIndex)
router.post('/', rockStarsPost)
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

  db.raw(`SELECT rock_stars.name, rock_stars.image, JSON_AGG(weapons) AS weapons FROM weapons INNER JOIN star_weapon ON weapons.id = star_weapon.weapon_id INNER JOIN rock_stars ON star_id = rock_stars.id WHERE rock_stars.id = ${id} GROUP BY rock_stars.id;`)
  .then(response => {
    (response.rowCount > 0) ?
      res.json(response.rows[0]) :
      res.send('No Rock Star with that ID exists!')
  })
  .catch(err => {
    next(err)
  })
}

function rockStarsPost(req, res, next){
  const { name, image } = req.body
  db('rock_stars').insert({ name, image }, 'id')
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    next(err)
  })
}
//select rock_stars.name, rock_stars.image, json_agg(weapons) as weapons from weapons inner join star_weapon on weapons.id = star_weapon.weapon_id inner join rock_stars on star_id = rock_stars.id where rock_stars.id = 1 group by rock_stars.id;

module.exports = router;
