import { Router } from "express";
import { processRoute } from "./processRoute.js";

const router = Router();
router.use("/process", processRoute);

export { router };
