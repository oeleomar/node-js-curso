import multer from "multer";
import fs from "fs";
import { Router } from "express";
import { multerConfig } from "../config/multer.js";
import { CreateProcessController } from "../controller/CreateProcess/CreateProcessController.js";
import { AppError } from "../errors/AppError.js";

const processRoute = Router();
const createProcessController = new CreateProcessController();

//Create
processRoute.post(
  "/",
  multer(multerConfig).fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    const process = await createProcessController.handle(req.body, req.files);

    if (process instanceof AppError) {
      fs.unlinkSync(`${req.files.file[0].path}`, (err) => {
        if (err) throw err;
      });
      fs.unlinkSync(`${req.files.video[0].path}`, (err) => {
        if (err) throw err;
      });
      return res.status(400).json({ error: "Processo já existente" });
    }

    return res.status(201).json(process);
  },
);

//Read one

//Read All

//Update

//Delete

export { processRoute };
