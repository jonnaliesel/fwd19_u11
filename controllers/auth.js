const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')

exports.register = async (req, res, next) => {
  const {firstName, lastName, company, email, password} = req.body

  try {
    const user = await User.create({
      firstName,
      lastName,
      company,
      email,
      password
    })

    sendToken(user, 201, res)
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body

  if(!email || !password) {
    return next(new ErrorResponse('Please enter email and password'), 400)
  }

  try {
    const user = await User.findOne({ email }).select('+password')
    
    if(!user) {
      return next(new ErrorResponse('Invalid email or password', 401))
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Invalid email or password', 401))
    }

    sendToken(user, 200, res)

  } catch (error) {
    res.status(500).json({
      success: false, 
      error: error.message
    })
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({email})

    if(!user) {
      return next(new ErrorResponse('Email could not be sent', 404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `http://localhost:3000/passwordReset/${resetToken}`
    const message = `
      <h1>Du ville återskapa ditt lösenord</h1>
      <p>Följ länken för att skapa ett nytt lösenord</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a> 
    `

    try {
      await sendEmail({
        to: user.email,
        subject: 'Återställ lösenord',
        text: message
      })

      res.status(200).json({
        success: true, 
        data: `Email sent, token: ${resetToken}` // TODO: TA BORT TOKEN!!!!
      })
    } catch (error) {
      user.getResetPasswordToken = undefined
      user.getResetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse('Email could not be sent', 500))
    }
  } catch (error) {
    return next(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')
  
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      })

      if(!user) {
        return next(new ErrorResponse('Invalid reset token', 400))
      }

      user.password = req.body.password
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      res.status(201).json({
        success: true, 
        data: 'Password reset success'
      })
    } catch (error) {
      next(error)
    }
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({ success: true, token})
}