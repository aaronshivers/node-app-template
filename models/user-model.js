const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcrypt')

const saltingRounds = 10

const userSchema = new mongoose.Schema({
	username: {
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
	token: {
		type: String,
		required: false
	}
})

userSchema.pre('save', function(next) {
	const user = this
	if(!user.isModified || !user.isNew) {
		next()
	} else {
		bcrypt.hash(user.password, saltingRounds, (err, hash) => {
			if (err) {
				console.log(`Error hashing user password. User: ${ user.name }`)
				next(err)
			} else {
				user.password = hash
				next()
			}
		})
	}
})

module.exports = mongoose.model('User', userSchema)