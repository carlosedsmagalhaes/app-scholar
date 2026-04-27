import { Request, Response } from "express";
import prisma from "../database/db";
import { validateId } from "../utils/validateId";

class NotasController {
  async upsert(req: Request, res: Response) {
    try {
      const { alunoId, disciplinaId, nota1, nota2 } = req.body;
      const validatedAlunoId = validateId(alunoId);
      const validatedDisciplinaId = validateId(disciplinaId);

      if (validatedAlunoId === null || validatedDisciplinaId === null) {
        return res.status(400).json({
          message:
            "IDs de aluno e disciplina são obrigatórios e devem ser válidos.",
        });
      }

      const n1 = nota1 ? Number.parseFloat(nota1) : 0;
      const n2 = nota2 ? Number.parseFloat(nota2) : 0;
      const media = (n1 + n2) / 2;
      const situacao = media >= 6 ? "Aprovado" : "Reprovado";

      const notaExistente = await prisma.notas.findFirst({
        where: {
          aluno_id: validatedAlunoId,
          disciplina_id: validatedDisciplinaId,
        },
        select: { id: true },
      });

      const nota = await prisma.notas.upsert({
        where: {
          id: notaExistente?.id ?? 0,
        },
        update: {
          nota1: n1,
          nota2: n2,
          media: media,
          situacao: situacao,
        },
        create: {
          aluno_id: validatedAlunoId,
          disciplina_id: validatedDisciplinaId,
          nota1: n1,
          nota2: n2,
          media: media,
          situacao: situacao,
        },
      });

      res.status(200).json(nota);
    } catch (error) {
      console.error("Erro ao inserir notas:", error);
      res.status(500).json({ message: "Erro ao processar notas" });
    }
  }

  async getByAluno(req: Request, res: Response) {
    try {
      const { alunoId } = req.params;
      const validatedAlunoId = validateId(alunoId);
      if (validatedAlunoId === null) {
        return res.status(400).json({ message: "ID de aluno inválido" });
      }
      const notas = await prisma.notas.findMany({
        where: { aluno_id: validatedAlunoId },
        include: {
          disciplina: true,
          aluno: true,
        },
      });
      res.status(200).json(notas);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      res.status(500).json({ message: "Erro ao buscar notas" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notaId = validateId(id);
      if (notaId === null) {
        return res.status(400).json({ message: "ID de nota inválido" });
      }
      const nota = await prisma.notas.findUnique({
        where: { id: notaId },
        include: {
          aluno: true,
          disciplina: true,
        },
      });
      if (!nota) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }
      res.status(200).json(nota);
    } catch (error) {
      console.error("Erro ao buscar nota:", error);
      res.status(500).json({ message: "Erro ao buscar nota" });
    }
  }
}

export default new NotasController();
