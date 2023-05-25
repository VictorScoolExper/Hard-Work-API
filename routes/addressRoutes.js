const express = require('express');
const router = express.Router();
const {authenticateUser, validateId, validateSingleAddress } = require('../middleware')

const {
    getSingleAddress,
    updateSingleAddress
} = require('../controllers/addressController');

router
    .route('/:id')
    .get(authenticateUser, validateId, getSingleAddress)
    .put(authenticateUser, validateId, validateSingleAddress, updateSingleAddress)

module.exports = router;