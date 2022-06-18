import * as fs from "fs";
import * as config from "../../config.json"; // TODO: path from root
import log, { LOG_TYPE } from "./log";

// TODO: generalize with other write functions
export default function(constantStrings: string[], filePath: string): void {
  if (constantStrings.length) {
    const sizeFileStream = fs.createWriteStream(config.OUT_DIR + filePath);
    sizeFileStream.on("open", () => {
      constantStrings.forEach((classStrings, classIndex) => {
        sizeFileStream.write(`${classStrings}\n`);

        if (classIndex >= constantStrings.length - 1) {
          sizeFileStream.end();
        }
      });
    });

    sizeFileStream.on("error", (error) => {
      log(error.message, LOG_TYPE.ERROR);
    });
  }
}
