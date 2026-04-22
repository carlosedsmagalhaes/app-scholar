-- Create enum type expected by Prisma
CREATE TYPE "Perfil" AS ENUM ('ALUNO', 'PROFESSOR', 'ADMIN');

-- Convert existing text values to enum values
ALTER TABLE "Usuario"
ALTER COLUMN "perfil" TYPE "Perfil"
USING UPPER("perfil")::"Perfil";
