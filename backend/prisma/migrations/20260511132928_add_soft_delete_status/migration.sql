-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ATIVO', 'INATIVO');

-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE "Disciplina" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'ATIVO';
