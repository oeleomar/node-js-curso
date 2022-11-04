import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../../errors/AppError.js";
import Process from "../../models/process/Process.js";
import { removeFiles } from "../../utils/removeFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class DeleteProcessController {
  async handle(id) {
    if (!id) return new AppError("Processo não encontrado", 404);
    const data = await Process.findById(id);
    try {
      const deleted = await Process.deleteOne({ id });
      if (deleted.deletedCount === 0)
        return new AppError("Não foi possível deletar o processo", 400);

      //
      const video = data.video;
      const documento = data.documento;
      const documentosAntigos = data.documentosAntigos;

      if (video) {
        removeFiles(
          path.resolve(__dirname, "..", "..", "..", "public", "videos", video),
        );
      }

      if (documento) {
        removeFiles(
          path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "public",
            "docs",
            documento,
          ),
        );
      }

      if (documentosAntigos.length > 0) {
        documentosAntigos.forEach((val) => {
          removeFiles(
            path.resolve(__dirname, "..", "..", "..", "public", "docs", val),
          );
        });
      }

      return "Arquivo apagado com sucesso";
    } catch (e) {
      return new AppError("Processo não encontrado", 404);
    }
  }
}
