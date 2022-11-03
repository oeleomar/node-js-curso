import { AppError } from "../../errors/AppError.js";
import Process from "../../models/process/Process.js";

export class GetProcessController {
  async handle(setor) {
    if (!setor) return new AppError("Dados não encontrados", 404);

    const data = await Process.find({ setor });
    if (data.length === 0) return new AppError("Sem dados cadastrados", 404);

    return data;
  }
}
