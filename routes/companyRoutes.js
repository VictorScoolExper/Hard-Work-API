const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication');


const {
    createCompany,
    getCompanyById,
    getCompanies,
    updateCompany
} = require('../controllers/companyController');

router
    .route('/')
    .get(authenticateUser, getCompanies)
    .post(authenticateUser, createCompany)

router
    .route('/:id')
    .get(authenticateUser, getCompanyById)
    .patch(authenticateUser, updateCompany)

module.exports = router;