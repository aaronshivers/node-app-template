const jwt = require('jsonwebtoken')

// GET request for Secrets
exports.secretsGet = (req, res) => {

	const token = req.cookies.token
	const secret = process.env.JWT_SECRET

	jwt.verify(token, secret, (err, verifiedToken) => {
		if (!err) {
			res.render('secrets', {
				title: 'Secret Page'
			})
			// res.send(`This is the secrets page.`)
		} else {
			res.send(err)
		}
	})
}