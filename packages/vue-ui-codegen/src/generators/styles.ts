import * as config from "../../config.json";
import log, { LOG_TYPE } from "../utils/log";
import generateStylesFile from "../utils/generateStylesFile";
import generateFontCssClass from "../utils/generateFontCssClass";
import generateColorSchemeCssClasses from "../utils/generateColorSchemeCssClasses";
import generateSizeCssClass from "../utils/generateSizeCssClass";
import type { DesignTokens } from "../types";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: DesignTokens;
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  await generateStylesFile(
    designTokens[config.TOKENS.SIZE.NAME],
    config.TOKENS.SIZE,
    null, // TODO: move to config ???
    generateSizeCssClass, // TODO: move to config ???
  )

  await generateStylesFile(
    designTokens[config.TOKENS.FONT.NAME],
    config.TOKENS.FONT,
    null, // TODO: move to config ???
    generateFontCssClass, // TODO: move to config ???
  )

  await generateStylesFile(
    designTokens[config.TOKENS.COLOR_SCHEME.NAME],
    config.TOKENS.COLOR_SCHEME,
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => !designTokenName.includes('-')
    ), // TODO: move to config ???
    generateColorSchemeCssClasses, // TODO: move to config ???
  )
}
