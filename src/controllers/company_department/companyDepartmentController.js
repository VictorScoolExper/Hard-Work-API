/* Green Work ERP by Victor Martinez */

import { StatusCodes } from "http-status-codes";
import * as CustomError from "../../errors/index.js";
import CompanyDepartment from "../../models/company_department.js";

import { validateCompanyDepartment } from "./utils/validate_department.js";

const createCompanyDepartment = async (req, res) => {
  validateCompanyDepartment(req.body);

  const { name, descripton } = req.body;

  const companyDepartment = new CompanyDepartment({ name, descripton });
  await companyDepartment
    .createDepartment()
    .then(() => {
      res.status(StatusCodes.CREATED).json({ msg: "created company role!" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const getAllCompanyDepartment = async (req, res) => {
  const company_department = await CompanyDepartment.selectDepartmentName();

  res.status(StatusCodes.OK).json({
    company_roles: company_department,
    total_roles: company_department.length,
  });
};

const updateCompanyDepartment = async (req, res) => {
  // TODO: validate JSON object
  const { department_id } = req.params;

  const { name, description } = req.body;

  const companyDepartment = new CompanyDepartment(
    department_id,
    name,
    description
  );
  await companyDepartment
    .updateDepartment()
    .then(() => {
      res
        .status(StatusCodes.OK)
        .json({ msg: "The company role was updated successfully" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const deleteCompanyDepartment = async (req, res) => {
    const {department_id} = req.params;

    const companyRole = new CompanyDepartment({department_id});
    await companyRole.deleteDepartment()
    .then(() => {
        res
          .status(StatusCodes.OK)
          .json({ msg: "The company department was deleted successfully" });
      })
      .catch((error) => {
        throw new CustomError.BadRequestError(error);
      });
}

export { 
    createCompanyDepartment, 
    getAllCompanyDepartment, 
    updateCompanyDepartment,
    deleteCompanyDepartment
};
