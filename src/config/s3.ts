import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;
const awsS3Bucket = process.env.AWS_S3_BUCKET;

if (!awsAccessKeyId || !awsSecretAccessKey || !awsRegion || !awsS3Bucket) {
  throw new Error("AWS credentials or region or bucket name not set in environment variables");
}

const client = new S3Client({
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
  region: awsRegion,
});

/**
 * Uploads a file to S3 bucket
 * @param file The file to upload (typically from multer)
 * @returns The URL of the uploaded file
 */
export const uploadToS3 = async (file: Express.Multer.File) => {
  if (!file) {
    return null;
  }

  const key = file.filename || `${Date.now()}-${file.originalname}`;
  
  const params = {
    Bucket: awsS3Bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await client.send(command);

  return `https://${awsS3Bucket}.s3.${awsRegion}.amazonaws.com/${key}`;
};

/**
 * Deletes a file from S3 bucket
 * @param fileUrl The complete URL of the file to delete
 * @returns Promise that resolves when delete operation completes
 */
export const deleteFromS3 = async (fileUrl: string | null) => {
  if (!fileUrl) return;

  try {
    const urlParts = new URL(fileUrl);
    const key = urlParts.pathname.substring(1);
    
    const params = {
      Bucket: awsS3Bucket,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await client.send(command);
    console.log(`File deleted from S3: ${key}`);
  } catch (error) {
    console.error(`Error deleting file from S3: ${error}`);
    throw error;
  }
};

export { client, awsS3Bucket, awsRegion };