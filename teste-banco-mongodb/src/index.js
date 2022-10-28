import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { router } from "./routes/index.js";
import "dotenv";

mongoose.connect("mongodb://localhost:27017/process");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"));

app.use(router);

app.listen(3000);
