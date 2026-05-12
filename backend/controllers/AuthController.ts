import { Request, Response } from "express";
import prisma from "../database/db";
import { STATUS } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import EmailService from "../services/EmailService";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const user = await prisma.usuario.findUnique({
        where: { email, status: STATUS.ATIVO },
      });
      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { userId: user.id, perfil: user.perfil },
        process.env.JWT_SECRET!,
        { expiresIn: "30d" },
      );

      return res.json({
        token,
        usuario: {
          id: user.id,
          email: user.email,
          perfil: user.perfil,
        },
      });
    } catch (error) {
      console.error("Erro durante o login:", error);
      return res
        .status(500)
        .json({ message: `Erro interno do servidor: ${error}` });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await prisma.usuario.findUnique({
        where: { email, status: STATUS.ATIVO },
      });
      if (!user) {
        return res.json({
          message: "Se o e-mail existir, instruções serão enviadas.",
        });
      }

      const resetToken = jwt.sign(
        { userId: user.id, type: "password-reset" },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" },
      );

      await prisma.usuario.update({
        where: { id: user.id },
        data: { reset_token: resetToken }, // Salva o novo, invalidando o anterior
      });

      await EmailService.sendPasswordResetEmail(user.email, resetToken);

      return res.json({
        message: "E-mail de recuperação enviado com sucesso.",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao processar recuperação de senha." });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { token, novaSenha } = req.body;
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      if (decoded.type !== "password-reset") {
        return res
          .status(400)
          .json({ message: "Token inválido para recuperação de senha." });
      }

      const user = await prisma.usuario.findUnique({
        where: { id: decoded.userId },
      });

      // Se o token enviado for diferente do que está no banco, ele foi sobrescrito ou já usado
      if (!user || user.reset_token !== token) {
        return res
          .status(401)
          .json({ message: "Este link de recuperação não é mais válido." });
      }

      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      await prisma.usuario.update({
        where: { id: decoded.userId },
        data: { senha: hashedPassword, reset_token: null }, // Limpa o token para garantir que não possa ser reutilizado,
      });

      return res.json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: "Token de recuperação inválido ou expirado." });
    }
  }
}

export default new AuthController();
