import prepareCssClassName from "../utils/prepareCssClassName";
import writeFile from "../utils/writeFile";
import type { ConfigKey, DesignTokens } from "../types";
import * as config from "../../config.json";

// TODO: descr
// TODO: try to reduce args
export default async function (
  designTokens: DesignTokens,
  designTokenConfig: Record<ConfigKey, string>,
  tokenNameFilter: ((tokenNames: string[]) => string[]) | null,
  cssClassGenerator: (className: string, customPropertyName: string) => string,
): Promise<void> {
  if (designTokens) {
    const cssClassStringList: string[] = [];

    cssClassStringList.push(
      `@import '${config.CSS_VARIABLES_SOURCE}';\n`
    );

    const tokenVariantNameList = tokenNameFilter
      ? tokenNameFilter(Object.keys(designTokens))
      : Object.keys(designTokens);
    tokenVariantNameList?.forEach((tokenVariantName) => {
      const className = prepareCssClassName(designTokenConfig.CSS_CLASS_PREFIX, tokenVariantName);
      const customPropertyName = `--${designTokenConfig.NAME}-${tokenVariantName}`;
      cssClassStringList.push(cssClassGenerator(className, customPropertyName));
    })

    await writeFile(
      cssClassStringList,
      config.OUT_DIR + designTokenConfig.CSS_FILE_PATH + config.STYLES_FILE_EXT
    );
  }
}
