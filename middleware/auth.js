const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = async (req, res, next) => {

  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    
    if (!user) {
      throw new Error()
    }

    req.user = user

    next()
  } catch (error) {
    res.status(401).send('Access Denied!')
  }


  // const secret = process.env.JWT_SECRET
  // const token = req.header('x-auth-token')
  // if (!token) return res.status(401).send('Access Denied! No token provided.')
  
  // try {
  //   const decoded = jwt.verify(token, secret)
  //   req.user = decoded
  //   next()
  // } catch (error) {
  //   res.status(400).send('Invalid Token')
  // }
}
