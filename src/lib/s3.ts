import { S3Client } from '@aws-sdk/client-s3';
import { log } from 'console';

const region = process.env.S3_BUCKET_REGION as string;
const accessKeyId = process.env.S3_BUCKET_ACCESS_KEY as string;
const secretAccessKey = process.env.S3_BUCKET_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default s3Client;
