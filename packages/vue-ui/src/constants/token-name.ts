import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import type { TokenName } from "@darwin-studio/vue-ui/src/types/token-name";

export const TOKEN_NAME: Record<TokenName, TokenName> = Object.fromEntries(
  Object.keys(codegenConfig.TOKENS).map((tokenKey) => [tokenKey, tokenKey])
) as Record<TokenName, TokenName>;
