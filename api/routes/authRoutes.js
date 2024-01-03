const express = require('express');
const {userRegistration, userLogin, userIsLoggedIn, logout} = require("../controllers/authController");
const router = express.Router()

router.post('/register', userRegistration);
router.post('/login', userLogin);
router.get('/profile', userIsLoggedIn);
router.post('/logout', logout);

module.exports = router