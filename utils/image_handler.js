const path = require('path');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const middlewareUploadImage = upload.single('image');
    

module.exports = {
    middlewareUploadImage,
}

// https://www.youtube.com/watch?v=eQAIojcArRY
