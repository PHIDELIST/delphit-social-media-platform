// Import the required modules
const sharp = require('sharp');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

// Define a function to create an S3 client instance
function getClient(){
  const client = new S3Client();
  return client;
}

// Define a function to retrieve the original image from S3
async function getOriginalImage(client,srcBucket,srcKey){
  // Define the parameters for retrieving the object from S3
  const params = {
    Bucket: srcBucket,
    Key: srcKey
  };
  // Define the command for retrieving the object from S3
  const command = new GetObjectCommand(params);
  // Send the command to S3 and retrieve the response
  const response = await client.send(command);

  // Retrieve the image data from the response
  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  // Return the image data as a buffer
  return buffer;
}

// Define a function to process the image with Sharp
async function processImage(image,width,height){
  // Use Sharp to resize and convert the image to PNG format
  const processedImage = await sharp(image)
    .resize(width, height)
    .png()
    .toBuffer();
  
  // Return the processed image data as a buffer
  return processedImage;
}

// Define a function to upload the processed image to S3
async function uploadProcessedImage(client,dstBucket,dstKey,image){
  // Define the parameters for uploading the object to S3
  const params = {
    Bucket: dstBucket,
    Key: dstKey,
    Body: image,
    ContentType: 'image/jpeg'
  };
  // Define the command for uploading the object to S3
  const command = new PutObjectCommand(params);
  // Send the command to S3 and retrieve the response
  const response = await client.send(command);

  // Log the response and return it
  console.log('response',response);
  return response;
}

// Export the functions for use in other modules
module.exports = {
  getClient: getClient,
  getOriginalImage: getOriginalImage,
  processImage: processImage,
  uploadProcessedImage: uploadProcessedImage
}