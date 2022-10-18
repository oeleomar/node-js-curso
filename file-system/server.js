import express from "express";
import fs from "fs";
import { createFile } from "./src/createFile.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Acesso negado");
});

app.get("/video/:id", (req, res) => {
  const range = req.headers.range;
  const id = req.params.id;
  const videoPath = `./public/videos/${id}.mp4`;
  const videoSize = fs.statSync(videoPath).size;

  const chunkSize = 1 * 1e6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
});

app.listen(3000);
