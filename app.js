require('./config/config')

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const {mongoose} = require('./db/mongoose')

const indexRoutes = require('./routes/index-routes')
const userRoutes = require('./routes/user-routes')
const todoRoutes = require('./routes/todo-routes')

const app = express()
const port = process.env.PORT

app.use(morgan('combined'))

app.use(cookieParser())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(indexRoutes)
app.use(userRoutes)
app.use(todoRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}.`)
})

module.exports = {app}
