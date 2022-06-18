import * as fs from "fs";
import * as config from "../../config.json";
import log, { LOG_TYPE } from "./log";

// TODO: generalize with other write functions
export default async function(fileStringList: string[], filePath: string): Promise<void> {
  if (fileStringList.length) {
    const fileStream = await fs.createWriteStream(filePath);

    fileStream.on("open", async () => {
      fileStream.write(
        `@import '${config.CSS_VARIABLES_SOURCE}';\n` // TODO: move to call
      );

      fileStringList.forEach((fileString, index) => {
        fileStream.write(`\n${fileString}\n`);

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
