import * as config from "@darwin-studio/vue-ui-codegen/config.json";
import prepareConstantString from "../utils/prepareConstantString";
import writeFile from "./writeFile";
import type { ConfigKey, DesignTokens } from "../types";
// TODO: descr
export default async function (
  designTokens: DesignTokens,
  designTokenConfig: Record<ConfigKey, string>,
  tokenNameFilter: ((tokenNames: string[]) => string[]) | null,
): Promise<void> {
  if (designTokens) {
    const constantStringList: string[] = [];

    constantStringList.push(`export const ${designTokenConfig.CONSTANT_NAME} = {`);

    const tokenVariantNameList = tokenNameFilter
      ? tokenNameFilter(Object.keys(designTokens))
      : Object.keys(designTokens);
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
