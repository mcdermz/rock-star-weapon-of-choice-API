const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

router.post('/', starWeaponPost)

function starWeaponPost(req, res, next) {
  const {
    rock_stars_id,
    weapons_id,
    make,
    model,
    weaponImg,
    name,
    rockstarImg
  } = req.body

  if (rock_stars_id || weapons_id) {
    if (!rock_stars_id && name) {
      query.postEntity('rock_stars', { name, image: rockstarImg }, next)
      .then(id => {
        query.postEntity('star_weapon', { rock_stars_id: id[0], weapons_id }, next)
        .then(final => {
          res.send(final)
        })
      })
    }
    else if (!weapons_id && make && model) {
      query.postEntity('weapons', { make, model, image: weaponImg }, next)
      .then(id => {
        query.postEntity('star_weapon', { rock_stars_id, weapons_id: id[0] }, next)
        .then(final => {
          res.send(final)
        })
      })
    }
    else {
      query.postEntity('star_weapon', { rock_stars_id, weapons_id }, next)
      .then(final => {
        res.send(final)
      })
    }
  }
  else if (make && model && name){
    return Promise.all([
      query.postEntity('rock_stars', { name }, next),
      query.postEntity('weapons', { make, model }, next)
    ])
    .then(response => {
      const rock_stars_id = response[0][0]
      const weapons_id = response[1][0]

      query.postEntity('star_weapon', { rock_stars_id, weapons_id }, next)
      .then(final => {
        res.send(final)
      })
    })
  } else {
    res.send('you did it wrong!')
  }
}

module.exports = router
