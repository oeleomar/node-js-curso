import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { router } from "./src/routes/index.js";
import * as dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"));

app.use(router);
mongoose.connect("mongodb://localhost:27017/process", () => app.listen(3000));
