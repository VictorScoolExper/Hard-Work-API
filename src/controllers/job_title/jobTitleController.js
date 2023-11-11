/* Green Work ERP by Victor Martinez */

import { StatusCodes } from "http-status-codes";
import * as CustomError from "../../errors/index.js";
import JobTitle from "../../models/job_title.js";

import { validateJobTitle } from "./utils/validateJobTitle.js";

const createJobTitle = async (req, res) => {
  validateJobTitle(req.body);

  const { name, description } = req.body;

  const jobTitle = new JobTitle({ name, description });
  await jobTitle
    .createJobTitle()
    .then(() => {
      res.status(StatusCodes.CREATED).json({ msg: "created job title!" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const getAllJobTitles = async (req, res) => {
  await JobTitle.selectJobTitles()
    .then((job_titles) => {
      res.status(StatusCodes.OK).json({
        job_titles: job_titles,
        total_jobs: job_titles.length,
      });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const updateJobTitle = async (req, res) => {
  // TODO: validate JSON object

  const { job_title_id } = req.params;
  const { name, description } = req.body;

  const jobTitle = new JobTitle(job_title_id, name, description);
  await jobTitle
    .updateJobTitle()
    .then(() => {
      res
        .status(StatusCodes.OK)
        .json({ msg: "The job title was updated successfully" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const deleteJobTitle = async (req, res) => {
    // TODO: validate id

    const {job_title_id} = req.params;

    const jobTitle = new JobTitle({job_title_id});
    await jobTitle.deleteJobTitle()
    .then(() => {
        res
          .status(StatusCodes.OK)
          .json({ msg: "The job title was deleted successfully" });
      })
      .catch((error) => {
        throw new CustomError.BadRequestError(error);
      });
}

export {
  createJobTitle,
  getAllJobTitles,
  updateJobTitle,
  deleteJobTitle
};
