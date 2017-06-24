const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

router.post('/', starWeaponPost)

function starWeaponPost(req, res, next) {
  const { rock_stars_id, weapons_id } = req.body

  db('star_weapon').insert({ rock_stars_id, weapons_id  }, 'id')
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = router
