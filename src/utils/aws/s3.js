/* Green Work ERP by Victor Martinez */

const config = require("../../configs/config");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const crypto = require("crypto");

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
    // Body: req.file.buffer,
    Body: buffer,
    // we set the type
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  return imageName;
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

  await s3.send(command);

  return
};

const deleteObjectS3Bucket = async (objectKey) => {
  const params = {
    Bucket: config.aws.bucketName,
    Key: objectKey,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);

  return
}

module.exports = {
    addObjectS3Bucket,
    createSignedUrls,
    updateS3ObjectBucket,
    deleteObjectS3Bucket
};
