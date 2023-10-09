/* Green Work ERP by Victor Martinez */
const { createSignedUrls, deleteObjectS3Bucket, addObjectS3Bucket, updateS3ObjectBucket } = require("./s3");

module.exports = {
    createSignedUrls,
    addObjectS3Bucket,
    updateS3ObjectBucket,
    deleteObjectS3Bucket
}