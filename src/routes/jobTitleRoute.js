/* Green Work ERP by Victor Martinez */

import express from "express";
const router = express.Router();

import { authenticateUser } from "../middlewares/index.js";

import {
  createJobTitle,
  getAllJobTitles,
  updateJobTitle,
  deleteJobTitle,
} from "../controllers/job_title/jobTitleController.js";

// TODO: ADD middlewares
router
    .route("/")
    .post(authenticateUser, createJobTitle)
    .get(authenticateUser, getAllJobTitles);

router
    .route("/:id")
    .put(authenticateUser, updateJobTitle)
    .delete(authenticateUser, deleteJobTitle);

export default router;