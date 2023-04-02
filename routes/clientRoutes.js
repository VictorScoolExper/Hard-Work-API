const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    createClient,
    getAllClients,
    getAddressById,
    getSingleClientById,
    deleteAddress,
    modifyClient,
    modifyAddress
} = require('../controllers/clientController');

router
    .route('/')
    .post(authenticateUser, createClient)
    .get(authenticateUser, getAllClients)


router
    .route('/:id')
    .get(authenticateUser, getSingleClientById)
    .patch(authenticateUser, modifyClient) 
    .delete(authenticateUser, deleteAddress);
 
// get list of address by client id 
router
    .route('/address/:id')
    .get(authenticateUser, getAddressById)
    .patch(authenticateUser, modifyAddress);

module.exports = router;