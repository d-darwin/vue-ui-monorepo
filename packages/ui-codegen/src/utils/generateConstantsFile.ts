import * as config from "@darwin-studio/ui-codegen/config.json";
import prepareConstantString from "../utils/prepareConstantString";
import writeFile from "./writeFile";
import type { ConfigKey, DesignTokens } from "../types";
// TODO: descr
export default async function (
  designTokens: DesignTokens,
  designTokenConfig: Record<ConfigKey, string>,
  tokenNameFilter: ((tokenNames: string[]) => string[]) | null,
  tokenNameTransformer: ((tokenNames: string[]) => string[]) | null
): Promise<void> {
  if (designTokens) {
    const constantStringList: string[] = [];

    constantStringList.push(`export const ${designTokenConfig.CONSTANT_NAME} = {`);

    let tokenVariantNameList = Object.keys(designTokens);

    if (tokenNameFilter) {
      tokenVariantNameList = tokenNameFilter(tokenVariantNameList);
    }

    if (tokenNameTransformer) {
      tokenVariantNameList = tokenNameTransformer(tokenVariantNameList);
    }

    tokenVariantNameList.forEach((tokenVariantName) => {
      constantStringList.push(prepareConstantString(tokenVariantName));
    })
    constantStringList.push("} as const;");

    await writeFile(
      constantStringList,
      config.OUT_DIR + designTokenConfig.CONSTANT_FILE_PATH + config.CONSTANT_FILE_EXT
    );
  }
}
