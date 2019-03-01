require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const {mongoose} = require('./db/mongoose')

const index = require('./routes/index')
const users = require('./routes/user')
const todos = require('./routes/todo')

const app = express()
const port = process.env.PORT

app.use(morgan('combined'))

app.use(cookieParser())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index)
app.use('/users', users)
app.use('/todos', todos)

app.listen(port, () => {
	console.log(`Server running on port ${port}.`)
})

module.exports = {app}
