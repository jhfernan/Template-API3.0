const express = require('express')
const router = express.Router()

const users = require('../mock/users.json')

router.get('/users', (req, res, next) => {
	res.json(users)
})

router.get('/users/:id', (req, res, next) => {
	const id = parseInt(req.params.id)
	if (id >= 0 && id < users.length) {
		res.json(users[id])
	} else {
		res.status(404).send('User not found')
	}
})

module.exports = router
