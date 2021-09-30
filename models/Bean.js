const crypto = require('crypto')
const mongoose = require('mongoose')

const BeanSchema = new mongoose.Schema({
  name: String,
  country: String,
  notes: [String],
  labels: [String],
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
  
})

const Bean = mongoose.model('Bean', BeanSchema)

module.exports = Bean