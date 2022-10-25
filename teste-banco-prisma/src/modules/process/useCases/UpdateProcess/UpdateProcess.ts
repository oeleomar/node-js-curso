import { DocumentoAntigos, Documentos, Processo } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { UpdateProcessDTO } from "../../dtos/UpdateProcessDTO";

export class UpdateProcess {
  async execute(req: UpdateProcessDTO): Promise<Processo> {
    //receber ID
    const { id } = req;

    //Verificar se Existe
    const process = await prisma.processo.findFirst({
      where: {
        id,
      },
      include: {
        descricao: true,
        docs: {
          include: {
            antigo: true,
          },
        },
      },
    });

    if (!process) throw new AppError("Processo não encontrado", 404);

    //Atualizar
    const { setor, tipo, titulo, descricao, video, docs } = req;

    const newDocs = await prisma.documentos.update({
      where: {
        id: process.docs?.id,
      },
      data: {
        titulo: docs.titulo,
      },
      include: {
        antigo: true,
      },
    });

    const docsAntigos = await prisma.documentoAntigos.create({
      data: {
        titulo: process.docs?.titulo,
        documentosId: newDocs.id,
      },
    });

    descricao.map(async (data) => {
      const existData = await prisma.data.findFirst({
        where: {
          id: data.id,
        },
      });

      if (existData) {
        const newData = await prisma.data.update({
          where: {
            id: data.id,
          },
          data: {
            type: data.type,
            level: data.data.level,
            style: data.data.style,
            text: data.data.text,
          },
        });
        return newData;
      } else {
        const newData = await prisma.data.create({
          data: {
            id: data.id,
            text: data.data.text,
            level: data.data.level,
            type: data.type,
            descricaoId: process.descricao?.id,
            style: data.data.style,
          },
        });
        return newData;
      }
    });

    const newProcess = await prisma.processo.update({
      where: {
        id,
      },
      data: {
        setor,
        tipo,
        titulo,
        video,
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

    return newProcess;
  }
}
