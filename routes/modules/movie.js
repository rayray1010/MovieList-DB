const express = require('express')
const router = express.Router()
const axios = require('axios')
router.get('/:id', async (req, res) => {
  const id = req.params.id
  let data = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=5c37cf0fe463b92c7078fc96c24fe0ab&language=en-US`
  )
  const movie = data.data
  const movieType = movie.genres[0].name
  res.render('detail', { movie, movieType })
})

module.exports = router
