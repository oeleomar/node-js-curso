import { Processo } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class GetSingleProcess {
  async execute(id: string): Promise<Processo> {
    const process = await prisma.processo.findFirst({
      where: {
        id,
      },
      include: {
        descricao: {
          include: {
            data: true,
          },
        },
        docs: {
          include: {
            antigo: true,
          },
        },
      },
    });

    if (!process) throw new AppError("Não encontrado nenhum processo", 404);

    return process;
  }
}
