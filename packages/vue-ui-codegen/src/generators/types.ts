import * as config from "@darwin-studio/vue-ui-codegen/config.json";
import log, { LOG_TYPE } from "../utils/log";
import type { DesignTokens } from "../types";
import generateTypesFile from "../utils/generateTypesFile";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: DesignTokens;
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  // TODO: what to do with 'text' ???
  const colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
  await generateTypesFile(designTokens[colorSchemeTokenConfig.NAME], colorSchemeTokenConfig);

  const fontTokenConfig = config.TOKENS.FONT;
  await generateTypesFile(designTokens[fontTokenConfig.NAME], fontTokenConfig);

  const paddingTokenConfig = config.TOKENS.PADDING;
  await generateTypesFile(designTokens[paddingTokenConfig.NAME], paddingTokenConfig);

  const roundingTokenConfig = config.TOKENS.ROUNDING;
  await generateTypesFile(designTokens[roundingTokenConfig.NAME], roundingTokenConfig);

  const sizeTokenConfig = config.TOKENS.SIZE;
  await generateTypesFile(designTokens[sizeTokenConfig.NAME], sizeTokenConfig);
}
