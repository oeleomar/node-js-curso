/*
  Warnings:

  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Descricao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `video` to the `process` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_descricaoId_fkey";

-- DropForeignKey
ALTER TABLE "Descricao" DROP CONSTRAINT "Descricao_processoId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_dataId_fkey";

-- AlterTable
ALTER TABLE "process" ADD COLUMN     "video" TEXT NOT NULL;

-- DropTable
DROP TABLE "Data";

-- DropTable
DROP TABLE "Descricao";

-- DropTable
DROP TABLE "Items";

-- CreateTable
CREATE TABLE "descricao" (
    "id" TEXT NOT NULL,
    "processoId" TEXT NOT NULL,

    CONSTRAINT "descricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT,
    "level" INTEGER,
    "style" TEXT,
    "descricaoId" TEXT
);

-- CreateTable
CREATE TABLE "items" (
    "idItems" TEXT NOT NULL,
    "dataId" TEXT,
    "content" TEXT[],

    CONSTRAINT "items_pkey" PRIMARY KEY ("idItems")
);

-- CreateTable
CREATE TABLE "Documentos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "processoId" TEXT,

    CONSTRAINT "Documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentoAntigos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "documentosId" TEXT,

    CONSTRAINT "DocumentoAntigos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "descricao_processoId_key" ON "descricao"("processoId");

-- CreateIndex
CREATE UNIQUE INDEX "data_id_key" ON "data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Documentos_processoId_key" ON "Documentos"("processoId");

-- AddForeignKey
ALTER TABLE "descricao" ADD CONSTRAINT "descricao_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_descricaoId_fkey" FOREIGN KEY ("descricaoId") REFERENCES "descricao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoAntigos" ADD CONSTRAINT "DocumentoAntigos_documentosId_fkey" FOREIGN KEY ("documentosId") REFERENCES "Documentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
