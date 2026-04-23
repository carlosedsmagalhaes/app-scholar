import { Request, Response } from "express";
import prisma from "../database/db";
import { Perfil } from "@prisma/client";
import bycript from "bcryptjs";
import { validateAlunoId } from "../utils/validateId";

class ProfessorController {
  async create(req: Request, res: Response) {
    try {
      const { email, senha, nome, titulacaoId, areaId, tempoDocencia } =
        req.body;

      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
      });

      if (usuarioExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const senhaHash = await bycript.hash(senha, 10);

      const novoProfessor = await prisma.$transaction(async (prisma) => {
        const usuario = await prisma.usuario.create({
          data: {
            email,
            senha: senhaHash,
            perfil: Perfil.PROFESSOR,
          },
        });

        const professor = await prisma.professor.create({
          data: {
            nome,
            titulacao_id: titulacaoId,
            area_id: areaId,
            tempo_docencia: tempoDocencia,
            usuario_id: usuario.id,
          },
        });

        return professor;
      });

      res.status(201).json(novoProfessor);
    } catch (error) {
      console.error("Erro ao criar professor:", error);
      res.status(500).json({ message: "Erro ao criar professor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const professores = await prisma.professor.findMany({
        include: {
          usuario: {
            select: {
              email: true,
            },
          },
          titulacao: true,
          area: true,
        },
      });
      res.json(professores);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
      res.status(500).json({ message: "Erro ao buscar professores" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professorId = validateAlunoId(id);
      if (professorId === null) {
        return res.status(400).json({ message: "ID de professor inválido" });
      }
      const professor = await prisma.professor.findUnique({
        where: { id: professorId },
        include: {
          usuario: {
            select: {
              email: true,
            },
          },
          titulacao: true,
          area: true,
        },
      });
      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado" });
      }
      res.json(professor);
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
      res.status(500).json({ message: "Erro ao buscar professor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professorId = validateAlunoId(id);
      if (professorId === null) {
        return res.status(400).json({ message: "ID de professor inválido" });
      }

      const { email, senha, nome, titulacaoId, areaId, tempoDocencia } =
        req.body;
      const professorExistente = await prisma.professor.findUnique({
        where: { id: professorId },
        include: {
          usuario: true,
        },
      });
      if (!professorExistente) {
        return res.status(404).json({ message: "Professor não encontrado" });
      }

      const senhaHash = senha ? await bycript.hash(senha, 10) : undefined;

      const professorAtualizado = await prisma.$transaction(async (prisma) => {
        if (email || senhaHash) {
          await prisma.usuario.update({
            where: { id: professorExistente.usuario_id },
            data: {
              email: email || professorExistente.usuario.email,
              senha: senhaHash || professorExistente.usuario.senha,
            },
          });
        }

        const professor = await prisma.professor.update({
          where: { id: professorId },
          data: {
            nome,
            titulacao_id: titulacaoId,
            area_id: areaId,
            tempo_docencia:tempoDocencia,
          },
        });

        return professor;
      });
      res.json(professorAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res.status(500).json({ message: "Erro ao atualizar professor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const professorId = validateAlunoId(id);
      if (professorId === null) {
        return res.status(400).json({ message: "ID de professor inválido" });
      }
      const professorExistente = await prisma.professor.findUnique({
        where: { id: professorId },
      });
      if (!professorExistente) {
        return res.status(404).json({ message: "Professor não encontrado" });
      }
      await prisma.$transaction(async (prisma) => {
        await prisma.professor.delete({
          where: { id: professorId },
        });
        await prisma.usuario.delete({
          where: { id: professorExistente.usuario_id },
        });
      });
      res.json({ message: "Professor deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar professor:", error);
      res.status(500).json({ message: "Erro ao deletar professor" });
    }
  }
}

export default new ProfessorController();
