import * as fs from "fs";
import log, { LOG_TYPE } from "./log";

export default async function(fileStringList: string[], filePath: string): Promise<void> {
  if (fileStringList.length) {
    const fileStream = await fs.createWriteStream(filePath);

    fileStream.on("open", () => {
      fileStringList.forEach((fileString, index) => {
        fileStream.write(`${fileString}\n`);

        if (index >= fileStringList.length - 1) {
          fileStream.end();
        }
      });
    });

    fileStream.on("error", (error) => {
      // TODO: throw error ???
      log(error.message, LOG_TYPE.ERROR);
    });
  }
}
