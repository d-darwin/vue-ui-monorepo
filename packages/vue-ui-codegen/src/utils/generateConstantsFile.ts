import prepareConstantString from "../utils/prepareConstantString";
import writeConstantToFile from "../utils/writeConstantToFile";
import { ConfigKey } from "../types";

export default async function (
  // TODO: more accurate type
  designTokens: Record<string, any>,
  designTokenConfig: Record<ConfigKey, string>,
  tokenNameFilter: ((tokenNames: string[]) => string[]) | null,
): Promise<void> {
  if (designTokens) {
    const constantStrings: string[] = [];

    constantStrings.push(`export const ${designTokenConfig.CONSTANT_NAME} = {`);

    const tokenVariantNameList = tokenNameFilter
      ? tokenNameFilter(Object.keys(designTokens))
      : Object.keys(designTokens);
    tokenVariantNameList.forEach((tokenVariantName) => {
      constantStrings.push(prepareConstantString(tokenVariantName));
    })
    constantStrings.push("} as const;");

    await writeConstantToFile(constantStrings, designTokenConfig.CONSTANT_FILE_NAME);
  }
}
