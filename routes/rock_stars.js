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

  db('rock_stars').where({ id })
  .then(response => {
    const rockStar = response[0]
    res.json(rockStar)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = router;
