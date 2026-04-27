import { Request, Response } from "express";
import prisma from "../database/db";
import { validateId } from "../utils/validateId";

function normalizeIdList(value: unknown): number[] {
  const rawValues = Array.isArray(value) ? value : [value];

  const ids = rawValues
    .map((item) => {
      if (typeof item === "number") {
        return Number.isInteger(item) ? item : NaN;
      }

      if (typeof item === "string") {
        const parsed = Number.parseInt(item, 10);
        return Number.isNaN(parsed) ? NaN : parsed;
      }

      return NaN;
    })
    .filter((id) => !Number.isNaN(id) && id > 0);

  return Array.from(new Set(ids));
}

class DisciplinaController {
  async create(req: Request, res: Response) {
    try {
      const { nome, cargaHoraria, semestre, professorIds, cursoIds, professorId, cursoId } =
        req.body;

      const normalizedProfessorIds = normalizeIdList(
        professorIds ?? professorId,
      );
      const normalizedCursoIds = normalizeIdList(cursoIds ?? cursoId);

      if (normalizedProfessorIds.length === 0 || normalizedCursoIds.length === 0) {
        return res.status(400).json({
          message: "Informe ao menos um professor e um curso válidos.",
        });
      }

      const novaDisciplina = await prisma.$transaction(async (tx) => {
        const disciplina = await tx.disciplina.create({
          data: {
            nome,
            carga_horaria: cargaHoraria,
            semestre,
          },
        });

        await tx.professor_Disciplina.createMany({
          data: normalizedProfessorIds.map((currentProfessorId) => ({
            professor_id: currentProfessorId,
            disciplina_id: disciplina.id,
          })),
          skipDuplicates: true,
        });

        await tx.curso_Disciplina.createMany({
          data: normalizedCursoIds.map((currentCursoId) => ({
            curso_id: currentCursoId,
            disciplina_id: disciplina.id,
          })),
          skipDuplicates: true,
        });

        return tx.disciplina.findUnique({
          where: { id: disciplina.id },
          include: {
            professores: {
              include: {
                professor: true,
              },
            },
            cursos: {
              include: {
                curso: true,
              },
            },
          },
        });
      });

      res.status(201).json(novaDisciplina);
    } catch (error) {
        console.error("Erro ao criar disciplina:", error);
      res.status(500).json({ error: "Erro ao criar disciplina" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const disciplinas = await prisma.disciplina.findMany({
        include: {
          professores: {
            include: {
              professor: true,
            },
          },
          cursos: {
            include: {
              curso: true,
            },
          },
        },
      });
      res.json(disciplinas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar disciplinas" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const disciplinaId = validateId(id);

      if (disciplinaId === null) {
        return res
          .status(400)
          .json({ message: "ID da disciplina é obrigatório" });
      }

      const disciplina = await prisma.disciplina.findUnique({
        where: { id: disciplinaId },
        include: {
          professores: {
            include: {
              professor: true,
            },
          },
          cursos: {
            include: {
              curso: true,
            },
          },
        },
      });

      if (!disciplina) {
        return res.status(404).json({ message: "Disciplina não encontrada" });
      }
      return res.status(200).json(disciplina);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const disciplinaId = validateId(id);
      if (disciplinaId === null) {
        return res
          .status(400)
          .json({ message: "ID da disciplina é obrigatório" });
      }

      const { nome, cargaHoraria, semestre, professorIds, cursoIds, professorId, cursoId } =
        req.body;
      const normalizedProfessorIds = normalizeIdList(
        professorIds ?? professorId,
      );
      const normalizedCursoIds = normalizeIdList(cursoIds ?? cursoId);

      if (normalizedProfessorIds.length === 0 || normalizedCursoIds.length === 0) {
        return res.status(400).json({
          message: "Informe ao menos um professor e um curso válidos.",
        });
      }

      const disciplina = await prisma.$transaction(async (tx) => {
        await tx.disciplina.update({
          where: { id: disciplinaId },
          data: {
            nome,
            carga_horaria: cargaHoraria,
            semestre,
          },
        });

        await tx.professor_Disciplina.deleteMany({
          where: { disciplina_id: disciplinaId },
        });

        await tx.curso_Disciplina.deleteMany({
          where: { disciplina_id: disciplinaId },
        });

        await tx.professor_Disciplina.createMany({
          data: normalizedProfessorIds.map((currentProfessorId) => ({
            professor_id: currentProfessorId,
            disciplina_id: disciplinaId,
          })),
          skipDuplicates: true,
        });

        await tx.curso_Disciplina.createMany({
          data: normalizedCursoIds.map((currentCursoId) => ({
            curso_id: currentCursoId,
            disciplina_id: disciplinaId,
          })),
          skipDuplicates: true,
        });

        return tx.disciplina.findUnique({
          where: { id: disciplinaId },
          include: {
            professores: {
              include: {
                professor: true,
              },
            },
            cursos: {
              include: {
                curso: true,
              },
            },
          },
        });
      });
      res.json(disciplina);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar disciplina" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const disciplinaId = validateId(id);
      if (disciplinaId === null) {
        return res
          .status(400)
          .json({ message: "ID da disciplina é obrigatório" });
      }
      await prisma.$transaction(async (tx) => {
        await tx.professor_Disciplina.deleteMany({
          where: { disciplina_id: disciplinaId },
        });
        await tx.curso_Disciplina.deleteMany({
          where: { disciplina_id: disciplinaId },
        });
        await tx.disciplina.delete({
          where: { id: disciplinaId },
        });
      });
      res.status(200).json({ message: "Disciplina deletada com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar disciplina" });
    }
  }
}

export default new DisciplinaController();
