import prepareCssClassName from "@darwin-studio/ui-codegen/src/utils/prepareCssClassName";
import codegenConfig from "@darwin-studio/ui-codegen/config.json";
import borderStyles from "@darwin-studio/ui-codegen/dist/styles/border.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import colorSchemeStyles from "@darwin-studio/ui-codegen/dist/styles/color-scheme.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import fontStyles from "@darwin-studio/ui-codegen/dist/styles/font.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import gridStyles from "@darwin-studio/ui-codegen/dist/styles/grid.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import minControlWidthStyles from "@darwin-studio/ui-codegen/dist/styles/min-control-width.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import outlineStyles from "@darwin-studio/ui-codegen/dist/styles/outline.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import paddingStyles from "@darwin-studio/ui-codegen/dist/styles/padding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import roundingStyles from "@darwin-studio/ui-codegen/dist/styles/rounding.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import sizeStyles from "@darwin-studio/ui-codegen/dist/styles/size.css?module"; // TODO: shorter path, default export ??? TODO: make it module ???
import transitionStyles from "@darwin-studio/ui-codegen/dist/styles/transition.css?module";
import type { Font } from "@darwin-studio/ui-codegen/dist/types/font";
import type { Size } from "@darwin-studio/ui-codegen/dist/types/size"; // TODO: shorter path, default export ??? TODO: make it module ???
import type { TokenName } from "@darwin-studio/vue-ui/src/types/token-name";
import { TOKEN_NAME } from "@darwin-studio/vue-ui/src/constants/token-name";

// TODO: naming
const generateCssClass = (tokenName: TokenName, tokenVariant: string) => {
  const classPrefix = codegenConfig.TOKENS[tokenName]?.CSS_CLASS_PREFIX;
  if (!classPrefix || !tokenVariant) {
    // TODO: test case
    return;
  }

  const tokenVariantSuffix =
    tokenName === TOKEN_NAME.MIN_CONTROL_WIDTH
      ? `-${codegenConfig.TOKENS.MIN_CONTROL_WIDTH.CSS_CLASS_SUFFIX}` // TODO: separator to const
      : "";
  const className = prepareCssClassName(
    classPrefix,
    `${tokenVariant}${tokenVariantSuffix}`
  );

  if (!className) {
    // TODO: test case
    return;
  }

  // TODO: test cases
  switch (tokenName) {
    case TOKEN_NAME.BORDER:
      return borderStyles[className];
    case TOKEN_NAME.COLOR_SCHEME:
      return colorSchemeStyles[className];
    case TOKEN_NAME.FONT:
      return fontStyles[className];
    case TOKEN_NAME.GRID:
      return gridStyles[className];
    case TOKEN_NAME.MIN_CONTROL_WIDTH:
      return minControlWidthStyles[className];
    case TOKEN_NAME.OUTLINE:
      return outlineStyles[className];
    // TODO: merge with size-padding
    case TOKEN_NAME.PADDING:
      return paddingStyles[className];
    case TOKEN_NAME.ROUNDING:
      return roundingStyles[className];
    case TOKEN_NAME.TRANSITION:
      return transitionStyles[className];
    case TOKEN_NAME.SIZE:
      return sizeStyles[className];
    default:
      return;
  }
};

// TODO: refactor
const generateClass = {
  border: (tokenVariant: string, size: Size) =>
    generateCssClass(TOKEN_NAME.BORDER, `${tokenVariant}-${size}`),
  colorScheme: (tokenVariant: string) =>
    generateCssClass(TOKEN_NAME.COLOR_SCHEME, tokenVariant),
  font: (tokenVariant: string) =>
    generateCssClass(TOKEN_NAME.FONT, tokenVariant),
  grid: (tokenVariant: string) =>
    generateCssClass(TOKEN_NAME.GRID, tokenVariant),
  minControlWidth: (tokenVariant: string) =>
    generateCssClass(TOKEN_NAME.MIN_CONTROL_WIDTH, tokenVariant),
  outline: (tokenVariant: string, size: Size | Font) =>
    generateCssClass(TOKEN_NAME.OUTLINE, `${tokenVariant}-${size}`),
  padding: (tokenVariant: string, size?: Size | Font) => [
    generateCssClass(TOKEN_NAME.PADDING, tokenVariant),
    size
      ? generateCssClass(TOKEN_NAME.PADDING, `${tokenVariant}-${size}`)
      : undefined,
  ],
  rounding: (tokenVariant: string) =>
    generateCssClass(TOKEN_NAME.ROUNDING, tokenVariant),
  transition: (tokenVariant: string) =>
    generateCssClass(TOKEN_NAME.TRANSITION, tokenVariant),
  size: (tokenVariant: string) =>
    generateCssClass(TOKEN_NAME.SIZE, tokenVariant),
} as const;

export default generateClass;
