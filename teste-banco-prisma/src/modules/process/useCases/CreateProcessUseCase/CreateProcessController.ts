import { Request, Response } from "express";
import { CreateProcessUseCase } from "./CreateProcessUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { setor, tipo, titulo, descricao } = req.body;
    const createProcessUseCase = new CreateProcessUseCase();

    const result = await createProcessUseCase.execute({
      setor,
      tipo,
      titulo,
      descricao,
    });

    return res.status(201).json(result);
  }
}
