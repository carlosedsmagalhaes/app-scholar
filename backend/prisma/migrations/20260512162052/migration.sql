/*
  Warnings:

  - You are about to drop the column `resetToken` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reset_token]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Usuario_resetToken_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "resetToken",
ADD COLUMN     "reset_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_reset_token_key" ON "Usuario"("reset_token");
