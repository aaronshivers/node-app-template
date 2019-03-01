require('dotenv').config()

const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const { User } = require('../../../models/users')

describe('user.createAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new ObjectId(),
      isAdmin: true
    }
    const user = new User(payload)
    const token = user.createAuthToken()
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret)
    expect(decoded).toMatchObject(payload)
  })
})