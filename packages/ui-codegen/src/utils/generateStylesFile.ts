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
  cssClassGenerator: (
    className: string,
    customProperty: { name: string, value?: string | Record<string, unknown> },
    auxClassName: string,
    auxCustomProperty?: { name: string, value?: string },
    isLast?: boolean
  ) => string,
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

    let prevClassName = '';
    let prevCustomPropertyName = '';
    let prevCustomPropertyValue = '';
    tokenVariantNameList?.forEach((tokenVariantName, index) => {
      const className = prepareCssClassName(designTokenConfig.CSS_CLASS_PREFIX, tokenVariantName);
      const customPropertyName = `--${designTokenConfig.NAME}-${tokenVariantName}`;
      const customPropertyValue = designTokens[tokenVariantName]?.value;

      if (colorVariantList?.length) {
        const { extractedWord: colorVariantName } = getNakedName(customPropertyName, colorVariantList)
        const colorCustomPropertyName = `--${config.TOKENS.COLOR_SCHEME.NAME}-${colorVariantName}-${designTokenConfig.NAME}`
        cssClassStringList.push(cssClassGenerator(
          className,
          { name: customPropertyName, value: customPropertyValue },
          prevClassName,
          { name: colorCustomPropertyName },
        )); // TODO: add options{}
        return;
      } else {
        cssClassStringList.push(cssClassGenerator(
          className,
          { name: customPropertyName, value: customPropertyValue },
          prevClassName,
          { name: prevCustomPropertyName, value: prevCustomPropertyValue },
          index === tokenVariantNameList.length - 1
        )); // TODO: add options{}
      }
      prevClassName = className;
      prevCustomPropertyName = customPropertyName;
      prevCustomPropertyValue = customPropertyValue;
    })

    await writeFile(
      cssClassStringList,
      config.OUT_DIR + designTokenConfig.CSS_FILE_PATH + config.STYLES_FILE_EXT
    );
  }
}
