import * as config from "../../config.json"; // TODO: path from root
import log, { LOG_TYPE } from "../utils/log";
import generateConstantsFile from "../utils/generateConstantsFile";

export default async () => {
  // TODO: move to helpers ???
  let designTokens: Record<string, any>; // TODO: more accurate token type
  try {
    designTokens = await import(config.DESIGN_TOKENS_SOURCE);
  } catch {
    log("Can't import design tokens from DESIGN_TOKENS_SOURCE. Check config.json", LOG_TYPE.ERROR);
    return;
  }

  // TODO: fontSize ???

  await generateConstantsFile(
    designTokens[config.TOKENS.SIZE.NAME],
    config.TOKENS.SIZE,
    null,
  );

  await generateConstantsFile(
    designTokens[config.TOKENS.COLOR_SCHEME.NAME],
    config.TOKENS.COLOR_SCHEME,
    (designTokenNames: string[]) => designTokenNames.filter(
      designTokenName => !designTokenName.includes('-')
    ), // TODO: move to config ???
  );
}

