/* Green Work ERP by Victor Martinez */

const express = require('express');
const router = express.Router();
const {authenticateUser, validateId, validateSingleAddress } = require('../middlewares')

const {
    getSingleAddress,
    updateSingleAddress
} = require('../controllers/addressController');

router
    .route('/:id')
    .get(authenticateUser, validateId, getSingleAddress)
    .put(authenticateUser, validateId, validateSingleAddress, updateSingleAddress)

module.exports = router;