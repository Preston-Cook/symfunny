/*
  Warnings:

  - Added the required column `updatedAt` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sound" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
