import { Request, Response } from "express";
import { UpdateProcess } from "./UpdateProcess";

export class UpdateProcessController {
  async handle(req: Request, res: Response) {
    const { setor, tipo, titulo, descricao, video, docs } = req.body;
    const { id } = req.params;
    const updateProcess = new UpdateProcess();

    const result = await updateProcess.execute({
      id,
      setor,
      tipo,
      titulo,
      descricao,
      video,
      docs,
    });

    return res.status(200).json(result);
  }
}
