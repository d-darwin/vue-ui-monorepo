import type { ConfigKey, DesignTokens } from "../types";
import prepareTypeString from "./prepareTypeString";
import writeTypeToFile from "./writeTypeToFile";
import * as config from "../../config.json";

// TODO: descr
// TODO: try to reduce args
export default async function (
  designTokens: DesignTokens,
  designTokenConfig: Record<ConfigKey, string>,
): Promise<void> {
  if (designTokens) {
    const typeStringList: string[] = [];

    typeStringList.push(
      `import { ${designTokenConfig.CONSTANT_NAME} } from "..${designTokenConfig.CONSTANT_FILE_PATH}";\n` // TODO: more flexible source - global @darwin-ui-vue///
    );
    typeStringList.push(
      prepareTypeString(designTokenConfig.TYPE_NAME, designTokenConfig.CONSTANT_NAME)
    );

    writeTypeToFile(
      typeStringList,
      config.OUT_DIR + designTokenConfig.TYPE_FILE_PATH + config.TYPE_FILE_EXT
    );
  }
}
