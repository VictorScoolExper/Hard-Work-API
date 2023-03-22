require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecreta!',
        lifetime: process.env.JWT_LIFETIME || '1d',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'Password123***',
        database: process.env.MYSQL_DB || 'hard_work_erp_db'
    },
    node: {
        NODE_ENV: process.env.NODE_ENV || 'production' 
    }
}