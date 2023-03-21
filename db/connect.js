const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

const connection = mysql.createConnection(dbconfig);

const connectDB = () => {
  connection.connect((err) => {
    if (err) {
      console.log('[db err]', err);
      setTimeout(connectDB, 200);
    } else {
      console.log('DB connected!!!');
    }
  });

  connection.on('error', (err) => {
    console.log('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectDB();
    } else {
      throw err;
    }
  });

  return connection;
}

module.exports = {
  connectDB,
  db: connection
};