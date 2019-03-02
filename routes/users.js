const express = require('express')
const router = express.Router()

const User = require('../models/users')

// controller modules
const userController = require('../controllers/user-controller')

const {validateToken} = require('../utilities')

// Get request for Signup Form
router.get('/signup', userController.signupFormGet)

// POST request for Signup Form
router.post('/new', userController.signupFormPost)

// Get request for Login Form
router.get('/login', userController.loginForm)

// POST request for User Login
router.post('/login', userController.userLoginPost)

// Clear authentication token/cookie
router.get('/logout', userController.logout)

// Get request for list of all users, if user = Admin
// router.route('/').get(validateToken, userController.userList)
router.route('/').get(userController.userList)
// router.get('/', (req, res) => res.send('hello'))

// GET request for User Profile
router.route('/profile').get(validateToken, userController.profileGet)

// Get request for Admin Page
router.route('/admin').get(validateToken, userController.adminGet)

// PATCH /users/:id
router.patch('/:id', async (req, res) => {
  const { email, password } = req.body
  const updates = Object.keys({ email, password })

  try {
    // find user
    const user = await User.findById(req.params.id)

    // reject if user is not found
    if (!user) return res.status(404).send('User Not Found')

    // set updates
    for (const update of updates) {
      if (req.body[update]) {
        user[update] = req.body[update]
      }
    }

    // save update
    await user.save()

    // return updated user
    res.send(user)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
