const Bean = require('../models/Bean')
const ErrorResponse = require('../utils/errorResponse')

exports.create = async (req, res, next) => {
  const { name, country, notes, labels, users, recipes } = req.body

  try {
    const bean = await Bean.create({
      name,
      country,
      notes,
      labels,
      users,
      recipes
    })

    sendToken(bean, 201, res)
  } catch (error) {
    next(error)
  }
}

exports.findAll = async (req, res, next) => {

  try {
    const beans = await Bean.find()

    sendToken(beans, 200, res)
  } catch (error) {
    next(error)
  }
}

exports.findOne = async (req, res, next) => {
  const { id } = req.body

  try {
    const bean = await Bean.findOne({id})

    sendToken(bean, 200, res)
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  const {
    id,
    name,
    country,
    notes,
    labels,
  } = req.body

  try {
    const bean = await Bean.findByIdAndUpdate({
        id, 
        update: { name, country, notes, labels }
    })

    sendToken(bean, 200, res)
  } catch (error) {
    next(error)
  }
}

exports.remove = async (req, res, next) => {
  const { id } = req.body

  try {
    const bean = await Bean.findByIdAndDelete({id})

    sendToken(bean, 200, res)
  } catch (error) {
    next(error)
  }
}