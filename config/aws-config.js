const Aws = require('aws-sdk');
const { aws } = require('./dot-env');

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId : aws.accessKeyId,
    secretAccessKey : aws.accessKeySecret
})

module.exports = {s3};