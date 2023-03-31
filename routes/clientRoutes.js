const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    createClient,
    getAllClients,
    getAddressById
} = require('../controllers/clientController');

router
    .route('/')
    .post(authenticateUser, createClient)
    .get(authenticateUser, getAllClients)

// get list of address by id 
router
    .route('/address/:id')
    .get(authenticateUser, getAddressById)
module.exports = router;