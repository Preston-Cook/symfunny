import { NextResponse } from 'next/server';
import { createSoundSchemaServer } from '@/schemas/CreateSoundSchema';
import prisma from '@/lib/db';

export async function GET() {}

export async function POST(req: Request) {
  const body = await req.json();

  // validate form using zod

  return NextResponse.json({ message: 'created' }, { status: 201 });
}

export async function DELETE() {}

export async function PATCH() {}
