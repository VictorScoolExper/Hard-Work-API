/* Green Work ERP by Victor Martinez */

import validator from 'validator';

const validateCreateParamsEmployee = async (req, res, next) =>{
  const params = req.body;
  const errors = {};

  const convertedCreatedBy = parseInt(params.created_by);

  if(!params.name || !validator.isAlpha(params.name)){
    errors.name = "Name is required or name must only be with alphabetical values.";
  }  

  if (!params.last_name || !validator.isAlpha(params.last_name)) {
    errors.last_name = "Last name is required and must contain only letters.";
  }

  if (
    !params.cell_number ||
    !validator.isMobilePhone(params.cell_number, "any")
  ) {
    errors.cell_number =
      "Cell number is required and must be a valid phone number.";
  }

  if (!params.role || !validator.isAlpha(params.role)) {
    errors.role = "Role is required and must contain only alphabetical values.";
  }

  if(!params.birth_date || !validator.isDate(params.birth_date)){
    errors.birth_date = "Birth date is required and must be a valid date."
  }

  if(!params.email || !validator.isEmail(params.email)) {
    errors.email = "Email is required and must be a valid email address.";
  }

  if(!params.job_title || !validator.isAlpha(params.job_title)){
    errors.job_title = "Job title is required and must contain letters only."
  }

  if(!params.department || !validator.isAlpha(params.department)){
    errors.department = "Department is required and must contain letters only."
  }

  // if(!params.driver_license){
  //   errors.driver_license = "Driver License has not "
  // }

  if(!params.start_date || !validator.isDate(params.start_date)){
    errors.start_date = "Start date is required or must add as a date value."
  }

  if(!params.wage_per_hour || !validator.isNumeric(params.wage_per_hour)){
    errors.wage_per_hour = "Wage per hour is required and must be a number value."
  }

  if(!convertedCreatedBy || !Number.isInteger(convertedCreatedBy)){
    errors.created_by = "Created by is required and must be an integer."
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
}

const validateUpdateParamsEmployee = async (req, res, next) =>{
  const params = req.body;
  const errors = {};

  const convertedCreatedBy = parseInt(params.created_by);

  if(!params.name || !validator.isAlpha(params.name)){
    errors.name = "Name is required or name must only be with alfabeltical values.";
  }  

  if (!params.last_name || !validator.isAlpha(params.last_name)) {
    errors.last_name = "Last name is required and must contain only letters.";
  }

  if (
    !params.cell_number ||
    !validator.isMobilePhone(params.cell_number, "any")
  ) {
    errors.cell_number =
      "Cell number is required and must be a valid phone number.";
  }

  if (!params.role || !validator.isAlpha(params.role)) {
    errors.role = "Role is required and must contain only letters.";
  }

  if(!params.birth_date || !validator.isDate(params.birth_date)){
    errors.birth_date = "Birth date is required and must be a valid date."
  }

  if(!params.email || !validator.isEmail(params.email)) {
    errors.email = "Email is required and must be a valid email address.";
  }

  if(!params.role || !validator.isAlpha(params.role)){
    errors.role = "Role is required and must contain letters only."
  }

  if(!params.job_title || !validator.isAlpha(params.job_title)){
    errors.job_title = "Job title is required and must contain letters only."
  }

  if(!params.department || !validator.isAlpha(params.department)){
    errors.department = "Department is required and must contain letters only."
  }

  // if(!params.driver_license){
  //   errors.driver_license = "Driver License has not "
  // }

  if(!params.start_date || !validator.isDate(params.start_date)){
    errors.start_date = "Start date is required or must add as a date value."
  }

  if(!params.wage_per_hour || !validator.isNumeric(params.wage_per_hour)){
    errors.wage_per_hour = "Wage per hour is required and must be a number value."
  }

  if(!convertedCreatedBy || !Number.isInteger(convertedCreatedBy)){
    errors.created_by = "Created by is required and must be an integer."
  }

  if(!params.image_name){
    errors.image_name = "Image is required."
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
}


export {
  validateCreateParamsEmployee,
  validateUpdateParamsEmployee
}