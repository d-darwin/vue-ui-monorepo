import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???

// TODO: move upper ???
export type TokenName =
  | "BORDER"
  | "COLOR_SCHEME"
  | "FONT"
  | "MIN_CONTROL_WIDTH"
  | "OUTLINE"
  | "PADDING"
  | "ROUNDING"
  | "SIZE"
  | "TRANSITION"
  | "BREAKPOINT"
  | "GRID";

export const TOKEN_NAME: Record<TokenName, TokenName> = Object.fromEntries(
  Object.keys(codegenConfig.TOKENS).map((tokenKey) => [tokenKey, tokenKey])
) as Record<TokenName, TokenName>;

const getCommonClass = (tokenKey: TokenName, tokenVariant: string) => {
  const classPrefix = codegenConfig.TOKENS[tokenKey]?.CSS_CLASS_PREFIX;
  if (!classPrefix || !tokenVariant) {
    return null;
  }

  const className = prepareCssClassName(classPrefix, tokenVariant);
  if (!className) {
    return null;
  }

  return transitionStyles[className];
};

export default getCommonClass;
