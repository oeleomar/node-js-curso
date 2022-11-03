import Process from "../../models/process/Process.js";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../../errors/AppError.js";
import { removeFiles } from "../../utils/removeFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class UpdateProcessController {
  async handle(id, body, files) {
    //Puxar processo antigo
    const process = await Process.findById(id);
    if (!process) return new AppError("Processo não encontrado", 404);

    //Remover video antigo

    //Verificar dados
    const { ativo, setor, tipo, titulo, descricao } = body;
    if (!setor || !tipo || !titulo) {
      return new AppError("Informações não enviadas");
    }

    //Montar documentos antigos
    if (Object.keys(files).length > 0) {
      const documentosAntigos = [
        ...process.documentosAntigos,
        process.documento,
      ];

      const documento = files.file ? files.file[0].filename : null;
      const video = files.video ? files.video[0].filename : null;

      if (video) {
        const { video: videoAntigo } = process;
        removeFiles(
          path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "public",
            "videos",
            videoAntigo,
          ),
        );
      }

      if (documento && video) {
        const newProcess = await Process.updateOne(
          { id },
          {
            ativo,
            setor,
            tipo,
            titulo,
            descricao,
            video,
            documento,
            documentosAntigos,
          },
        );

        return newProcess;
      } else if (documento) {
        const newProcess = await Process.updateOne(
          { id },
          {
            ativo,
            setor,
            tipo,
            titulo,
            descricao,
            documento,
            documentosAntigos,
          },
        );

        return newProcess;
      } else {
        const newProcess = await Process.updateOne(
          { id },
          {
            ativo,
            setor,
            tipo,
            titulo,
            descricao,
            video,
          },
        );
      }
    }

    const newProcess = await Process.updateOne(
      { id },
      {
        ativo,
        setor,
        tipo,
        titulo,
        descricao,
      },
    );

    return newProcess;
  }
}
