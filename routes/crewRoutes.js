const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    createCrew,
    getAllCrew,
    getSingleCrew,
    updateCrew,
    deleteCrewEmployee,
    addEmployeeToCrew
} = require('../controllers/crewController');



router
    .route('/')
    .post(authenticateUser, createCrew)
    .get(authenticateUser, getAllCrew);

router
    .route('/:id')
    .get(authenticateUser, getSingleCrew)
    .post(authenticateUser, addEmployeeToCrew)
    .patch(authenticateUser, updateCrew)
    .delete(authenticateUser, deleteCrewEmployee);


module.exports = router;