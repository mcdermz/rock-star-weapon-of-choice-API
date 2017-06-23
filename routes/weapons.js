const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

/* GET weapons listing. */
router.get('/', weaponsIndex)
router.get('/:id', weaponsShow)

function weaponsIndex(req, res, next) {
  res.send('the many axes of destiny!')
}

function weaponsShow(req, res, next) {
  res.send('the ONLY axe of destiny')
}

module.exports = router
