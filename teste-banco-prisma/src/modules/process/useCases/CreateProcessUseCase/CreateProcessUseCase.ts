import { Processo } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

export class CreateProcessUseCase {
  async execute(req: CreateUserDTO): Promise<Processo> {
    const { titulo, tipo, descricao, setor, video, docs } = req;
    if (titulo === "" || tipo === "" || setor === "" || video === "")
      throw new AppError(
        "Campos Vazios, corrija e encaminhe os dados novamente.",
      );
    const processAlreadyExist = await prisma.processo.findFirst({
      where: {
        setor: setor,
        titulo: titulo,
      },
    });

    if (processAlreadyExist) throw new AppError("Processo já existe");

    //Criar o processo
    const process = await prisma.processo.create({
      data: {
        setor,
        tipo,
        titulo,
        video,
      },
    });

    const description = await prisma.descricao.create({
      data: {
        processoId: process.id,
      },
    });

    const data = descricao.map(async (value) => {
      const {
        id,
        type,
        data: { level, style, text },
      } = value;
      const newData = await prisma.data.create({
        data: {
          id,
          type,
          level,
          style,
          text,
          descricaoId: description.id,
        },
      });

      return newData;
    });

    const docsBD = await prisma.documentos.create({
      data: {
        titulo: docs.titulo,
        processoId: process.id,
      },
    });

    return process;
  }
}
