const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')

router.post('/', starWeaponPost)

function starWeaponPost(req, res, next) {
  const { star_id, weapon_id } = req.body

  db('star_weapon').insert({ star_id, weapon_id  }, 'id')
  .then(response => {
    res.send(response)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = router
