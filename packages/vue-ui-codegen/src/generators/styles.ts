import * as config from "@darwin-studio/vue-ui-codegen/config.json";
import log, { LOG_TYPE } from "../utils/log";
import generateStylesFile from "../utils/generateStylesFile";
import generateColorSchemeCssClasses from "../utils/generateColorSchemeCssClasses";
import generateFontCssClass from "../utils/generateFontCssClass";
import generatePaddingCssClass from "../utils/generatePaddingCssClass";
import generateRoundingCssClass from "../utils/generateRoundingCssClass";
import generateSizeCssClass from "../utils/generateSizeCssClass";
import type { DesignTokens } from "../types";
import generateBorderCssClasses from "../utils/generateBorderCssClasses";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: DesignTokens;
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  // TODO: separate styles for background/text ???
  const borderTokenConfig = config.TOKENS.BORDER;
  await generateStylesFile(
    designTokens[borderTokenConfig.NAME],
    borderTokenConfig,
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => !designTokenName.includes('-') // TODO: more flexible filter
    ), // TODO: move to config ???
    generateBorderCssClasses, // TODO: move to config ???
  )

  // TODO: separate styles for background/text ???
  // TODO: separate styles for background/border/text ???
  const colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
  await generateStylesFile(
    designTokens[colorSchemeTokenConfig.NAME],
    colorSchemeTokenConfig,
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => !designTokenName.includes('-') // TODO: more flexible filter
    ), // TODO: move to config ???
    generateColorSchemeCssClasses, // TODO: move to config ???
  )

  const fontTokenConfig = config.TOKENS.FONT;
  await generateStylesFile(
    designTokens[fontTokenConfig.NAME],
    fontTokenConfig,
    null, // TODO: move to config ???
    generateFontCssClass, // TODO: move to config ???
  )

  const paddingTokenConfig = config.TOKENS.PADDING;
  await generateStylesFile(
    designTokens[paddingTokenConfig.NAME],
    paddingTokenConfig,
    null, // TODO: move to config ???
    generatePaddingCssClass, // TODO: move to config ???
  )

  const roundingTokenConfig = config.TOKENS.ROUNDING;
  await generateStylesFile(
    designTokens[roundingTokenConfig.NAME],
    roundingTokenConfig,
    null, // TODO: move to config ???
    generateRoundingCssClass, // TODO: move to config ???
  )

  const sizeTokenConfig = config.TOKENS.SIZE;
  await generateStylesFile(
    designTokens[sizeTokenConfig.NAME],
    sizeTokenConfig,
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => !designTokenName.includes('-') // TODO: more flexible filter
    ), // TODO: move to config ???
    generateSizeCssClass, // TODO: move to config ???
  )
}
