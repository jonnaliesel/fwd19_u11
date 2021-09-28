const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

const { getOne } = require('../controllers/private')


router.route('/').get(protect, getOne)

module.exports = router