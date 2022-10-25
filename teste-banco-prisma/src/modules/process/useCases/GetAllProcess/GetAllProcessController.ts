import { Request, Response } from "express";
import { GetAllProcess } from "./GetAllProcess";

export class GetAllProcessController {
  async handle(req: Request, res: Response) {
    const { setor } = req.params;
    const getAllProcess = new GetAllProcess();

    const result = await getAllProcess.execute(setor);

    return res.status(200).json(result);
  }
}
