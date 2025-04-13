/*
  Warnings:

  - Added the required column `updatedAt` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "review_ReviewEmail_key";

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
