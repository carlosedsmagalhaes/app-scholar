import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
  perfil: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { userId, perfil } = decoded as TokenPayload;

    req.user = { id: userId, perfil };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
