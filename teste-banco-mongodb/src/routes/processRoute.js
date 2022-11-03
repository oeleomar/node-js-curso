import multer from "multer";
import fs from "fs";
import { Router } from "express";
import { multerConfig } from "../config/multer.js";
import { CreateProcessController } from "../controller/CreateProcess/CreateProcessController.js";
import { AppError } from "../errors/AppError.js";
import { removeFiles } from "../utils/removeFiles.js";
import { GetProcessController } from "../controller/GetProcess/GetProcessController.js";
import { UpdateProcessController } from "../controller/UpdateProcess/UpdateProcessController.js";

const processRoute = Router();

const createProcessController = new CreateProcessController();
const getProcessController = new GetProcessController();
const updateProcessController = new UpdateProcessController();

//Create
processRoute.post(
  "/",
  multer(multerConfig).fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res, err) => {
    console.log(err);
    try {
      const process = await createProcessController.handle(req.body, req.files);
      if (process instanceof AppError) {
        if (req.files.file) removeFiles(req.files.file[0].path);
        if (req.files.video) removeFiles(req.files.video[0].path);
        return res.status(400).json({ error: process });
      }

      return res.status(201).json(process);
    } catch (e) {
      return res.status(500).json(new AppError("Internal server error", 500));
    }
  },
);

//Read one setor
processRoute.get("/:setor", async (req, res) => {
  const { setor } = req.params;
  try {
    const data = await getProcessController.handle(setor);
    return res.json(data);
  } catch (e) {
    return res.status(500).json(new AppError("Internal server error", 500));
  }
});

//Read All

//Update
processRoute.put(
  "/:id",
  multer(multerConfig).fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    //
    const { id } = req.params;
    try {
      const data = await updateProcessController.handle(
        id,
        req.body,
        req.files,
      );

      if (data instanceof AppError) {
        if (req.files.file) removeFiles(req.files.file[0].path);
        if (req.files.video) removeFiles(req.files.video[0].path);
        return res.status(data.statusCode).json(data);
      }

      return res.json({ data: "Atualizado com sucesso", statusCode: 200 });
    } catch (e) {
      console.log(e);
      return res.status(500).json(new AppError("Internal server error", 500));
    }
  },
);
//Delete

export { processRoute };
