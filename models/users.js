require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 4,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
		trim: true
	},
	isAdmin: {
		type: Boolean
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
})

userSchema.statics.findByCredentials = async (username, password) => {
	
	// find user by email
	const user = await User.findOne({ email })

	// reject if email is not found in the DB
	if (!user) throw new Error('Invalid Login Credentials')

	// compare passwords
	const isMatch = await bcrypt.compare(password, user.password)

	// reject if passwords don't match
	if (!isMatch) throw new Error('Invalid Login Credentials')

	return user
}

// hash plain text passwords
userSchema.pre('save', async function(next) {
	const saltingRounds = 10

	if (this.isModified || this.isNew) {
		try {
		  const hash = await bcrypt.hash(this.password, saltingRounds)
		  this.password = hash
		} catch (error) {
		  next(error)
		}
	}
	next()
})

// userSchema.methods.createAuthToken = function () {
//   const payload = { _id: this._id, isAdmin: this.isAdmin }
//   const secret = process.env.JWT_SECRET
//   const options = { expiresIn: '2d' }
//   return jwt.sign(payload, secret, options)
// }

userSchema.methods.createAuthToken = async function () {
  const payload = { _id: this._id, isAdmin: this.isAdmin }
  const secret = process.env.JWT_SECRET
  const options = { expiresIn: '2d' }
	const token = await jwt.sign(payload, secret, options)

	this.tokens = this.tokens.concat({ token })
	await this.save()

	return token
}

module.exports = mongoose.model('User', userSchema)
