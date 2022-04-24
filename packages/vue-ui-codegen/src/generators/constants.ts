import * as fs from "fs"; // TODO: why can't find
import * as config from "../../config.json"; // TODO: path from root
import log, { LOG_TYPE } from "../utils/log";
import prepareConstantString from "../utils/prepareConstantString";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: Record<string, any>; // TODO: more accurate toke type
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  // TODO: move to helpers ???
  let fileStream: fs.WriteStream;
  try {
    fileStream = fs.createWriteStream(config.DYNAMIC_CONSTANTS_FILE_PATH);
    fileStream.on("error", (error: Error) => {
      log(error.message, LOG_TYPE.ERROR);
      return;
    });
  } catch {
    log("Can't create write stream was created for DYNAMIC_CONSTANTS_FILE_PATH. Check config.json", LOG_TYPE.ERROR);
  }

  /* TODO replace with 2 steps: data collection, data write */
  const designTokenTypes = Object.keys(designTokens);
  designTokenTypes.forEach((tokenType, tokenIndex) => {
    const tokenVariants = designTokens[tokenType];
    const constantStrings: string[] = []; // TODO: choose more accurate name

    switch (tokenType) {
      case config.TOKENS.SIZE.NAME:
        constantStrings.push(`export const ${config.TOKENS.SIZE.CONSTANT_NAME} = {`);

        Object.keys(tokenVariants).forEach((tokenVariantName) => {
          constantStrings.push(prepareConstantString(tokenVariantName));
        });

        constantStrings.push("} as const;"); //
        break;
      default:
    }

    if (constantStrings.length > 2) {
      fileStream.on("open", () => {
        if (tokenIndex > 0) {
          fileStream.write("\n");
        }

        constantStrings.forEach((str) => {
          fileStream.write(`${str}\n`);
        });

        const isLastToken = tokenIndex >= designTokenTypes.length - 1;
        if (isLastToken) {
          fileStream.end();
        }
      });
    }
  })
}

