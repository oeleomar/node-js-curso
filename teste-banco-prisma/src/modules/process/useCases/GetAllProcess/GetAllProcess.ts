import { prisma } from "../../../../prisma/client";

export class GetAllProcess {
  async execute(setor: string) {
    const process = await prisma.processo.findMany({
      where: {
        setor: {
          contains: setor,
        },
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

    return process;
  }
}
