/* Green Work ERP by Victor Martinez */

import { connection } from "../utils/index.js";
import bcrypt from "bcrypt";
import User from "./user.js";
// TODO: utilize class or delete constructor
class Employee extends User {
  constructor(
    user_id,
    name,
    last_name,
    cell_number,
    role,
    birth_date,
    email,
    employee_id,
    image_name,
    job_title,
    department,
    driver_license,
    start_date,
    wage_per_hour
  ) {
    super(user_id, name, last_name, cell_number, role, birth_date, email);
    this.employee_id = employee_id;
    this.image_name = image_name;
    this.job_title = job_title;
    this.department = department;
    this.driver_license = driver_license;
    this.start_date = start_date;
    this.wage_per_hour = wage_per_hour;
  }
  // TODO apply the Employee class
  createEmployeeUser(created_by) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_insert_employee(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          this.name,
          this.last_name,
          this.cell_number,
          this.role,
          this.birth_date,
          this.image_name,
          this.job_title,
          this.department,
          this.driver_license,
          this.start_date,
          this.wage_per_hour,
          created_by,
          this.email,
        ],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  getAllEmployee() {
    return new Promise((resolve, reject) => {
      connection.query("CALL sp_get_employee_list()", (error, result) => {
        return error ? reject(error) : resolve(result[0]);
      });
    });
  }

  getSingleEmployee(employee_id) {
    return new Promise((resolve, reject) => {
      // TODO: optimize sp and this function
      connection.query(
        "CALL sp_get_employee_by_id(?, @p_name, @p_last_name, @p_cell_number, @p_role, @p_birth_date, @p_active, @p_image_name, @p_job_title, @p_department, @p_driver_license, @p_start_date,  @p_wage_per_hour, @p_email)",
        employee_id,
        (error, result) => {
          error
            ? reject(error)
            : connection.query(
                "SELECT @p_name, @p_last_name, @p_cell_number, @p_role, @p_birth_date, @p_active, @p_image_name, @p_job_title, @p_department, @p_driver_license, @p_start_date, @p_wage_per_hour, @p_email;",
                (error, result) => {
                  error ? reject(error) : resolve(result[0]);
                }
              );
        }
      );
    });
  }

  // This one has used Employee class
  static employeeUpdated(employee) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_update_employee_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
          employee.email,
        ],
        (error, result) => {
          return error ? reject(error) : resolve(result);
        }
      );
    });
  }

  // delete employee and user info
  static deleteEmployee(employeeId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_delete_employee_and_user(?)",
        employeeId,
        (error, result) => {
          return error ? reject(error) : resolve(result);
        }
      );
    });
  }
}

export default Employee;
