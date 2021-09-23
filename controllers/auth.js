const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.register = async (req, res, next) => {
  const {username, email, password} = req.body

  try {
    const user = await User.create({
      username,
      email,
      password
    })

    res.status(201).json({
      success: true,
      user
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body

  if(!email || !password) {
    return next(new ErrorResponse('Vänligen ange mejladress och lösenord'), 400)
  }

  try {
    const user = await User.findOne({ email }).select('+password')
    
    if(!user) {
      return next(new ErrorResponse('Ogiltig mejladress eller lösenord', 401))
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Ogiltig mejladress eller lösenord', 401))
    }

    res.status(200).json({
      success: true,
      token: 'bcducgi8w7cwiucv78i'
    })

  } catch (error) {
    res.status(500).json({
      success: false, 
      error: error.message
    })
  }
}

exports.forgotPassword = (req, res, next) => {
  res.send('Forgot Password Route')
}

exports.resetPassword = (req, res, next) => {
  res.send('Reset Password Route')
}