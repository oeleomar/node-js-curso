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
    "descricaoId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "processoId" TEXT,

    CONSTRAINT "Descricao_pkey" PRIMARY KEY ("descricaoId")
);

-- CreateTable
CREATE TABLE "Data" (
    "dataId" TEXT NOT NULL,
    "text" TEXT,
    "type" TEXT NOT NULL,
    "level" INTEGER,
    "style" TEXT
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "descricao" TEXT[],

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "process_titulo_key" ON "process"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Descricao_processoId_key" ON "Descricao"("processoId");

-- CreateIndex
CREATE UNIQUE INDEX "Data_dataId_key" ON "Data"("dataId");

-- AddForeignKey
ALTER TABLE "Descricao" ADD CONSTRAINT "Descricao_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Descricao"("descricaoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_id_fkey" FOREIGN KEY ("id") REFERENCES "Data"("dataId") ON DELETE RESTRICT ON UPDATE CASCADE;
