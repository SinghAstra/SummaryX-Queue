/*
  Warnings:

  - You are about to drop the column `stage` on the `Process` table. All the data in the column will be lost.
  - The `status` column on the `Process` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProcessStatus" AS ENUM ('PENDING', 'GENERATING_TRANSCRIPT', 'SEMANTIC_CHUNKING', 'ANALYZING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "stage",
DROP COLUMN "status",
ADD COLUMN     "status" "ProcessStatus" NOT NULL DEFAULT 'PENDING';
