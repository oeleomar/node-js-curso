export interface UpdateProcessDTO {
  id: string;
  tipo: string;
  titulo: string;
  setor: string;
  descricao: Data[];
  video: string;
  docs: Docs;
}

interface Docs {
  titulo: string;
  antigo: Array<string>;
}

interface Data {
  id: string;
  type: string;
  data: DataItems;
}

interface DataItems {
  text?: string;
  level?: number;
  style?: string;
  items?: Items[];
}

interface Items {
  descricao: string[];
}
