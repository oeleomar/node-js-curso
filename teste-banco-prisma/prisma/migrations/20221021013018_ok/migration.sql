/*
  Warnings:

  - You are about to drop the column `titulo` on the `process` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "process_titulo_key";

-- AlterTable
ALTER TABLE "process" DROP COLUMN "titulo",
ADD COLUMN     "setorId" TEXT;

-- CreateTable
CREATE TABLE "Setor" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setor_title_key" ON "Setor"("title");

-- AddForeignKey
ALTER TABLE "process" ADD CONSTRAINT "process_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
