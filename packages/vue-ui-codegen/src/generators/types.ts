import * as config from "../../config.json";
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

  // TODO: fontSize ???

  const sizeTokenConfig = config.TOKENS.SIZE;
  await generateTypesFile(designTokens[sizeTokenConfig.NAME], sizeTokenConfig);

  const colorSchemeTokenConfig = config.TOKENS.COLOR_SCHEME;
  await generateTypesFile(designTokens[colorSchemeTokenConfig.NAME], colorSchemeTokenConfig)
}
