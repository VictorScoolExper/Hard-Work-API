const { db } = require("../db/connect");
const bcrypt = require("bcrypt");
// TODO: utilize class or delete constructor
// function constructor
const User = function (user) {
  this.user_id = user.user_id;
  this.name = user.name;
  this.last_name = user.last_name;
  this.cell_number = user.cell_number;
  this.role = user.role;
  this.birth_date = user.birth_date
  this.active = user.active;
  this.email = user.email;
  this.password = user.password;
  this.created_at = new Date();
};

User.getUserInfo = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL sp_get_user_auth(?);",
      email,
      (error, result) => {
        return error
          ? reject(error)
          : resolve(result[0][0]);
      }
    );
  });
};

User.findEmailAuth = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL sp_bool_email_auth(?, @email_exists);",
      [email],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          // check the value of the email_exists output parameter
          db.query("SELECT @email_exists", (error, results) => {
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

User.isUserEmpty = (table) => {
  return new Promise((resolve, reject) => {
    db.query("CALL sp_check_auth_empty(@is_empty);", (error, results) => {
      if (error) {
        reject(error);
      } else {
        // check the value of the email_exists output parameter
        db.query("SELECT @is_empty AS is_empty;", (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]["is_empty"]);
          }
        });
      }
    });
  });
};

User.createUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
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
          db.query(
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

User.login = (newUser, result) => {
  db.query(
    "CALL login( ?, ?)",
    [newUser.email, newUser.password],
    (err, res) => {
      if (err) {
        console.log("Error creating new user: ", err);
        result(err, null);
        return;
      }

      console.log("Created new user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    }
  );
};

module.exports = User;
