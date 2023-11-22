/* Green Work ERP by Victor Martinez */
import { connection } from "../utils/index.js";

// TODO: utilize class or delete constructor
// function constructor
class User {
  constructor(user_id, name, last_name, cell_number, role, birth_date, email) {
    this.user_id = user_id;
    this.name = name;
    this.last_name = last_name;
    this.cell_number = cell_number;
    this.role = role;
    this.birth_date = birth_date;
    this.email = email;
  }

  /**
   * Retrieves user information from the database using the provided email address.
   *
   * @param {string} email - The email address of the user to retrieve information for.
   * @returns {Promise<Object|null>} A Promise that resolves to the user information object if found,
   *                                  or null if no user with the provided email exists.
   */
  static getUserInfo = (email) => {
    return new Promise((resolve, reject) => {
      connection.query("CALL sp_select_user_auth(?);", email, (error, result) => {
        return error ? reject(error) : resolve(result[0][0]);
      });
    });
  };

  /**
   * Checks if an email exists in the database by calling a stored procedure.
   *
   * @param {string} email - The email address to check for existence.
   * @returns {Promise<boolean>} A Promise that resolves to true if the email exists,
   *                            or false if it doesn't.
   */
  static findEmailAuth = (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_bool_email_auth(?, @email_exists);",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            // check the value of the email_exists output parameter
            connection.query("SELECT @email_exists", (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results[0]["@email_exists"]);
              }
            });
          }
        }
      );
    });
  };

  /**
   * Checks if a specific authentication-related table is empty by calling a stored procedure.
   *
   * @returns {Promise<boolean>} A Promise that resolves to true if the table is empty,
   *                            or false if it contains data.
   */
  static isUserEmpty = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "CALL sp_check_auth_empty(@is_empty);",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            // check the value of the email_exists output parameter
            connection.query(
              "SELECT @is_empty AS is_empty;",
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results[0]["is_empty"]);
                }
              }
            );
          }
        }
      );
    });
  };

  /**
   * Creates a new user in the database with the provided user data.
   *
   * @param {Object} data - An object containing user data including name, last_name,
   *                       cell_number, role, birth_date, email, and password.
   * @returns {Promise<Object|null>} A Promise that resolves to the newly created user object if successful,
   *                                  or null if the creation fails.
   */
  static createUser = (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `CALL sp_insert_user(?,?,?,?,?,?,?);`,
        [
          data.name,
          data.last_name,
          data.cell_number,
          data.role,
          data.birth_date,
          data.email,
          data.password,
        ],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            // check the value of the email_exists output parameter
            connection.query(
              "SELECT * FROM users WHERE user_id = LAST_INSERT_ID();",
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results[0]);
                }
              }
            );
          }
        }
      );
    });
  };
}
export default User;
