import prepareCssClassName from "../utils/prepareCssClassName";
import writeClassesToFile from "../utils/writeCssClassesToFile";

// TODO: move somewhere else
type ConfigKey = 'NAME' | 'CONSTANT_NAME' | 'CONSTANT_FILE_NAME' | 'TYPE_NAME' | 'TYPE_FILE_NAME' | 'CSS_CLASS_PREFIX' | 'CSS_FILE_NAME';

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

    const tokenVariantNameList = tokenNameFilter ? tokenNameFilter(Object.keys(designTokens)) : Object.keys(designTokens);
    tokenVariantNameList?.forEach((colorSchemeTokenVariantName) => {
      const className = prepareCssClassName(designTokenConfig.CSS_CLASS_PREFIX, colorSchemeTokenVariantName);
      const customPropertyName = `--${designTokenConfig.NAME}-${colorSchemeTokenVariantName}`;
      cssClasses.push(cssClassGenerator(className, customPropertyName));
    })

    await writeClassesToFile(cssClasses, designTokenConfig.CSS_FILE_NAME);
  }
}
