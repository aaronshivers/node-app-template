const {ObjectId} = require('mongodb')
const jwt = require('jsonwebtoken')

const User = require('../../models/user-model')

const userOneId = new ObjectId()
const userTwoId = new ObjectId()

const users = [{
  _id: userOneId,
  username: 'testuser1',
  password: 'testpass1'
}, {
  _id: userTwoId,
  username: 'testuser2',
  password: 'testpass2'
}]

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[1]).save()
    const userTwo = new User(users[0]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => done())
}

module.exports = {
  users,
  populateUsers
}
