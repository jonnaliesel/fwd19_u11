const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: [true, 'Vänligen ange ett användarnamn']
  },
  email: {
    type: String,
    required: [true, 'Vänligen ange en mejladress'],
    unique: true,
    match: [
      /^\S+@\S+\.\S+$/
    ]
  },
  password: {
      type: String,
      required: [true, "Vänligen ange ett lösenord"],
      minlength: 6,
      select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User