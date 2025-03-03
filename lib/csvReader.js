import fs from "fs";
import path from "path";
import csv from "csv-parser";

export async function readCSV(filePath) {
  const results = [];
  const fullPath = path.join(process.cwd(), filePath);

  return new Promise((resolve, reject) => {
    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
