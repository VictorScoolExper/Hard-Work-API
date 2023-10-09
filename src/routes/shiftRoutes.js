/* Green Work ERP by Victor Martinez */

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authentication');

const {
    getShiftsByDate,
    getShiftById,
    addShift,
    modifyShift,
    deleteShift,
    getShiftByEmployeeIdAndDate
} = require('../controllers/shiftController');


router
    .route('/')
    .get(authenticateUser, getShiftsByDate)
    .post(authenticateUser, addShift);

router
    .route('/employee')
    .get(authenticateUser, getShiftByEmployeeIdAndDate)

router 
    .route('/:id')
    .get(authenticateUser, getShiftById)
    .patch(authenticateUser, modifyShift)
    .delete(authenticateUser, deleteShift)


module.exports = router;