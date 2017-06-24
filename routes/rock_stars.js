const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

/* GET stars listing. */
router.get('/', rockStarsIndex)
router.post('/', rockStarsPost)
router.get('/:id', rockStarsShow)

function rockStarsIndex(req, res, next) {
  return query.findAll('rock_stars', res, next)
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

module.exports = router;
