import { Processo } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

export class CreateProcessUseCase {
  async execute(req: CreateUserDTO): Promise<Processo> {
    const { titulo, tipo, descricao, setor } = req;
    const processAlreadyExist = await prisma.processo.findFirst({
      where: {
        setor: setor,
        titulo: titulo,
      },
    });

    if (processAlreadyExist) throw new AppError("Usuário já existe");

    //Criar o processo
    const process = await prisma.processo.create({
      data: {
        setor,
        tipo,
        titulo,
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

    return process;
  }
}
