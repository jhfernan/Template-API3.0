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
	let user = search(req.body.username, users)
	if (!user) {
		res.status(404).send('User not found')
	} else if (user.password !== req.body.password) {
		res.status(403).send('Bad credentials')
	} else if (user.password === req.body.password) {
		let data = {
			id: user.id,
			name: user.name,
			admin: user.admin,
			username: user.username
		}
		jwt.sign(data, config.secret, { expiresIn: '7d' }, (err, token) => {
			if (err) {
				res.status(500).send('There was an error creating your token')
			}
			res.json({ user: data, token: token })
		})
	} else {
		res.status(500).send('There was an error creating your token')
	}
})

module.exports = router
