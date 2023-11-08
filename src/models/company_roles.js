/* Green Work ERP by Victor Martinez */

import { connection } from "../utils/index.js";

class CompanyRole {
  constructor(companyRoles) {
    this.role_id = companyRoles.role_id;
    this.name = companyRoles.name;
    this.description = companyRoles.description;
  }

  createCompanyRole() {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_insert_company_role(?,?)",
        [this.name, this.description],
        (error, result) => {
          if (error) {
            reject("failed to create company role");
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static getCompanyRoles() {
    return new Promise((resolve, reject) => {
      connection.query("CALL sp_select_company_roles()"),
        (error, result) => {
          if (error) {
            reject("failed to get company roles");
          } else {
            resolve(result[0]);
          }
        };
    });
  }

  static selectCompanyRoleName(role_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_select_company_role_name(?)",
        role_id,
        (error, result) => {
          if (error) {
            reject("failed to get role name");
          } else {
            resolve(result[0][0].name);
          }
        }
      );
    });
  }
  
  updateCompanyRole(){
    return new Promise((resolve, reject) => {
        connection.query(
          "CALL sp_update_company_role(?,?,?)",
          [this.role_id, this.name, this.description],
          (error, result) => {
            if (error) {
              reject("failed to update role");
            } else {
              resolve(result);
            }
          }
        );
      });
  }

  deleteCompanyRole() {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_delete_company_role(?)",
        this.role_id,
        (error, result) => {
          if (error) {
            reject("failed to delete role");
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

export default CompanyRole;
