import { Router } from "express";
import { CreateProcessController } from "../modules/process/useCases/CreateProcessUseCase/CreateProcessController";
import { GetProcessBySectionController } from "../modules/process/useCases/GetProcessBySection/GetProcessBySectionController";
import { UpdateProcessController } from "../modules/process/useCases/UpdateProcess/UpdateProcessController";

const createProcessController = new CreateProcessController();
const getProcessBySectionController = new GetProcessBySectionController();
const updateProcessController = new UpdateProcessController();
const processRoutes = Router();

processRoutes.post("/", createProcessController.handle);
processRoutes.get("/:setor", getProcessBySectionController.handle);
processRoutes.put("/:id", updateProcessController.handle);

export { processRoutes };
