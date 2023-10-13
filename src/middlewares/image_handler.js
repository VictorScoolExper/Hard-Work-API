/* Green Work ERP by Victor Martinez */

import path from 'path';
import {StatusCodes} from 'http-status-codes';
import * as CustomError from '../errors/index.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const middlewareUploadImage = upload.single('image');
    

export {
    middlewareUploadImage,
}


