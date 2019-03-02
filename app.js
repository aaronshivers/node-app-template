require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

require('./db/mongoose')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todos')

const app = express()

app.use(morgan('combined'))

app.use(cookieParser())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/todos', todoRouter)

module.exports = app
