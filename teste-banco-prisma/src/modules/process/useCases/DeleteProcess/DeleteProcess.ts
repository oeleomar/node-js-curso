import { Processo } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { DeleteProcessDTO } from "../../dtos/DeleteProcessDTO";

export class DeleteProcess {
  async execute(req: DeleteProcessDTO): Promise<Processo> {
    //Buscar por id
    const { id } = req;
    const process = await prisma.processo.findFirst({
      where: {
        id,
      },
      include: {
        descricao: {
          include: {
            data: {
              include: {
                items: true,
              },
            },
          },
        },
        docs: {
          include: {
            antigo: true,
          },
        },
      },
    });

    //Verificar se existe
    if (!process) throw new AppError("Processo não existe", 404);
    //Deletar
    //Deletar items

    //Deletar Data
    if (process.descricao) {
      process.descricao.data.map(async (value) => {
        const dataDeleted = await prisma.data.delete({
          where: {
            id: value.id,
          },
        });
      });
    }
    //Deletar Docs
    if (process.docs?.antigo) {
      process.docs.antigo.map(async (value) => {
        await prisma.documentoAntigos.delete({
          where: {
            id: value.id,
          },
        });
      });
    }

    if (process.docs) {
      await prisma.documentos.delete({
        where: {
          id: process.docs.id,
        },
      });
    }

    //Deletar Descricao
    if (process.descricao) {
      await prisma.descricao.delete({
        where: {
          id: process.descricao.id,
        },
      });
    }
    //Deletar processo

    const processDeleted = await prisma.processo.delete({
      where: {
        id,
      },
    });

    console.log("DELETADO");
    return process;
  }
}
