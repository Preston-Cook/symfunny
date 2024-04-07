/*
  Warnings:

  - Changed the type of `creator` on the `Sound` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "creator",
ADD COLUMN     "creator" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Creator";
