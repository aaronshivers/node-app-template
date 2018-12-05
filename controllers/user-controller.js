const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Display Signup Form on GET
exports.signupFormGet = (req, res) => {
	res.render('signup', {
		title: 'Signup'
	})
}

// Handles Signup Form on Post
exports.signupFormPost = (req, res) => {

	const newUser = req.body

	User.create(newUser, (err, user) => {
		if (!err) {
			res.redirect('login')
		} else {
			res.status(500).send(err)
		}
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

// Handle User Login on POST
exports.userLoginPost = (req, res) => {
	
	const { username, password } = req.body

	User.findOne({username}, (err, user) => {
		if (!err && user) {
			bcrypt.compare(password, user.password).then(match => {
				if (match) {
					const payload = { username: user.username }
					const secret = process.env.JWT_SECRET
					const options = { expiresIn: '2d', issuer: 'https://www.demo.com' }
					const token = jwt.sign(payload, secret, options)
					res.cookie('token', token).redirect('profile')
				} else {
					// res.status(401).send(`Authentication Error!`)
					res.redirect('login')
				}
			}).catch(err => res.status(500).send(err))
		} else {
			// res.redirect('login')
			res.status(404).send(`We could not find that information in our database.</br>
			<a href="/login">Login</a> or <a href="/signup">Signup</a>`)
		}
	})
}

exports.adminGet = (req, res) => {

	const username = verifiedUser
	console.log(username)

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
