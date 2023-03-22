const express = require('express');
const router = express.Router();

const { login, logout, register } = require('../controllers/authController');

// Owner/Admin can only create users
router.get('/login', login);
router.post('/register', register)


module.exports = router;