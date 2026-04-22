import { Request, Response } from "express";
import prisma from "../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await prisma.usuario.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { userId: user.id, perfil: user.perfil },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" },
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
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default new AuthController();
