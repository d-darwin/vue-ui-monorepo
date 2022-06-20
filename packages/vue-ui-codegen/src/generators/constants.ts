import * as config from "@darwin-studio/vue-ui-codegen/config.json";
import log, { LOG_TYPE } from "../utils/log";
import generateConstantsFile from "../utils/generateConstantsFile";
import type { DesignTokens } from "../types";
import getNakedName from "../utils/getNakedName";
import {SIZE} from "../../dist/constants/size";

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
    null
  );

  const fontTokenConfig = config.TOKENS.FONT;
  await generateConstantsFile(designTokens[fontTokenConfig.NAME], fontTokenConfig, null, null);

  // NB: should to be generated before padding
  const sizeTokenConfig = config.TOKENS.SIZE;
  await generateConstantsFile(designTokens[sizeTokenConfig.NAME], sizeTokenConfig, null, null);

  const paddingTokenConfig = config.TOKENS.PADDING;
  await generateConstantsFile(
    designTokens[paddingTokenConfig.NAME],
    paddingTokenConfig,
    null,
    (designTokenNames: string[]) => designTokenNames.reduce((acc: string[], tokenName) => {
      const { nakedVariantName } = getNakedName(tokenName, Object.values(SIZE))

      if (!acc.find(item => item === nakedVariantName)) {
        acc.push(nakedVariantName);
      }

      return acc
    }, [])
  );

  const roundingTokenConfig = config.TOKENS.ROUNDING;
  await generateConstantsFile(designTokens[roundingTokenConfig.NAME], roundingTokenConfig, null, null);
}

