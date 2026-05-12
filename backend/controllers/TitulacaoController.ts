import { Request, Response } from "express";
import prisma from "../database/db";
import { STATUS } from "@prisma/client";
import { validateId } from "../utils/validateId";

class TitulacaoController {
  async getAll(req: Request, res: Response) {
    try {
      const titulacoes = await prisma.titulacao.findMany({
        where: { status: STATUS.ATIVO },
        orderBy: { descricao: "asc" },
      });
      res.status(200).json(titulacoes);
    } catch (error) {
      console.error("Erro ao buscar titulações:", error);
      res.status(500).json({ message: "Erro ao buscar titulações" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const titulacaoId = validateId(id);
      if (titulacaoId === null) {
        return res.status(400).json({ message: "ID de titulação inválido" });
      }
      const titulacao = await prisma.titulacao.findUnique({
        where: { id: titulacaoId, status: STATUS.ATIVO },
      });
      if (!titulacao) {
        return res.status(404).json({ message: "Titulação não encontrada" });
      }
      res.status(200).json(titulacao);
    } catch (error) {
      console.error("Erro ao buscar titulação:", error);
      res.status(500).json({ message: "Erro ao buscar titulação" });
    }
  }
}

export default new TitulacaoController();
