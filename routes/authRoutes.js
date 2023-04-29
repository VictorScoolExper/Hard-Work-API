const express = require('express');
const router = express.Router();

const { login, logout, register, checkPermission } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authentication');


router.post('/login', login);
// Owner/Admin can only create users
router.post('/register', register);
router.get('/logout', logout);
router.route('/checkPermission').get( authenticateUser, checkPermission);


module.exports = router;