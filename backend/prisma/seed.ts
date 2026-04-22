import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL nao definida.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const dsm = await prisma.curso.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: "Desenvolvimento de Sistemas Multiplataforma",
      sigla: "DSM",
      qtd_semestre: 6,
    },
  });

  await prisma.titulacao.upsert({
    where: { id: 1 },
    update: {},
    create: { descricao: "Mestre" },
  });

  await prisma.titulacao.upsert({
    where: { id: 2 },
    update: {},
    create: { descricao: "Doutor" },
  });

  await prisma.area.upsert({
    where: { id: 1 },
    update: {},
    create: { descricao: "Tecnologia da Informação" },
  });

  await prisma.area.upsert({
    where: { id: 2 },
    update: {},
    create: { descricao: "Engenharia Ambiental e Sanitária" },
  });

  await prisma.area.upsert({
    where: { id: 3 },
    update: {},
    create: { descricao: "Sensoriamento Remoto e Mapeamento" },
  });

  const senhaHash = await bcrypt.hash("admin123", 10);
  await prisma.usuario.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: "admin@gmail.com",
      senha: senhaHash,
      perfil: "ADMIN",
    },
  });

  console.log("Dados iniciais inseridos com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
