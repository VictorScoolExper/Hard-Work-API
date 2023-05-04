const { db } = require("../db/connect");
const bcrypt = require("bcrypt");
const User = require("./user");

class Employee extends User {
  constructor(employee) {
    super(employee);
    this.employee_id = employee.employee_id;
    this.job_title = employee.job_title;
    this.department = employee.department;
    this.driver_license = employee.driver_license;
    this.start_date = employee.start_date;
    this.end_date = employee.end_date;
    this.wage_per_hour = employee.wage_per_hour;
    this.created_by = employee.created_by;
    this.updated_by = employee.updated_by;
  }
  // TODO apply the Employee class
  static createEmployeeUser (employee) {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_insert_employee(?,?,?,?,?,?,?,?,?,?,?)", 
      [
        employee.name,
        employee.last_name,
        employee.cell_number,
        employee.role,
        employee.age,
        employee.imageLocation,
        employee.job_title,
        employee.department,
        employee.driver_license,
        employee.start_date,
        employee.wage_per_hour,
        employee.created_by
      ], (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  static getAllEmployee(is_active) {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_get_employee_list()", is_active,
      (error, result) => {
        return error ? reject(error) : resolve(result[0]);
      });
    });
  }
  
  static getSingleEmployee(employee_id){
    return new Promise((resolve, reject) => {
      db.query("CALL sp_get_employee_by_id(?, @name, @last_name, @cell_number, @role, @age, @active,@job_title, @department, @driver_license, @start_date, @end_date, @wage_per_hour)", 
      employee_id,
      (error, result) => {
        error ? reject(error) : db.query("SELECT @name, @last_name, @cell_number, @role, @age, @active, @job_title, @department, @driver_license, @start_date, @end_date, @wage_per_hour;",
        (error, result) =>{
          error ? reject(error) : resolve(result[0])
        });
      });
    });
  }
  // This one has used Employee class
  static employeeUpdated(employee){
    return new Promise((resolve, reject) => {
      db.query("CALL sp_update_employee_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
      [
        employee.employee_id,
        employee.name,
        employee.last_name,
        employee.cell_number,
        employee.role,
        employee.age,
        employee.active,
        employee.job_title,
        employee.department,
        employee.driver_license,
        employee.start_date, 
        employee.end_date,
        employee.wage_per_hour,
        employee.updated_by
      ], (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }
}

module.exports = Employee;
