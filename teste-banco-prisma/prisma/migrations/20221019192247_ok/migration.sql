/*
  Warnings:

  - You are about to drop the column `dataId` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Data` table. All the data in the column will be lost.
  - The primary key for the `Descricao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `descricaoId` on the `Descricao` table. All the data in the column will be lost.
  - The primary key for the `Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `descricao` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[processoId]` on the table `Descricao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Made the column `text` on table `Data` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `Data` required. This step will fail if there are existing NULL values in that column.
  - The required column `id` was added to the `Descricao` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `processoId` to the `Descricao` table without a default value. This is not possible if the table is not empty.
  - The required column `idItems` was added to the `Items` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_dataId_fkey";

-- DropForeignKey
ALTER TABLE "Descricao" DROP CONSTRAINT "Descricao_descricaoId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_id_fkey";

-- DropIndex
DROP INDEX "Data_dataId_key";

-- AlterTable
ALTER TABLE "Data" DROP COLUMN "dataId",
DROP COLUMN "style",
ADD COLUMN     "descricaoId" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "text" SET NOT NULL,
ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "level" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Descricao" DROP CONSTRAINT "Descricao_pkey",
DROP COLUMN "descricaoId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "processoId" TEXT NOT NULL,
ADD CONSTRAINT "Descricao_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Items" DROP CONSTRAINT "Items_pkey",
DROP COLUMN "descricao",
DROP COLUMN "id",
ADD COLUMN     "content" TEXT[],
ADD COLUMN     "dataId" TEXT,
ADD COLUMN     "idItems" TEXT NOT NULL,
ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("idItems");

-- CreateIndex
CREATE UNIQUE INDEX "Data_id_key" ON "Data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Descricao_processoId_key" ON "Descricao"("processoId");

-- AddForeignKey
ALTER TABLE "Descricao" ADD CONSTRAINT "Descricao_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_descricaoId_fkey" FOREIGN KEY ("descricaoId") REFERENCES "Descricao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
