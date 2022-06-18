import * as config from "../../config.json"; // TODO: path from root
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

  // TODO: fontSize ???

  const sizeTokenConfig = config.TOKENS.SIZE;
  await generateConstantsFile(designTokens[sizeTokenConfig.NAME], sizeTokenConfig, null);

  const colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
  await generateConstantsFile(
    designTokens[colorSchemeTokenConfig.NAME],
    colorSchemeTokenConfig,
    // TODO: move to config ???
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => !designTokenName.includes('-')
    ),
  );
}

