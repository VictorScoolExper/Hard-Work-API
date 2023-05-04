const path = require('path');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const fs = require('fs');

const uploadImageLocal = async(locationToBeSaved, files)=>{
    if(!files){
        throw new CustomError.BadRequestError('No file uploaded!');
    }

    const image = files.images;

    if(!image.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please Upload a Image');
    }

    const maxSize = 1024 * 1024;
    if(image.size > maxSize){
        throw new CustomError.BadRequestError('Please upload image smaller than 1MB');
    }
    // organize data
    const imagePath = path.join(
        __dirname,
        `../files/${locationToBeSaved}/${image.name}`
    );

    await image.mv(imagePath);
    return {imageSrc: `/files/${locationToBeSaved}/`+`${image.name}`}
}

module.exports = {
    uploadImageLocal
}