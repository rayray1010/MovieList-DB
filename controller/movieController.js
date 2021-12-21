const axios = require('axios')
const db = require('../models')
const Favorite = db.Favorite

const movieController = {
  getMovies: async (req, res) => {
    const isAuthenticated = req.isAuthenticated()
    let keyword = req.query.keyword
    keyword = encodeURI(keyword)
    let movieList = {}
    try {
      console.log(keyword)
      if (keyword && keyword !== 'undefined') {
        movieList = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=5c37cf0fe463b92c7078fc96c24fe0ab&language=zh&query=${keyword}&page=1&include_adult=false`
        )
      } else {
        movieList = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?api_key=5c37cf0fe463b92c7078fc96c24fe0ab&language=zh&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_watch_monetization_types=flatrate'
        )
      }
      movieList = movieList.data.results
      movieList.forEach(movie => (movie.isAuthenticated = isAuthenticated))
      return res.render('index', { movieList })
    } catch (err) {
      console.log(err)
    }
  },
  getMovie: async (req, res) => {
    try {
      const id = req.params.id
      let data = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=5c37cf0fe463b92c7078fc96c24fe0ab&language=en-US`
      )
      const movie = data.data
      const movieType = movie.genres[0].name
      res.render('detail', { movie, movieType })
    } catch (err) {
      console.log(err)
    }
  },
  getSearchMovies: async (req, res) => {},
  getFavoriteMovies: async (req, res) => {
    try {
      const userId = req.user.id
      const movies = await Favorite.findAll({
        where: { userId },
        raw: true,
        nest: true
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
  },
  postFavoriteMovie: async (req, res) => {
    const movieId = req.params.id
    const UserId = req.user.id
    try {
      const find = await Favorite.findOne({ where: { movieId, UserId } })
      if (find) {
        req.flash('warning_msg', '已加過此電影囉！')
        return res.redirect('/movies')
      }
      await Favorite.create({ movieId, UserId })
      res.redirect('/movies')
    } catch (err) {
      console.log(err)
    }
  },
  deleteFavoriteMovie: async (req, res) => {
    try {
      const movieId = req.params.id
      const UserId = req.user.id
      await Favorite.destroy({ where: { UserId, movieId } })
      res.redirect('/movies/favorite')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = movieController
