const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

/* GET users listing. */
router.get('/', rockStarsIndex)
router.get('/:id', rockStarsShow)

function rockStarsIndex(req, res, next) {
  db('rock_stars')
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    res.send(err)
  })
}

function rockStarsShow(req, res, next) {
  const id = req.params.id

  db('rock_stars').where({ id })
  .then(response => {
    res.json(response)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = router;
