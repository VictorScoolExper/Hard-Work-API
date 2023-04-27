const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    createEmployee,
    getAllEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

router
    .route('/')
    .post(authenticateUser, createEmployee)
    .get(authenticateUser, getAllEmployee);;

// router
//     .route('/employee/:is_active')
//     .get(authenticateUser, getAllEmployee);

router
    .route('/:id')
    .get(authenticateUser, getSingleEmployee)
    .patch(authenticateUser, updateEmployee)
    .delete(authenticateUser, deleteEmployee);



module.exports = router;