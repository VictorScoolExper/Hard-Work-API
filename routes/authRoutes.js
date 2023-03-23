const express = require('express');
const router = express.Router();

const { login, logout, register } = require('../controllers/authController');

// Owner/Admin can only create users
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);


module.exports = router;