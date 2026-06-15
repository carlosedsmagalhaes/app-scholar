import { Request, Response } from "express";
import prisma from "../database/db";
import { validateId } from "../utils/validateId";


class AvisoController {
    async create(req: Request, res: Response) {
        try {
            const { titulo,
                descricao,
                prioridade,
            } = req.body;

            if (!titulo) {
                return res.status(400).json({ message: "Informe o títutlo do aviso" });

            }

            const novoAviso = await prisma.aviso.create({
                data: {
                    titulo,
                    descricao,
                    prioridade
                }
            });

            console.log("Aviso criado com sucesso:", novoAviso);
            res.status(201).json(novoAviso);

        } catch (error) {
            console.error("Erro ao criar aviso: ", error);
            res.status(500).json({ message: "Erro ao criar avisos" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const avisos = await prisma.aviso.findMany({
                orderBy: { criado_em: "desc" },
            });
            res.status(200).json(avisos);
        } catch (error) {
            console.error("Erro ao buscar avisos:", error);
            res.status(500).json({ message: "Erro ao buscar avisos" });
        }
    }

}


export default new AvisoController();