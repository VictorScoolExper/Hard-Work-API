/* Green Work ERP by Victor Martinez */

import express from 'express';
const router = express.Router();
import { authenticateUser } from '../middlewares/index.js';

import {
    createCrew,
    getAllCrew,
    getSingleCrew,
    updateCrew,
    deleteCrewEmployee,
    addEmployeeToCrew
} from '../controllers/crewController.js';



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


export default router;