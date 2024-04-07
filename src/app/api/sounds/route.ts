import { NextResponse } from 'next/server';
import { createSoundSchemaServer } from '@/schemas/CreateSoundSchema';
import prisma from '@/lib/db';
import { ZodError } from 'zod';

export async function GET() {
  let sounds;
  try {
    sounds = await prisma.sound.findMany();
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: sounds }, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();

  // validate form using zod
  try {
    createSoundSchemaServer.parse(body);
  } catch (err) {
    return NextResponse.json(
      { error: (err as ZodError).flatten().fieldErrors },
      {
        status: 400,
      },
    );
  }

  const { name, creator, url }: { name: string; creator: string; url: string } =
    body;

  // save new sound to db
  try {
    await prisma.sound.create({
      data: {
        name,
        creator,
        url,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'created' }, { status: 201 });
}
