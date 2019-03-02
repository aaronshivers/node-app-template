const request = require('supertest')
const app = require('../../app.js')

const User = require('../../models/users')

const userOne = {
  email: 'userOne@test.net',
  password: 'asdfASDF1234!@#$'
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

describe('/', () => {

  describe('GET /users', () => {
    it('should respond 401 if user is not admin', () => {})
    it('should respond 200', () => {})
  })
  describe('POST /users/new', () => {
    it('should respond 400 if data is invalid', () => {})
    it('should respond 400 if user is already in DB', () => {})
    it('should save the new user', () => {})
    it('should respond 200 and return the new user', async () => {
      await request(app)
        .post('/users/new')
        .send({
          email: 'user@example.com',
          password: 'asdfASDF1234!@#$'
        })
        .expect(200)
    })
  })
  describe('GET /users/:id/view', () => {
    it('should respond 401 if user is not admin or owner', () => {})
    it('should respond 404 if ObjectId is invalid', () => {})
    it('should respond 404 if ObjectId is not in DB', () => {})
    it('should respond 200', () => {})
  })
  describe('PATCH /users/:id/edit', () => {
    it('should respond 401 if user is not admin or owner', () => {})
    it('should respond 404 if ObjectId is invalid', () => {})
    it('should respond 404 if ObjectId is not in DB', () => {})
    it('should save the updated user', () => {})
    it('should respond 200 and return the updated user', () => {})
  })
  describe('DELETE /users/:id', () => {
    it('should respond 401 if user is not admin or owner', () => {})
    it('should respond 404 if ObjectId is invalid', () => {})
    it('should respond 404 if ObjectId is not in DB', () => {})
    it('should delete the specified user', () => {})
    it('should respond 200 and return the deleted user', () => {})
  })
  describe('GET /users/login', () => {
    it('should respond 400 if data is invalid', () => {})
    it('should respond 404 if user is not in DB', async () => {
      await request(app)
        .post('/users/login')
        .send({
          email: 'bad@email.net',
          password: userOne.password
        })
        .expect(404)
    })
    it('should create an authentication token', () => {})
    it('should respond 200 and return the authentication token', async () => {
      await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
      }).expect(200)
    })
  })
})
