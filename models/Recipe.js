const crypto = require('crypto')
const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  airTemp: [Number],
  beanTemp: [Number],
  blower: [Number],
  minutes: Number,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  beans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bean' }]
  
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe