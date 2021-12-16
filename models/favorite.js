'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User)
    }
  }
  Favorite.init(
    {
      movieId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Favorite'
    }
  )
  return Favorite
}
