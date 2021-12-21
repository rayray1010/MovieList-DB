'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {}
  }
  Comment.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  )
  return Comment
}
