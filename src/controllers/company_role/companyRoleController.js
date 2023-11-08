/* Green Work ERP by Victor Martinez */

import { StatusCodes } from "http-status-codes";
import * as CustomError from "../../errors/index.js";
import CompanyRole from "../../models/company_roles.js";

import { validateCompanyRole } from "./utils/validate_role.js";

const createCompanyRole = async (req, res) => {
  validateCompanyRole(req.body);

  const { name, description } = req.body;

  const companyRole = new CompanyRole({ name, description });

  await companyRole
    .createCompanyRole()
    .then(() => {
      res.status(StatusCodes.CREATED).json({ msg: "created company role!" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const getAllCompanyRoles = async (req, res) => {
  const company_roles = await CompanyRole.getCompanyRoles();

  res.status(StatusCodes.OK).json({
    company_roles: company_roles,
    total_roles: company_roles.length,
  });
};

const updateCompanyRole = async (req, res) => {
  // TODO: validate JSON object

  const { role_id } = req.params;

  const { name, description } = req.body;

  const companyRole = new CompanyRole({ name, description });

  await companyRole
    .updateCompanyRole()
    .then(() => {
      res
        .status(StatusCodes.OK)
        .json({ msg: "The company role was updated successfully" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

const deleteCompanyRole = async (req, res) => {
  const { role_id } = req.params;

  const companyRole = new CompanyRole({ role_id });
  await companyRole
    .deleteCompanyRole()
    .then(() => {
      res
        .status(StatusCodes.OK)
        .json({ msg: "The company role was deleted successfully" });
    })
    .catch((error) => {
      throw new CustomError.BadRequestError(error);
    });
};

export {
  createCompanyRole,
  getAllCompanyRoles,
  updateCompanyRole,
  deleteCompanyRole,
};
