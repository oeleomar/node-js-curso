import { AppError } from "../../errors/AppError.js";
import Process from "../../models/process/Process.js";

export class CreateProcessController {
  async handle(body, files) {
    const { setor, tipo, titulo, descricao } = body;

    const alreadyExistProcess = await Process.findOne({ setor, titulo });
    if (alreadyExistProcess) return new AppError("Processo Já Existente");

    const process = await Process.create({
      titulo,
      tipo,
      descricao,
      setor,
      video: files.video[0].filename,
      documento: files.file[0].filename,
    });

    return process;
  }
}
