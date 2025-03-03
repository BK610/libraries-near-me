import fs from "fs";
import path from "path";
import csv from "csv-parser";

interface CSVRow {
  [key: string]: string;
}

export async function readCSV(filePath: string): Promise<CSVRow[]> {
  const results: CSVRow[] = [];
  const fullPath = path.join(process.cwd(), filePath);

  return new Promise((resolve, reject) => {
    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (data: CSVRow) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
