const { db } = require("../db/connect");
const bcrypt = require("bcrypt");
const User = require("./user");

class Employee extends User {
  constructor(employee) {
    super(employee);
    this.employee_id = employee.employee_id;
    this.image_name = employee.image_name;
    this.job_title = employee.job_title;
    this.department = employee.department;
    this.driver_license = employee.driver_license;
    this.start_date = employee.start_date;
    this.wage_per_hour = employee.wage_per_hour;
    this.created_by = employee.created_by;
    this.updated_by = employee.updated_by;
  }
  // TODO apply the Employee class
  static createEmployeeUser (employee) {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_insert_employee(?,?,?,?,?,?,?,?,?,?,?,?,?)", 
      [
        employee.name,
        employee.last_name,
        employee.cell_number,
        employee.role,
        employee.birth_date,
        employee.imageName,
        employee.job_title,
        employee.department,
        employee.driver_license,
        employee.start_date,
        employee.wage_per_hour,
        employee.created_by,
        employee.email
      ], (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  static getAllEmployee() {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_get_employee_list()",
      (error, result) => {
        return error ? reject(error) : resolve(result[0]);
      });
    });
  }
  
  static getSingleEmployee(employee_id){
    return new Promise((resolve, reject) => {
      db.query("CALL sp_get_employee_by_id(?, @p_name, @p_last_name, @p_cell_number, @p_role, @p_birth_date, @p_active, @p_image_name, @p_job_title, @p_department, @p_driver_license, @p_start_date,  @p_wage_per_hour, @p_email)", 
      employee_id,
      (error, result) => {
        error ? reject(error) : db.query("SELECT @p_name, @p_last_name, @p_cell_number, @p_role, @p_birth_date, @p_active, @p_image_name, @p_job_title, @p_department, @p_driver_license, @p_start_date, @p_wage_per_hour, @p_email;",
        (error, result) =>{
          error ? reject(error) : resolve(result[0])
        });
      });
    });
  }

  // This one has used Employee class
  static employeeUpdated(employee){
    return new Promise((resolve, reject) => {
      db.query("CALL sp_update_employee_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
      [
        employee.employee_id,
        employee.name.toLowerCase(),
        employee.last_name.toLowerCase(),
        employee.cell_number,
        employee.role.toLowerCase(),
        employee.birth_date,
        employee.active,
        employee.image_name,
        employee.job_title.toLowerCase(),
        employee.department,
        employee.driver_license,
        employee.start_date, 
        employee.wage_per_hour,
        employee.edited_by,
        employee.email
      ], (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  // delete employee and user info
  static deleteEmployee(employeeId){
    return new Promise((resolve, reject) => {
      db.query('CALL sp_delete_employee_and_user(?)', employeeId,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    })
  }
}

module.exports = Employee;
