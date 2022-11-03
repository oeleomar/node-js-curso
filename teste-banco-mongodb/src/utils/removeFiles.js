import fs from "fs";

export function removeFiles(path) {
  fs.unlinkSync(path, (err) => {
    if (err) throw err;
  });
}
