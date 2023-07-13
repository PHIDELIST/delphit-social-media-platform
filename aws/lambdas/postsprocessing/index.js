// Import required modules
const process = require('process');
const {getClient, getOriginalImage, processImage, uploadProcessedImage} = require('./s3-posts-processing.js')
const path = require('path');

// Retrieve environment variables
const bucketName = process.env.DEST_BUCKET_NAME
const folderInput = process.env.FOLDER_INPUT
const folderOutput = process.env.FOLDER_OUTPUT
const width = parseInt(process.env.PROCESS_WIDTH)
const height = parseInt(process.env.PROCESS_HEIGHT)

// Create an S3 client using the AWS SDK for JavaScript
client = getClient();

// Export an async function as the handler for AWS Lambda
exports.handler = async (event) => {
    // Extract the name of the source bucket and key from the Lambda event
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  console.log('srcBucket',srcBucket)
  console.log('srcKey',srcKey)
// Extract the name of the source bucket and key from the Lambda event
  const dstBucket = bucketName;

  filename = path.parse(srcKey).name
  const dstKey = `${folderOutput}/${filename}.jpeg`
  console.log('dstBucket',dstBucket)
  console.log('dstKey',dstKey)

 // Retrieve the original image from the source bucket
  const originalImage = await getOriginalImage(client,srcBucket,srcKey)
  // Process the original image to create a new image with the specified width and height
  const processedImage = await processImage(originalImage,width,height)
  // Upload the processed image to the destination bucket with the specified key
  await uploadProcessedImage(client,dstBucket,dstKey,processedImage)
};