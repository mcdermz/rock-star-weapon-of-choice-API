const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

/* GET weapons listing. */
router.get('/', weaponsIndex)
router.get('/:id', weaponsShow)

function weaponsIndex(req, res, next) {
  return query.findAll('weapons', res, next)
}

function weaponsShow(req, res, next) {
  const id = req.params.id

  return query.findById('weapons', id, res, next)
}

module.exports = router
