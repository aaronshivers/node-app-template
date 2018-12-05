require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const indexRoutes = require('./routes/index-routes')
const userRoutes = require('./routes/user-routes')

const app = express()

app.use(morgan('combined'))

app.use(cookieParser())
app.use(express.static('public'))

app.set('view engine', 'ejs')

// app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(indexRoutes)
app.use(userRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}.`)
})
