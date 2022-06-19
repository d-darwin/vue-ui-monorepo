/**
 * Clean up constantVariantName from prefixes or suffixes
 * @param constantVariantName
 * @param prefixOrPostfixList
 */
export default function(
  constantVariantName: string,
  prefixOrPostfixList: string[]
): { nakedVariantName: string; nakedPrefixOrSuffixName: string } {
  let nakedVariantName = constantVariantName;
  let nakedPrefixOrSuffixName = "";

  prefixOrPostfixList.some((prefixOrSuffix) => {
    console.log(constantVariantName, prefixOrSuffix)
    if (constantVariantName.startsWith(prefixOrSuffix)) {
      console.log(1);
      nakedVariantName = constantVariantName.replace(`${prefixOrSuffix}-`, "");
      nakedPrefixOrSuffixName = prefixOrSuffix;
      return true;
    }
    if (constantVariantName.endsWith(prefixOrSuffix)) {
      console.log(2);
      nakedVariantName = constantVariantName.replace(`-${prefixOrSuffix}`, "");
      nakedPrefixOrSuffixName = prefixOrSuffix;
      return true;
    }
    return false;
  });

  return { nakedVariantName, nakedPrefixOrSuffixName };
}
