const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  airTemp: [Number],
  beanTemp: [Number],
  blower: [Number],
  minutes: Number
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe