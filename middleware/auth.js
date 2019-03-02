const jwt = require('jsonwebtoken')
const { User } = require('../models/users')

module.exports = (req, res, next) => {
  const secret = process.env.JWT_SECRET
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).send('Access Denied! No token provided.')
  
  try {
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}
