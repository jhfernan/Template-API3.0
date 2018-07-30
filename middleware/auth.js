const jwt = require('jsonwebtoken')
const config = require('../config')

const auth = {
	checkToken: (req, res, next) => {
		let token = req.headers.authorization
		if (token) {
			jwt.verify(token, config.secret, (err, decoded) => {
				if (err) {
					return res.status(403).send('Token is not valid.')
				}
				delete decoded.password
				delete decoded.exp
				delete decoded.iat
				req.decoded = decoded
				next()
			})
		} else {
			return res.status(401).send('No token provided.')
		}
	},

	isAdmin: (req, res, next) => {
		if (req.decoded.admin) {
			next()
		} else {
			return res.status(403).send('You are not authorized to use that resource.')
		}
	}
}

module.exports = auth
