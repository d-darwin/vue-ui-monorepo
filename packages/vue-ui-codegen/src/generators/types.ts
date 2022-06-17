import * as config from "../../config.json";
import log, { LOG_TYPE } from "../utils/log";
import prepareTypeString from "../utils/prepareTypeString";
import writeTypeToFile from "../utils/writeTypeToFile";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: Record<string, any>; // TODO: more accurate token type
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  // TODO: make generator
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

  const colorSchemeDesignTokens = designTokens[config.TOKENS.COLOR_SCHEME.NAME];
  if (colorSchemeDesignTokens) {
    const colorSchemeTypeStrings: string[] = [];

    colorSchemeTypeStrings.push(
      `import { ${config.TOKENS.COLOR_SCHEME.CONSTANT_NAME} } from "../constants/color-scheme";\n` // TODO: get from config, imports and declarations are separate
    );
    colorSchemeTypeStrings.push(
      prepareTypeString(config.TOKENS.COLOR_SCHEME.TYPE_NAME, config.TOKENS.COLOR_SCHEME.CONSTANT_NAME)
    );

    writeTypeToFile(colorSchemeTypeStrings, config.TOKENS.COLOR_SCHEME.TYPE_FILE_NAME);
  }
}
