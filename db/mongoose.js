const mongoose = require('mongoose')

const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, NODE_ENV } = process.env
const encodedpass = encodeURIComponent(MONGO_PASS)
const uri = `mongodb+srv://${ MONGO_CLUSTER }.mongodb.net`

const options = {
  'useNewUrlParser': true,
  'useCreateIndex': true,
  'useFindAndModify': false,
  'autoIndex': false,
  'retryWrites': true,
  'user': MONGO_USER,
  'pass': encodedpass,
  'dbName': NODE_ENV || 'test'
}

module.exports = mongoose.connect(uri, options)
  // .then(() => console.log(`Connected to ${ options.dbName } database.`))
  // .catch(err => console.log(err))
