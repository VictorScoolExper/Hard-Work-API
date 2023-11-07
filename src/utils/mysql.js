/* Green Work ERP by Victor Martinez */

import mysql from 'mysql';
import dbconfig from '../configs/mysql.config.js';

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

export {
  connectDB,
  connection
};