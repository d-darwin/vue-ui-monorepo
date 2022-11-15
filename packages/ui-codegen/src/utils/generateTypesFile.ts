import * as config from "@darwin-studio/ui-codegen/config.json";
import type { ConfigKey, DesignTokens } from "../types";
import prepareTypeString from "./prepareTypeString";
import writeFile from "./writeFile";

// TODO: descr
// TODO: try to reduce args
export default async function (
  designTokens: DesignTokens,
  designTokenConfig: Record<ConfigKey, string>,
): Promise<void> {
  if (designTokens) {
    const typeStringList: string[] = [];

    typeStringList.push(
      `import { ${designTokenConfig.CONSTANT_NAME} } from "${config.PACKAGE_NAME}/${config.OUT_DIR}${designTokenConfig.CONSTANT_FILE_PATH}";\n`
    );
    typeStringList.push(
      prepareTypeString(designTokenConfig.TYPE_NAME, designTokenConfig.CONSTANT_NAME)
    );

    await writeFile(
      typeStringList,
      config.OUT_DIR + designTokenConfig.TYPE_FILE_PATH + config.TYPE_FILE_EXT
    );
  }
}
