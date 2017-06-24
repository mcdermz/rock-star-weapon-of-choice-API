const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

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
  const entity = 'rock_stars'
  const id = req.params.id
  return query.findById(entity, id, res, next)
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
//select rock_stars.name, rock_stars.image, json_agg(weapons) as weapons from weapons inner join star_weapon on weapons.id = star_weapon.weapons_id inner join rock_stars on rock_stars_id = rock_stars.id where rock_stars.id = 1 group by rock_stars.id;

module.exports = router;
