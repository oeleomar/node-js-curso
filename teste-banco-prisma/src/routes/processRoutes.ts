import { Router } from "express";
import { CreateProcessController } from "../modules/process/useCases/CreateProcessUseCase/CreateProcessController";
import { GetProcessBySectionController } from "../modules/process/useCases/GetProcessBySection/GetProcessBySectionController";

const createProcessController = new CreateProcessController();
const getProcessBySectionController = new GetProcessBySectionController();
const processRoutes = Router();

processRoutes.post("/", createProcessController.handle);
processRoutes.get("/:setor", getProcessBySectionController.handle);

export { processRoutes };
