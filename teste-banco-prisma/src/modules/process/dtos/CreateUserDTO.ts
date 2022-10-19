export interface CreateUserDTO {
  setor: string;
  tipo: string;
  titulo: string;
  descricao: Data[];
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
