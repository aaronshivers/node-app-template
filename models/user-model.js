const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcrypt')

const saltingRounds = 10

const server = process.env.MONGO_SERVER
const database = process.env.MONGO_DATABASE
const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASS
const encodedpass = encodeURIComponent(pass)
const url = `mongodb://${user}:${encodedpass}@${server}/${database}`

mongoose.connect(url, {useNewUrlParser: true})

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
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

module.exports = User = mongoose.model('User', userSchema)
