/* Green Work ERP by Victor Martinez */

import * as config from '../../configs/config.js';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import crypto from 'crypto';

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.bucketRegion,
});

const addObjectS3Bucket = async (buffer, file) => {

  const imageName = randomImageName();

  const params = {
    Bucket: config.aws.bucketName,
    // The name of the file
    // Key: req.file.originalname,
    Key: imageName,
    // The buffer is the image
    // TODO: check req.file.buffer or delete
    // Body: req.file.buffer
    Body: buffer,
    // we set the type
    ContentType: file.mimetype,
  };

  // this tells S3 how to upload the object 
  const command = new PutObjectCommand(params);

  try {
    await s3.send(command);
    return imageName;
  } catch (error) {
    return error;
  }
};

const createSignedUrls = async (paramList) => {
  let list = paramList;
  for (const object of list) {
    if (object.image_name) {
      const getObjectParams = {
        Bucket: config.aws.bucketName,
        Key: object.image_name,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 1000 });
      object.imageUrl = url;
    } else {
      object.imageUrl = null;
    }
  }
  return list;
};

const updateS3ObjectBucket = async (image_name, file, buffer) => {
  const params = {
      Bucket: config.aws.bucketName,
      Key: image_name,
      Body: buffer,
      ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    await s3.send(command);
  } catch (error) {
    throw new Error('failed update image');
  }
  
  return {msg: 'updated!', status: '200'};
};

const deleteObjectS3Bucket = async (objectKey) => {
  const params = {
    Bucket: config.aws.bucketName,
    Key: objectKey,
  };

  const command = new DeleteObjectCommand(params);
  
  try {
    await s3.send(command);
  } catch (error) {
    throw new Error('could not delete image');
  }
  

  return {msg: 'deleted correctly', status: 200};
}

export {
    addObjectS3Bucket,
    createSignedUrls,
    updateS3ObjectBucket,
    deleteObjectS3Bucket
};
