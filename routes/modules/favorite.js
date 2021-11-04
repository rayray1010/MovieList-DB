const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../../models')
const Favorite = db.Favorite
router.get('/', async (req, res) => {
  const userId = req.user.id
  try {
    const movies = await Favorite.findAll({
      where: { userId },
      raw: true,
      nest: true,
    })
    let movieList = []
    for (let a of movies) {
      const movieId = Number(a.movieId)
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=5c37cf0fe463b92c7078fc96c24fe0ab&language=en-US`
      )
      await movieList.push(result.data)
    }

    res.render('favorite', { movieList })
  } catch (err) {
    console.log(err)
  }
})

router.post('/:id', async (req, res) => {
  const movieId = req.params.id
  const UserId = req.user.id
  try {
    const find = await Favorite.findOne({ where: { movieId, UserId } })
    if (find) {
      req.flash('warning_msg', '已加過此電影囉！')
      return res.redirect('/')
    }
    await Favorite.create({ movieId, UserId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  const movieId = req.params.id
  const UserId = req.user.id
  try {
    await Favorite.destroy({ where: { UserId, movieId } })
    res.redirect('/favorite')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
