import * as fs from "fs";
import * as config from "../../config.json";
import log, { LOG_TYPE } from "./log";

export default function(fileClassStrings: string[], filePath: string): void {
  if (fileClassStrings.length) {
    const sizeFileStream = fs.createWriteStream(filePath);
    sizeFileStream.on("open", () => {
      sizeFileStream.write(
        `@import '${config.DESIGN_TOKENS_SOURCE}';\n`
      );

      fileClassStrings.forEach((classStrings, classIndex) => {
        sizeFileStream.write(`\n${classStrings}\n`);

        if (classIndex >= fileClassStrings.length - 1) {
          sizeFileStream.end();
        }
      });
    });

    sizeFileStream.on("error", (error) => {
      log(error.message, LOG_TYPE.ERROR);
    });
  }
}
