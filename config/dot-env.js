require('dotenv').config();

module.exports ={
    environment: process.env.ENVIRONMENT,
    port : process.env.PORT || 4000,
    clientBaseUrl: process.env.CLIENT_BASE_URL,
    emaiUserToNotDelete: process.env.EMAIL_USER_TO_NOT_DELETE,
    aws : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        accessKeySecret : process.env.AWS_ACCESS_KEY_SECRET,
        bucketName : process.env.AWS_BUCKET_NAME
    },
    db : {
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
}