const express = require('express')
const router = express.Router()

// const { validateToken } = require('../utilities')

router.get('/', (req, res) => res.send('hello'))

// Display Secrets on GET, if logged in
// router.route('/secrets').get(validateToken, indexController.secretsGet)

module.exports = router
