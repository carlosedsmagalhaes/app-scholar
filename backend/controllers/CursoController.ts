import { Request, Response } from "express";
import prisma from "../database/db";
import { STATUS } from "@prisma/client";
import { validateId } from "../utils/validateId";

class CursoController {
  async getAll(req: Request, res: Response) {
    try {
      const cursos = await prisma.curso.findMany({
        where: { status: STATUS.ATIVO },
      });
      res.status(200).json(cursos);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      res.status(500).json({ message: "Erro ao buscar cursos" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cursoId = validateId(id);
      if (cursoId === null) {
        return res.status(400).json({ message: "ID de curso inválido" });
      }
      const curso = await prisma.curso.findUnique({
        where: { id: cursoId, status: STATUS.ATIVO },
      });
      if (!curso) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }
      res.status(200).json(curso);
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      res.status(500).json({ message: "Erro ao buscar curso" });
    }
  }
}


export default new CursoController();