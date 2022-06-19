import * as config from "@darwin-studio/vue-ui-codegen/config.json";
import log, { LOG_TYPE } from "../utils/log";
import generateConstantsFile from "../utils/generateConstantsFile";
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

  const colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
  await generateConstantsFile(
    designTokens[colorSchemeTokenConfig.NAME],
    colorSchemeTokenConfig,
    // TODO: move to config ???
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => !designTokenName.includes('-')
    ),
  );

  const fontTokenConfig = config.TOKENS.FONT;
  await generateConstantsFile(designTokens[fontTokenConfig.NAME], fontTokenConfig, null);

  const sizeTokenConfig = config.TOKENS.SIZE;
  await generateConstantsFile(designTokens[sizeTokenConfig.NAME], sizeTokenConfig, null);
}

