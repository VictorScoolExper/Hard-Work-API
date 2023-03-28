const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    getShiftsByDate,
    getShiftById,
    addShift,
    modifyShift,
    deleteShift
} = require('../controllers/shiftController');


router
    .route('/')
    .get(authenticateUser, getShiftsByDate)
    .post(authenticateUser, addShift)

router 
    .route('/:id')
    .get(authenticateUser, getShiftById)
    .patch(authenticateUser, modifyShift)
    .delete(authenticateUser, deleteShift)


module.exports = router;