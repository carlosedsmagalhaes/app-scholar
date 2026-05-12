import { Request, Response } from "express";
import prisma from "../database/db";
import { STATUS } from "@prisma/client";
import { validateId } from "../utils/validateId";

class AreaController {
  async getAll(req: Request, res: Response) {
    try {
      const areas = await prisma.area.findMany({
        where: { status: STATUS.ATIVO },
        orderBy: { descricao: "asc" },
      });
      res.status(200).json(areas);
    } catch (error) {
      console.error("Erro ao buscar áreas:", error);
      res.status(500).json({ message: "Erro ao buscar áreas" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const areaId = validateId(id);
      if (areaId === null) {
        return res.status(400).json({ message: "ID de área inválido" });
      }
      const area = await prisma.area.findUnique({
        where: { id: areaId, status: STATUS.ATIVO },
      });
      if (!area) {
        return res.status(404).json({ message: "Área não encontrada" });
      }
      res.status(200).json(area);
    } catch (error) {
      console.error("Erro ao buscar área:", error);
      res.status(500).json({ message: "Erro ao buscar área" });
    }
  }
}

export default new AreaController();
