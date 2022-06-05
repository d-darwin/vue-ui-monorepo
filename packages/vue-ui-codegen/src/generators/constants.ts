import * as config from "../../config.json"; // TODO: path from root
import log, { LOG_TYPE } from "../utils/log";
import prepareConstantString from "../utils/prepareConstantString";
import writeConstantToFile from "../utils/writeConstantToFile";

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
    const sizeConstantStrings: string[] = [];

    sizeConstantStrings.push(`export const ${config.TOKENS.SIZE.CONSTANT_NAME} = {`);
    const sizeTokenVariantNameList = Object.keys(sizeDesignTokens);
    sizeTokenVariantNameList.forEach((sizeTokenVariantName) => {
      sizeConstantStrings.push(prepareConstantString(sizeTokenVariantName));
    })
    sizeConstantStrings.push("} as const;");

    writeConstantToFile(sizeConstantStrings, config.TOKENS.SIZE.CONSTANT_FILE_NAME);
  }
}

