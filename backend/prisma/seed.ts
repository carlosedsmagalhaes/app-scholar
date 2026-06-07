import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@prisma/client";
import { Perfil } from "@prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL nao definida.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const cursos = [
    { id: 1,  nome: "Desenvolvimento de Sistemas Multiplataforma",  sigla: "DSM",  qtd_semestre: 6 },
    { id: 2,  nome: "Análise e Desenvolvimento de Sistemas",        sigla: "ADS",  qtd_semestre: 5 },
    { id: 3,  nome: "Banco de Dados",                               sigla: "BD",   qtd_semestre: 6 },
    { id: 4,  nome: "Gestão da Tecnologia da Informação",           sigla: "GTI",  qtd_semestre: 6 },
    { id: 5,  nome: "Ciência de Dados",                             sigla: "CD",   qtd_semestre: 6 },
    { id: 6,  nome: "Inteligência Artificial",                      sigla: "IA",   qtd_semestre: 6 },
    { id: 7,  nome: "Redes de Computadores",                        sigla: "RC",   qtd_semestre: 6 },
    { id: 8,  nome: "Segurança da Informação",                      sigla: "SI",   qtd_semestre: 6 },
    { id: 9,  nome: "Gestão Empresarial",                           sigla: "GE",   qtd_semestre: 6 },
    { id: 10, nome: "Logística",                                    sigla: "LOG",  qtd_semestre: 6 },
    { id: 11, nome: "Recursos Humanos",                             sigla: "RH",   qtd_semestre: 6 },
    { id: 12, nome: "Marketing",                                    sigla: "MKT",  qtd_semestre: 6 },
    { id: 13, nome: "Gestão Financeira",                            sigla: "GF",   qtd_semestre: 6 },
    { id: 14, nome: "Mecatrônica Industrial",                       sigla: "MEC",  qtd_semestre: 6 },
    { id: 15, nome: "Automação Industrial",                         sigla: "AI",   qtd_semestre: 6 },
    { id: 16, nome: "Fabricação Mecânica",                          sigla: "FM",   qtd_semestre: 6 },
    { id: 17, nome: "Gestão da Produção Industrial",                sigla: "GPI",  qtd_semestre: 6 },
    { id: 18, nome: "Manutenção de Aeronaves",                      sigla: "MA",   qtd_semestre: 6 },
    { id: 19, nome: "Gestão de Agronegócio",                        sigla: "GAG",  qtd_semestre: 6 },
    { id: 20, nome: "Meio Ambiente e Recursos Hídricos",            sigla: "MRH",  qtd_semestre: 6 },
  ];

  for (const curso of cursos) {
    await prisma.curso.upsert({
      where: { id: curso.id },
      update: {},
      create: curso,
    });
  }

  const titulacoes = [
    { id: 1, descricao: "Graduação" },
    { id: 2, descricao: "Especialização (Lato Sensu)" },
    { id: 3, descricao: "MBA" },
    { id: 4, descricao: "Mestrado Profissional" },
    { id: 5, descricao: "Mestre" },
    { id: 6, descricao: "Doutor" },
    { id: 7, descricao: "Pós-Doutor" },
    { id: 8, descricao: "Livre-Docente" },
  ];

  for (const titulacao of titulacoes) {
    await prisma.titulacao.upsert({
      where: { id: titulacao.id },
      update: {},
      create: titulacao,
    });
  }

  const areas = [
    { id: 1,  descricao: "Tecnologia da Informação" },
    { id: 2,  descricao: "Engenharia Ambiental e Sanitária" },
    { id: 3,  descricao: "Sensoriamento Remoto e Mapeamento" },
    { id: 4,  descricao: "Ciências da Computação" },
    { id: 5,  descricao: "Engenharia de Software" },
    { id: 6,  descricao: "Inteligência Artificial e Machine Learning" },
    { id: 7,  descricao: "Segurança Cibernética" },
    { id: 8,  descricao: "Redes e Infraestrutura" },
    { id: 9,  descricao: "Banco de Dados e Engenharia de Dados" },
    { id: 10, descricao: "Gestão de Projetos" },
    { id: 11, descricao: "Administração e Negócios" },
    { id: 12, descricao: "Ciências Contábeis e Finanças" },
    { id: 13, descricao: "Marketing e Comunicação" },
    { id: 14, descricao: "Logística e Cadeia de Suprimentos" },
    { id: 15, descricao: "Gestão de Recursos Humanos" },
    { id: 16, descricao: "Engenharia Mecânica" },
    { id: 17, descricao: "Engenharia Elétrica e Eletrônica" },
    { id: 18, descricao: "Automação e Controle Industrial" },
    { id: 19, descricao: "Produção e Qualidade Industrial" },
    { id: 20, descricao: "Aeronáutica e Engenharia Aeroespacial" },
    { id: 21, descricao: "Ciências Agrárias e Agronegócio" },
    { id: 22, descricao: "Matemática Aplicada e Estatística" },
    { id: 23, descricao: "Física Aplicada" },
    { id: 24, descricao: "Educação e Docência Técnica" },
  ];

  for (const area of areas) {
    await prisma.area.upsert({
      where: { id: area.id },
      update: {},
      create: area,
    });
  }

  const senhaHash = await bcrypt.hash("admin123", 10);
  await prisma.usuario.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: "admin@gmail.com",
      senha: senhaHash,
      perfil: Perfil.ADMIN,
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