const mysql = require('mysql');

// function constructor
function Auth() {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.created_at = new Date();
}

Auth.login = (newUser, result) => {
  db.query(
    "CALL login(?, ?, ?)",
    [newUser.username, newUser.email, newUser.password],
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

module.exports = Auth;
