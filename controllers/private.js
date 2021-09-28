const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.getOne = async (req, res, next) => {
    res.status(200).json({
        success: true, 
        data: {
            firstName: req.user.firstName,
            lastName: req.user.lastName
        }
    })
}