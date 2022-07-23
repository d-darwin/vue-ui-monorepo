import { camelCase } from "camel-case";
import capitalizeFirstLetter from "./capitalizeFirstLetter";

/**
 * Prepare class name
 * @param tokenTypeName
 * @param tokenVariantName
 */
export default function(tokenTypeName?: string, tokenVariantName?: string): string {
  if (!tokenTypeName || !tokenVariantName) {
    return '';
  }

  return `${tokenTypeName}${capitalizeFirstLetter(camelCase(tokenVariantName))}`;
}
