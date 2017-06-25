const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

/* GET weapons listing. */
router.get('/', weaponsIndex)
router.get('/:id', weaponsShow)
router.put('/:id', weaponsEdit)

function weaponsIndex(req, res, next) {
  return query.findAll('weapons', res, next)
}

function weaponsShow(req, res, next) {
  const id = req.params.id

  return query.findById('weapons', id, res, next)
}

function weaponsEdit(req, res, next) {
  const entity = 'weapons'
  const id = req.params.id
  const { make, model, image } = req.body
  const dataObj = { make, model, image, id }

  if (make || model || image) {
    return query.editEntity(entity, dataObj, res, next)
  } else {
    const err = {
      status: 400,
      message: 'BAD REQUEST: You need to include a "make", a "model" and/or an "image" parameter to update this entity.'
    }
    next(err)
  }
}

module.exports = router
