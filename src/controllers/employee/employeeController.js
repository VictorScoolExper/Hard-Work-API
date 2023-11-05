/* Green Work ERP by Victor Martinez */

import { StatusCodes } from 'http-status-codes';
import * as CustomError from '../../errors/index.js';
import Employee from '../../models/employee.js';

import sharp from 'sharp';
import {
  addObjectS3Bucket,
  createSignedUrls,
  updateS3ObjectBucket,
  deleteObjectS3Bucket,
} from '../../utils/aws/index.js';
import {validateParamsEmployee} from './validate_employee.js';

const createEmployee = async (req, res) => {
  await validateParamsEmployee();

  const {
    name,
    last_name,
    cell_number,
    role,
    birth_date,
    email,
    job_title,
    department,
    driver_license,
    start_date,
    wage_per_hour,
    created_by,
  } = req.body;

  let imageName;

  // check if file exists
  if (req.file) {
    // resize image and then convert to buffer
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1800, width: 1200, fit: "contain" })
      .toBuffer();

    // TODO: add try catch and error handler (maybe but error should buble up from utils/aws/s3)
    imageName = await addObjectS3Bucket(buffer, req.file);
  }

  const employee = new Employee(
    null,
    name.toLowerCase(),
    last_name.toLowerCase(),
    cell_number,
    role.toLowerCase(),
    birth_date,
    email,
    null,
    imageName,
    job_title.toLowerCase(),
    department.toLowerCase(),
    driver_license,
    start_date,
    Number(wage_per_hour)
  )

  await Employee.createEmployeeUser(employee);

  res.status(StatusCodes.CREATED).json({ msg: "created user successfully" });
};

// TODO: return with ids
const getAllEmployee = async (req, res) => {
  const allEmployees = await Employee.getAllEmployee();

  const allEmployeeWithUrls = await createSignedUrls(allEmployees);

  res
    .status(StatusCodes.OK)
    .json({
      employees: allEmployeeWithUrls,
      total_employees: allEmployees.length,
    });
};

const getSingleEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  if (!employeeId) {
    throw new CustomError.BadRequestError("Need to include a valid ID");
  }

  const employee = await Employee.getSingleEmployee(employeeId);

  res.status(StatusCodes.CREATED).json({ msg: employee });
};

// This function might replace our delete function, becuase we not delete user just inactive them
const updateEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  const {
    name,
    last_name,
    cell_number,
    role,
    birth_date,
    active,
    job_title,
    department,
    driver_license,
    start_date,
    wage_per_hour,
    created_by,
    email,
    image_name,
  } = req.body;

  if (req.file) {
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1800, width: 1200, fit: "contain" })
      .toBuffer();

    await updateS3ObjectBucket(image_name, req.file, buffer);
  }

  const employee = new Employee({
    name: name.toLowerCase(),
    last_name: last_name.toLowerCase(),
    cell_number,
    role: role.toLowerCase(),
    birth_date,
    active: role.toLowerCase(),
    employee_id: employeeId,
    job_title: job_title.toLowerCase(),
    department: department.toLowerCase(),
    driver_license,
    start_date,
    wage_per_hour: Number(wage_per_hour),
    edited_by: Number(created_by),
    email: email.toLowerCase(),
    image_name,
  });
  
  await Employee.employeeUpdated(employee);

  res
    .status(StatusCodes.OK)
    .json({ msg: "The employee was updated successfully" });
};

//  for now this will not be used
const deleteEmployee = async (req, res) => {
  const { id: employeeId } = req.params;
  const convertedId = parseInt(employeeId)

  if (!Number.isInteger(convertedId)) {
    throw new CustomError.BadRequestError("The employee id is invalid");
  }

  const employee = await Employee.getSingleEmployee(employeeId);

  if (employee["@p_name"] === null) {
    throw new CustomError.BadRequestError("The employee does not exist");
  }

  // if the employee image exists
  const imageName = employee["@p_image_name"]
  if (imageName) {
    // delete it from the bucket
    await deleteObjectS3Bucket(imageName);
  }

  await Employee.deleteEmployee(convertedId);

  res.status(StatusCodes.OK).json({
    msg:
      `The employee ${employee["@p_name"]}  ${employee["@p_last_name"]} with id: ` +
      employeeId +
      " was deleted",
  });
};

export {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
