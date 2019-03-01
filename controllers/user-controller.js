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
exports.signupFormPost = (req, res) => {
	const body = _.pick(req.body, ['username', 'password'])
	const user = new User(body)

	user.save().then((user) => {
		return user.createAuthToken()
	}).then((token) => {
		res.cookie('token', token).send(user)
	}).catch((err) => {
		res.status(400).send(err)
	})
}

// Display list of all users
exports.userList = (req, res) => {
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



const findByCredentials = (username, password) => {
	
	return User.findOne({username}).then((user) => {
		if (!user) {
			return Promise.reject(new Error('Username incorrect or not provided'))
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, hash) => {
				if (hash) {
					resolve(user)
				} else {
					reject('Password incorrect or not provided')
					// reject(new Error('Password incorrect or not provided'))
				}
			})
		})
	})
}

// Handle User Login on POST
exports.userLoginPost = (req, res) => {
	const body = _.pick(req.body, ['username', 'password'])
	
	findByCredentials(body.username, body.password).then((user) => {
		return generateToken(user)
	}).then((value) => {
			res.cookie('token', value.token).send(value.user)
	}).catch((err) => {
		console.log(err.stack)
		res.send(err.stack)
	})
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
	res.render('profile', {
		title: 'Profile',
		userName: verifiedUser
	})
}

// Logout user 
exports.logout = (req, res) => {
	res.clearCookie('token').send('You\'ve been logged out.')
}

