import { Router } from "express";
import { CreateUserController } from "../modules/process/useCases/CreateProcessUseCase/CreateProcessController";

const createUserController = new CreateUserController();
const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", (req, res) => {
  res.send("Olá");
});

export { userRoutes };
