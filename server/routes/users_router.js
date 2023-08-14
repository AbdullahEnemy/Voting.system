
const express = require("express");

const signupController = require('../controllers/users_controllers');

const router = express.Router()

router.post('/signup', signupController.signup);
router.get('/login', signupController.login)

module.exports = router