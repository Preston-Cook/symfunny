import { NextResponse } from 'next/server';
import s3Client from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;

export async function GET(request: Request) {
  const body = await request.json();

  // TODO: validate that filename is valid using Zod
  const { fileName } = body;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
  });

  let signedUrl;
  try {
    signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ signedUrl }, { status: 200 });
}
