-- CreateEnum
CREATE TYPE "Creator" AS ENUM ('David', 'Jeremiah');

-- CreateTable
CREATE TABLE "Sound" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creator" "Creator" NOT NULL,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);
