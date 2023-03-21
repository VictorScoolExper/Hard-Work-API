const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/authController');

// Owner/Admin can only create users
router.get('/login', login);


module.exports = router;