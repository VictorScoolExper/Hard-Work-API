const { db } = require("../db/connect");

// function constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.created_at = new Date();
};

User.findEmail = (email, results) => {
  return new Promise((resolve, reject) => {
    db.query("CALL sp_find_auth(?)", email, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
};

User.create = (newUser, result) => {
  db.query(
    "CALL create_user(?, ?, ?, ?)",
    [newUser.name, newUser.email, newUser.password, newUser.created_at],
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
