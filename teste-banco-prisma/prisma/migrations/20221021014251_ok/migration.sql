/*
  Warnings:

  - You are about to drop the column `setorId` on the `process` table. All the data in the column will be lost.
  - You are about to drop the `Setor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `titulo` to the `process` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "process" DROP CONSTRAINT "process_setorId_fkey";

-- AlterTable
ALTER TABLE "process" DROP COLUMN "setorId",
ADD COLUMN     "titulo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Setor";
