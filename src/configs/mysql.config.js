/* Green Work ERP by Victor Martinez */

const config = require('./config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

module.exports = dbconfig;