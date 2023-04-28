const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Employee = require("../models/employee");

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
  } = req.body;
  const created_by = req.user.userId;
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

  const employee = await Employee.createEmployeeUser({
    ...req.body,
    created_by,
  });
  if (employee.affectedRows === 0) {
    throw new CustomError.BadRequestError("Was not created correctly");
  }

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User was created Successfully" });
};
// TODO: return with ids
const getAllEmployee = async (req, res) => {
  const allEmployees = await Employee.getAllEmployee();
  res.status(StatusCodes.CREATED).json({ employees: allEmployees, total_employees: allEmployees.length});
};

const getSingleEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  if(!employeeId){
    throw new CustomError.BadRequestError('Need to include a valid ID');
  }

  const employee = await Employee.getSingleEmployee(employeeId);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: employee });
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
    wage_per_hour 
  } = req.body
  if(
    !name || !last_name || 
    !cell_number || !role || 
    !age || !active || !job_title || 
    !department || !driver_license || !start_date ||
    !wage_per_hour
  ){
    throw new CustomError.BadRequestError("Please provide all the neccesary data.")
  }

  const employee = new Employee({
    name,
    last_name,
    cell_number,
    role,
    age,
    active,
    employee_id : employeeId,
    job_title,
    department,
    driver_license,
    start_date,
    end_date,
    wage_per_hour,
    updated_by
  })

  const employeeUpdated = await Employee.employeeUpdated(employee);

  if(employeeUpdated.affectedRows > 1){
    throw new CustomError.BadRequestError('Updated failed');
  }

  res.status(StatusCodes.CREATED).json({ msg: "The employee was updated successfully" });
};

//  for now this will not be used
const deleteEmployee = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "This route will not be used for now" });
};

module.exports = {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
