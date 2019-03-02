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
	}
})

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

userSchema.methods.createAuthToken = function () {
  const payload = { _id: this._id, isAdmin: this.isAdmin }
  const secret = process.env.JWT_SECRET
  const options = { expiresIn: '2d' }
  return jwt.sign(payload, secret, options)
}

module.exports = mongoose.model('User', userSchema)
