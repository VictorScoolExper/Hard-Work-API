require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        lifetime: process.env.JWT_LIFETIME,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER ,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    },
    node: {
        NODE_ENV: process.env.NODE_ENV || 'production' 
    },
    aws: {
        S3_BUCKET: process.env.S3_BUCKET_NAME,
        BUCKET_REGION: process.env.BUCKET_REGION,
        ACCESS_KEY: process.env.ACCESS_KEY,
        SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY
    }
}