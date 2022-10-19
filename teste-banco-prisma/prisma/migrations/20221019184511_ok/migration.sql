/*
  Warnings:

  - You are about to drop the column `processoId` on the `Descricao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Descricao" DROP CONSTRAINT "Descricao_processoId_fkey";

-- DropIndex
DROP INDEX "Descricao_processoId_key";

-- AlterTable
ALTER TABLE "Descricao" DROP COLUMN "processoId";

-- AddForeignKey
ALTER TABLE "Descricao" ADD CONSTRAINT "Descricao_descricaoId_fkey" FOREIGN KEY ("descricaoId") REFERENCES "process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
