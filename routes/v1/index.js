const express = require('express')
const router = express.Router()

const users = require('./users')

// Add API routes
router.use(users)

module.exports = router
