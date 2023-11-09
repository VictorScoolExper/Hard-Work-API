/* Green Work ERP by Victor Martinez */

import { StatusCodes } from "http-status-codes";
import * as CustomError from "../../errors/index.js";
import JobTitle from "../../models/job_title.js";

import { validateCompanyDepartment } from "../company_department/utils/validate_department.js";

const createJobTitle = async (req, res) => {
  validateCompanyDepartment(req.body);

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
        company_roles: job_titles,
        total_roles: job_titles.length,
      });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const updateJobTitle = async (req, res) => {
  // TODO: validate JSON object

  const { department_id } = req.params;
  const { name, description } = req.body;

  const jobTitle = new JobTitle(department_id, name, description);
  await jobTitle
    .updateJobTitle()
    .then(() => {
      res
        .status(StatusCodes.OK)
        .json({ msg: "The company department was updated successfully" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const deleteJobTitle = async (req, res) => {
    // TODO: validate id

    const {department_id} = req.params;

    const jobTitle = new JobTitle({department_id});
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
