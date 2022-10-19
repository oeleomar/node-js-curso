/*
  Warnings:

  - The `level` column on the `Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Data" ALTER COLUMN "text" DROP NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" INTEGER;
