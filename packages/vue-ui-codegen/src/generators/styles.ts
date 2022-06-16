import * as config from "../../config.json";
import log, { LOG_TYPE } from "../utils/log";
import prepareCssClassName from "../utils/prepareCssClassName";
import generateFontCssClass from "../utils/generateFontCssClass";
import writeClassesToFile from "../utils/writeCssClassesToFile";
import generateColorSchemeCssClasses from "../utils/generateColorSchemeCssClasses";
import generateSizeCssClass from "../utils/generateSizeCssClass";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: Record<string, any>; // TODO: more accurate toke type
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  // TODO: make generator
  const sizeDesignTokens = designTokens[config.TOKENS.SIZE.NAME];
  if (sizeDesignTokens) {
    const sizeCssClasses: string[] = [];
    const sizeTokenVariantNameList = Object.keys(sizeDesignTokens);
    sizeTokenVariantNameList.forEach((sizeTokenVariantName) => {
      const className = prepareCssClassName(
        config.TOKENS.SIZE.CSS_CLASS_PREFIX,
        sizeTokenVariantName
      );
      const customPropertyName = `--${config.TOKENS.SIZE.NAME}-${sizeTokenVariantName}`;

      sizeCssClasses.push(generateSizeCssClass(className, customPropertyName));
    })

    writeClassesToFile(sizeCssClasses, config.TOKENS.SIZE.CSS_FILE_NAME);
  }

  // TODO: make generator
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

  // TODO: make generator
  const colorSchemeDesignTokens = designTokens[config.TOKENS.COLOR_SCHEME.NAME];
  if (colorSchemeDesignTokens) {
    const colorSchemeCssClasses: string[] = [];
    // TODO: make it callback func in ConstantStringsGenerator func - filter
    const colorSchemeTokenVariantNameList = Object.keys(colorSchemeDesignTokens)
      .filter(designTokenName => !designTokenName.includes('-'));
    // TODO: now there is restriction - colorSchemeName has to be exactly one world
    colorSchemeTokenVariantNameList.forEach((colorSchemeTokenVariantName) => {
      const className = prepareCssClassName(
        config.TOKENS.COLOR_SCHEME.CSS_CLASS_PREFIX,
        colorSchemeTokenVariantName
      );
      const customPropertyName = `--${config.TOKENS.COLOR_SCHEME.NAME}-${colorSchemeTokenVariantName}`;
      // TODO: make cssClasses generator
      // TODO: make cssClasses generator
      colorSchemeCssClasses.push(generateColorSchemeCssClasses(className, customPropertyName));
    })

    writeClassesToFile(colorSchemeCssClasses, config.TOKENS.COLOR_SCHEME.CSS_FILE_NAME);
  }
}
