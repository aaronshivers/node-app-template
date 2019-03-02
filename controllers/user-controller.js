const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const User = require('../models/users')

// Display Signup Form on GET
exports.signupFormGet = (req, res) => {
	res.render('signup', {
		title: 'Signup'
	})
}

// Handles Signup Form on Post
exports.signupFormPost = async (req, res) => {
	const { email, password } = req.body

	try {
		// check if user exists
		const existingUser = await User.findOne({ email })

		// reject if user already exists
		if (existingUser) return res.status(400).send('User Already Exists')

		// create new user
		const user = new User({ email, password })

		// save user
		user.save()

		// create token
		const token = await user.createAuthToken()

		// set header and return user info
		res.header('x-auth-token', token).send({ email })
	} catch (error) {
	  res.status(400).send()
	}


}

// Display list of all users
exports.userList = (req, res) => {
	console.log('fart')
	User.find({}, (err, allUsers) => {
		if (!err) {
			// res.render('users', {
			// 	title: 'Users'
			// })
			res.send(allUsers)
		} else {
			res.status(500).send(err.stack)
		}
	})
}

// Display Login form on GET
exports.loginForm = (req, res) => {
	res.render('login', {
		title: 'Login'
	})
}

// Handle User Login on POST
exports.userLoginPost = async (req, res) => {
	const { email, password } = req.body

	try {

		// find user by email and confirm correct password
		const user = await User.findByCredentials(email, password)

	  // generate authentication token
		const token = await user.createAuthToken()
	
	  // return user email
		res.send({ user, token })
	} catch (error) {
	  res.status(400).send()
	}


	// const body = _.pick(req.body, ['email', 'password'])
	
	// findByCredentials(body.email, body.password).then((user) => {
	// 	return user.createAuthToken()
	// }).then((value) => {
	// 		res.cookie('token', value.token).send(value.user)
	// }).catch((err) => {
	// 	console.log(err.stack)
	// 	res.send(err.stack)
	// })
}

	// , (err, user) => {
	// 	console.log(user)
	// 	if (!err && user) {
	// 		bcrypt.compare({password: body.password}, user.password).then(match => {
	// 			if (match) {
	// 				res.cookie('token', token).send(user)
	// 			} else {
	// 				// res.status(401).send(`Authentication Error!`)
	// 				res.redirect('login')
	// 			}
	// 		}).catch(err => res.status(500).send(err))
	// 	} else {
	// 		// res.redirect('login')
	// 		res.status(404).send(`We could not find that information in our database.</br>
	// 		<a href="/login">Login</a> or <a href="/signup">Signup</a>`)
	// 	}
	// })

exports.adminGet = (req, res) => {

	const username = verifiedUser
	// console.log(username)

	if (username === 'admin') {
		res.send('hello admin')
	} else {
		res.status(401).send(`You are not authorized to view this page.`)
	}
}

exports.profileGet = (req, res) => {
	res.send(req.user)
}

// Logout user 
exports.logout = (req, res) => {
	res.clearCookie('token').send('You\'ve been logged out.')
}

