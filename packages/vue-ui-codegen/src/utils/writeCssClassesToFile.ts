import * as fs from "fs";
import * as config from "../../config.json";
import log, { LOG_TYPE } from "./log";

export default async function(fileClassStrings: string[], filePath: string): Promise<void> {
  if (fileClassStrings.length) {
    const sizeFileStream = await fs.createWriteStream(filePath);

    sizeFileStream.on("open", async () => {
      sizeFileStream.write(
        `@import '${config.CSS_VARIABLES_SOURCE}';\n`
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
