const express = require('express')
const { registerController, loginController, getAllUser } = require('../controllers/user.controller')
const router = express.Router()


router.post('/register', registerController)
router.post('/login', loginController)
router.get('/users', getAllUser)

module.exports = router