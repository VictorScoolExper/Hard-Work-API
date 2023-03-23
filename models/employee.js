const { db } = require("../db/connect");
const bcrypt = require("bcrypt");

class Employee {
  constructor(employee) {
    this.employee_id = employee.employee_id;
    this.job_title = employee.job_title;
    this.department = employee.department;
    this.driver_license = employee.driver_license;
    this.start_date = employee.start_date;
    this.end_date = employee.end_date;
    this.wage_per_hour = employee.wage_per_hour;
  }

  static createEmployee(user) {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_create_employee(?,?,?,?,?)", [user], (error, result) => {
        return error ? reject(error) : resolve(result);
      });
    });
  }

  
}
