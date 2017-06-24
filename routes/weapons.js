const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

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
  const entity = 'weapons'
  const id = req.params.id
  return query.findById(entity, id, res, next)
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
