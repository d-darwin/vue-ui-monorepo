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

  // TODO: fontSize ???

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

  // TODO
  const colorSchemeDesignTokens = designTokens[config.TOKENS.COLOR_SCHEME.NAME];
  if (sizeDesignTokens) {
    const colorSchemeConstantStrings: string[] = [];

    colorSchemeConstantStrings.push(`export const ${config.TOKENS.COLOR_SCHEME.CONSTANT_NAME} = {`);
    // TODO: make it callback func in ConstantStringsGenerator func - filter
    const colorSchemeTokenVariantNameList = Object.keys(colorSchemeDesignTokens)
      .filter(designTokenName => !designTokenName.includes('-'));
    // TODO: now there is restriction - colorSchemeName has to be exactly one world
    colorSchemeTokenVariantNameList.forEach((colorSchemeTokenVariantName) => {
      colorSchemeConstantStrings.push(prepareConstantString(colorSchemeTokenVariantName));
    })
    colorSchemeConstantStrings.push("} as const;");

    writeConstantToFile(colorSchemeConstantStrings, config.TOKENS.COLOR_SCHEME.CONSTANT_FILE_NAME);
  }
}

