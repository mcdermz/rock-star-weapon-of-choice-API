const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

/* GET stars listing. */
router.get('/', rockStarsIndex)
router.get('/:id', rockStarsShow)
router.put('/:id', rockStarsEdit)

function rockStarsIndex(req, res, next) {
  return query.findAll('rock_stars', res, next)
}

function rockStarsShow(req, res, next) {
  const entity = 'rock_stars'
  const id = req.params.id

  return query.findById(entity, id, res, next)
}

function rockStarsEdit(req, res, next) {
  const entity = 'rock_stars'
  const id = req.params.id
  const { name, image } = req.body
  const dataObj = { name, image, id }

  if (name || image) {
    return query.editEntity(entity, dataObj, res, next)
  } else {
    const err = {
      status: 400,
      message: 'BAD REQUEST: You need to include a "name" and/or an "image" parameter to update this entity.'
    }
    next(err)
  }
}

module.exports = router;
