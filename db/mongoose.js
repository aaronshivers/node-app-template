const mongoose = require('mongoose')

const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, NODE_ENV } = process.env

const encodedpass = encodeURIComponent(MONGO_PASS)
const url = `mongodb+srv://${ MONGO_CLUSTER }.mongodb.net`

const options = {
  'useNewUrlParser': true,
  'useCreateIndex': true,
  'useFindAndModify': false,
  'autoIndex': false,
  'retryWrites': true,
  'user': MONGO_USER,
  'pass': encodedpass,
  'dbName': NODE_ENV
}

mongoose.connect(url, options)
  .then(() => console.log(`Connected to ${ NODE_ENV } database.`))

module.exports = { mongoose }
