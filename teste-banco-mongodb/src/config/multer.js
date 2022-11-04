import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "static"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "video") {
        cb(null, path.resolve(__dirname, "..", "..", "public", "videos"));
      } else if (file.fieldname === "file") {
        cb(null, path.resolve(__dirname, "..", "..", "public", "docs"));
      } else {
        cb(null, path.resolve(__dirname, "..", "..", "static"));
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["application/pdf", "video/mp4"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.validationFile = { message: "Format invalid", statusCode: 422 };
      cb(null, false, new Error("goes wrong on the mimetype"));
    }
  },
};

export { multerConfig };
