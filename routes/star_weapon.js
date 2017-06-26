const express = require('express')
const router = express.Router()
const db = require('../db/knex.js')
const query = require('./queries.js')

router.post('/', starWeaponPost)

function starWeaponPost(req, res, next) {
  const postErr = { status: 400, message: 'You have not made a valid POST request. There are four acceptable data packages to post to this API:\n1) Include a valid "rock_stars_id" and "weapons_id".\n2) Include a valid "rock_stars_id" and data for a new instrument with "make" and "model" information.\n3) Include a valid "weapons_id" and data for a new musician with "name" information.\n4) Include "make" and "model" information for a new instrument AND "name" information for a new musician.\n\nImage data is optional but can be included with "weaponImg" and "rockstarImg", respectively.'}

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
        query.postEntity('star_weapon', { rock_stars_id: id[0], weapons_id }, next).then(final => { res.send(final) })
      })
    }
    else if (!weapons_id && make && model) {
      query.postEntity('weapons', { make, model, image: weaponImg }, next)
      .then(id => {
        query.postEntity('star_weapon', { rock_stars_id, weapons_id: id[0] }, next).then(final => { res.send(final) })
      })
    }
    else if (rock_stars_id && weapons_id){
      query.postEntity('star_weapon', { rock_stars_id, weapons_id }, next)
      .then(final => { res.send(final) })
    }
    else {
      next(postErr)
    }
  }
  else if (make && model && name){
    return Promise.all([
      query.postEntity('rock_stars', { name, image: rockstarImg }, next),
      query.postEntity('weapons', { make, model, image: weaponImg }, next)
    ])
    .then(response => {
      const rock_stars_id = response[0][0]
      const weapons_id = response[1][0]

      query.postEntity('star_weapon', { rock_stars_id, weapons_id }, next)
      .then(final => { res.send(final) })
    })
  }
  else {
    next(postErr)
  }
}

module.exports = router
