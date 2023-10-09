/* Green Work ERP by Victor Martinez */

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authentication');

const {
    addAttendance,
    modifyAttendance,
    getAttendByEmployee,
    getAttendByDate,
    getAttendById,
    deleteAttendance 
} = require('../controllers/attendController');

router
    .route('/')
    .get(authenticateUser,  getAttendByDate)
    .post(authenticateUser, addAttendance)
    
router
    .route('/:id')
    .get(authenticateUser, getAttendById)
    .patch(authenticateUser, modifyAttendance)
    .delete(authenticateUser, deleteAttendance)

router
    .route('/employee/:id')
    .get(authenticateUser, getAttendByEmployee)


module.exports = router;