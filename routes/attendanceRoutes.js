const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

router
    .route('/')
    .get(authenticateUser, )


module.exports = router;