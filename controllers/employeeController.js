const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Employee = require("../models/employee");

const config = require("../config");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const crypto = require("crypto");
const sharp = require("sharp");
const e = require("express");

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.bucketRegion,
});

const createEmployee = async (req, res) => {
  const {
    name,
    last_name,
    cell_number,
    role,
    age,
    email,
    job_title,
    department,
    driver_license,
    start_date,
    wage_per_hour,
    created_by,
  } = req.body;

  if (
    !name ||
    !last_name ||
    !cell_number ||
    !role ||
    !age ||
    !email ||
    !job_title ||
    !department ||
    !driver_license ||
    !start_date ||
    !wage_per_hour ||
    !created_by
  ) {
    throw new CustomError.BadRequestError(`Please include all the information`);
  }

  // check if file exists
  if (!req.file) {
    throw new CustomError.BadRequestError("No file uploaded!");
  }

  // resize image and then convert to buffer
  const buffer = await sharp(req.file.buffer)
    .resize({ height: 800, width: 800, fit: "contain" })
    .toBuffer();

  const imageName = randomImageName();

  const params = {
    Bucket: config.aws.bucketName,
    // The name of the file
    // Key: req.file.originalname,
    Key: imageName,
    // The buffer is the image
    // Body: req.file.buffer,
    Body: buffer,
    // we set the type
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  const employee = {
    name,
    last_name,
    cell_number,
    role,
    age: Number(age),
    email,
    job_title,
    department,
    driver_license,
    start_date,
    wage_per_hour: Number(wage_per_hour),
    created_by: Number(created_by),
    imageName,
  };

  const employeeRes = await Employee.createEmployeeUser(employee);

  if (employeeRes.affectedRows === 0) {
    throw new CustomError.BadRequestError("Was not created correctly");
  }

  res.status(StatusCodes.CREATED).json({ msg: "created new employee" });
};

// TODO: return with ids
const getAllEmployee = async (req, res) => {
  const allEmployees = await Employee.getAllEmployee();

  for (const employee of allEmployees) {
    if (employee.image) {
      const getObjectParams = {
        Bucket: config.aws.bucketName,
        Key: employee.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      employee.imageUrl = url;
      console.log(url)
    } else {
      employee.imageUrl = null;
    }
  }

  res
    .status(StatusCodes.OK)
    .json({ employees: allEmployees, total_employees: allEmployees.length });
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
  const updated_by = req.user.userId;
  const {
    name,
    last_name,
    cell_number,
    role,
    age,
    active,
    job_title,
    department,
    driver_license,
    start_date,
    end_date,
    wage_per_hour,
  } = req.body;
  if (
    !name ||
    !last_name ||
    !cell_number ||
    !role ||
    !age ||
    !active ||
    !job_title ||
    !department ||
    !driver_license ||
    !start_date ||
    !wage_per_hour
  ) {
    throw new CustomError.BadRequestError(
      "Please provide all the neccesary data."
    );
  }

  const employee = new Employee({
    name,
    last_name,
    cell_number,
    role,
    age,
    active,
    employee_id: employeeId,
    job_title,
    department,
    driver_license,
    start_date,
    end_date,
    wage_per_hour,
    updated_by,
  });

  const employeeUpdated = await Employee.employeeUpdated(employee);

  if (employeeUpdated.affectedRows > 1) {
    throw new CustomError.BadRequestError("Updated failed");
  }

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "The employee was updated successfully" });
};

//  for now this will not be used
const deleteEmployee = async (req, res) => {
  const { id: employeeId } = req.params;
  if(!Number.isInteger(employeeId)){
    throw new CustomError.BadRequestError('The employee id is invalid')
  }

  await Employee.deleteEmployee(employeeId);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'The employee with id: ' + employeeId + ' was deleted' });
};

module.exports = {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
