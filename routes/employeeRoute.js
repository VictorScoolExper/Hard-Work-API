const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    createEmployee,
    getAllEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeImage
} = require('../controllers/employeeController');
const { checkPermission } = require('../controllers/authController');

router
    .route('/')
    .post(authenticateUser, createEmployee)
    .get(authenticateUser, getAllEmployee);

router
    .route('/employee/image/:file')
    .get(checkPermission, getEmployeeImage)

router
    .route('/:id')
    .get(authenticateUser, getSingleEmployee)
    .patch(authenticateUser, updateEmployee)
    .delete(authenticateUser, deleteEmployee);



module.exports = router;