import prepareCssClassName from "../utils/prepareCssClassName";
import writeClassesToFile from "../utils/writeCssClassesToFile";
import { ConfigKey } from "../types";

// TODO: descr
// TODO: try to reduce args
export default async function (
  // TODO: more accurate type
  designTokens: Record<string, any>,
  designTokenConfig: Record<ConfigKey, string>,
  tokenNameFilter: ((tokenNames: string[]) => string[]) | null,
  cssClassGenerator: (className: string, customPropertyName: string) => string,
): Promise<void> {
  if (designTokens) {
    const cssClasses: string[] = [];

    const tokenVariantNameList = tokenNameFilter
      ? tokenNameFilter(Object.keys(designTokens))
      : Object.keys(designTokens);
    tokenVariantNameList?.forEach((tokenVariantName) => {
      const className = prepareCssClassName(designTokenConfig.CSS_CLASS_PREFIX, tokenVariantName);
      const customPropertyName = `--${designTokenConfig.NAME}-${tokenVariantName}`;
      cssClasses.push(cssClassGenerator(className, customPropertyName));
    })

    await writeClassesToFile(cssClasses, designTokenConfig.CSS_FILE_NAME);
  }
}
