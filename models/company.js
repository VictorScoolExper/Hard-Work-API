const { db } = require("../db/connect");

class Company {
  constructor(company) {
    this.company_id = company.company_id;
    this.name = company.name;
    this.service_type = company.service_type;
  }

  // create sp to add company
  static createCompany(company) {
    return new Promise((resolve, reject) => {
      db.query(
        "CALL sp_create_company(?,?)",
        [company.name.toLowerCase(), company.service_type.toLowerCase()],
        (error, result) => {
          error ? reject(error) : resolve(result);
        }
      );
    });
  }
  // create sp to edit company by company_id
  static getCompanyById(id) {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_getCompanyById(?)", id, (error, result) => {
        error ? reject(error) : resolve(result[0][0]);
      });
    });
  }

  // get all companies
  static getAllCompanies() {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_get_companies", (error, result) => {
        error ? reject(error) : resolve(result[0]);
      });
    });
  }

  // update company
  static updateCompany(id, company) {
    return new Promise((resolve, reject) => {
      db.query(
        "CALL sp_update_company(?,?,?)",
        [id, company.name.toLowerCase(), company.service_type.toLowerCase()],
        (error, result) => {
          error ? reject(error) : resolve(result);
        }
      );
    });
  }

  // checks if company exists
  static checkCompanyExistence(id) {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_check_company_exists(?)", [id], (error, result) => {
        error
          ? reject(error)
          : resolve(
              result[0][0][
                "EXISTS(SELECT 1 FROM companies WHERE company_id = p_company_id)"
              ]
            );
      });
    });
  }
}

module.exports = Company;
