import * as config from "../../config.json";
import log, { LOG_TYPE } from "../utils/log";
import prepareTypeString from "../utils/prepareTypeString";
import writeTypeToFile from "../utils/writeTypeToFile";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: Record<string, any>; // TODO: more accurate toke type
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }
  const sizeDesignTokens = designTokens[config.TOKENS.SIZE.NAME];
  if (sizeDesignTokens) {
    const sizeTypeStrings: string[] = [];

    sizeTypeStrings.push(
      `import { ${config.TOKENS.SIZE.CONSTANT_NAME} } from "../constants/size";\n` // TODO: get from config, imports and declarations are separate
    );
    sizeTypeStrings.push(
      prepareTypeString(config.TOKENS.SIZE.TYPE_NAME, config.TOKENS.SIZE.CONSTANT_NAME)
    );

    writeTypeToFile(sizeTypeStrings, config.TOKENS.SIZE.TYPE_FILE_NAME);
  }


  /* TODO replace with 2 steps: data collection, data write */
  /*const designTokenTypes = Object.keys(designTokens);
  designTokenTypes.forEach((tokenType, tokenIndex) => {
    const typeStrings: string[] = []; // TODO: choose more accurate name

    switch (tokenType) {
      case config.TOKENS.SIZE.NAME:
        typeStrings.push(
          `import { ${config.TOKENS.SIZE.CONSTANT_NAME} } from "./constants";\n` // TODO: get from config, imports and declarations are separate
        );

        typeStrings.push(
          prepareTypeString(config.TOKENS.SIZE.TYPE_NAME, config.TOKENS.SIZE.CONSTANT_NAME)
        );

        break;
      default:
    }

    if (typeStrings.length >= 2) {
      fileStream.on("open", () => {
        if (tokenIndex > 0) {
          fileStream.write("\n");
        }

        typeStrings.forEach((str) => {
          fileStream.write(`${str}\n`);
        });

        const isLastToken = tokenIndex >= designTokenTypes.length - 1;
        if (isLastToken) {
          fileStream.end();
        }
      });
    }
  })*/
}
