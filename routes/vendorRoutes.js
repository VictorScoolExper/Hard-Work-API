const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication');

const {
    validateAddVendorParams
} = require('../middleware/validate_vendor');

const {
    addVendor
} = require('../controllers/vendorController');

router
    .route('/')
    .post(authenticateUser, validateAddVendorParams, addVendor)

module.exports = router;