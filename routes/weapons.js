const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

/* GET weapons listing. */
router.get('/', weaponsIndex)
router.post('/', weaponsPost)
router.get('/:id', weaponsShow)

function weaponsIndex(req, res, next) {
  return query.findAll('weapons', res, next)
}

function weaponsShow(req, res, next) {
  const id = req.params.id

  return query.findById('weapons', id, res, next)
}

function weaponsPost(req, res, next){
  const { make, model, image } = req.body

  return query.postEntity('weapons', { make, model, image }, res, next)
}

module.exports = router
