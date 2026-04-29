import { Request, Response, NextFunction } from "express";
import { Perfil } from "@prisma/client";

export const checkRole = (roles: Perfil[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { perfil } = req.user;

    if (!roles.includes(perfil as Perfil)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    return next();
  };
};
