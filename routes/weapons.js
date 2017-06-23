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

  db('weapons').where({ id })
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = router
