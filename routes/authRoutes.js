const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/authController');

// Owner/Admin can only create users
//router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;