import { Processo } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetProcessBySection {
  async execute(setor: string) {
    const process = prisma.processo.findMany({
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
