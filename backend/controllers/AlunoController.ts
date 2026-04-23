import { Request, Response } from "express";
import prisma from "../database/db";
import { Perfil } from "@prisma/client";
import bcrypt from "bcryptjs";
import { validateAlunoId } from "../utils/validateId";

class AlunoController {
  async create(req: Request, res: Response) {
    try {
      const {
        email,
        senha,
        nome,
        matricula,
        cursoId,
        telefone,
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
      } = req.body;

      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
      });
      const matriculaExistente = await prisma.aluno.findUnique({
        where: { matricula },
      });

      if (usuarioExistente || matriculaExistente) {
        return res
          .status(400)
          .json({ message: "Email ou matrícula já cadastrados" });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoAluno = await prisma.$transaction(async (prisma) => {
        const usuario = await prisma.usuario.create({
          data: {
            email,
            senha: senhaHash,
            perfil: Perfil.ALUNO,
          },
        });

        const aluno = await prisma.aluno.create({
          data: {
            nome,
            matricula,
            telefone,
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            estado,
            curso_id: cursoId,
            usuario_id: usuario.id,
          },
        });

        return aluno;
      });

      return res.status(201).json(novoAluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const alunos = await prisma.aluno.findMany({
        include: { usuario: { select: { email: true } }, curso: true },
      });
      return res.status(200).json(alunos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alunoId = validateAlunoId(id);

      if (alunoId === null) {
        return res.status(400).json({ message: "ID do aluno é obrigatório" });
      }

      const aluno = await prisma.aluno.findUnique({
        where: { id: alunoId },
        include: { usuario: { select: { email: true } }, curso: true },
      });

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      return res.status(200).json(aluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alunoId = validateAlunoId(id);

      if (alunoId === null) {
        return res.status(400).json({ message: "ID do aluno é obrigatório" });
      }

      const {
        email,
        nome,
        senha,
        telefone,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
      } = req.body;

      const alunoExistente = await prisma.aluno.findUnique({
        where: { id: alunoId },
        include: { usuario: { select: { email: true } } },
      });

      if (!alunoExistente) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      const updateAluno = await prisma.$transaction(async (prisma) => {
        const usuarioExistente = await prisma.usuario.update({
          where: { id: alunoExistente.usuario_id },
          data: { email, senha },
        });

        const alunoAtualizado = await prisma.aluno.update({
          where: { id: alunoId },
          data: {
            nome,
            telefone,
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            estado,
          },
        });

        return alunoAtualizado;
      });

      return res.status(200).json(updateAluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alunoId = validateAlunoId(id);

      if (alunoId === null) {
        return res.status(400).json({ message: "ID do aluno é obrigatório" });
      }

      const alunoExistente = await prisma.aluno.findUnique({
        where: { id: alunoId },
      });
      if (!alunoExistente) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      await prisma.$transaction(async (prisma) => {
        await prisma.aluno.delete({
          where: { id: alunoId },
        });
        await prisma.usuario.delete({
          where: { id: alunoExistente.usuario_id },
        });
      });
      return res.status(200).json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new AlunoController();
