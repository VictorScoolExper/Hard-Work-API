require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notasecreta!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'Password123***',
        database: process.env.MYSQL_DB || 'hard_work_erp_db'
    }
}