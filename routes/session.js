const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const users = require('../mock/users.json')
const auth = require('../middleware/auth')
const config = require('../config')

// Find user by username
const search = (username, users) => {
	for (var i = 0; i < users.length; i++) {
		if (users[i].username === username) {
			return users[i]
		}
	}
}

// Authentication handler
router.route('/authenticate')
.get(auth.checkToken, (req, res, next) => {
	res.json(req.decoded)
})
.post((req, res, next) => {
	const user = search(req.body.username, users)
	if (!user) {
		res.status(404).send('User not found')
	} else if (user.password !== req.body.password) {
		res.status(403).send('Bad credentials')
	} else {
		jwt.sign(user, config.secret, { expiresIn: '7d' }, (err, token) => {
			if (err) {
				res.status(500).send('There was an error creating your token')
			}
			res.json({ user: user, token: token })
		})
	}
})

module.exports = router
