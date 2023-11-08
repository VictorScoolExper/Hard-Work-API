/* Green Work ERP by Victor Martinez */

import { connection } from "../utils/index.js";

class CompanyDepartment {
  constructor(company_department) {
    this.department_id = company_department.department_id;
    this.name = company_department.name;
    this.description = company_department.description;
  }

  createDepartment() {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_create_company_department(?,?)",
        [this.name.toLowerCase(), this.description.toLowerCase()],
        (error, result) => {
          if (error) {
            reject("failed insert");
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  selectDepartments() {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_select_company_departments()",
        (error, result) => {
          if (error) {
            reject("failed to select departments");
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  }

  static selectDepartmentName(department_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_select_department_name(?)",
        department_id,
        (error, result) => {
          if (error) {
            reject("failed to get role");
          } else {
            resolve(result[0][0].name);
          }
        }
      );
    });
  };

  updateDepartment(){
    return new Promise((resolve, reject) => {
        connection.query(
            "CALL sp_update_company_department(?,?,?)",
            [this.department_id, this.name, this.description],
            (error, reject) => {
                if (error) {
                    reject("failed to update department");
                  } else {
                    resolve(result);
                  }
            }
        )
    })
  };

  deleteDepartment(){
    return new Promise((resolve, reject) => {
        connection.query(
            "CALL sp_delete_department_except_admin(?)",
            this.department_id,
            (error, reject) => {
                if (error) {
                    reject("failed to delete department");
                  } else {
                    resolve(result);
                  }
            }
        )
    })
  }
}

export default CompanyDepartment;
