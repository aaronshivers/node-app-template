const expect = require('expect')
const request = require('supertest')
// const {ObjectId} = require('mongodb')

const {app} = require('../app')
const User = require('../models/user-model')
const {users, populateUsers} = require('./seed/seed')
const {validateToken} = require('../utilities')

beforeEach(populateUsers)

//============================================
// signup ====================================
//============================================

// GET /signup
describe('GET /signup', () => {
  it('should respond with 200', (done) => {

    request(app)
      .get('/signup')
      .expect(200)
      .end(done)
  })
})

// POST /signup
describe('POST /signup', () => {
  it('should create a new user', (done) => {
    const username = 'bobby'
    const password = '123asdf'

    request(app)
      .post('/signup')
      .send({ username, password })
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBeTruthy()
        expect(res.body.username).toBe(username)
      })
      .end((err) => {
        if (err) {
          return done(err)
        }

        User.findOne({ username }).then((user) => {
          expect(user).toBeTruthy()
          expect(user.password).not.toBe(password)
          done()
        }).catch((err) => done(err))
      })
  })

  it('should return validation errors if request is invalid', (done) => {
    const username = 'bob'
    const password = '123'

    request(app)
      .post('/signup')
      .send({ username, password })
      .expect(400)
      .end(done)
  })

  it('should not create user if username already exists', (done) => {
    const username = users[0].username
    const password = 'password'

    request(app)
      .post('/signup')
      .send({ username, password })
      .expect(400)
      .end(done)
  })
})

//============================================
// login =====================================
//============================================
describe('GET /login', () => {
  it('should respond with 200', (done) => {

    request(app)
      .get('/login')
      .expect(200)
      .end(done)
  })
})

describe('POST /login', () => {
  it('should login user and create authoriziation token/cookie', (done) => {
  const username = users[0].username
  const password = users[0].password

    request(app)
      .post('/login')
      .send({username, password})
      .expect(200)
      .expect((res) => {
        expect(res.header).toHaveProperty('set-cookie')
      })
      .end(done)
  })

  it('should NOT login user and create authoriziation token/cookie if username is invalid or missing', (done) => {
  const username = users[0].username + '1'
  const password = users[0].password

    request(app)
      .post('/login')
      .send({username, password})
      .expect(200)
      .expect((res) => {
        expect(res.header).not.toHaveProperty('set-cookie')
      })
      .end(done)
  })

  it('should NOT login user and create authoriziation token/cookie if password is invalid or missing', (done) => {
  const username = users[0].username
  const password = users[0].password + '1'

    request(app)
      .post('/login')
      .send({username, password})
      .expect(200)
      .expect((res) => {
        expect(res.header).not.toHaveProperty('set-cookie')
      })
      .end(done)
  })
})


//============================================
// profile ===================================
//============================================

// GET /profile
describe('GET /profile', () => {
  // it('should return 200 if user logged in', (done) => {
    // const username = users[0].username
    // const password = users[0].password
    
    // const cookie = 'set-cookie'
    // request(app)
    //   .post('/login')
    //   .send({username, password})
    //   .expect(200)
    //   .expect((res) => {
    //     expect(res.header).toHaveProperty('set-cookie')
    //     console.log(res.header)
    //   })

  //   request(app)
  //     .get('/profile')
  //     .expect(200)
  //     .expect((res) => {
  //       // expect(res.header['set-cookie'][0]).toMatch(/token/)
  //     })
  //     .end(done)
  // })

  it('should return 401 if user NOT logged in', (done) => {

    request(app)
      .get('/profile')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})




// // GET /users
// describe('GET /users', () => {
//   it('should get users list if admin')
// })

//============================================
// profile ===================================
//============================================
describe('/GET /logout', () => {
  it('should logout user', (done) => {

    request(app)
      .get('/logout')
      .expect(200)
      .expect((res) => {
        expect(res.header).not.toHaveProperty('set-cookie')
      })
      .end(done)
  })
})







