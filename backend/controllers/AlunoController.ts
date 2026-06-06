import { Request, Response } from "express";
import prisma from "../database/db";
import { Perfil, STATUS } from "@prisma/client";
import bcrypt from "bcryptjs";
import { validateId } from "../utils/validateId";
import EmailService from "../services/EmailService";

class AlunoController {
  async create(req: Request, res: Response) {
    try {
      const {
        email,
        nome,
        matricula,
        cursoId,
        semestre,
        telefone,
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
      } = req.body;

      const senhaPadrao = "usuario123";

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

      const senhaHash = await bcrypt.hash(senhaPadrao, 10);

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
            complemento,
            numero,
            bairro,
            cidade,
            estado,
            semestre,
            curso_id: cursoId,
            usuario_id: usuario.id,
          },
        });

        return aluno;
      });

      try {
        await EmailService.sendWelcomeEmail(email, nome);
      } catch (emailError) {
        console.error("Falha ao enviar e-mail de boas-vindas:", emailError);
      }

      return res.status(201).json(novoAluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const alunos = await prisma.aluno.findMany({
        where: { status: STATUS.ATIVO },
        orderBy: { nome: "asc" },
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
      const alunoId = validateId(id);

      if (alunoId === null) {
        return res.status(400).json({ message: "ID do aluno é obrigatório" });
      }

      const aluno = await prisma.aluno.findUnique({
        where: { id: alunoId, status: STATUS.ATIVO },
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
      const alunoId = validateId(id);

      if (alunoId === null) {
        return res.status(400).json({ message: "ID do aluno é obrigatório" });
      }

      const {
        email,
        nome,
        senha,
        matricula,
        cursoId,
        semestre,
        telefone,
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
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
            matricula,
            telefone,
            cep,
            logradouro,
            complemento,
            numero,
            bairro,
            cidade,
            estado,
            semestre,
            curso_id: cursoId,
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
      const alunoId = validateId(id);

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
        await prisma.aluno.update({
          where: { id: alunoId },
          data: { status: STATUS.INATIVO },
        });
        await prisma.usuario.update({
          where: { id: alunoExistente.usuario_id },
          data: { status: STATUS.INATIVO },
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
