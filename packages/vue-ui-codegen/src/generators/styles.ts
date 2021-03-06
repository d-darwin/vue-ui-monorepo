import * as config from "@darwin-studio/vue-ui-codegen/config.json";
import log, { LOG_TYPE } from "../utils/log";
import generateStylesFile from "../utils/generateStylesFile";
import generateBorderCssClasses from "../utils/generateBorderCssClasses";
import generateColorSchemeCssClasses from "../utils/generateColorSchemeCssClasses";
import generateFontCssClass from "../utils/generateFontCssClass";
import generateMinControlWidthCssClass from "../utils/generateMinControlWidthCssClass";
import generateOutlineCssClass from "../utils/generateOutlineCssClass";
import generatePaddingCssClass from "../utils/generatePaddingCssClass";
import generateRoundingCssClass from "../utils/generateRoundingCssClass";
import generateSizeCssClass from "../utils/generateSizeCssClass";
import type { DesignTokens } from "../types";
import { COLOR_SCHEME } from "../../dist/constants/color-scheme";
import generateTransitionCssClass from "../utils/generateTransitionCssClass";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: DesignTokens;
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  // TODO: add header: dont' edit, autogenerated

  const borderTokenConfig = config.TOKENS.BORDER;
  await generateStylesFile(
    designTokens[borderTokenConfig.NAME],
    borderTokenConfig,
    null, // TODO: move to config ???
    generateBorderCssClasses, // TODO: move to config ???
    Object.values(COLOR_SCHEME), // TODO: should be generated base on current COLOR_SCHEME
  )

  // TODO: separate styles for background/color ???
  // TODO: what to do with 'text' ???
  const colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
  await generateStylesFile(
    designTokens[colorSchemeTokenConfig.NAME],
    colorSchemeTokenConfig,
    // TODO: move to config ???
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => {
        const isIgnored = (colorSchemeTokenConfig.IGNORE || []).some(ignoredSubstring => {
          return designTokenName.includes(ignoredSubstring);
        })
        return !designTokenName.includes('-') && !isIgnored
      }
    ),
    generateColorSchemeCssClasses, // TODO: move to config ???
  )

  const fontTokenConfig = config.TOKENS.FONT;
  await generateStylesFile(
    designTokens[fontTokenConfig.NAME],
    fontTokenConfig,
    null, // TODO: move to config ???
    generateFontCssClass, // TODO: move to config ???
  )

  const minControlWidthConfig = config.TOKENS.MIN_CONTROL_WIDTH;
  await generateStylesFile(
    designTokens[minControlWidthConfig.NAME],
    minControlWidthConfig,
    null,
    generateMinControlWidthCssClass,
  )

  const outlineTokenConfig = config.TOKENS.OUTLINE;
  await generateStylesFile(
    designTokens[outlineTokenConfig.NAME],
    outlineTokenConfig,
    null, // TODO: move to config ???
    generateOutlineCssClass, // TODO: move to config ???
    Object.values(COLOR_SCHEME), // TODO: should be generated base on current COLOR_SCHEME
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

  const transitionTokenConfig = config.TOKENS.TRANSITION;
  await generateStylesFile(
    designTokens[transitionTokenConfig.NAME],
    transitionTokenConfig,
    null, // TODO: move to config ???
    generateTransitionCssClass, // TODO: move to config ???
  )
}
