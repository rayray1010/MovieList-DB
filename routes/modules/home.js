const express = require('express')
const router = express.Router()
const axios = require('axios')
router.get('/', async (req, res) => {
  const isAuthenticated = req.isAuthenticated()
  let keyword = req.query.keyword
  keyword = encodeURI(keyword)
  let movieList = {}
  try {
    if (keyword && keyword !== 'undefined') {
      movieList = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=5c37cf0fe463b92c7078fc96c24fe0ab&language=zh&query=${keyword}&page=1&include_adult=true`
      )
    } else {
      movieList = await axios.get(
        'https://api.themoviedb.org/3/discover/movie?api_key=5c37cf0fe463b92c7078fc96c24fe0ab&language=zh&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate'
      )
    }
    movieList = movieList.data.results
    movieList.forEach((movie) => (movie.isAuthenticated = isAuthenticated))
    res.render('index', { movieList })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
