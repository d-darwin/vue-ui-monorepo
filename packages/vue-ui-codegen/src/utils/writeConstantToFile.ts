import * as fs from "fs";
import log, { LOG_TYPE } from "./log";

// TODO: generalize with other write functions
export default function(fileStringList: string[], filePath: string): void {
  if (fileStringList.length) {
    const fileStream = fs.createWriteStream(filePath);

    fileStream.on("open", () => {
      fileStringList.forEach((fileString, index) => {
        fileStream.write(`${fileString}\n`);

        if (index >= fileStringList.length - 1) {
          fileStream.end();
        }
      });
    });

    fileStream.on("error", (error) => {
      log(error.message, LOG_TYPE.ERROR);
    });
  }
}
