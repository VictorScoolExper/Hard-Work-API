/* Green Work ERP by Victor Martinez */

import * as dotenv from 'dotenv';
dotenv.config();


const app = {
    port: process.env.PORT || 4000,
}; 

const jwt = {
    secret: process.env.JWT_SECRET,
    lifetime: process.env.JWT_LIFETIME,
}

const mysql = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
};

const node = {
    NODE_ENV: process.env.NODE_ENV || 'production' 
};

const aws = {
    bucketName: process.env.BUCKET_NAME,
    bucketRegion: process.env.BUCKET_REGION,
    accessKey: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
}

export {
    app,
    jwt,
    mysql,
    node,
    aws
}