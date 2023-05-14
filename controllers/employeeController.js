const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Employee = require("../models/employee");

const config = require("../config");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
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
    birth_date,
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
    !birth_date ||
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
    .resize({ height: 1800, width: 1200, fit: "contain" })
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
    name: name.toLowerCase(),
    last_name: last_name.toLowerCase(),
    cell_number,
    role: role.toLowerCase(),
    birth_date,
    email,
    job_title: job_title.toLowerCase(),
    department: department.toLowerCase(),
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
    if (employee.image_name) {
      const getObjectParams = {
        Bucket: config.aws.bucketName,
        Key: employee.image_name,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      employee.imageUrl = url;
      // console.log(url)
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
    image_name
  } = req.body;

  if (
    !name ||
    !last_name ||
    !cell_number ||
    !role ||
    !birth_date ||
    !active ||
    !job_title ||
    !department ||
    !driver_license ||
    !start_date ||
    !wage_per_hour ||
    !email ||
    !image_name ||
    !created_by
  ) {
    throw new CustomError.BadRequestError(
      "Please provide all the neccesary data."
    );
  }

  if (req.file) {
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1800, width: 1200, fit: "contain" })
      .toBuffer();

    const params = {
      Bucket: config.aws.bucketName,
      // The name of the file
      // Key: req.file.originalname,
      Key: image_name,
      // The buffer is the image
      // Body: req.file.buffer,
      Body: buffer,
      // we set the type
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);
  }

  const employee = new Employee({
    name,
    last_name,
    cell_number,
    role,
    birth_date,
    active,
    employee_id: employeeId,
    job_title,
    department,
    driver_license,
    start_date,
    wage_per_hour,
    edited_by: created_by,
    email,
    image_name
  });

  await Employee.employeeUpdated(employee);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "The employee was updated successfully" });
};

//  for now this will not be used
const deleteEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  if (!Number.isInteger(parseInt(employeeId))) {
    throw new CustomError.BadRequestError("The employee id is invalid");
  }

  const employee = await Employee.getSingleEmployee(employeeId);

  if (employee["@p_name"] === null) {
    throw new CustomError.BadRequestError("The employee does not exist");
  }

  // if the employee image exists
  if (employee["@p_image_name"]) {
    // delete it from the bucket
    const params = {
      Bucket: config.aws.bucketName,
      Key: employee["@p_image_name"],
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  }

  // console.log(employee['@p_image_name']);

  await Employee.deleteEmployee(employeeId);

  res
    .status(StatusCodes.CREATED)
    .json({
      msg:
        `The employee ${employee["@p_name"]}  ${employee["@p_last_name"]} with id: ` +
        employeeId +
        " was deleted",
    });
};

module.exports = {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
