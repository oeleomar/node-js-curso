import { Router } from "express";
import { processRoutes } from "./processRoutes";

const routes = Router();

routes.use("/process", processRoutes);

export { routes };
