import csv from "csv-parser";
import fs from "fs";
import { IBook } from "../types/express/book";

export const parseCSV = (filePath: string): Promise<IBook[]> => {
  return new Promise((resolve, reject) => {
    const results: IBook[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
