const { db } = require("../db/connect");

class Company {
  constructor(company) {
    this.company_id = company.company_id;
    this.name = company.name;
  }

  // create sp to add company
  static createCompany(name) {
    return new Promise((resolve, reject) => {
      db.query("CALL sp_add_company(?)", name, (error, result) => {
        error ? reject(error) : resolve(result);
      });
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
  static getAllCompanies(){
    return new Promise((resolve, reject) => {
        db.query("CALL sp_get_all_companies()", (error, result) => {
          error ? reject(error) : resolve(result[0]);
        });
    });
  }

  // update company
  static updateCompany(id, name){
    return new Promise((resolve, reject) => {
        db.query("CALL sp_update_company(?,?)", [id, name], (error, result) => {
          error ? reject(error) : resolve(result);
        });
    });
  }

}

module.exports = Company;
