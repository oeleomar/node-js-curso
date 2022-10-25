import { Request, Response } from "express";
import { GetSingleProcess } from "./GetSingleProcess";

export class GetSingleProcessController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const getSingleProcess = new GetSingleProcess();

    const result = await getSingleProcess.execute(id);

    return res.status(200).json(result);
  }
}
