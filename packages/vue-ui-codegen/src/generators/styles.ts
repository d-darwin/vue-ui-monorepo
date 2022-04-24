import * as fs from "fs";
import * as config from "../../config.json";
import log, { LOG_TYPE } from "../utils/log";
import prepareCssClassName from "../utils/prepareCssClassName";
import generateFontCssClass from "../utils/generateFontCssClass";
import writeClassesToFile from "../utils/writeCssClassesToFile";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: Record<string, any>; // TODO: more accurate toke type
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  const fontDesignTokens = designTokens[config.TOKENS.FONT.NAME];
  if (fontDesignTokens) {
    const fontCssClasses: string[] = [];
    const fontTokenVariantNameList = Object.keys(fontDesignTokens);
    fontTokenVariantNameList.forEach((fontTokenVariantName) => {
      const className = prepareCssClassName(
        config.TOKENS.FONT.CSS_CLASS_PREFIX,
        fontTokenVariantName
      );
      const customPropertyName = `--${config.TOKENS.FONT.NAME}-${fontTokenVariantName}`;

      fontCssClasses.push(generateFontCssClass(className, customPropertyName));
    })

    writeClassesToFile(fontCssClasses, config.TOKENS.FONT.CSS_FILE_NAME);
  }
}
