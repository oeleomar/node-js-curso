import { Request, Response } from "express";
import { DeleteProcess } from "./DeleteProcess";

export class DeleteProcessController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const deleteProcess = new DeleteProcess();

    const result = await deleteProcess.execute({
      id,
    });

    return res.status(200).json(result);
  }
}
