-- CreateTable
CREATE TABLE "process" (
    "id" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Descricao" (
    "id" TEXT NOT NULL,
    "processoId" TEXT NOT NULL,

    CONSTRAINT "Descricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT,
    "level" INTEGER,
    "style" TEXT,
    "descricaoId" TEXT
);

-- CreateTable
CREATE TABLE "Items" (
    "idItems" TEXT NOT NULL,
    "dataId" TEXT,
    "content" TEXT[],

    CONSTRAINT "Items_pkey" PRIMARY KEY ("idItems")
);

-- CreateIndex
CREATE UNIQUE INDEX "Descricao_processoId_key" ON "Descricao"("processoId");

-- CreateIndex
CREATE UNIQUE INDEX "Data_id_key" ON "Data"("id");

-- AddForeignKey
ALTER TABLE "Descricao" ADD CONSTRAINT "Descricao_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_descricaoId_fkey" FOREIGN KEY ("descricaoId") REFERENCES "Descricao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
