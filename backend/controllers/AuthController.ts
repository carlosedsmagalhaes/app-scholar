import { Request, Response } from "express";
import prisma from "../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      console.log("Tentativa de login com email:", email);
      console.log("Corpo da requisição:", req.body);
      const user = await prisma.usuario.findUnique({ where: { email } });
      console.log("Usuário encontrado:", user);
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
        { expiresIn: "1h" },
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
      return res.status(500).json({ message: `Erro interno do servidor: ${error}` });
    }
  }
}

export default new AuthController();
