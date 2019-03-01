const express = require('express')
const router = express.Router()

// controller modules
const userController = require('../controllers/user-controller')

const User = require('../models/user-model')
const {validateToken} = require('../utilities')

// Get request for Signup Form
router.get('/signup', userController.signupFormGet)

// POST request for Signup Form
router.post('/signup', userController.signupFormPost)

// Get request for Login Form
router.get('/login', userController.loginForm)

// POST request for User Login
router.post('/login', userController.userLoginPost)

// Clear authentication token/cookie
router.get('/logout', userController.logout)

// Get request for list of all users, if user = Admin
router.route('/users').get(validateToken, userController.userList)

// GET request for User Profile
router.route('/profile').get(validateToken, userController.profileGet)

// Get request for Admin Page
router.route('/admin').get(validateToken, userController.adminGet)

module.exports = router
