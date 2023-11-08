/* Green Work ERP by Victor Martinez */

import { connection } from "../utils/index.js";

class JobTitle {
  constructor(jobTitle) {
    this.job_title_id = jobTitle.job_title_id;
    this.name = jobTitle.name;
    this.description = jobTitle.description;
  }

  createJobTitle() {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_insert_job_title(?,?)",
        [this.name, this.description],
        (error, result) => {
          if (error) {
            reject("failed to insert job title");
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static selectJobTitles() {
    return new Promise((resolve, reject) => {
      connection.query("CALL sp_select_job_titles()"),
        (error, result) => {
          if (error) {
            reject("failed to get job title");
          } else {
            resolve(result[0]);
          }
        };
    });
  }

  static selectJobTitleName(job_title_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_select_job_title_name(?)",
        job_title_id,
        (error, result) => {
          if (error) {
            reject("failed to get job title");
          } else {
            resolve(result[0][0].name);
          }
        }
      );
    });
  }

  updateJobTitle() {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_update_company_role(?,?,?)",
        [this.job_title_id, this.name, this.description],
        (error, result) => {
          if (error) {
            reject("failed to update job title");
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  deleteJobTitle() {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_delete_job_title(?)",
        this.job_title_id,
        (error, result) => {
          if (error) {
            reject("failed to delete job title");
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

export default JobTitle;
