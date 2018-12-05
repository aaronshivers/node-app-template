const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
	const token = req.cookies.token
	if (token) {
		const secret = process.env.JWT_SECRET
		try {
			const decoded = jwt.verify(token, secret)
			verifiedUser = decoded.username

			next()
		} catch (err) {
			throw new Error(err)
		}
	} else {
		// res.status(400).redirect('login')
		res.status(401).send(`Verification Failed. You must login to view this page. </br><a href="/login">LOGIN</a>`)
	}
}

module.exports = validateToken
