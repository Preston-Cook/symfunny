import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface DeleteRouteProps {
  params: {
    id: string;
  };
}

export async function DELETE(
  req: Request,
  { params: { id } }: DeleteRouteProps,
) {
  await prisma.sound.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(
    { message: 'deleted' },
    {
      status: 200,
    },
  );
}
