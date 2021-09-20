const mongoose = require('mongoose')

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

const User = mongoose.mongoose.model('User', UserSchema)

mondule.exports = User