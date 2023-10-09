/* Green Work ERP by Victor Martinez */

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
        bucketName: process.env.BUCKET_NAME,
        bucketRegion: process.env.BUCKET_REGION,
        accessKey: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
}