const express = require('express')

const userController = require('../controllers/users')

const router = express.Router()

router.get('/login', userController.getLogin)
router.get('/sign-up', userController.getSignUp)
router.get('/all-users', userController.getAllUsers)

router.post('/login', userController.postLogin)
router.post('/sign-up', userController.postSignUp)

module.exports = router