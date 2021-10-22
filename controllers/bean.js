const crypto = require('crypto')
const Bean = require('../models/Bean')

exports.create = async (req, res, next) => {
  const { name, country, notes, labels, user, recipes } = req.body

  try {
    const bean = await Bean.create({
      name,
      country,
      notes,
      labels,
      user,
      recipes
    })

    res.status(201).json({ success: true, bean })
  } catch (error) {
    next(error)
  }
}

exports.findAll = async (req, res, next) => {
  const { userId } = req.body

  try {
    const beans = await Bean.find({user: userId})

    res.status(200).json({ success: true, beans })
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

    res.status(200).json({ success: true, bean })
  } catch (error) {
    next(error)
  }
}

exports.remove = async (req, res, next) => {
  const { id } = req.body

  try {
    const bean = await Bean.findByIdAndDelete({id})

    res.status(200).json({ success: true, bean })
  } catch (error) {
    next(error)
  }
}