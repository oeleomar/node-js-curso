import { Router } from "express";
import { CreateProcessController } from "../modules/process/useCases/CreateProcessUseCase/CreateProcessController";
import { DeleteProcessController } from "../modules/process/useCases/DeleteProcess/DeleteProcessController";
import { GetAllProcessController } from "../modules/process/useCases/GetAllProcess/GetAllProcessController";
import { GetSingleProcessController } from "../modules/process/useCases/GetSingleProcess/GetSingleProcessController";
import { UpdateProcessController } from "../modules/process/useCases/UpdateProcess/UpdateProcessController";

const createProcessController = new CreateProcessController();
const getAllProcessController = new GetAllProcessController();
const getSingleProcessController = new GetSingleProcessController();
const updateProcessController = new UpdateProcessController();
const deleteProcessController = new DeleteProcessController();

const processRoutes = Router();

processRoutes.post("/", createProcessController.handle);
processRoutes.get("/:setor", getAllProcessController.handle);
processRoutes.get("/single/:id", getSingleProcessController.handle);
processRoutes.put("/:id", updateProcessController.handle);
processRoutes.delete("/:id", deleteProcessController.handle);

export { processRoutes };
