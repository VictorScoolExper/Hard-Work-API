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

const {middlewareUploadImage} = require('../utils/image_handler');

router
    .route('/')
    .post(authenticateUser, middlewareUploadImage, createEmployee)
    .get(authenticateUser, getAllEmployee);


router
    .route('/:id')
    .get(authenticateUser, getSingleEmployee)
    .put(authenticateUser, middlewareUploadImage, updateEmployee)
    .delete(authenticateUser, deleteEmployee);



module.exports = router;