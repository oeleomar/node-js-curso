import { Request, Response } from "express";
import { GetProcessBySection } from "./GetProcessBySectionUseCase";

export class GetProcessBySectionController {
  async handle(req: Request, res: Response) {
    const { setor } = req.params;
    const createProcessUseCase = new GetProcessBySection();

    const result = await createProcessUseCase.execute(setor);

    return res.status(201).json(result);
  }
}
