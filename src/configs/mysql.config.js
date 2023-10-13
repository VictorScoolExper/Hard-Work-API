/* Green Work ERP by Victor Martinez */

import * as config from './config.js';

const dbconfig = {
    host: config.mysql.host,
    user: 'root',
    // user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

export default dbconfig;