const express = require('express')
const router = express.Router()

const {
  create,
  findOne,
  findAll,
  update,
  remove 
} = require('../controllers/bean')


router.route('/create').post(create)
router.route('/').get(findAll)
router.route('/:id').get(findOne)
router.route('/update/:id').put(update)
router.route('/delete/:id').delete(remove)

module.exports = router