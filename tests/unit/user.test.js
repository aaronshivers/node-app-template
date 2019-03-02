require('dotenv').config()

const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const User = require('../../models/users')

describe('user.createAuthToken', () => {
  it('should return a valid JWT', () => {
    const _id = new ObjectId()
    const payload = { _id, isAdmin: true }
    const user = new User(payload)
    const token = user.createAuthToken()
    const secret = process.env.JWT_SECRET
    const options = { expiresIn: '2d' }
    const decoded = jwt.verify(token, secret, options)
    
    expect(decoded).toHaveProperty('_id', _id.toString())
    expect(decoded).toHaveProperty('isAdmin', true)
  })
})