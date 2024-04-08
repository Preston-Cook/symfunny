import { NextResponse } from 'next/server';
import s3Client from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;

export async function GET() {
  const key = uuidv4();

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: 'video/webm',
    Tagging: '',
  });

  let signedUrl;
  try {
    signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ signedUrl }, { status: 200 });
}
