import * as config from "@darwin-studio/ui-codegen/config.json";
import prepareCssClassName from "../utils/prepareCssClassName";
import writeFile from "../utils/writeFile";
import type { ConfigKey, DesignTokens } from "../types";
import getNakedName from "./getNakedName";

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
// TODO: descr
// TODO: try to reduce args
export default async function (
  designTokens: DesignTokens,
  designTokenConfig: PartialRecord<ConfigKey, string>,
  tokenNameFilter: ((tokenNames: string[]) => string[]) | null,
  cssClassGenerator: (className: string, customPropertyName: string, colorClassPropertyName?: string) => string,
  colorVariantList?: string[],
): Promise<void> {
  if (designTokens) {
    const cssClassStringList: string[] = [];

    cssClassStringList.push(
      `@import '${config.CSS_VARIABLES_SOURCE}';`
    );

    const tokenVariantNameList = tokenNameFilter
      ? tokenNameFilter(Object.keys(designTokens))
      : Object.keys(designTokens);
    tokenVariantNameList?.forEach((tokenVariantName) => {
      const className = prepareCssClassName(designTokenConfig.CSS_CLASS_PREFIX, tokenVariantName);
      const customPropertyName = `--${designTokenConfig.NAME}-${tokenVariantName}`;
      if (colorVariantList?.length) {
        const { extractedWord: colorVariantName } = getNakedName(customPropertyName, colorVariantList)
        const colorCustomPropertyName = `--${config.TOKENS.COLOR_SCHEME.NAME}-${colorVariantName}-${designTokenConfig.NAME}`
        cssClassStringList.push(cssClassGenerator(className, customPropertyName, colorCustomPropertyName));
        return;
      } else {
        cssClassStringList.push(cssClassGenerator(className, customPropertyName));
      }
    })

    await writeFile(
      cssClassStringList,
      config.OUT_DIR + designTokenConfig.CSS_FILE_PATH + config.STYLES_FILE_EXT
    );
  }
}
