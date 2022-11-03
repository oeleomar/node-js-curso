import mongoose from "mongoose";

const process = new mongoose.Schema({
  ativo: Boolean,
  setor: String,
  tipo: String,
  titulo: String,
  descricao: [{}],
  documento: String,
  documentosAntigos: [String],
  video: String,
});

export default mongoose.model("Process", process);
