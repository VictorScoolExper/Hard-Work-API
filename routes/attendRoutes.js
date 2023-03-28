const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    addAttendance,
    modifyAttendance,
    getAttendByEmployee,
    getAttendByDate,
    getAttendById 
} = require('../controllers/attendController');

router
    .route('/')
    .get(authenticateUser,  getAttendByDate)
    .post(authenticateUser, addAttendance)
    
router
    .route('/:id')
    .get(authenticateUser, getAttendById)
    .patch(authenticateUser, modifyAttendance)

router
    .route('/employee/:id')
    .get(authenticateUser, getAttendByEmployee)


module.exports = router;