/* Green Work ERP by Victor Martinez */

const express = require('express');
const router = express.Router();

const { login, logout, register, checkPermission } = require('../controllers/authController');
const { authenticateUser, validateRegisterParams} = require('../middlewares');

router.post('/login', login);
router.post('/register', validateRegisterParams, register);
router.get('/logout', logout);

//the following should be eliminated
// router.route('/checkPermission').get( authenticateUser('admin'), checkPermission);

// TODO: add create user functionality that can only be used by admins and Managers

module.exports = router;