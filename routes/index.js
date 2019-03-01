const express = require('express')
const router = express.Router()

const {validateToken} = require('../utilities')
const indexController = require('../controllers/index-controller')

router.get('/', (req, res) => {
	res.render('index', {
		title: `Index Page`
	})
})

// Display Secrets on GET, if logged in
router.route('/secrets').get(validateToken, indexController.secretsGet)

module.exports = router
